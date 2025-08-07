// 统一翻译管理系统
// 优化后的i18n管理器，解决翻译错误和重复代码问题

class UnifiedI18nManager {
    constructor() {
        this.currentLanguage = 'zh';
        this.translations = {};
        this.observers = new Set();
        this.domObserver = null;
        this.dynamicContent = new Map();
        this.isInitialized = false;
        this.fallbackLanguage = 'zh';
        
        // 绑定方法到实例
        this.__ = this.__.bind(this);
        this.translate = this.translate.bind(this);
    }

    // 初始化翻译管理器
    async init() {
        if (this.isInitialized) {
            return;
        }

        try {
            // 检测用户语言偏好
            this.currentLanguage = this.detectLanguage();
            
            // 加载翻译文件
            await this.loadTranslations();
            
            // 更新HTML lang属性
            this.updateHtmlLangAttribute(this.currentLanguage);
            
            // 应用翻译
            this.applyTranslations();
            
            // 设置DOM观察器
            this.setupDOMObserver();
            
            // 更新页面元数据
            this.updatePageMeta();
            
            this.isInitialized = true;
            
            // 通知观察者
            this.notifyObservers('init', this.currentLanguage);
            
        } catch (error) {
            console.error('Failed to initialize i18n manager:', error);
            // 使用回退语言
            this.currentLanguage = this.fallbackLanguage;
            this.isInitialized = true;
        }
    }

    // 检测用户语言偏好
    detectLanguage() {
        // 1. 检查localStorage
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && this.isValidLanguage(savedLanguage)) {
            return savedLanguage;
        }
        
        // 2. 检查URL参数
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && this.isValidLanguage(urlLang)) {
            return urlLang;
        }
        
        // 3. 检查浏览器语言
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang) {
            const lang = browserLang.toLowerCase();
            if (lang.startsWith('zh')) return 'zh';
            if (lang.startsWith('en')) return 'en';
        }
        
        // 4. 默认语言
        return this.fallbackLanguage;
    }

    // 验证语言代码
    isValidLanguage(lang) {
        return ['zh', 'en'].includes(lang);
    }

    // 加载翻译文件
    async loadTranslations() {
        const languages = ['zh', 'en'];
        const loadPromises = languages.map(async (lang) => {
            try {
                const fileName = lang === 'zh' ? 'cn.js' : 'en.js';
                const response = await fetch(`js/i18n/${fileName}`);
                if (!response.ok) {
                    throw new Error(`Failed to load ${fileName}`);
                }
                const content = await response.text();
                
                // 解析翻译内容
                const translations = this.parseTranslationFile(content, lang);
                this.translations[lang] = translations;
                
            } catch (error) {
                console.error(`Failed to load translations for ${lang}:`, error);
                // 使用空对象作为回退
                this.translations[lang] = {};
            }
        });
        
        await Promise.all(loadPromises);
    }

    // 解析翻译文件内容
    parseTranslationFile(content, lang) {
        try {
            // 创建安全的执行环境
            const sandbox = {
                window: {},
                module: { exports: {} },
                exports: {}
            };
            
            // 执行翻译文件代码
            const func = new Function('window', 'module', 'exports', content);
            func(sandbox.window, sandbox.module, sandbox.exports);
            
            // 获取翻译数据
            const varName = lang === 'zh' ? 'cnTranslations' : 'enTranslations';
            return sandbox.window[varName] || sandbox.module.exports || {};
            
        } catch (error) {
            console.error(`Failed to parse translation file for ${lang}:`, error);
            return {};
        }
    }

    // 获取翻译文本
    __(key, module = 'common', lang = null) {
        return this.translate(key, module, lang);
    }

    // 翻译函数
    translate(key, module = 'common', lang = null) {
        const targetLang = lang || this.currentLanguage;
        
        try {
            const translations = this.translations[targetLang];
            if (!translations) {
                return this.getFallbackTranslation(key, module);
            }
            
            // 获取模块翻译
            const moduleTranslations = translations[module];
            if (!moduleTranslations) {
                return this.getFallbackTranslation(key, module);
            }
            
            // 获取具体翻译
            const translation = moduleTranslations[key];
            if (translation !== undefined) {
                return translation;
            }
            
            return this.getFallbackTranslation(key, module);
            
        } catch (error) {
            console.error(`Translation error for key "${key}" in module "${module}":`, error);
            return this.getFallbackTranslation(key, module);
        }
    }

    // 获取回退翻译
    getFallbackTranslation(key, module) {
        // 尝试使用回退语言
        if (this.currentLanguage !== this.fallbackLanguage) {
            const fallbackTranslations = this.translations[this.fallbackLanguage];
            if (fallbackTranslations && fallbackTranslations[module] && fallbackTranslations[module][key]) {
                return fallbackTranslations[module][key];
            }
        }
        
        // 返回键名作为最后的回退
        return key;
    }

    // 设置语言
    async setLanguage(lang) {
        if (!this.isValidLanguage(lang) || lang === this.currentLanguage) {
            return;
        }
        
        this.currentLanguage = lang;
        
        // 保存到localStorage
        try {
            localStorage.setItem('language', lang);
        } catch (error) {
            console.warn('Failed to save language preference:', error);
        }
        
        // 如果翻译数据未加载，先加载
        if (!this.translations[lang]) {
            await this.loadTranslations();
        }
        
        // 更新HTML lang属性
        this.updateHtmlLangAttribute(lang);
        
        // 应用翻译
        this.applyTranslations();
        
        // 更新页面元数据
        this.updatePageMeta();
        
        // 通知观察者
        this.notifyObservers('languageChange', lang);
    }

    // 更新HTML lang属性
    updateHtmlLangAttribute(lang) {
        const langCode = lang === 'zh' ? 'zh-CN' : 'en-US';
        if (document.documentElement) {
            document.documentElement.lang = langCode;
        }
    }

    // 应用翻译到DOM
    applyTranslations() {
        // 更新带有data-key属性的元素
        this.updateDataKeyElements();
        
        // 更新选择框选项
        this.updateSelectOptions();
        
        // 更新语言指示器
        this.updateLanguageIndicator();
        
        // 更新动态内容
        this.updateDynamicContent();
    }

    // 更新带有data-key属性的元素
    updateDataKeyElements() {
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(element => {
            const key = element.getAttribute('data-key');
            const module = element.getAttribute('data-module') || 'common';
            
            if (key) {
                const translation = this.translate(key, module);
                
                // 根据元素类型更新内容
                if (element.tagName === 'INPUT' && (element.type === 'button' || element.type === 'submit')) {
                    element.value = translation;
                } else if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translation;
                } else if (element.tagName === 'OPTION') {
                    element.textContent = translation;
                } else {
                    // 处理HTML内容
                    if (translation.includes('<')) {
                        element.innerHTML = this.sanitizeHtml(translation);
                    } else {
                        element.textContent = translation;
                    }
                }
            }
        });
    }

    // 更新选择框选项
    updateSelectOptions() {
        // 处理使用 data-i18n-options 的选择框
        const selects = document.querySelectorAll('select[data-i18n-options]');
        selects.forEach(select => {
            const module = select.getAttribute('data-i18n-module') || 'common';
            const optionsKey = select.getAttribute('data-i18n-options');
            
            if (optionsKey) {
                const options = this.translate(optionsKey, module);
                if (typeof options === 'object') {
                    Array.from(select.options).forEach(option => {
                        const value = option.value;
                        if (options[value]) {
                            option.textContent = options[value];
                        }
                    });
                }
            }
        });
        
        // 处理使用 data-zh 和 data-en 属性的选择框选项
        this.updateDataAttributeElements();
    }
    
    // 更新使用 data-zh 和 data-en 属性的元素
    updateDataAttributeElements() {
        const langAttr = this.currentLanguage === 'zh' ? 'data-zh' : 'data-en';
        const elements = document.querySelectorAll(`[${langAttr}]`);
        
        elements.forEach(element => {
            const translation = element.getAttribute(langAttr);
            if (translation) {
                if (element.tagName === 'OPTION') {
                    element.textContent = translation;
                } else {
                    // 处理其他元素类型
                    if (translation.includes('<')) {
                        element.innerHTML = this.sanitizeHtml(translation);
                    } else {
                        element.textContent = translation;
                    }
                }
            }
        });
    }

    // 更新语言指示器
    updateLanguageIndicator() {
        const indicators = document.querySelectorAll('[data-language-indicator]');
        indicators.forEach(indicator => {
            indicator.textContent = this.currentLanguage === 'zh' ? '中文' : 'English';
        });
        
        // 更新语言切换按钮状态
        const langButtons = document.querySelectorAll('[data-lang]');
        langButtons.forEach(button => {
            const lang = button.getAttribute('data-lang');
            if (lang === this.currentLanguage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // 更新页面元数据
    updatePageMeta() {
        const currentPage = this.getCurrentPageType();
        
        // 更新页面标题
        const titleKey = 'pageTitle';
        const title = this.translate(titleKey, currentPage);
        if (title && title !== titleKey) {
            document.title = title;
        }
        
        // 更新meta描述
        const descKey = 'pageDescription';
        const description = this.translate(descKey, currentPage);
        if (description && description !== descKey) {
            let metaDesc = document.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.name = 'description';
                document.head.appendChild(metaDesc);
            }
            metaDesc.content = description;
        }
        
        // 更新meta关键词
        const keywordsKey = 'pageKeywords';
        const keywords = this.translate(keywordsKey, currentPage);
        if (keywords && keywords !== keywordsKey) {
            let metaKeywords = document.querySelector('meta[name="keywords"]');
            if (!metaKeywords) {
                metaKeywords = document.createElement('meta');
                metaKeywords.name = 'keywords';
                document.head.appendChild(metaKeywords);
            }
            metaKeywords.content = keywords;
        }
    }

    // 获取当前页面类型
    getCurrentPageType() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        
        const pageMap = {
            'index.html': 'index',
            'traffic.html': 'traffic',
            'alert.html': 'alert',
            'service.html': 'service',
            'beautify.html': 'beautify'
        };
        
        return pageMap[filename] || 'common';
    }

    // 注册动态内容更新回调
    registerDynamicContent(id, updateCallback) {
        if (typeof updateCallback === 'function') {
            this.dynamicContent.set(id, updateCallback);
        }
    }

    // 注销动态内容更新回调
    unregisterDynamicContent(id) {
        this.dynamicContent.delete(id);
    }

    // 更新动态内容
    updateDynamicContent() {
        this.dynamicContent.forEach((callback, id) => {
            try {
                callback(this.currentLanguage);
            } catch (error) {
                console.error(`Error updating dynamic content ${id}:`, error);
            }
        });
    }

    // 设置DOM观察器
    setupDOMObserver() {
        if (this.domObserver) {
            this.domObserver.disconnect();
        }
        
        this.domObserver = new MutationObserver((mutations) => {
            let shouldUpdate = false;
            
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            if (node.hasAttribute('data-key') || node.querySelector('[data-key]')) {
                                shouldUpdate = true;
                            }
                        }
                    });
                }
            });
            
            if (shouldUpdate) {
                // 延迟更新以避免频繁操作
                setTimeout(() => this.updateDataKeyElements(), 100);
            }
        });
        
        this.domObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // 添加语言变化观察者
    addObserver(callback) {
        if (typeof callback === 'function') {
            this.observers.add(callback);
        }
    }

    // 移除语言变化观察者
    removeObserver(callback) {
        this.observers.delete(callback);
    }

    // 通知观察者
    notifyObservers(event, data) {
        this.observers.forEach(callback => {
            try {
                callback(event, data);
            } catch (error) {
                console.error('Error in i18n observer:', error);
            }
        });
    }

    // HTML内容净化
    sanitizeHtml(html) {
        // 简单的HTML净化，只允许安全的标签
        const allowedTags = ['a', 'br', 'span', 'strong', 'em', 'b', 'i'];
        const div = document.createElement('div');
        div.innerHTML = html;
        
        const walker = document.createTreeWalker(
            div,
            NodeFilter.SHOW_ELEMENT,
            {
                acceptNode: function(node) {
                    return allowedTags.includes(node.tagName.toLowerCase()) 
                        ? NodeFilter.FILTER_ACCEPT 
                        : NodeFilter.FILTER_REJECT;
                }
            }
        );
        
        const nodesToRemove = [];
        let node;
        while (node = walker.nextNode()) {
            if (!allowedTags.includes(node.tagName.toLowerCase())) {
                nodesToRemove.push(node);
            }
        }
        
        nodesToRemove.forEach(node => {
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        });
        
        return div.innerHTML;
    }

    // 获取当前语言
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // 获取可用语言列表
    getAvailableLanguages() {
        return ['zh', 'en'];
    }

    // 销毁管理器
    destroy() {
        if (this.domObserver) {
            this.domObserver.disconnect();
            this.domObserver = null;
        }
        
        this.observers.clear();
        this.dynamicContent.clear();
        this.translations = {};
        this.isInitialized = false;
    }
}

// 创建全局实例
const unifiedI18nManager = new UnifiedI18nManager();

// 全局翻译函数
function __(key, module = 'common', lang = null) {
    return unifiedI18nManager.translate(key, module, lang);
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        UnifiedI18nManager,
        unifiedI18nManager,
        __
    };
} else if (typeof window !== 'undefined') {
    window.UnifiedI18nManager = UnifiedI18nManager;
    window.unifiedI18nManager = unifiedI18nManager;
    window.__ = __;
    
    // 兼容性：保持原有的i18nManager引用
    window.i18nManager = unifiedI18nManager;
    window.I18nManager = UnifiedI18nManager;
}