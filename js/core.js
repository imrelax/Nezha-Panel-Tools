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

// 货币符号映射
const currencySymbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'JPY': '¥',
    'CNY': '¥',
    'KRW': '₩',
    'RUB': '₽',
    'CAD': 'C$',
    'AUD': 'A$',
    'CHF': 'CHF',
    'SEK': 'kr',
    'NOK': 'kr',
    'DKK': 'kr',
    'PLN': 'zł',
    'CZK': 'Kč',
    'HUF': 'Ft',
    'RON': 'lei',
    'BGN': 'лв',
    'HRK': 'kn',
    'TRY': '₺',
    'ILS': '₪',
    'AED': 'د.إ',
    'SAR': 'ر.س',
    'QAR': 'ر.ق',
    'KWD': 'د.ك',
    'BHD': 'د.ب',
    'OMR': 'ر.ع',
    'JOD': 'د.ا',
    'LBP': 'ل.ل',
    'EGP': 'ج.م',
    'MAD': 'د.م',
    'TND': 'د.ت',
    'DZD': 'د.ج',
    'LYD': 'د.ل',
    'SDG': 'ج.س',
    'SOS': 'S',
    'ETB': 'Br',
    'KES': 'KSh',
    'UGX': 'USh',
    'TZS': 'TSh',
    'RWF': 'RF',
    'BIF': 'FBu',
    'DJF': 'Fdj',
    'ERN': 'Nfk',
    'MGA': 'Ar',
    'MUR': 'Rs',
    'SCR': 'Rs',
    'KMF': 'CF',
    'MWK': 'MK',
    'ZMW': 'ZK',
    'BWP': 'P',
    'SZL': 'L',
    'LSL': 'L',
    'NAD': 'N$',
    'ZAR': 'R',
    'AOA': 'Kz',
    'XAF': 'FCFA',
    'XOF': 'CFA',
    'GHS': 'GH₵',
    'NGN': '₦',
    'XPF': '₣',
    'TOP': 'T$',
    'WST': 'WS$',
    'SBD': 'SI$',
    'VUV': 'VT',
    'FJD': 'FJ$',
    'PGK': 'K',
    'TVD': '$',
    'NRU': '$',
    'KIR': '$',
    'MHL': '$',
    'FSM': '$',
    'PLW': '$',
    'NCL': '₣',
    'WLF': '₣'
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

// 本地存储工具
const storage = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Storage set error:', error);
            return false;
        }
    },
    
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Storage get error:', error);
            return defaultValue;
        }
    },
    
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Storage remove error:', error);
            return false;
        }
    },
    
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Storage clear error:', error);
            return false;
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

// 等待元素出现
function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const element = document.querySelector(selector);
        if (element) {
            resolve(element);
            return;
        }
        
        const observer = new MutationObserver((mutations, obs) => {
            const element = document.querySelector(selector);
            if (element) {
                obs.disconnect();
                resolve(element);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Element ${selector} not found within ${timeout}ms`));
        }, timeout);
    });
}

// 导出函数（如果支持模块化）
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