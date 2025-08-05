// 主题和语言管理模块

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
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

function setTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    
    // 为Tailwind CSS添加dark类
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // 保存主题到本地存储，表示用户已手动设置
    localStorage.setItem('theme', theme);
}

// 语言切换
function toggleLanguage() {
    const newLanguage = state.language === 'zh' ? 'en' : 'zh';
    setLanguage(newLanguage);
}

function setLanguage(language) {
    state.language = language;
    // 显示相反的语言名称作为切换提示
    const langIndicator = document.getElementById('lang-indicator');
    if (langIndicator) {
        langIndicator.textContent = language === 'zh' ? 'English' : '中文';
    }
    
    // 更新所有文本
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (i18n[language][key]) {
            element.textContent = i18n[language][key];
        }
    });
    
    // 更新周期选项
    if (typeof updateCycleOptions === 'function') updateCycleOptions();
    if (typeof updateTrafficPeriodOptions === 'function') updateTrafficPeriodOptions();
    if (typeof updateCurrencyFormatOptions === 'function') updateCurrencyFormatOptions();
    
    localStorage.setItem('language', language);
    if (typeof updateJsonCode === 'function') updateJsonCode();
}

// 初始化性能模式
function initializePerformanceMode() {
    setPerformanceMode(state.performanceMode);
}

function togglePerformanceMode() {
    setPerformanceMode(!state.performanceMode);
}

function setPerformanceMode(mode) {
    state.performanceMode = mode;
    localStorage.setItem('performanceMode', mode.toString());
    
    const body = document.body;
    const performanceToggle = document.querySelector('.performance-toggle');
    
    if (mode) {
        // 启用性能模式
        body.classList.add('performance-mode');
        if (performanceToggle) {
            performanceToggle.classList.add('active');
            performanceToggle.title = '性能模式已启用 - 点击关闭';
        }
        
        // 禁用动画和特效
        const style = document.createElement('style');
        style.id = 'performance-mode-style';
        style.textContent = `
            .performance-mode * {
                animation-duration: 0.01ms !important;
                animation-delay: 0.01ms !important;
                transition-duration: 0.01ms !important;
                transition-delay: 0.01ms !important;
            }
            .performance-mode .backdrop-blur-xl {
                backdrop-filter: none !important;
            }
            .performance-mode .bg-gradient-to-br {
                background: #3b82f6 !important;
            }
        `;
        document.head.appendChild(style);
    } else {
        // 禁用性能模式
        body.classList.remove('performance-mode');
        if (performanceToggle) {
            performanceToggle.classList.remove('active');
            performanceToggle.title = '性能模式已关闭 - 点击启用';
        }
        
        // 移除性能模式样式
        const existingStyle = document.getElementById('performance-mode-style');
        if (existingStyle) {
            existingStyle.remove();
        }
    }
}

// 导出函数（如果支持模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeTheme,
        toggleTheme,
        setTheme,
        toggleLanguage,
        setLanguage,
        initializePerformanceMode,
        togglePerformanceMode,
        setPerformanceMode
    };
}