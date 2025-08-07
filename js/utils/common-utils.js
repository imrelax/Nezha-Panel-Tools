// 通用工具函数库
// 整合重复功能，提供统一的工具函数

class CommonUtils {
    constructor() {
        this.debounceTimers = new Map();
        this.throttleTimers = new Map();
    }

    // 防抖函数
    debounce(func, delay, key = 'default') {
        return (...args) => {
            if (this.debounceTimers.has(key)) {
                clearTimeout(this.debounceTimers.get(key));
            }
            
            const timer = setTimeout(() => {
                func.apply(this, args);
                this.debounceTimers.delete(key);
            }, delay);
            
            this.debounceTimers.set(key, timer);
        };
    }

    // 节流函数
    throttle(func, delay, key = 'default') {
        return (...args) => {
            if (this.throttleTimers.has(key)) {
                return;
            }
            
            func.apply(this, args);
            
            const timer = setTimeout(() => {
                this.throttleTimers.delete(key);
            }, delay);
            
            this.throttleTimers.set(key, timer);
        };
    }

    // 复制到剪贴板
    async copyToClipboard(text, showToast = true) {
        try {
            // 优先使用现代API
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                // 回退方案
                await this.fallbackCopyToClipboard(text);
            }
            
            if (showToast) {
                const successMessage = window.unifiedI18nManager ? 
                    window.unifiedI18nManager.__('copySuccess') : 
                    (typeof __ === 'function' ? __('copySuccess') : '复制成功');
                this.showToast(successMessage, 'success');
            }
            
            return true;
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            if (showToast) {
                const errorMessage = window.unifiedI18nManager ? 
                    window.unifiedI18nManager.__('copyFailed') : '复制失败';
                this.showToast(errorMessage, 'error');
            }
            return false;
        }
    }

    // 回退复制方案
    fallbackCopyToClipboard(text) {
        return new Promise((resolve, reject) => {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            
            try {
                textArea.focus();
                textArea.select();
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                
                if (successful) {
                    resolve();
                } else {
                    reject(new Error('Copy command failed'));
                }
            } catch (error) {
                document.body.removeChild(textArea);
                reject(error);
            }
        });
    }

    // 显示提示消息
    showToast(message, type = 'success', duration = 3000) {
        // 移除现有的toast
        const existingToast = document.querySelector('.common-toast');
        if (existingToast) {
            existingToast.remove();
        }

        // 创建新的toast
        const toast = document.createElement('div');
        toast.className = `common-toast fixed top-4 right-4 z-50 px-6 py-3 rounded-lg border backdrop-blur-sm transform translate-x-full transition-transform duration-300`;
        
        // 根据类型设置样式
        const typeStyles = {
            success: 'bg-green-500/90 text-white border-green-400/50',
            error: 'bg-red-500/90 text-white border-red-400/50',
            warning: 'bg-yellow-500/90 text-white border-yellow-400/50',
            info: 'bg-blue-500/90 text-white border-blue-400/50'
        };
        
        toast.className += ` ${typeStyles[type] || typeStyles.success}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // 显示动画
        setTimeout(() => {
            toast.classList.remove('translate-x-full');
            toast.classList.add('translate-x-0');
        }, 100);
        
        // 隐藏动画
        setTimeout(() => {
            toast.classList.remove('translate-x-0');
            toast.classList.add('translate-x-full');
            
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
    }

    // 格式化日期时间为本地格式
    formatDateTimeLocal(date) {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    // 格式化文件大小
    formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // 验证邮箱格式
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 验证URL格式
    isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    // 验证IP地址格式
    isValidIP(ip) {
        const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
        return ipv4Regex.test(ip) || ipv6Regex.test(ip);
    }

    // 深度克隆对象
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        
        if (obj instanceof Date) {
            return new Date(obj.getTime());
        }
        
        if (obj instanceof Array) {
            return obj.map(item => this.deepClone(item));
        }
        
        if (typeof obj === 'object') {
            const cloned = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    cloned[key] = this.deepClone(obj[key]);
                }
            }
            return cloned;
        }
        
        return obj;
    }

    // 合并对象
    mergeObjects(target, ...sources) {
        if (!sources.length) return target;
        const source = sources.shift();
        
        if (this.isObject(target) && this.isObject(source)) {
            for (const key in source) {
                if (this.isObject(source[key])) {
                    if (!target[key]) Object.assign(target, { [key]: {} });
                    this.mergeObjects(target[key], source[key]);
                } else {
                    Object.assign(target, { [key]: source[key] });
                }
            }
        }
        
        return this.mergeObjects(target, ...sources);
    }

    // 检查是否为对象
    isObject(item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    }

    // 生成唯一ID
    generateId(prefix = 'id') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // 获取元素的计算样式
    getComputedStyle(element, property) {
        if (!element || !property) return null;
        
        const computed = window.getComputedStyle(element);
        return computed.getPropertyValue(property);
    }

    // 平滑滚动到元素
    scrollToElement(element, options = {}) {
        if (!element) return;
        
        const defaultOptions = {
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        };
        
        const scrollOptions = { ...defaultOptions, ...options };
        element.scrollIntoView(scrollOptions);
    }

    // 检查元素是否在视口中
    isElementInViewport(element) {
        if (!element) return false;
        
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // 等待元素出现
    waitForElement(selector, timeout = 5000) {
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

    // 本地存储工具
    storage = {
        // 设置存储项
        set: (key, value, expiry = null) => {
            try {
                const item = {
                    value: value,
                    timestamp: Date.now(),
                    expiry: expiry
                };
                localStorage.setItem(key, JSON.stringify(item));
                return true;
            } catch (error) {
                console.error('Failed to set localStorage item:', error);
                return false;
            }
        },
        
        // 获取存储项
        get: (key, defaultValue = null) => {
            try {
                const itemStr = localStorage.getItem(key);
                if (!itemStr) return defaultValue;
                
                const item = JSON.parse(itemStr);
                
                // 检查是否过期
                if (item.expiry && Date.now() > item.expiry) {
                    localStorage.removeItem(key);
                    return defaultValue;
                }
                
                return item.value;
            } catch (error) {
                console.error('Failed to get localStorage item:', error);
                return defaultValue;
            }
        },
        
        // 移除存储项
        remove: (key) => {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                console.error('Failed to remove localStorage item:', error);
                return false;
            }
        },
        
        // 清空存储
        clear: () => {
            try {
                localStorage.clear();
                return true;
            } catch (error) {
                console.error('Failed to clear localStorage:', error);
                return false;
            }
        }
    };

    // 事件总线
    eventBus = {
        events: new Map(),
        
        // 监听事件
        on: (event, callback) => {
            if (!this.eventBus.events.has(event)) {
                this.eventBus.events.set(event, new Set());
            }
            this.eventBus.events.get(event).add(callback);
        },
        
        // 移除事件监听
        off: (event, callback) => {
            if (this.eventBus.events.has(event)) {
                this.eventBus.events.get(event).delete(callback);
            }
        },
        
        // 触发事件
        emit: (event, data) => {
            if (this.eventBus.events.has(event)) {
                this.eventBus.events.get(event).forEach(callback => {
                    try {
                        callback(data);
                    } catch (error) {
                        console.error(`Error in event callback for ${event}:`, error);
                    }
                });
            }
        },
        
        // 清空所有事件
        clear: () => {
            this.eventBus.events.clear();
        }
    };

    // 清理资源
    destroy() {
        // 清理定时器
        this.debounceTimers.forEach(timer => clearTimeout(timer));
        this.throttleTimers.forEach(timer => clearTimeout(timer));
        this.debounceTimers.clear();
        this.throttleTimers.clear();
        
        // 清理事件总线
        this.eventBus.clear();
    }
}

// 创建全局实例
const commonUtils = new CommonUtils();

// 导出常用函数到全局
if (typeof window !== 'undefined') {
    // 全局工具函数
    window.copyToClipboard = commonUtils.copyToClipboard.bind(commonUtils);
    window.showToast = commonUtils.showToast.bind(commonUtils);
    window.debounce = commonUtils.debounce.bind(commonUtils);
    window.throttle = commonUtils.throttle.bind(commonUtils);
    window.formatDateTimeLocal = commonUtils.formatDateTimeLocal.bind(commonUtils);
    
    // 全局工具对象
    window.commonUtils = commonUtils;
    window.CommonUtils = CommonUtils;
}

// 模块导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CommonUtils,
        commonUtils
    };
}