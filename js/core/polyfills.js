// 简化的浏览器兼容性检查

(function() {
    'use strict';
    
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
})();