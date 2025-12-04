// 共享HTML组件

// 科技风背景组件
function createTechBackground() {
    const background = document.createElement('div');
    background.className = 'fixed inset-0 -z-10';
    
    // 基础背景层 - 使用新的深色系
    const baseLayer = document.createElement('div');
    baseLayer.className = 'absolute inset-0 bg-slate-50 dark:bg-slate-900 transition-colors duration-500';
    
    // 装饰光晕 - 更加柔和现代
    const glowLayer = document.createElement('div');
    glowLayer.className = 'absolute top-0 left-0 w-full h-full overflow-hidden';
    glowLayer.innerHTML = `
        <div class="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-400/20 dark:bg-primary-600/20 blur-[120px] animate-pulse-slow"></div>
        <div class="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary-400/20 dark:bg-secondary-600/20 blur-[120px] animate-pulse-slow" style="animation-delay: 2s;"></div>
    `;
    
    // 网格纹理 - 更加细腻
    const gridLayer = document.createElement('div');
    gridLayer.className = 'absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")]';
    
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
        // 新的导航激活样式
        const activeClass = isActive 
            ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-semibold shadow-sm border border-primary-500/20' 
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/50';
        
        return `
            <a href="${page.href}" class="px-4 py-2 rounded-xl ${activeClass} text-sm transition-all duration-300 flex items-center group">
                <span class="mr-2 group-hover:scale-110 transition-transform duration-300">${page.icon}</span>
                <span data-key="${page.nameKey}"></span>
            </a>`;
    }).join('');

    return `
    <!-- 顶部导航栏 - 悬浮玻璃态设计 -->
    <nav class="sticky top-4 z-50 mx-4 sm:mx-6 lg:mx-8 mb-8">
        <div class="max-w-7xl mx-auto bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 rounded-2xl shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20">
            <div class="px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <!-- Logo和标题 -->
                    <div class="flex items-center space-x-3 group cursor-pointer" onclick="window.location.href='index.html'">
                        <div class="relative">
                            <div class="absolute inset-0 bg-primary-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                            <img src="assets/img/ico.png" alt="Logo" class="relative w-9 h-9 rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300">
                        </div>
                        <h1 class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300" data-key="title"></h1>
                    </div>
                    
                    <!-- 页面导航 -->
                    <div class="hidden md:flex items-center space-x-1">
                        ${navItems}
                    </div>
                    
                    <!-- 右侧控制 -->
                    <div class="flex items-center space-x-3">
                        <!-- 主题切换 -->
                        <button id="themeToggle" class="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-primary-500 dark:hover:text-primary-400 transition-all duration-300">
                            <span>🌙</span>
                        </button>
                        
                        <!-- 语言切换 -->
                        <button id="languageToggle" class="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 border border-slate-200 dark:border-slate-700">
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
            <div id="mobileMenu" class="md:hidden hidden border-t border-slate-200/50 dark:border-slate-700/50">
                <div class="px-4 py-4 space-y-2">
                    ${Object.entries(pages).map(([key, page]) => {
                        const isActive = key === currentPage;
                        const activeClass = isActive 
                            ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 font-semibold' 
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800';
                        
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
    footer.className = 'mt-12 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50';
    
    const container = document.createElement('div');
    container.className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8';
    
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8';
    
    // 项目信息
    const projectInfo = document.createElement('div');
    projectInfo.className = 'space-y-4 text-center md:text-left';
    const projectTitle = document.createElement('h3');
    projectTitle.className = 'text-lg font-semibold text-slate-900 dark:text-slate-100';
    projectTitle.setAttribute('data-key', 'projectInfo');
    
    const projectDetails = document.createElement('div');
    projectDetails.className = 'space-y-2 text-sm text-slate-600 dark:text-slate-400';
    
    const description = document.createElement('p');
    description.setAttribute('data-key', 'projectDescription');
    
    const version = document.createElement('p');
    version.setAttribute('data-key', 'version');
    
    const lastUpdate = document.createElement('p');
    lastUpdate.setAttribute('data-key', 'lastUpdate');
    
    projectDetails.appendChild(description);
    projectDetails.appendChild(version);
    projectDetails.appendChild(lastUpdate);
    projectInfo.appendChild(projectTitle);
    projectInfo.appendChild(projectDetails);
    
    // 相关链接
    const linksSection = document.createElement('div');
    linksSection.className = 'space-y-4 md:col-span-1 lg:col-span-2 hidden md:block';
    
    const linksGrid = document.createElement('div');
    linksGrid.className = 'grid grid-cols-1 sm:grid-cols-2 gap-6';
    
    // 原作相关
    const originalLinks = document.createElement('div');
    originalLinks.className = 'space-y-4';
    const originalTitle = document.createElement('h3');
    originalTitle.className = 'text-lg font-semibold text-slate-900 dark:text-slate-100';
    originalTitle.setAttribute('data-key', 'relatedLinks');
    
    const originalLinksDiv = document.createElement('div');
    originalLinksDiv.className = 'space-y-2 text-sm';
    
    const sourceLink = document.createElement('a');
    sourceLink.href = 'https://github.com/imrelax/Nezha-Panel-Tools';
    sourceLink.target = '_blank';
    sourceLink.className = 'block text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors';
    sourceLink.setAttribute('data-key', 'sourceCode');
    
    const nezhaLink = document.createElement('a');
    nezhaLink.href = 'https://nezha.wiki';
    nezhaLink.target = '_blank';
    nezhaLink.className = 'block text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors';
    nezhaLink.setAttribute('data-key', 'nezhaOfficial');
    
    const authorLink = document.createElement('a');
    authorLink.href = 'https://lagsn.es';
    authorLink.target = '_blank';
    authorLink.className = 'block text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors';
    authorLink.setAttribute('data-key', 'authorSite');
    
    originalLinksDiv.appendChild(sourceLink);
    originalLinksDiv.appendChild(nezhaLink);
    originalLinksDiv.appendChild(authorLink);
    originalLinks.appendChild(originalTitle);
    originalLinks.appendChild(originalLinksDiv);
    
    // 本站相关
    const siteLinks = document.createElement('div');
    siteLinks.className = 'space-y-4';
    const siteTitle = document.createElement('h3');
    siteTitle.className = 'text-lg font-semibold text-slate-900 dark:text-slate-100';
    siteTitle.setAttribute('data-key', 'siteRelated');
    
    const siteLinksDiv = document.createElement('div');
    siteLinksDiv.className = 'space-y-2 text-sm';
    
    const siteSourceLink = document.createElement('a');
    siteSourceLink.href = 'https://github.com/imrelax/Nezha-Panel-Tools';
    siteSourceLink.target = '_blank';
    siteSourceLink.className = 'block text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors';
    siteSourceLink.setAttribute('data-key', 'siteSource');
    
    const siteAuthorLink = document.createElement('a');
    siteAuthorLink.href = 'https://xxxx.im';
    siteAuthorLink.target = '_blank';
    siteAuthorLink.className = 'block text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors';
    siteAuthorLink.setAttribute('data-key', 'siteAuthor');
    
    const aboutLink = document.createElement('a');
    aboutLink.href = 'https://nztools.xxxx.im';
    aboutLink.className = 'block text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors';
    aboutLink.setAttribute('data-key', 'siteAbout');
    aboutLink.setAttribute('target', '_blank');
    
    siteLinksDiv.appendChild(siteSourceLink);
    siteLinksDiv.appendChild(siteAuthorLink);
    siteLinksDiv.appendChild(aboutLink);
    siteLinks.appendChild(siteTitle);
    siteLinks.appendChild(siteLinksDiv);
    
    linksGrid.appendChild(originalLinks);
    linksGrid.appendChild(siteLinks);
    linksSection.appendChild(linksGrid);
    
    // 许可证信息
    const licenseSection = document.createElement('div');
    licenseSection.className = 'space-y-4 hidden md:block';
    const licenseTitle = document.createElement('h3');
    licenseTitle.className = 'text-lg font-semibold text-slate-900 dark:text-slate-100';
    licenseTitle.setAttribute('data-key', 'license');
    
    const licenseDetails = document.createElement('div');
    licenseDetails.className = 'space-y-2 text-sm text-slate-600 dark:text-slate-400';
    
    const licenseType = document.createElement('p');
    licenseType.setAttribute('data-key', 'licenseType');
    
    const openSource = document.createElement('p');
    openSource.setAttribute('data-key', 'openSource');
    
    const contribution = document.createElement('p');
    contribution.setAttribute('data-key', 'contribution');
    
    licenseDetails.appendChild(licenseType);
    licenseDetails.appendChild(openSource);
    licenseDetails.appendChild(contribution);
    licenseSection.appendChild(licenseTitle);
    licenseSection.appendChild(licenseDetails);
    
    grid.appendChild(projectInfo);
    grid.appendChild(linksSection);
    grid.appendChild(licenseSection);
    
    // 底部版权
    const bottomSection = document.createElement('div');
    bottomSection.className = 'mt-8 pt-8 border-t border-slate-200/50 dark:border-slate-700/50 text-center text-sm text-slate-600 dark:text-slate-400';
    
    const copyright = document.createElement('p');
    copyright.innerHTML = '&copy; 2025 Nezha Panel Tools. ';
    const rightsSpan = document.createElement('span');
    rightsSpan.setAttribute('data-key', 'allRightsReserved');
    rightsSpan.textContent = '保留所有权利';
    copyright.appendChild(rightsSpan);
    copyright.appendChild(document.createTextNode('.'));
    
    bottomSection.appendChild(copyright);
    
    container.appendChild(grid);
    container.appendChild(bottomSection);
    footer.appendChild(container);
    
    return footer.outerHTML;
}

// 警告模态框组件
function createWarningModal() {
    const modal = document.createElement('div');
    modal.id = 'warningModal';
    modal.className = 'hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 max-w-md w-full p-6';
    
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
    cancelButton.onclick = () => closeWarningModal();
    
    const confirmButton = document.createElement('button');
    confirmButton.id = 'confirmWarning';
    confirmButton.className = 'px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-300';
    confirmButton.setAttribute('data-key', 'confirm');
    
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(confirmButton);
    
    modalContent.appendChild(header);
    modalContent.appendChild(message);
    modalContent.appendChild(buttonContainer);
    modal.appendChild(modalContent);
    
    return modal.outerHTML;
}

// 复制成功提示组件
function createCopyToast() {
    const toast = document.createElement('div');
    toast.id = 'copyToast';
    toast.className = 'hidden fixed top-4 right-4 bg-green-500/90 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-green-400/50 z-50 transform translate-x-full transition-transform duration-300';
    
    const content = document.createElement('div');
    content.className = 'flex items-center';
    
    const icon = document.createElement('i');
    icon.className = 'mr-2';
    icon.textContent = '✅';
    
    const text = document.createElement('span');
    text.setAttribute('data-key', 'copySuccess');
    
    content.appendChild(icon);
    content.appendChild(text);
    toast.appendChild(content);
    
    return toast.outerHTML;
}



// 初始化共享组件
function initializeSharedComponents(currentPage = 'index') {
    // 插入背景
    document.body.insertAdjacentHTML('afterbegin', createTechBackground());
    
    // 插入导航栏
    document.body.insertAdjacentHTML('afterbegin', createNavigation(currentPage));
    
    // 插入页脚
    document.body.insertAdjacentHTML('beforeend', createFooter());
    
    // 插入模态框
    document.body.insertAdjacentHTML('beforeend', createWarningModal());
    document.body.insertAdjacentHTML('beforeend', createCopyToast());
    
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
    const card = headerElement.closest('.bg-white') || headerElement.closest('.bg-slate-800') || headerElement.parentElement;
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