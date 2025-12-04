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
// 注意：大部分工具函数已迁移至 common-utils.js，此处仅保留核心特定的或作为别名

// 映射 storage 到全局，优先使用 commonUtils.storage
if (typeof commonUtils !== 'undefined' && commonUtils.storage) {
    window.storage = commonUtils.storage;
} else {
    // 简易 fallback，以防 commonUtils 未加载
    window.storage = {
        set: (key, value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) { return false; }
        },
        get: (key, def) => {
            try {
                const v = localStorage.getItem(key);
                return v ? JSON.parse(v) : def;
            } catch (e) { return def; }
        },
        remove: (key) => localStorage.removeItem(key),
        clear: () => localStorage.clear()
    };
}

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

// 导出函数（如果支持模块化）
// 导出到全局作用域
window.state = state;
window.currencySymbols = currencySymbols;
window.eventManager = eventManager;
window.delegate = delegate;
window.ready = ready;

// 确保 generateId 可用 (eventManager 依赖)
if (typeof generateId === 'undefined') {
    window.generateId = function(length = 8) {
        return Math.random().toString(36).substr(2, length);
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        state,
        currencySymbols,
        storage: window.storage,
        eventManager,
        delegate,
        ready
    };
}
