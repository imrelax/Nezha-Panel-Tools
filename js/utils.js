// 工具函数和UI交互模块

// 复制代码
async function copyCode(event) {
    event.stopPropagation();
    const jsonCode = document.getElementById('jsonCode');
    
    if (!jsonCode) return;
    
    try {
        // 使用现代Clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(jsonCode.value);
        } else {
            // 降级到传统方法
            jsonCode.select();
            document.execCommand('copy');
        }
        showToast(__('copySuccess'));
    } catch (err) {
        console.error('复制失败:', err);
        // 降级到传统方法
        try {
            jsonCode.select();
            document.execCommand('copy');
            showToast(__('copySuccess'));
        } catch (fallbackErr) {
            console.error('复制失败（降级方法也失败）:', fallbackErr);
            showToast('复制失败，请手动复制');
        }
    }
}

// 显示警告模态框
function showWarning(type, params = {}) {
    const modal = document.getElementById('warningModal');
    const message = document.getElementById('warningMessage');
    
    if (!modal || !message) return;
    
    const warningKey = `warningMessages.${type}`;
    message.textContent = i18n[state.language].warningMessages[type] ? 
        i18n[state.language].warningMessages[type].replace(/\{(\w+)\}/g, (match, key) => params[key] || match) :
        `Warning: ${type}`;
    modal.style.display = 'block';
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('warningModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 显示提示消息
function showToast(message) {
    const toast = document.getElementById('copyToast');
    if (!toast) return;
    
    const toastMessage = toast.querySelector('span');
    if (!toastMessage) return;

    const defaultCopySuccess = __('copySuccess', { fallback: '复制成功！' });
    toastMessage.textContent = message || defaultCopySuccess;

    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// 折叠卡片
function toggleCardCollapse(headerElement) {
    const card = headerElement.closest('.form-section, .code-panel');
    if (!card) return;
    
    const content = card.querySelector('.form-content, .code-container');
    const icon = headerElement.querySelector('.collapse-btn i');

    if (content) {
        content.classList.toggle('collapsed');
    }
    if (icon) {
        icon.classList.toggle('rotated');
    }
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
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
    }
}

// 验证JSON格式
function isValidJSON(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 生成随机ID
function generateRandomId(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// 深拷贝对象
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

// 检查是否为移动设备
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 获取浏览器信息
function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browser = 'Unknown';
    
    if (ua.indexOf('Chrome') > -1) {
        browser = 'Chrome';
    } else if (ua.indexOf('Firefox') > -1) {
        browser = 'Firefox';
    } else if (ua.indexOf('Safari') > -1) {
        browser = 'Safari';
    } else if (ua.indexOf('Edge') > -1) {
        browser = 'Edge';
    } else if (ua.indexOf('Opera') > -1) {
        browser = 'Opera';
    }
    
    return {
        browser,
        userAgent: ua,
        isMobile: isMobileDevice()
    };
}

// 本地存储工具
const storage = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('存储失败:', e);
            return false;
        }
    },
    
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('读取存储失败:', e);
            return defaultValue;
        }
    },
    
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('删除存储失败:', e);
            return false;
        }
    },
    
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('清空存储失败:', e);
            return false;
        }
    }
};

// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('warningModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// 导出函数（如果支持模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        copyCode,
        showWarning,
        closeModal,
        showToast,
        toggleCardCollapse,
        debounce,
        throttle,
        isValidJSON,
        formatFileSize,
        generateRandomId,
        deepClone,
        isMobileDevice,
        getBrowserInfo,
        storage
    };
}