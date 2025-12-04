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
                fontFamily: {
                    sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
                    mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
                },
                colors: {
                    primary: {
                        50: '#f5f3ff',
                        100: '#ede9fe',
                        200: '#ddd6fe',
                        300: '#c4b5fd',
                        400: '#a78bfa',
                        500: '#8b5cf6',
                        600: '#7c3aed',
                        700: '#6d28d9',
                        800: '#5b21b6',
                        900: '#4c1d95',
                        950: '#2e1065',
                    },
                    secondary: {
                        50: '#ecfeff',
                        100: '#cffafe',
                        200: '#a5f3fc',
                        300: '#67e8f9',
                        400: '#22d3ee',
                        500: '#06b6d4',
                        600: '#0891b2',
                        700: '#0e7490',
                        800: '#155e75',
                        900: '#164e63',
                    },
                    slate: {
                        850: '#1e293b', // Custom dark shade
                        900: '#0f172a', // Main dark bg
                        950: '#020617', // Deep dark
                    }
                },
                animation: {
                    'fade-in': 'fadeIn 0.6s ease-out',
                    'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    'bounce-gentle': 'bounceGentle 3s infinite',
                    'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
                    'blob': 'blob 7s infinite',
                },
                keyframes: {
                    fadeIn: {
                        '0%': { opacity: '0', transform: 'translateY(10px)' },
                        '100%': { opacity: '1', transform: 'translateY(0)' }
                    },
                    slideUp: {
                        '0%': { transform: 'translateY(20px)', opacity: '0' },
                        '100%': { transform: 'translateY(0)', opacity: '1' }
                    },
                    bounceGentle: {
                        '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                        '40%': { transform: 'translateY(-6px)' },
                        '60%': { transform: 'translateY(-3px)' }
                    },
                    pulseGlow: {
                        '0%, 100%': { opacity: '1', boxShadow: '0 0 20px -5px rgba(139, 92, 246, 0.5)' },
                        '50%': { opacity: '0.8', boxShadow: '0 0 30px -5px rgba(139, 92, 246, 0.8)' }
                    },
                    blob: {
                        '0%': { transform: 'translate(0px, 0px) scale(1)' },
                        '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                        '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                        '100%': { transform: 'translate(0px, 0px) scale(1)' }
                    }
                },
                backdropBlur: {
                    xs: '2px',
                    md: '12px',
                    xl: '24px'
                },
                boxShadow: {
                    'glow': '0 0 20px -5px rgba(139, 92, 246, 0.3)',
                    'glow-hover': '0 0 30px -5px rgba(139, 92, 246, 0.5)',
                }
            }
        }
    };
    
    // 应用Tailwind配置
    if (typeof tailwind !== 'undefined') {
        tailwind.config = window.tailwindConfig;
    }
    
})();

