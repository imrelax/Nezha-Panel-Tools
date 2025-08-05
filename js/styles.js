// 统一样式配置文件
// 定义常用的CSS类名，确保整个项目的样式一致性

const STYLES = {
    // 输入框样式
    input: {
        base: "w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 transition-all duration-300",
        withPlaceholder: "w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 transition-all duration-300",
        flex: "flex-1 px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 transition-all duration-300",
        withBackdrop: "bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
    },
    
    // 选择框样式
    select: {
        base: "w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 transition-all duration-300",
        compact: "px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 transition-all duration-300",
        withBackdrop: "bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-3 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 backdrop-blur-sm"
    },
    
    // 文本域样式
    textarea: {
        base: "w-full p-6 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono text-sm border-0 focus:ring-0 resize-none leading-relaxed",
        withBorder: "w-full px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 transition-all duration-300"
    },
    
    // 标签样式
    label: {
        base: "block text-sm font-medium text-slate-700 dark:text-slate-300",
        semibold: "block text-sm font-semibold text-slate-700 dark:text-slate-300",
        withMargin: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3"
    },
    
    // 按钮样式
    button: {
        primary: "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-300",
        secondary: "bg-slate-600 hover:bg-slate-700 text-white px-3 py-2 rounded-lg text-sm transition-all duration-300",
        success: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
    },
    
    // 卡片样式
    card: {
        base: "bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 overflow-hidden hover:shadow-xl transition-all duration-300",
        header: "p-6 border-b border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors duration-300",
        content: "p-6 space-y-6"
    },
    
    // 切换开关样式
    toggle: {
        container: "relative inline-flex items-center cursor-pointer",
        input: "sr-only peer",
        switch: "w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/50 dark:peer-focus:ring-blue-800/50 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
    }
};

// 工具函数：获取样式类名
function getStyleClass(category, type = 'base') {
    return STYLES[category] && STYLES[category][type] ? STYLES[category][type] : '';
}

// 工具函数：应用样式到元素
function applyStyle(element, category, type = 'base') {
    if (element && STYLES[category] && STYLES[category][type]) {
        element.className = STYLES[category][type];
    }
}

// 工具函数：批量应用样式
function applyStylesToElements(selector, category, type = 'base') {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        applyStyle(element, category, type);
    });
}

// 导出样式配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { STYLES, getStyleClass, applyStyle, applyStylesToElements };
} else {
    window.STYLES = STYLES;
    window.getStyleClass = getStyleClass;
    window.applyStyle = applyStyle;
    window.applyStylesToElements = applyStylesToElements;
}