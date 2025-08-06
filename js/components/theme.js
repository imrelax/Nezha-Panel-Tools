// 主题和语言管理模块

// 国际化文本配置
const i18n = {
    zh: {
        // 基础文本
        title: '哪吒面板工具',
        home: '首页',
        traffic: '流量监控',
        alert: '告警规则',
        about: '关于',
        english: '英文',
        close: '关闭',
        copy: '复制',
        refresh: '刷新',
        
        // 页面导航
        indexPage: '账单配置',
        trafficPage: '流量监控',
        alertPage: '警报配置',
        aboutPage: '关于',
        servicePage: '服务',
        
        // 配置标题
        billingConfig: '账单配置',
        planConfig: '套餐配置',
        jsonConfig: 'JSON 配置',
        trafficMonitoring: '流量监控规则',
        alertRules: '警报规则',
        
        // 表单字段
        type: '类型',
        ignoreList: '忽略服务器 (用逗号分隔ID)',
        autoCalc: '自动计算',
        billingCycle: '计费周期',
        minValue: '最小值',
        maxValue: '最大值',
        duration: '持续时间 (秒)',
        cover: '覆盖',
        ignoreServers: '忽略服务器 (用逗号分隔ID)',
        trafficVolume: '流量配额',
        trafficType: '流量类型',
        inboundTraffic: '入站流量',
        outboundTraffic: '出站流量',
        bidirectionalTraffic: '双向流量',
        cycleStart: '周期开始',
        cycleInterval: '周期数量',
        cycleUnit: '周期单位',
        warning: '警告',
        cancel: '取消',
        confirm: '确认',
        aboutUs: '关于我们',
        toolTitle: '哪吒面板工具',
        toolDescription: '这是一个专为哪吒监控面板设计的JSON配置文件生成工具，帮助用户快速生成各种配置文件。',
        mainFeatures: '主要功能：',
        feature1: '账单配置生成',
        feature2: '套餐配置生成',
        feature3: '流量监控规则配置',
        feature4: '警报规则配置',
        feature5: '支持中英文切换',
        feature6: '深色模式支持',
        
        // 页脚
        footerText: '© 2025 Nezha Panel Tools. 保留所有权利.',
        madeWith: '用',
        and: '和',
        madeBy: '制作',
        projectInfo: '项目信息',
        projectDescription: '哪吒面板JSON配置生成工具',
        version: '版本: 2.0.0',
        lastUpdate: '最后更新: 2025年8月5日',
        relatedLinks: '相关链接',
        sourceCode: '源代码',
        nezhaOfficial: '哪吒官网',
        authorSite: '作者网站',
        siteRelated: '本站相关',
        siteSource: '本站源码',
        siteAuthor: '本站作者',
        siteAbout: '本站说明',
        license: '许可证',
        licenseType: 'MIT License',
        openSource: '开源免费使用',
        contribution: '欢迎贡献代码',
        allRightsReserved: '保留所有权利',
        
        // 表单标签
        billingInfo: '账单信息',
        planInfo: '套餐信息',
        startDate: '开始日期',
        endDate: '结束日期',
        autoRenewal: '自动续费',
        cycle: '周期',
        amount: '金额',
        bandwidth: '带宽',
        traffic: '流量',
        networkRoute: '网络路由',
        extraTags: '额外标签',
        
        // 周期选项
        cycles: {
            'Day': '天',
            'Week': '周',
            'Month': '月',
            'Quarter': '季度',
            'HalfYear': '半年',
            'Year': '年',
            '2Year': '2年',
            '3Year': '3年',
            '4Year': '4年',
            '5Year': '5年',
            'Permanent': '永久'
        },
        
        cyclesEn: {
            'Day': 'Day',
            'Week': 'Week',
            'Month': 'Month',
            'Quarter': 'Quarter',
            'HalfYear': 'Half Year',
            'Year': 'Year',
            '2Year': '2 Years',
            '3Year': '3 Years',
            '4Year': '4 Years',
            '5Year': '5 Years',
            'Permanent': 'Permanent'
        },
        
        // 流量周期选项
        trafficPeriods: {
            'Day': '天',
            'Month': '月',
            'Quarter': '季度',
            'Year': '年',
            'Unlimited': '不限'
        },
        
        trafficPeriodsEn: {
            'Day': 'Day',
            'Month': 'Month',
            'Quarter': 'Quarter',
            'Year': 'Year',
            'Unlimited': 'Unlimited'
        },
        
        // 其他文本
        unlimited: '不限',
        refreshSuccess: '刷新成功！',
        copySuccess: '复制成功',
        devTeam: '开发团队：',
        
        // 服务页面
        serviceTitle: 'IP地址服务',
        serviceDescription: '以下IP数据来自互联网，不保证可用性。<br><br>如需反馈问题或获取更多IP资源，请访问：<br><a href="https://github.com/imrelax/Nezha-Panel-Tools" target="_blank" class="text-blue-500 hover:text-blue-600 underline">https://github.com/imrelax/Nezha-Panel-Tools</a>',
        region: '地区',
        unicom: '联通',
        mobile: '移动',
        telecom: '电信',
        loading: '加载中...',
        loadError: '加载失败，请稍后重试'
    },
    
    en: {
        // 基础文本
        title: 'Nezha Panel JSON Tools',
        home: 'Home',
        traffic: 'Traffic Monitor',
        alert: 'Alert Rules',
        about: 'About',
        english: 'English',
        close: 'Close',
        copy: 'Copy',
        refresh: 'Refresh',
        
        // 页面导航
        indexPage: 'Billing Config',
        trafficPage: 'Traffic Monitor',
        alertPage: 'Alert Config',
        aboutPage: 'About',
        servicePage: 'Service',
        
        // 配置标题
        billingConfig: 'Billing Configuration',
        planConfig: 'Plan Configuration',
        jsonConfig: 'JSON Configuration',
        trafficMonitoring: 'Traffic Monitoring Rules',
        alertRules: 'Alert Rules',
        
        // 表单字段
        type: 'Type',
        ignoreList: 'Ignore Servers (comma-separated IDs)',
        autoCalc: 'Auto Calculate',
        billingCycle: 'Billing Cycle',
        minValue: 'Min Value',
        maxValue: 'Max Value',
        duration: 'Duration (seconds)',
        cover: 'Cover',
        ignoreServers: 'Ignore Servers (comma-separated IDs)',
        trafficVolume: 'Traffic Volume',
        trafficType: 'Traffic Type',
        inboundTraffic: 'Inbound Traffic',
        outboundTraffic: 'Outbound Traffic',
        bidirectionalTraffic: 'Bidirectional Traffic',
        cycleStart: 'Cycle Start',
        cycleInterval: 'Cycle Interval',
        cycleUnit: 'Cycle Unit',
        warning: 'Warning',
        cancel: 'Cancel',
        confirm: 'Confirm',
        aboutUs: 'About Us',
        toolTitle: 'Nezha Panel JSON Quick Generation Tool',
        toolDescription: 'This is a JSON configuration file generation tool designed specifically for Nezha monitoring panel, helping users quickly generate various configuration files.',
        mainFeatures: 'Main Features:',
        feature1: 'Billing configuration generation',
        feature2: 'Plan configuration generation',
        feature3: 'Traffic monitoring rule configuration',
        feature4: 'Alert rule configuration',
        feature5: 'Support for Chinese and English switching',
        feature6: 'Dark mode support',
        
        // 页脚
        footerText: '© 2025 Nezha Panel Tools. All rights reserved.',
        madeWith: 'Made with',
        and: 'and',
        madeBy: 'by',
        projectInfo: 'Project Info',
        projectDescription: 'Nezha Panel JSON Configuration Generator',
        version: 'Version: 2.0.0',
        lastUpdate: 'Last Update: August 5, 2025',
        relatedLinks: 'Related Links',
        sourceCode: 'Source Code',
        nezhaOfficial: 'Nezha Official',
        authorSite: 'Author Site',
        siteRelated: 'Site Related',
        siteSource: 'Site Source',
        siteAuthor: 'Site Author',
        siteAbout: 'About Site',
        license: 'License',
        licenseType: 'MIT License',
        openSource: 'Open Source & Free',
        contribution: 'Contributions Welcome',
        allRightsReserved: 'All rights reserved',
        
        // 表单标签
        billingInfo: 'Billing Information',
        planInfo: 'Plan Information',
        startDate: 'Start Date',
        endDate: 'End Date',
        autoRenewal: 'Auto Renewal',
        cycle: 'Cycle',
        amount: 'Amount',
        bandwidth: 'Bandwidth',
        traffic: 'Traffic',
        networkRoute: 'Network Route',
        extraTags: 'Extra Tags',
        
        // 周期选项
        cycles: {
            'Day': 'Day',
            'Week': 'Week',
            'Month': 'Month',
            'Quarter': 'Quarter',
            'HalfYear': 'Half Year',
            'Year': 'Year',
            '2Year': '2 Years',
            '3Year': '3 Years',
            '4Year': '4 Years',
            '5Year': '5 Years',
            'Permanent': 'Permanent'
        },
        
        cyclesEn: {
            'Day': 'Day',
            'Week': 'Week',
            'Month': 'Month',
            'Quarter': 'Quarter',
            'HalfYear': 'Half Year',
            'Year': 'Year',
            '2Year': '2 Years',
            '3Year': '3 Years',
            '4Year': '4 Years',
            '5Year': '5 Years',
            'Permanent': 'Permanent'
        },
        
        // 流量周期选项
        trafficPeriods: {
            'Day': 'Day',
            'Month': 'Month',
            'Quarter': 'Quarter',
            'Year': 'Year',
            'Unlimited': 'Unlimited'
        },
        
        trafficPeriodsEn: {
            'Day': 'Day',
            'Month': 'Month',
            'Quarter': 'Quarter',
            'Year': 'Year',
            'Unlimited': 'Unlimited'
        },
        
        // 其他文本
        unlimited: 'Unlimited',
        refreshSuccess: 'Refresh successful',
        copySuccess: 'Copy successful',
        devTeam: 'Development Team:',
        
        // 服务页面
        serviceTitle: 'IP Address Service',
        serviceDescription: 'The following IP data comes from the internet and availability is not guaranteed.<br><br>For feedback or more IP resources, please visit:<br><a href="https://github.com/imrelax/Nezha-Panel-Tools" target="_blank" class="text-blue-500 hover:text-blue-600 underline">https://github.com/imrelax/Nezha-Panel-Tools</a>',
        region: 'Region',
        unicom: 'China Unicom',
        mobile: 'China Mobile',
        telecom: 'China Telecom',
        loading: 'Loading...',
        loadError: 'Loading failed, please try again later'
    }
};

// 国际化辅助函数
function __(key, lang = null) {
    const currentLang = lang || (typeof state !== 'undefined' ? state.language : 'zh');
    return i18n[currentLang] && i18n[currentLang][key] ? i18n[currentLang][key] : key;
}

// Tailwind CSS 配置
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
            backdropBlur: {
                xs: '2px'
            }
        }
    }
};

// 应用 Tailwind 配置
if (typeof tailwind !== 'undefined') {
    tailwind.config = window.tailwindConfig;
}

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

// 语言切换
function toggleLanguage() {
    // 从 localStorage 获取当前语言
    const currentLanguage = localStorage.getItem('language') || 'zh';
    const newLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
    setLanguage(newLanguage);
}

function setLanguage(language) {
    // 更新全局状态（如果存在）
    if (typeof state !== 'undefined') {
        state.language = language;
    }
    
    // 显示相反的语言名称作为切换提示
    const langIndicator = document.getElementById('lang-indicator');
    if (langIndicator) {
        langIndicator.textContent = language === 'zh' ? 'English' : '中文';
    }
    
    // 更新语言切换按钮显示
    const zhSpans = document.querySelectorAll('.language-zh');
    const enSpans = document.querySelectorAll('.language-en');
    
    if (language === 'zh') {
        zhSpans.forEach(span => span.classList.remove('hidden'));
        enSpans.forEach(span => span.classList.add('hidden'));
    } else {
        zhSpans.forEach(span => span.classList.add('hidden'));
        enSpans.forEach(span => span.classList.remove('hidden'));
    }
    
    // 更新所有文本
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (i18n[language] && i18n[language][key]) {
            const content = i18n[language][key];
            // 安全处理HTML内容
            if (content.includes('<') && content.includes('>')) {
                // 对于包含HTML的内容，进行安全处理
                element.innerHTML = sanitizeHtml(content);
            } else {
                // 纯文本内容使用textContent
                element.textContent = content;
            }
        }
    });
    
    // 更新周期选项
    if (typeof updateCycleOptions === 'function') updateCycleOptions();
    if (typeof updateTrafficPeriodOptions === 'function') updateTrafficPeriodOptions();
    if (typeof updateCurrencyFormatOptions === 'function') updateCurrencyFormatOptions();
    
    localStorage.setItem('language', language);
    if (typeof updateJsonCode === 'function') updateJsonCode();
}



// HTML内容净化函数
function sanitizeHtml(html) {
    // 允许的标签和属性白名单
    const allowedTags = ['a', 'br', 'span', 'strong', 'em', 'p'];
    const allowedAttributes = {
        'a': ['href', 'target', 'class'],
        'span': ['class'],
        'strong': ['class'],
        'em': ['class'],
        'p': ['class']
    };
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // 递归清理元素
    function cleanElement(element) {
        const tagName = element.tagName.toLowerCase();
        
        // 检查标签是否在白名单中
        if (!allowedTags.includes(tagName)) {
            // 不允许的标签，保留文本内容
            const textNode = document.createTextNode(element.textContent);
            element.parentNode.replaceChild(textNode, element);
            return;
        }
        
        // 清理属性
        const allowedAttrs = allowedAttributes[tagName] || [];
        const attrs = Array.from(element.attributes);
        attrs.forEach(attr => {
            if (!allowedAttrs.includes(attr.name)) {
                element.removeAttribute(attr.name);
            }
        });
        
        // 递归处理子元素
        Array.from(element.children).forEach(child => {
            cleanElement(child);
        });
    }
    
    Array.from(tempDiv.children).forEach(child => {
        cleanElement(child);
    });
    
    return tempDiv.innerHTML;
}

// 导出函数（如果支持模块化）
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