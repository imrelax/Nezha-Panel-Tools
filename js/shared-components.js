// 共享HTML组件

// 科技风背景组件
function createTechBackground() {
    return `
    <!-- 科技风背景 -->
    <div class="fixed inset-0 -z-10">
        <div class="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-slate-400 opacity-10 blur-[100px] dark:bg-slate-600"></div>
    </div>`;
}

// 导航栏组件
function createNavigation(currentPage = 'index') {
    const pages = {
        index: { name: '账单配置', icon: 'fas fa-file-invoice-dollar', href: 'index.html' },
        traffic: { name: '流量监控', icon: 'fas fa-chart-line', href: 'traffic.html' },
        alert: { name: '警报配置', icon: 'fas fa-bell', href: 'alert.html' },
        about: { name: '关于', icon: 'fas fa-info-circle', href: 'about.html' }
    };

    const navItems = Object.entries(pages).map(([key, page]) => {
        const isActive = key === currentPage;
        const activeClass = isActive ? 'bg-blue-500 text-white' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800';
        
        return `
            <a href="${page.href}" class="px-4 py-2 rounded-lg ${activeClass} font-medium text-sm transition-all duration-300 flex items-center">
                <i class="${page.icon} mr-2"></i>
                <span data-key="${key}Page">${page.name}</span>
            </a>`;
    }).join('');

    return `
    <!-- 顶部导航栏 -->
    <nav class="sticky top-0 z-50 border-b border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Logo和标题 -->
                <div class="flex items-center space-x-4">
                    <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <i class="fas fa-tools text-white text-sm"></i>
                    </div>
                    <h1 class="text-xl font-bold text-slate-900 dark:text-slate-100" data-key="title">哪吒面板JSON工具</h1>
                </div>
                
                <!-- 页面导航 -->
                <div class="hidden md:flex items-center space-x-2">
                    ${navItems}
                </div>
                
                <!-- 右侧控制 -->
                <div class="flex items-center space-x-4">
                    <!-- 主题切换 -->
                    <button id="themeToggle" class="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
                        <i class="fas fa-moon"></i>
                    </button>
                    
                    <!-- 语言切换 -->
                    <div class="relative">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" id="languageToggle" class="sr-only peer">
                            <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300/50 dark:peer-focus:ring-blue-800/50 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-600"></div>
                            <span class="ml-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                                <span class="language-zh">中文</span>
                                <span class="language-en hidden">EN</span>
                            </span>
                        </label>
                    </div>
                    

                </div>
            </div>
        </div>
    </nav>`;
}

// 页脚组件
function createFooter() {
    return `
    <!-- 页脚 -->
    <footer class="mt-12 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- 项目信息 -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100" data-key="projectInfo">项目信息</h3>
                    <div class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <p data-key="projectDescription">哪吒面板JSON配置生成工具</p>
                        <p data-key="version">版本: 2.0.0</p>
                        <p data-key="lastUpdate">最后更新: 2025年8月5日</p>
                    </div>
                </div>
                
                <!-- 相关链接 -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100" data-key="relatedLinks">相关链接</h3>
                    <div class="space-y-2 text-sm">
                        <a href="https://github.com/LAGSNESOwO/NezhaJSONTools" target="_blank" class="block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors" data-key="sourceCode">源代码</a>
                        <a href="https://nezha.wiki" target="_blank" class="block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors" data-key="nezhaOfficial">哪吒官网</a>
                        <a href="https://lagsn.es" target="_blank" class="block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors" data-key="authorSite">作者网站</a>
                    </div>
                </div>
                
                <!-- 本站相关 -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100" data-key="siteRelated">本站相关</h3>
                    <div class="space-y-2 text-sm">
                        <a href="https://github.com/imrelax/NezhaJSONTools" target="_blank" class="block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors" data-key="siteSource">本站源码</a>
                        <a href="https://xxxx.im" target="_blank" class="block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors" data-key="siteAuthor">本站作者</a>
                        <a href="about.html" class="block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors" data-key="siteAbout">本站说明</a>
                    </div>
                </div>
                
                <!-- 许可证信息 -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100" data-key="license">许可证</h3>
                    <div class="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                        <p data-key="licenseType">MIT License</p>
                        <p data-key="openSource">开源免费使用</p>
                        <p data-key="contribution">欢迎贡献代码</p>
                    </div>
                </div>
            </div>
            
            <!-- 底部版权 -->
            <div class="mt-8 pt-8 border-t border-slate-200/50 dark:border-slate-700/50 text-center text-sm text-slate-600 dark:text-slate-400">
                <p>&copy; 2024 NezhaJsonTools. <span data-key="allRightsReserved">保留所有权利</span>.</p>
            </div>
        </div>
    </footer>`;
}

// 警告模态框组件
function createWarningModal() {
    return `
    <!-- 警告模态框 -->
    <div id="warningModal" class="hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 max-w-md w-full p-6">
            <div class="flex items-center mb-4">
                <i class="fas fa-exclamation-triangle text-yellow-500 text-2xl mr-3"></i>
                <h3 class="text-lg font-semibold text-slate-800 dark:text-slate-100" data-key="warning">警告</h3>
            </div>
            <p id="warningMessage" class="text-slate-600 dark:text-slate-300 mb-6"></p>
            <div class="flex justify-end space-x-3">
                <button onclick="closeWarningModal()" class="px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors" data-key="cancel">
                    取消
                </button>
                <button id="confirmWarning" class="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-300" data-key="confirm">
                    确认
                </button>
            </div>
        </div>
    </div>`;
}

// 复制成功提示组件
function createCopyToast() {
    return `
    <!-- 复制成功提示 -->
    <div id="copyToast" class="hidden fixed top-4 right-4 bg-green-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-green-400/50 z-50 transform translate-x-full transition-transform duration-300">
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span data-key="copySuccess">复制成功！</span>
        </div>
    </div>`;
}

// 关于模态框组件
function createAboutModal() {
    return `
    <!-- 关于我们模态框 -->
    <div id="aboutModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
        <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
            <div class="p-6 border-b border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between">
                <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center">
                    <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                        <i class="fas fa-info-circle text-white text-sm"></i>
                    </div>
                    <span data-key="aboutUs">关于我们</span>
                </h3>
                <button class="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors duration-300 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700" onclick="closeAbout()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="p-6 space-y-4">
                <div class="space-y-3">
                    <h4 class="text-lg font-semibold text-slate-900 dark:text-slate-100" data-key="toolTitle">哪吒面板JSON快捷生成工具</h4>
                    <p class="text-slate-700 dark:text-slate-300" data-key="toolDescription">这是一个专为哪吒监控面板设计的JSON配置文件生成工具，帮助用户快速生成各种配置文件。</p>
                </div>
                <div class="space-y-3">
                    <h5 class="font-semibold text-slate-900 dark:text-slate-100" data-key="mainFeatures">主要功能：</h5>
                    <ul class="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                        <li data-key="feature1">账单配置生成</li>
                        <li data-key="feature2">套餐配置生成</li>
                        <li data-key="feature3">流量监控规则配置</li>
                        <li data-key="feature4">警报规则配置</li>
                        <li data-key="feature5">支持中英文切换</li>
                        <li data-key="feature6">深色模式支持</li>
                    </ul>
                </div>
                <div class="space-y-3">
                    <h5 class="font-semibold text-slate-900 dark:text-slate-100" data-key="devTeam">开发团队：</h5>
                    <p class="text-slate-700 dark:text-slate-300">由 <a href="https://lagsn.es" target="_blank" class="text-blue-600 hover:text-blue-700 transition-colors">LAGSNES</a> 开发维护</p>
                    <p class="text-slate-600 dark:text-slate-400 text-sm">本项目基于 <a href="https://github.com/LAGSNESOwO/NezhaJSONTools" target="_blank" class="text-blue-600 hover:text-blue-700 transition-colors">LAGSNESOwO/NezhaJSONTools</a> 修改优化</p>
                </div>
            </div>
            <div class="p-6 border-t border-slate-200/50 dark:border-slate-700/50 flex justify-end">
                <button onclick="closeAbout()" class="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-300" data-key="close">关闭</button>
            </div>
        </div>
    </div>`;
}

// 初始化共享组件
function initializeSharedComponents(currentPage = 'index', includeAbout = false) {
    // 插入背景
    document.body.insertAdjacentHTML('afterbegin', createTechBackground());
    
    // 插入导航栏
    document.body.insertAdjacentHTML('afterbegin', createNavigation(currentPage));
    
    // 插入页脚
    document.body.insertAdjacentHTML('beforeend', createFooter());
    
    // 插入模态框
    document.body.insertAdjacentHTML('beforeend', createWarningModal());
    document.body.insertAdjacentHTML('beforeend', createCopyToast());
    
    // 如果需要关于模态框
    if (includeAbout) {
        document.body.insertAdjacentHTML('beforeend', createAboutModal());
    }
    
    // 绑定主题切换按钮事件
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle && typeof toggleTheme === 'function') {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // 绑定语言切换按钮事件
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle && typeof toggleLanguage === 'function') {
        languageToggle.addEventListener('change', toggleLanguage);
    }
}

// 关闭关于模态框
function closeAbout() {
    const modal = document.getElementById('aboutModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// 关闭警告模态框
function closeWarningModal() {
    const modal = document.getElementById('warningModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// 显示Toast提示
function showToast(message, type = 'success') {
    const toast = document.getElementById('copyToast');
    if (!toast) return;
    
    const messageSpan = toast.querySelector('span');
    const icon = toast.querySelector('i');
    
    if (messageSpan) {
        messageSpan.textContent = message;
    }
    
    // 根据类型设置样式
    toast.className = 'fixed top-4 right-4 text-white px-6 py-3 rounded-lg border z-50 transform transition-transform duration-300';
    
    if (type === 'success') {
        toast.classList.add('bg-green-500/90', 'backdrop-blur-sm', 'border-green-400/50');
        if (icon) icon.className = 'fas fa-check-circle mr-2';
    } else if (type === 'error') {
        toast.classList.add('bg-red-500/90', 'backdrop-blur-sm', 'border-red-400/50');
        if (icon) icon.className = 'fas fa-exclamation-circle mr-2';
    } else if (type === 'warning') {
        toast.classList.add('bg-yellow-500/90', 'backdrop-blur-sm', 'border-yellow-400/50');
        if (icon) icon.className = 'fas fa-exclamation-triangle mr-2';
    }
    
    // 显示Toast
    toast.classList.remove('hidden', 'translate-x-full');
    toast.classList.add('translate-x-0');
    
    // 3秒后自动隐藏
    setTimeout(() => {
        toast.classList.remove('translate-x-0');
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 300);
    }, 3000);
}

// 切换卡片折叠状态
function toggleCardCollapse(headerElement) {
    const card = headerElement.closest('.bg-white\/70, .bg-slate-800\/70') || headerElement.parentElement;
    if (!card) return;
    
    const content = card.querySelector('.card-content');
    if (!content) return;
    
    const isCollapsed = content.style.display === 'none' || content.classList.contains('hidden');
    
    if (isCollapsed) {
        content.style.display = '';
        content.classList.remove('hidden');
        // 添加展开动画
        content.style.maxHeight = '0';
        content.style.overflow = 'hidden';
        content.style.transition = 'max-height 0.3s ease-out';
        
        setTimeout(() => {
            content.style.maxHeight = content.scrollHeight + 'px';
        }, 10);
        
        setTimeout(() => {
            content.style.maxHeight = '';
            content.style.overflow = '';
            content.style.transition = '';
        }, 300);
    } else {
        // 添加收起动画
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.overflow = 'hidden';
        content.style.transition = 'max-height 0.3s ease-out';
        
        setTimeout(() => {
            content.style.maxHeight = '0';
        }, 10);
        
        setTimeout(() => {
            content.style.display = 'none';
            content.classList.add('hidden');
            content.style.maxHeight = '';
            content.style.overflow = '';
            content.style.transition = '';
        }, 300);
    }
}

// 导出函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createTechBackground,
        createNavigation,
        createFooter,
        createWarningModal,
        createCopyToast,
        createAboutModal,
        initializeSharedComponents,
        closeAbout,
        closeWarningModal,
        showToast,
        toggleCardCollapse
    };
}