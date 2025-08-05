// 主应用初始化模块

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeApp();
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

function initializeApp() {
    // 初始化主题 - 自动检测浏览器主题
    initializeTheme();
    
    // 初始化语言
    const savedLanguage = localStorage.getItem('language') || 'zh';
    setLanguage(savedLanguage);
    

    
    // 检查当前页面并初始化相应的功能
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html') {
        // 主页面初始化
        initializeMainPage();
    }
    // traffic.html 和 alert.html 的初始化由各自的脚本处理
}

// 初始化主页面
function initializeMainPage() {
    // 设置默认开始时间
    const now = new Date();
    const startDateElement = document.getElementById('startDate');
    if (startDateElement) {
        startDateElement.value = formatDateTimeLocal(now);
    }
    
    // 初始化复选框状态
    const enableBillingCheckbox = document.getElementById('enableBilling');
    const enablePlanCheckbox = document.getElementById('enablePlan');
    const billingForm = document.getElementById('billingForm');
    const planForm = document.getElementById('planForm');
    
    if (enableBillingCheckbox) {
        enableBillingCheckbox.checked = state.config.enableBilling;
    }
    if (enablePlanCheckbox) {
        enablePlanCheckbox.checked = state.config.enablePlan;
    }
    if (billingForm && state.config.enableBilling) {
        billingForm.classList.remove('hidden');
    }
    if (planForm && state.config.enablePlan) {
        planForm.classList.remove('hidden');
    }
    
    // 初始化配置
    updateBilling();
    
    // 初始化标签
    renderTags();
    
    // 更新计划和JSON（在标签渲染后）
    updatePlan();
    updateJsonCode();
    
    // 绑定事件监听器
    bindEventListeners();
}

// 绑定事件监听器
function bindEventListeners() {
    // 表单变化监听
    const formElements = document.querySelectorAll('input, select, textarea');
    formElements.forEach(element => {
        if (element.type === 'checkbox') {
            element.addEventListener('change', handleFormChange);
        } else {
            element.addEventListener('input', debounce(handleFormChange, 300));
        }
    });
    
    // 标签输入监听
    const newTagInput = document.getElementById('newTag');
    if (newTagInput) {
        newTagInput.addEventListener('keypress', handleTagInput);
    }
    
    // JSON代码变化监听
    const jsonCode = document.getElementById('jsonCode');
    if (jsonCode) {
        jsonCode.addEventListener('input', debounce(handleCodeChange, 500));
    }
    
    // 键盘快捷键
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// 处理表单变化
function handleFormChange(event) {
    const element = event.target;
    const id = element.id;
    
    // 根据不同的表单元素执行相应的更新
    switch (id) {
        case 'enableBilling':
            toggleSection('billing');
            break;
        case 'enablePlan':
            toggleSection('plan');
            break;
        case 'startDate':
        case 'endDate':
        case 'autoRenewal':
        case 'cycle':
        case 'cycleLanguage':
            updateBilling();
            break;
        case 'amountType':
            updateAmountType();
            break;
        case 'amountValue':
        case 'currency':
        case 'currencyFormat':
            updateBilling();
            updateCurrencyFormatOptions();
            break;
        case 'bandwidthValue':
        case 'bandwidthUnit':
            updateBandwidthUnit();
            break;
        case 'trafficValue':
        case 'trafficUnit':
        case 'trafficPeriod':
            updateTrafficUnit();
            break;
        case 'trafficLanguage':
            updateTrafficLanguage();
            break;
        case 'trafficType':
        case 'ipv4':
        case 'ipv6':
        case 'networkRoute':
            updatePlan();
            break;
        default:
            // 通用更新
            if (element.closest('#billingForm')) {
                updateBilling();
            } else if (element.closest('#planForm')) {
                updatePlan();
            }
    }
}

// 复制JSON代码函数
function copyCode(event) {
    event.stopPropagation();
    const textarea = document.getElementById('jsonCode');
    if (!textarea) {
        showToast('复制失败：未找到JSON代码区域');
        return;
    }
    
    if (!textarea.value.trim()) {
        showToast('复制失败：JSON代码为空');
        return;
    }
    
    textarea.select();
    try {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textarea.value).then(() => {
                showToast('复制成功！');
            }).catch(err => {
                console.error('Clipboard API failed:', err);
                // 降级到document.execCommand
                if (document.execCommand('copy')) {
                    showToast('复制成功！');
                } else {
                    showToast('复制失败，请手动复制');
                }
            });
        } else {
            // 降级到document.execCommand
            if (document.execCommand('copy')) {
                showToast('复制成功！');
            } else {
                showToast('复制失败，请手动复制');
            }
        }
    } catch (err) {
        console.error('Copy failed:', err);
        showToast('发生错误，请手动复制');
    }
}

// 显示提示消息
function showToast(message) {
    const toast = document.getElementById('copyToast');
    if (toast) {
        const messageSpan = toast.querySelector('span[data-key="copySuccess"]');
        if (messageSpan) {
            messageSpan.textContent = message;
        }
        
        toast.classList.remove('hidden', 'translate-x-full');
        toast.classList.add('translate-x-0');
        
        setTimeout(() => {
            toast.classList.remove('translate-x-0');
            toast.classList.add('translate-x-full');
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 300);
        }, 2000);
    } else {
        // 降级到alert
        alert(message);
    }
}

// 处理键盘快捷键
function handleKeyboardShortcuts(event) {
    // Ctrl/Cmd + C 复制JSON
    if ((event.ctrlKey || event.metaKey) && event.key === 'c' && !event.target.matches('input, textarea')) {
        event.preventDefault();
        copyCode(event);
    }
    
    // Ctrl/Cmd + R 刷新配置
    if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
        event.preventDefault();
        refreshFromCode(event);
    }
    
    // Ctrl/Cmd + T 切换主题
    if ((event.ctrlKey || event.metaKey) && event.key === 't') {
        event.preventDefault();
        toggleTheme();
    }
    
    // Ctrl/Cmd + L 切换语言
    if ((event.ctrlKey || event.metaKey) && event.key === 'l') {
        event.preventDefault();
        toggleLanguage();
    }
    

}

// 增强的错误处理
window.addEventListener('error', function(event) {
    console.error('全局错误:', event.error);
    
    // 根据错误类型提供不同的用户提示
    let errorMessage = '发生错误，请刷新页面重试';
    
    if (event.error instanceof TypeError) {
        errorMessage = '数据类型错误，请检查输入格式';
    } else if (event.error instanceof ReferenceError) {
        errorMessage = '功能模块加载失败，请刷新页面';
    } else if (event.error instanceof SyntaxError) {
        errorMessage = 'JSON格式错误，请检查配置语法';
    }
    
    showToast(errorMessage);
});

// 未处理的Promise拒绝
window.addEventListener('unhandledrejection', function(event) {
    console.error('未处理的Promise拒绝:', event.reason);
    
    // 提供更友好的Promise错误提示
    let errorMessage = '操作失败，请重试';
    
    if (event.reason && event.reason.message) {
        if (event.reason.message.includes('fetch')) {
            errorMessage = '网络请求失败，请检查网络连接';
        } else if (event.reason.message.includes('parse')) {
            errorMessage = '数据解析失败，请检查数据格式';
        }
    }
    
    showToast(errorMessage);
    event.preventDefault();
});

// 页面可见性变化处理
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // 页面重新可见时，可以执行一些刷新操作
        console.log('页面重新可见');
    }
});

// 页面卸载前保存状态和清理资源
window.addEventListener('beforeunload', function() {
    // 保存当前状态到本地存储
    storage.set('appState', {
        config: state.config,
        tags: state.tags,
        theme: state.theme,
        language: state.language
    });
    
    // 清理事件监听器和定时器
    clearEventListeners();
});

// 清理事件监听器函数
function clearEventListeners() {
    // 清理防抖定时器
    const formElements = document.querySelectorAll('input, select, textarea');
    formElements.forEach(element => {
        // 移除事件监听器（如果有引用的话）
        element.removeEventListener('input', handleFormChange);
        element.removeEventListener('change', handleFormChange);
    });
    
    // 清理其他可能的定时器
    if (window.debounceTimers) {
        Object.values(window.debounceTimers).forEach(timer => {
            clearTimeout(timer);
        });
    }
}

// 恢复保存的状态
function restoreAppState() {
    const savedState = storage.get('appState');
    if (savedState) {
        // 恢复配置
        if (savedState.config) {
            state.config = { ...state.config, ...savedState.config };
        }
        
        // 恢复标签
        if (savedState.tags) {
            state.tags = savedState.tags;
        }
        
        // 恢复主题
        if (savedState.theme) {
            setTheme(savedState.theme);
        }
        
        // 恢复语言
        if (savedState.language) {
            setLanguage(savedState.language);
        }
        

    }
}

// 应用版本检查
function checkAppVersion() {
    const currentVersion = '1.0.0';
    const savedVersion = storage.get('appVersion');
    
    if (savedVersion !== currentVersion) {
        // 版本更新，可以执行迁移逻辑
        console.log(`应用版本从 ${savedVersion} 更新到 ${currentVersion}`);
        storage.set('appVersion', currentVersion);
        
        // 显示更新提示
        if (savedVersion) {
            showToast('应用已更新到新版本！');
        }
    }
}

// 性能监控
function initPerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('页面加载性能:', {
                        loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                        totalTime: perfData.loadEventEnd - perfData.fetchStart
                    });
                }
            }, 0);
        });
    }
}

// 初始化性能监控
initPerformanceMonitoring();

// 导出函数（如果支持模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        initializeMainPage,
        bindEventListeners,
        handleFormChange,
        copyCode,
        showToast,
        handleKeyboardShortcuts,
        restoreAppState,
        checkAppVersion
    };
}