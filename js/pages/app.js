// 主应用初始化模块
// 负责全局初始化、状态恢复、全局事件处理

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeApp();
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

async function initializeApp() {
    // 初始化主题 - 自动检测浏览器主题
    if (typeof initializeTheme === 'function') {
        initializeTheme();
    }
    
    // 恢复应用状态
    restoreAppState();

    // 初始化统一翻译管理器
    if (typeof unifiedI18nManager !== 'undefined') {
        await unifiedI18nManager.init();
    } else {
        console.warn('UnifiedI18nManager not found, using fallback language initialization');
    }
    
    // 检查当前页面并初始化相应的功能
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' || currentPage === '') {
        // 主页面初始化 - 委托给 index.js
        if (typeof initializeIndexPage === 'function') {
            initializeIndexPage();
        } else {
            console.warn('initializeIndexPage not found');
        }
    }
    // traffic.html 和 alert.html 的初始化由各自的脚本处理
}

// 显示提示消息
function showToast(message, type = 'success') {
    if (typeof commonUtils !== 'undefined' && commonUtils.showToast) {
        commonUtils.showToast(message, type);
    } else if (typeof window.showToast === 'function') {
        // 如果 commonUtils 未定义，尝试直接调用全局 showToast
        window.showToast(message, type);
    } else {
        // 最后的后备方案：直接 alert
        console.log(`[Toast ${type}] ${message}`);
    }
}

// 处理键盘快捷键
function handleKeyboardShortcuts(event) {
    // Ctrl/Cmd + T 切换主题
    if ((event.ctrlKey || event.metaKey) && event.key === 't') {
        event.preventDefault();
        if (typeof toggleTheme === 'function') toggleTheme();
    }
    
    // Ctrl/Cmd + L 切换语言
    if ((event.ctrlKey || event.metaKey) && event.key === 'l') {
        event.preventDefault();
        if (typeof toggleLanguage === 'function') toggleLanguage();
    }
}

// 键盘快捷键监听
document.addEventListener('keydown', handleKeyboardShortcuts);

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
    
    showToast(errorMessage, 'error');
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
    
    showToast(errorMessage, 'error');
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
    if (typeof storage !== 'undefined' && typeof state !== 'undefined') {
        storage.set('appState', {
            config: state.config,
            tags: state.tags,
            theme: state.theme,
            language: state.language
        });
    }
    
    // 清理事件监听器和定时器
    clearEventListeners();
});

// 清理事件监听器函数
function clearEventListeners() {
    // 清理防抖定时器
    if (typeof commonUtils !== 'undefined' && commonUtils.debounceTimers) {
         commonUtils.debounceTimers.clear();
    }
    
    // 清理其他可能的定时器
    if (window.debounceTimers) {
        Object.values(window.debounceTimers).forEach(timer => {
            clearTimeout(timer);
        });
    }
}

// 恢复保存的状态
function restoreAppState() {
    if (typeof storage === 'undefined') return;
    
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
        if (savedState.theme && typeof setTheme === 'function') {
            setTheme(savedState.theme);
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
        showToast,
        handleKeyboardShortcuts,
        restoreAppState
    };
}
