// 统一核心文件 - 合并了 polyfills.js, tailwind-config.js 和 alert.js 的功能

(function() {
    'use strict';
    
    // ===== 浏览器兼容性检查部分 (原 polyfills.js) =====
    
    // 检查关键功能支持
    const criticalFeatures = {
        fetch: typeof fetch !== 'undefined',
        promise: typeof Promise !== 'undefined',
        localStorage: checkLocalStorageSupport()
    };
    
    // 检查localStorage支持
    function checkLocalStorageSupport() {
        try {
            const test = '__test__';
            localStorage.setItem(test, 'test');
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }
    
    // 检查是否有不支持的关键功能
    const unsupported = Object.entries(criticalFeatures)
        .filter(([, supported]) => !supported)
        .map(([feature]) => feature);
    
    if (unsupported.length > 0) {
        console.warn('不支持的功能:', unsupported.join(', '));
        
        // 显示简单警告
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', showWarning);
        } else {
            showWarning();
        }
    }
    
    function showWarning() {
        const banner = document.createElement('div');
        banner.style.cssText = `
            position: fixed; top: 0; left: 0; right: 0;
            background: #ff6b6b; color: white; padding: 8px;
            text-align: center; font-size: 14px; z-index: 9999;
        `;
        banner.innerHTML = `
            ⚠️ 浏览器版本过旧，建议升级以获得最佳体验
            <button onclick="this.parentElement.remove()" style="
                background: rgba(255,255,255,0.2); border: none;
                color: white; padding: 2px 6px; margin-left: 8px;
                border-radius: 3px; cursor: pointer;
            ">关闭</button>
        `;
        document.body.insertBefore(banner, document.body.firstChild);
    }
    
    // ===== Tailwind CSS 配置部分 (原 tailwind-config.js) =====
    
    // 统一的 Tailwind CSS 配置
    window.tailwindConfig = {
        darkMode: 'class',
        theme: {
            extend: {
                colors: {
                    primary: {
                        50: '#f3f6fb',
                        100: '#e3edfa',
                        500: '#2563eb',
                        600: '#1d4ed8',
                        900: '#1e293b'
                    }
                },
                animation: {
                    'fade-in': 'fadeIn 0.5s ease-in-out',
                    'slide-up': 'slideUp 0.3s ease-out',
                    'bounce-gentle': 'bounceGentle 2s infinite',
                },
                keyframes: {
                    fadeIn: {
                        '0%': { opacity: '0' },
                        '100%': { opacity: '1' }
                    },
                    slideUp: {
                        '0%': { transform: 'translateY(10px)', opacity: '0' },
                        '100%': { transform: 'translateY(0)', opacity: '1' }
                    },
                    bounceGentle: {
                        '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                        '40%': { transform: 'translateY(-10px)' },
                        '60%': { transform: 'translateY(-5px)' }
                    }
                },
                backdropBlur: {
                    xs: '2px'
                }
            }
        }
    };
    
    // 应用Tailwind配置
    if (typeof tailwind !== 'undefined') {
        tailwind.config = window.tailwindConfig;
    }
    
})();

// ===== 告警页面功能部分 (原 alert.js) =====

// 页面初始化函数
function initializeAlertPage() {
    updateAlertRule();
}

document.addEventListener('DOMContentLoaded', function() {
    // 根据页面类型进行智能初始化
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    let initFunction = null;
    
    // 根据页面确定初始化函数
    if (currentPage === 'alert.html' && document.getElementById('alertType')) {
        initFunction = updateAlertRule;
    }
    // 其他页面可以在这里添加相应的初始化函数
    
    if (typeof initializePage === 'function') {
        initializePage(initFunction, { initTheme: false }); // 主题已在其他地方初始化
    } else if (initFunction) {
        initFunction();
    }
});

function updateAlertRule() {
    const type = document.getElementById('alertType').value;
    const min = document.getElementById('alertMin').value;
    const max = document.getElementById('alertMax').value;
    const duration = document.getElementById('alertDuration').value;
    const cover = document.getElementById('alertCover').checked ? 1 : 0;
    const ignoreInput = document.getElementById('alertIgnore').value;
    const ignore = {};
    ignoreInput.split(',').forEach(id => {
        const t = id.trim();
        if (t) ignore[t] = true;
    });

    const obj = { type };
    if (min) obj.min = Number(min);
    if (max) obj.max = Number(max);
    obj.duration = Number(duration);
    obj.cover = cover;
    if (Object.keys(ignore).length) obj.ignore = ignore;

    const json = JSON.stringify([obj], null, 2);
    document.getElementById('alertJson').value = json;
}

// 刷新数据到初始状态
function refreshAlertData(event) {
    event.stopPropagation();
    
    function resetAlertForm() {
        document.getElementById('alertType').value = 'offline';
        document.getElementById('alertMin').value = '';
        document.getElementById('alertMax').value = '';
        document.getElementById('alertDuration').value = '30';
        document.getElementById('alertCover').checked = false;
        document.getElementById('alertIgnore').value = '';
    }
    
    refreshData(resetAlertForm, updateAlertRule);
}

function copyAlertCode(event) {
    event.stopPropagation();
    const alertJson = document.getElementById('alertJson').value;
    commonUtils.copyToClipboard(alertJson);
}

// 模块导出（如果在模块环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        tailwindConfig: window.tailwindConfig,
        initializeAlertPage,
        updateAlertRule,
        refreshAlertData,
        copyAlertCode
    };
}