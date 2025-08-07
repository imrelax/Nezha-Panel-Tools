// 主题管理模块（翻译功能已迁移到i18n-manager.js）
// Tailwind配置已合并到 js/core/unified-core.js

// 初始化主题 - 自动检测浏览器主题
function initializeTheme() {
    // 检查是否有保存的主题偏好
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // 如果有保存的主题，使用保存的主题
        setTheme(savedTheme);
    } else {
        // 如果没有保存的主题，自动检测浏览器主题
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const autoTheme = prefersDark ? 'dark' : 'light';
        setTheme(autoTheme);
    }
    
    // 监听浏览器主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        // 只有在没有手动设置主题时才自动跟随浏览器主题
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            setTheme(newTheme);
        }
    });
}

// 主题切换
function toggleTheme() {
    // 从 localStorage 或 DOM 获取当前主题
    const currentTheme = localStorage.getItem('theme') || 
                        (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

function setTheme(theme) {
    // 更新全局状态（如果存在）
    if (typeof state !== 'undefined') {
        state.theme = theme;
    }
    
    document.documentElement.setAttribute('data-theme', theme);
    
    // 为Tailwind CSS添加dark类
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    // 更新主题切换按钮图标
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = '';
            icon.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }
    
    // 保存主题到本地存储，表示用户已手动设置
    localStorage.setItem('theme', theme);
}

// 语言切换（现在委托给unifiedI18nManager）
function toggleLanguage() {
    const manager = window.unifiedI18nManager || window.i18nManager;
    if (manager) {
        const currentLanguage = manager.currentLanguage || manager.getCurrentLanguage();
        const newLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
        manager.setLanguage(newLanguage).then(() => {
            // 触发DOM事件，通知页面组件更新
            const event = new CustomEvent('languageChanged', {
                detail: { language: newLanguage }
            });
            document.dispatchEvent(event);
        }).catch(error => {
            console.error('Language change failed:', error);
        });
    } else {
        console.warn('Translation manager not found, falling back to basic language toggle');
        // 基础的语言切换逻辑
        const currentLanguage = localStorage.getItem('language') || 'zh';
        const newLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
        localStorage.setItem('language', newLanguage);
        
        // 更新语言指示器
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            languageToggle.textContent = newLanguage === 'zh' ? 'EN' : '中文';
        }
        
        // 触发DOM事件
        const event = new CustomEvent('languageChanged', {
            detail: { language: newLanguage }
        });
        document.dispatchEvent(event);
    }
}

// 设置语言（现在委托给unifiedI18nManager）
function setLanguage(language) {
    const manager = window.unifiedI18nManager || window.i18nManager;
    if (manager) {
        manager.setLanguage(language).then(() => {
            // 触发DOM事件，通知页面组件更新
            const event = new CustomEvent('languageChanged', {
                detail: { language: language }
            });
            document.dispatchEvent(event);
        }).catch(error => {
            console.error('Language change failed:', error);
        });
    } else {
        console.warn('Translation manager not found, using basic language setting');
        localStorage.setItem('language', language);
        
        // 更新语言指示器
        const languageToggle = document.getElementById('languageToggle');
        if (languageToggle) {
            languageToggle.textContent = language === 'zh' ? 'EN' : '中文';
        }
        
        // 触发DOM事件
        const event = new CustomEvent('languageChanged', {
            detail: { language: language }
        });
        document.dispatchEvent(event);
    }
}

// HTML净化函数
function sanitizeHtml(html) {
    const allowedTags = ['br', 'a', 'span', 'strong', 'em', 'b', 'i'];
    const allowedAttributes = ['href', 'target', 'class'];
    
    // 简单的HTML净化实现
    return html.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^<>]*>/gi, (match, tag) => {
        if (allowedTags.includes(tag.toLowerCase())) {
            return match;
        }
        return '';
    });
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeTheme,
        toggleTheme,
        setTheme,
        toggleLanguage,
        setLanguage,
        sanitizeHtml
    };
}