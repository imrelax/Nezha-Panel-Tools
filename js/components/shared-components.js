// 共享HTML组件

// 注入全局样式
function injectGlobalStyles() {
    if (document.getElementById('global-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'global-styles';
    style.type = 'text/tailwindcss';
    style.innerHTML = `
        @layer components {
            .glass-card {
                @apply bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20 transition-all duration-300;
            }
            .glass-card-hover {
                @apply hover:shadow-xl hover:shadow-primary-500/10 dark:hover:shadow-primary-500/5;
            }
            .glass-header {
                @apply p-6 border-b border-slate-200/50 dark:border-slate-700/50;
            }
            .glass-content {
                @apply p-6;
            }
            .glass-input {
                @apply w-full px-4 py-3 border border-slate-200/60 dark:border-slate-700/60 rounded-xl focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-900 dark:text-slate-100 transition-all duration-300 hover:bg-white/80 dark:hover:bg-slate-900/80 outline-none;
            }
            .glass-button {
                @apply px-4 py-2 rounded-xl text-sm transition-all duration-300 shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md font-medium flex items-center justify-center;
            }
            .btn-primary {
                @apply bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-primary-500/30 hover:shadow-primary-500/50;
            }
            .btn-secondary {
                @apply bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 shadow-slate-200/30 dark:shadow-slate-900/30;
            }
            .section-title {
                @apply text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center;
            }
            .label-text {
                @apply block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3;
            }
        }
    `;
    document.head.appendChild(style);
}

// 科技风背景组件
function createTechBackground() {
    const background = document.createElement('div');
    background.className = 'fixed inset-0 -z-10 overflow-hidden';
    
    // 基础背景层 - 深邃渐变
    const baseLayer = document.createElement('div');
    baseLayer.className = 'absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 transition-colors duration-700';
    
    // 装饰光晕 - 动态流光
    const glowLayer = document.createElement('div');
    glowLayer.className = 'absolute inset-0';
    glowLayer.innerHTML = `
        <div class="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-r from-primary-400/20 to-indigo-400/20 dark:from-primary-600/10 dark:to-indigo-600/10 blur-[100px] animate-blob mix-blend-multiply dark:mix-blend-screen"></div>
        <div class="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-l from-secondary-400/20 to-pink-400/20 dark:from-secondary-600/10 dark:to-pink-600/10 blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen"></div>
        <div class="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-gradient-to-t from-purple-400/20 to-blue-400/20 dark:from-purple-600/10 dark:to-blue-600/10 blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen"></div>
    `;
    
    // 网格纹理 - 科技感点阵
    const gridLayer = document.createElement('div');
    gridLayer.className = 'absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\' fill=\'%2394a3b8\' fill-opacity=\'0.07\'/%3E%3C/svg%3E")] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]';
    
    background.appendChild(baseLayer);
    background.appendChild(glowLayer);
    background.appendChild(gridLayer);
    
    return background.outerHTML;
}

// 导航栏组件
function createNavigation(currentPage = 'index') {
    const pages = {
        index: { nameKey: 'indexPage', icon: '💰', href: 'index.html' },
        traffic: { nameKey: 'trafficPage', icon: '📊', href: 'traffic.html' },
        alert: { nameKey: 'alertPage', icon: '🔔', href: 'alert.html' },
        service: { nameKey: 'servicePage', icon: '🖥️', href: 'service.html' },
        beautify: { nameKey: 'beautifyPage', icon: '🎨', href: 'beautify.html' }
    };

    const navItems = Object.entries(pages).map(([key, page]) => {
        const isActive = key === currentPage;
        const activeClass = isActive 
            ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-semibold shadow-sm border border-primary-500/20 ring-1 ring-primary-500/10' 
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/50';
        
        return `
            <a href="${page.href}" class="px-4 py-2 rounded-xl ${activeClass} text-sm transition-all duration-300 flex items-center group relative overflow-hidden">
                <span class="mr-2 group-hover:scale-110 transition-transform duration-300 relative z-10">${page.icon}</span>
                <span data-key="${page.nameKey}" class="relative z-10"></span>
                ${isActive ? '' : '<div class="absolute inset-0 bg-slate-200/50 dark:bg-slate-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>'}
            </a>`;
    }).join('');

    return `
    <!-- 顶部导航栏 - 悬浮玻璃态设计 -->
    <nav class="sticky top-4 z-50 mx-4 sm:mx-6 lg:mx-8 mb-8">
        <div class="max-w-7xl mx-auto bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/30 dark:hover:shadow-slate-900/30">
            <div class="px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <!-- Logo和标题 -->
                    <a href="index.html" class="flex items-center space-x-3 group">
                        <div class="relative w-9 h-9">
                            <div class="absolute inset-0 bg-primary-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300 rounded-xl"></div>
                            <img src="assets/img/ico.png" alt="Logo" class="relative w-full h-full rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300">
                        </div>
                        <h1 class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 group-hover:to-primary-500 transition-all duration-300" data-key="title"></h1>
                    </a>
                    
                    <!-- 页面导航 -->
                    <div class="hidden md:flex items-center space-x-1">
                        ${navItems}
                    </div>
                    
                    <!-- 右侧控制 -->
                    <div class="flex items-center space-x-3">
                        <!-- 主题切换 -->
                        <button id="themeToggle" class="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:text-primary-500 dark:hover:text-primary-400 transition-all duration-300 border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                            <span>🌙</span>
                        </button>
                        
                        <!-- 语言切换 -->
                        <button id="languageToggle" class="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100/50 dark:bg-slate-800/50 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 border border-slate-200 dark:border-slate-700 shadow-sm">
                            <span class="language-zh">中文</span>
                            <span class="language-en hidden">EN</span>
                        </button>

                        <!-- 移动端菜单按钮 -->
                        <button id="mobileMenuButton" class="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
                            <span>☰</span>
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- 移动端菜单面板 -->
            <div id="mobileMenu" class="md:hidden hidden border-t border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-b-2xl">
                <div class="px-4 py-4 space-y-2">
                    ${Object.entries(pages).map(([key, page]) => {
                        const isActive = key === currentPage;
                        const activeClass = isActive 
                            ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-semibold' 
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50';
                        
                        return `
                            <a href="${page.href}" class="block px-4 py-3 rounded-xl ${activeClass} text-sm transition-all duration-300 flex items-center">
                                <span class="mr-3">${page.icon}</span>
                                <span data-key="${page.nameKey}"></span>
                            </a>`;
                    }).join('')}
                </div>
            </div>
        </div>
    </nav>`;
}

// 页脚组件
function createFooter() {
    const footer = document.createElement('footer');
    footer.className = 'mt-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8';
    
    const container = document.createElement('div');
    container.className = 'max-w-7xl mx-auto';
    
    // 主体内容区
    const mainContent = document.createElement('div');
    mainContent.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12';
    
    // 1. 项目品牌区 (占4列)
    const brandSection = document.createElement('div');
    brandSection.className = 'lg:col-span-4 space-y-4';
    
    const brandHeader = document.createElement('div');
    brandHeader.className = 'flex items-center space-x-3';
    brandHeader.innerHTML = `
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
            <img src="assets/img/ico.png" alt="Logo" class="w-8 h-8 rounded-lg brightness-200 contrast-200">
        </div>
        <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300" data-key="title"></span>
    `;
    
    const description = document.createElement('p');
    description.className = 'text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm';
    description.setAttribute('data-key', 'projectDescription');
    
    const statusBadges = document.createElement('div');
    statusBadges.className = 'flex flex-wrap gap-2 pt-2';
    
    // 版本徽章
    const versionBadge = document.createElement('span');
    versionBadge.className = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400 border border-primary-100 dark:border-primary-500/20';
    versionBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-primary-500 mr-1.5 animate-pulse"></span><span data-key="version"></span>';
    
    // 更新时间徽章
    const updateBadge = document.createElement('span');
    updateBadge.className = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700';
    updateBadge.setAttribute('data-key', 'lastUpdate');
    
    statusBadges.appendChild(versionBadge);
    statusBadges.appendChild(updateBadge);
    
    brandSection.appendChild(brandHeader);
    brandSection.appendChild(description);
    brandSection.appendChild(statusBadges);
    
    // 2. 链接导航区 (占8列)
    const linksContainer = document.createElement('div');
    linksContainer.className = 'lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8';
    
    // 链接组辅助函数
    const createLinkGroup = (titleKey, links) => {
        const group = document.createElement('div');
        group.className = 'space-y-4';
        
        const title = document.createElement('h3');
        title.className = 'text-sm font-semibold text-slate-900 dark:text-white tracking-wider uppercase';
        title.setAttribute('data-key', titleKey);
        
        const list = document.createElement('ul');
        list.className = 'space-y-3';
        
        links.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = link.href;
            a.target = '_blank';
            a.className = 'text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 flex items-center group';
            
            // 外部链接图标
            const icon = link.icon || '<svg class="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>';
            
            a.innerHTML = `<span data-key="${link.key}"></span>${icon}`;
            li.appendChild(a);
            list.appendChild(li);
        });
        
        group.appendChild(title);
        group.appendChild(list);
        return group;
    };
    
    // 定义链接组
    const relatedLinks = [
        { key: 'sourceCode', href: 'https://github.com/imrelax/Nezha-Panel-Tools' },
        { key: 'nezhaOfficial', href: 'https://nezha.wiki' },
        { key: 'authorSite', href: 'https://lagsn.es' }
    ];
    
    const siteLinks = [
        { key: 'siteSource', href: 'https://github.com/imrelax/Nezha-Panel-Tools' },
        { key: 'siteAuthor', href: 'https://xxxx.im' },
        { key: 'siteAbout', href: 'https://nztools.xxxx.im' }
    ];
    
    const legalLinks = [
        { key: 'licenseType', href: 'https://github.com/imrelax/Nezha-Panel-Tools/blob/main/LICENSE' },
        { key: 'contribution', href: 'https://github.com/imrelax/Nezha-Panel-Tools/pulls' }
    ];
    
    linksContainer.appendChild(createLinkGroup('relatedLinks', relatedLinks));
    linksContainer.appendChild(createLinkGroup('siteRelated', siteLinks));
    linksContainer.appendChild(createLinkGroup('license', legalLinks));
    
    mainContent.appendChild(brandSection);
    mainContent.appendChild(linksContainer);
    
    // 底部版权区
    const bottomBar = document.createElement('div');
    bottomBar.className = 'pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4';
    
    const copyright = document.createElement('p');
    copyright.className = 'text-sm text-slate-500 dark:text-slate-500 text-center md:text-left';
    copyright.innerHTML = `&copy; ${new Date().getFullYear()} Nezha Panel Tools. <span data-key="allRightsReserved"></span>.`;
    
    const madeWith = document.createElement('p');
    madeWith.className = 'text-sm text-slate-500 dark:text-slate-500 flex items-center gap-1.5';
    madeWith.innerHTML = `
        <span data-key="madeWith"></span>
        <span class="text-red-500 animate-pulse">❤</span>
        <span data-key="and"></span>
        <span class="text-primary-500">☕</span>
    `;
    
    bottomBar.appendChild(copyright);
    bottomBar.appendChild(madeWith);
    
    container.appendChild(mainContent);
    container.appendChild(bottomBar);
    footer.appendChild(container);
    
    return footer.outerHTML;
}

// 警告模态框组件
function createWarningModal() {
    const modal = document.createElement('div');
    modal.id = 'warningModal';
    modal.className = 'hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'glass-card max-w-md w-full p-6';
    
    const header = document.createElement('div');
    header.className = 'flex items-center mb-4';
    
    const icon = document.createElement('i');
    icon.className = 'text-yellow-500 text-2xl mr-3';
    icon.textContent = '⚠️';
    
    const title = document.createElement('h3');
    title.className = 'text-lg font-semibold text-slate-800 dark:text-slate-100';
    title.setAttribute('data-key', 'warning');
    
    header.appendChild(icon);
    header.appendChild(title);
    
    const message = document.createElement('p');
    message.id = 'warningMessage';
    message.className = 'text-slate-600 dark:text-slate-300 mb-6';
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'flex justify-end space-x-3';
    
    const cancelButton = document.createElement('button');
    cancelButton.className = 'px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors';
    cancelButton.setAttribute('data-key', 'cancel');
    cancelButton.setAttribute('onclick', 'closeWarningModal()');
    
    const confirmButton = document.createElement('button');
    confirmButton.id = 'confirmWarning';
    confirmButton.className = 'glass-button bg-yellow-500 hover:bg-yellow-600 text-white shadow-yellow-500/30 hover:shadow-yellow-500/50';
    confirmButton.setAttribute('data-key', 'confirm');
    
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(confirmButton);
    
    modalContent.appendChild(header);
    modalContent.appendChild(message);
    modalContent.appendChild(buttonContainer);
    modal.appendChild(modalContent);
    
    return modal.outerHTML;
}



// 初始化共享组件
function initializeSharedComponents(currentPage = 'index') {
    // 注入全局样式
    injectGlobalStyles();

    // 插入背景
    document.body.insertAdjacentHTML('afterbegin', createTechBackground());
    
    // 插入导航栏
    document.body.insertAdjacentHTML('afterbegin', createNavigation(currentPage));
    
    // 插入页脚
    document.body.insertAdjacentHTML('beforeend', createFooter());
    
    // 插入模态框
    document.body.insertAdjacentHTML('beforeend', createWarningModal());
    
    // 初始化主题和语言
    if (typeof initializeTheme === 'function') {
        initializeTheme();
    }
    
    // 绑定主题切换按钮事件
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle && typeof toggleTheme === 'function') {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // 绑定语言切换按钮事件
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle && typeof toggleLanguage === 'function') {
        languageToggle.addEventListener('click', toggleLanguage);
    }
    
    // 绑定移动端菜单按钮事件
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // 点击菜单外部关闭菜单
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
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
    commonUtils.showToast(message, type);
}

// 切换卡片折叠状态
function toggleCardCollapse(headerElement) {
    const card = headerElement.closest('.glass-card') || headerElement.closest('.bg-white') || headerElement.closest('.bg-slate-800') || headerElement.parentElement;
    if (!card) return;
    
    const content = card.querySelector('.card-content');
    if (!content) return;

    const icon = headerElement.querySelector('.collapse-icon');
    
    const isCollapsed = content.style.display === 'none' || content.classList.contains('hidden');
    
    if (isCollapsed) {
        content.style.display = '';
        content.classList.remove('hidden');
        
        // 旋转图标
        if (icon) icon.style.transform = 'rotate(0deg)';
        headerElement.classList.remove('opacity-60');

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
        // 旋转图标
        if (icon) icon.style.transform = 'rotate(-90deg)';
        headerElement.classList.add('opacity-60');

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
// ==================== 样式配置部分 ====================

// 统一样式配置
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
        primary: "bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg",
        secondary: "bg-slate-500 hover:bg-slate-600 text-white px-3 py-2 rounded-lg text-sm transition-all duration-300 shadow-sm hover:shadow-md",
        success: "bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg",
        accent: "bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl",
        ghost: "text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-2 py-1 rounded transition-all duration-300"
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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createTechBackground,
        createNavigation,
        createFooter,
        createWarningModal,
        createCopyToast,
        initializeSharedComponents,
        closeWarningModal,
        showToast,
        toggleCardCollapse,
        STYLES,
        getStyleClass,
        applyStyle,
        applyStylesToElements
    };
} else {
    window.STYLES = STYLES;
    window.getStyleClass = getStyleClass;
    window.applyStyle = applyStyle;
    window.applyStylesToElements = applyStylesToElements;
}