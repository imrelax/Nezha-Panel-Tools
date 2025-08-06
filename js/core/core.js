// 核心模块 - 合并自 config.js, utils.js 和 event-manager.js

// ==================== 全局配置部分 (config.js) ====================

// 全局状态管理
const state = {
    language: 'zh',
    theme: 'auto',
    tags: [],
    config: {
        enableBilling: true,
        enablePlan: true,
        billingDataMod: {
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            autoRenewal: 'true',
            cycle: 'Year',
            amount: '12EUR'
        },
        planDataMod: {
            bandwidth: '30Mbps',
            trafficVol: '1TB/Month',
            trafficType: '2',
            IPv4: '1',
            IPv6: '1',
            networkRoute: '4837',
            extra: 'xxxx.im'
        }
    }
};

// 货币符号映射 - 系统默认四种货币
const currencySymbols = {
    'CNY': '¥',
    'USD': '$',
    'EUR': '€',
    'GBP': '£'
};

// ==================== 工具函数部分 (utils.js) ====================

// 增强的防抖函数管理
window.debounceTimers = window.debounceTimers || {};

function debounce(func, wait, key = 'default') {
    return function executedFunction(...args) {
        const later = () => {
            delete window.debounceTimers[key];
            func(...args);
        };
        
        if (window.debounceTimers[key]) {
            clearTimeout(window.debounceTimers[key]);
        }
        
        window.debounceTimers[key] = setTimeout(later, wait);
    };
}

// 清理防抖定时器
function clearDebounceTimer(key) {
    if (key && window.debounceTimers[key]) {
        clearTimeout(window.debounceTimers[key]);
        delete window.debounceTimers[key];
    }
}

// 清理所有防抖定时器
function clearAllDebounceTimers() {
    Object.keys(window.debounceTimers).forEach(key => {
        clearTimeout(window.debounceTimers[key]);
    });
    window.debounceTimers = {};
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 格式化日期时间为本地格式
function formatDateTimeLocal(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// 深拷贝函数
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }
    
    if (obj instanceof Array) {
        return obj.map(item => deepClone(item));
    }
    
    if (typeof obj === 'object') {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
}

// 验证邮箱格式
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 验证URL格式
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// 生成随机ID
function generateId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// 通用Toast提示函数
function showToast(message, type = 'info', duration = 3000) {
    // 移除现有的toast
    const existingToast = document.getElementById('globalToast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 创建toast元素
    const toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg border backdrop-blur-sm transform translate-x-full transition-transform duration-300`;
    
    // 根据类型设置样式
    switch (type) {
        case 'success':
            toast.className += ' bg-green-500/90 text-white border-green-400/50';
            break;
        case 'error':
            toast.className += ' bg-red-500/90 text-white border-red-400/50';
            break;
        case 'warning':
            toast.className += ' bg-yellow-500/90 text-white border-yellow-400/50';
            break;
        default:
            toast.className += ' bg-blue-500/90 text-white border-blue-400/50';
    }
    
    // 创建内容
    const content = document.createElement('div');
    content.className = 'flex items-center';
    
    // 添加图标
    const icon = document.createElement('i');
    switch (type) {
        case 'success':
            icon.className = 'mr-2';
        icon.textContent = '✅';
            break;
        case 'error':
            icon.className = 'mr-2';
        icon.textContent = '❌';
            break;
        case 'warning':
            icon.className = 'mr-2';
        icon.textContent = '⚠️';
            break;
        default:
            icon.className = 'mr-2';
        icon.textContent = 'ℹ️';
    }
    
    // 添加消息文本
    const messageElement = document.createElement('span');
    messageElement.textContent = message;
    
    content.appendChild(icon);
    content.appendChild(messageElement);
    toast.appendChild(content);
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 10);
    
    // 自动隐藏
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, duration);
    
    return toast;
}

// 本地存储操作（增强版本，包含数据验证和配额检查）
const storage = {
    // 检查localStorage是否可用
    isAvailable: function() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            console.warn('localStorage is not available:', error);
            return false;
        }
    },
    
    // 获取存储配额信息
    getQuotaInfo: function() {
        if (!this.isAvailable()) return null;
        
        try {
            let total = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    total += localStorage[key].length + key.length;
                }
            }
            return {
                used: total,
                // 大多数浏览器的localStorage限制约为5-10MB
                estimated: total,
                percentage: (total / (5 * 1024 * 1024)) * 100
            };
        } catch (error) {
            console.error('Failed to get quota info:', error);
            return null;
        }
    },
    
    set: function(key, value, options = {}) {
        if (!this.isAvailable()) {
            console.warn('localStorage not available, data not saved');
            return false;
        }
        
        try {
            // 验证key
            if (!key || typeof key !== 'string') {
                throw new Error('Invalid key: must be a non-empty string');
            }
            
            // 序列化数据
            const serializedValue = JSON.stringify(value);
            
            // 检查数据大小（可选）
            if (options.maxSize && serializedValue.length > options.maxSize) {
                throw new Error(`Data too large: ${serializedValue.length} bytes exceeds limit of ${options.maxSize} bytes`);
            }
            
            // 尝试存储
            localStorage.setItem(key, serializedValue);
            
            // 验证存储是否成功
            if (options.verify && localStorage.getItem(key) !== serializedValue) {
                throw new Error('Storage verification failed');
            }
            
            return true;
        } catch (error) {
            console.error(`Failed to save to localStorage (key: ${key}):`, error);
            
            // 如果是配额超出错误，尝试清理
            if (error.name === 'QuotaExceededError' && options.autoCleanup) {
                this.cleanup();
                // 重试一次
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                    return true;
                } catch (retryError) {
                    console.error('Retry after cleanup also failed:', retryError);
                }
            }
            
            return false;
        }
    },
    
    get: function(key, defaultValue = null, options = {}) {
        if (!this.isAvailable()) {
            return defaultValue;
        }
        
        try {
            // 验证key
            if (!key || typeof key !== 'string') {
                throw new Error('Invalid key: must be a non-empty string');
            }
            
            const item = localStorage.getItem(key);
            if (item === null) {
                return defaultValue;
            }
            
            const parsed = JSON.parse(item);
            
            // 可选的数据验证
            if (options.validator && typeof options.validator === 'function') {
                if (!options.validator(parsed)) {
                    console.warn(`Data validation failed for key: ${key}`);
                    return defaultValue;
                }
            }
            
            return parsed;
        } catch (error) {
            console.error(`Failed to read from localStorage (key: ${key}):`, error);
            
            // 如果数据损坏，可选择删除
            if (options.removeOnError) {
                this.remove(key);
            }
            
            return defaultValue;
        }
    },
    
    remove: function(key) {
        if (!this.isAvailable()) {
            return false;
        }
        
        try {
            if (!key || typeof key !== 'string') {
                throw new Error('Invalid key: must be a non-empty string');
            }
            
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Failed to remove from localStorage (key: ${key}):`, error);
            return false;
        }
    },
    
    clear: function() {
        if (!this.isAvailable()) {
            return false;
        }
        
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Failed to clear localStorage:', error);
            return false;
        }
    },
    
    // 清理过期或无效数据
    cleanup: function() {
        if (!this.isAvailable()) {
            return;
        }
        
        try {
            const keysToRemove = [];
            
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (!key) continue;
                
                try {
                    const value = localStorage.getItem(key);
                    JSON.parse(value); // 验证JSON格式
                } catch (parseError) {
                    console.warn(`Found corrupted data for key: ${key}, marking for removal`);
                    keysToRemove.push(key);
                }
            }
            
            // 删除损坏的数据
            keysToRemove.forEach(key => {
                this.remove(key);
            });
            
            console.log(`Cleaned up ${keysToRemove.length} corrupted entries`);
        } catch (error) {
            console.error('Failed to cleanup localStorage:', error);
        }
    },
    
    // 获取所有键
    keys: function() {
        if (!this.isAvailable()) {
            return [];
        }
        
        try {
            return Object.keys(localStorage);
        } catch (error) {
            console.error('Failed to get localStorage keys:', error);
            return [];
        }
    }
};

// ==================== 事件管理部分 (event-manager.js) ====================

// 全局事件管理器
const eventManager = {
    events: {},
    pageInitializers: {},
    
    // 注册事件监听器
    on(eventName, callback, options = {}) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        
        const listener = {
            callback,
            once: options.once || false,
            priority: options.priority || 0,
            id: generateId()
        };
        
        this.events[eventName].push(listener);
        
        // 按优先级排序
        this.events[eventName].sort((a, b) => b.priority - a.priority);
        
        return listener.id;
    },
    
    // 移除事件监听器
    off(eventName, listenerId) {
        if (!this.events[eventName]) return false;
        
        const index = this.events[eventName].findIndex(listener => listener.id === listenerId);
        if (index > -1) {
            this.events[eventName].splice(index, 1);
            return true;
        }
        return false;
    },
    
    // 触发事件
    emit(eventName, data = {}) {
        if (!this.events[eventName]) return;
        
        const listeners = [...this.events[eventName]];
        
        listeners.forEach(listener => {
            try {
                listener.callback(data);
                
                // 如果是一次性监听器，移除它
                if (listener.once) {
                    this.off(eventName, listener.id);
                }
            } catch (error) {
                console.error(`Error in event listener for ${eventName}:`, error);
            }
        });
    },
    
    // 注册页面初始化函数
    registerPageInitializer(pageName, initFunction) {
        this.pageInitializers[pageName] = initFunction;
    },
    
    // 初始化页面
    initializePage(pageName) {
        if (this.pageInitializers[pageName]) {
            try {
                this.pageInitializers[pageName]();
                this.emit('pageInitialized', { pageName });
            } catch (error) {
                console.error(`Error initializing page ${pageName}:`, error);
            }
        }
    },
    
    // 清理所有事件监听器
    clearAll() {
        this.events = {};
    },
    
    // 获取事件统计信息
    getStats() {
        const stats = {};
        Object.keys(this.events).forEach(eventName => {
            stats[eventName] = this.events[eventName].length;
        });
        return stats;
    }
};

// DOM 事件委托
function delegate(parent, selector, event, handler) {
    parent.addEventListener(event, function(e) {
        const target = e.target.closest(selector);
        if (target) {
            handler.call(target, e);
        }
    });
}

// 等待DOM加载完成
function ready(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

// 等待元素出现的辅助函数（优化版本，防止内存泄漏）
function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        // 首先检查元素是否已存在
        const element = document.querySelector(selector);
        if (element) {
            resolve(element);
            return;
        }
        
        let observer;
        let timeoutId;
        
        // 清理函数
        const cleanup = () => {
            if (observer) {
                observer.disconnect();
                observer = null;
            }
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        };
        
        // 创建观察器
        observer = new MutationObserver((mutations) => {
            const element = document.querySelector(selector);
            if (element) {
                cleanup();
                resolve(element);
            }
        });
        
        // 开始观察
        try {
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        } catch (error) {
            cleanup();
            reject(new Error(`Failed to observe DOM: ${error.message}`));
            return;
        }
        
        // 设置超时
        timeoutId = setTimeout(() => {
            cleanup();
            reject(new Error(`Element ${selector} not found within ${timeout}ms`));
        }, timeout);
    });
}

// 导出函数（如果支持模块化）
// 导出到全局作用域
window.state = state;
window.currencySymbols = currencySymbols;
window.debounce = debounce;
window.clearDebounceTimer = clearDebounceTimer;
window.clearAllDebounceTimers = clearAllDebounceTimers;
window.throttle = throttle;
window.formatDateTimeLocal = formatDateTimeLocal;
window.deepClone = deepClone;
window.isValidEmail = isValidEmail;
window.isValidUrl = isValidUrl;
window.generateId = generateId;
window.storage = storage;
window.eventManager = eventManager;
window.delegate = delegate;
window.ready = ready;
window.waitForElement = waitForElement;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        state,
        currencySymbols,
        debounce,
        clearDebounceTimer,
        clearAllDebounceTimers,
        throttle,
        formatDateTimeLocal,
        deepClone,
        isValidEmail,
        isValidUrl,
        generateId,
        storage,
        eventManager,
        delegate,
        ready,
        waitForElement
    };
}