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
    
    // 初始化性能模式
    initializePerformanceMode();
    
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
    
    // 初始化配置
    updateBilling();
    updatePlan();
    updateJsonCode();
    
    // 初始化标签
    renderTags();
    
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
    
    // Ctrl/Cmd + P 切换性能模式
    if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
        event.preventDefault();
        togglePerformanceMode();
    }
}

// 错误处理
window.addEventListener('error', function(event) {
    console.error('全局错误:', event.error);
    showToast('发生错误，请刷新页面重试');
});

// 未处理的Promise拒绝
window.addEventListener('unhandledrejection', function(event) {
    console.error('未处理的Promise拒绝:', event.reason);
    event.preventDefault();
});

// 页面可见性变化处理
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // 页面重新可见时，可以执行一些刷新操作
        console.log('页面重新可见');
    }
});

// 页面卸载前保存状态
window.addEventListener('beforeunload', function() {
    // 保存当前状态到本地存储
    storage.set('appState', {
        config: state.config,
        tags: state.tags,
        theme: state.theme,
        language: state.language,
        performanceMode: state.performanceMode
    });
});

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
        
        // 恢复性能模式
        if (savedState.performanceMode !== undefined) {
            setPerformanceMode(savedState.performanceMode);
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
        handleKeyboardShortcuts,
        restoreAppState,
        checkAppVersion
    };
}