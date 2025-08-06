// 共享HTML组件

// 科技风背景组件
function createTechBackground() {
    const background = document.createElement('div');
    background.className = 'fixed inset-0 -z-10';
    
    const gradientLayer = document.createElement('div');
    gradientLayer.className = 'absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900';
    
    const gridLayer = document.createElement('div');
    gridLayer.className = 'absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]';
    
    const blurLayer = document.createElement('div');
    blurLayer.className = 'absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-slate-400 opacity-10 blur-[100px] dark:bg-slate-600';
    
    background.appendChild(gradientLayer);
    background.appendChild(gridLayer);
    background.appendChild(blurLayer);
    
    return background.outerHTML;
}

// 导航栏组件
function createNavigation(currentPage = 'index') {
    const pages = {
        index: { name: '账单配置', icon: '💰', href: 'index.html' },
        traffic: { name: '流量监控', icon: '📊', href: 'traffic.html' },
        alert: { name: '警报配置', icon: '🔔', href: 'alert.html' },
        service: { name: '服务', icon: '🖥️', href: 'service.html' },
        beautify: { name: '面板美化', icon: '🎨', href: 'beautify.html' }
    };

    const navItems = Object.entries(pages).map(([key, page]) => {
        const isActive = key === currentPage;
        const activeClass = isActive ? 'bg-blue-500 text-white' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800';
        
        return `
            <a href="${page.href}" class="px-4 py-2 rounded-lg ${activeClass} font-medium text-sm transition-all duration-300 flex items-center">
                <span class="mr-2">${page.icon}</span>
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
                    <img src="css/ico.png" alt="Logo" class="w-8 h-8 rounded-lg">
                    <h1 class="text-xl font-bold text-slate-900 dark:text-slate-100" data-key="title">哪吒面板工具</h1>
                </div>
                
                <!-- 页面导航 -->
                <div class="hidden md:flex items-center space-x-2">
                    ${navItems}
                </div>
                
                <!-- 右侧控制 -->
                <div class="flex items-center space-x-4">
                    <!-- 移动端菜单按钮 -->
                    <button id="mobileMenuButton" class="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
                        <span>☰</span>
                    </button>
                    <!-- 主题切换 -->
                    <button id="themeToggle" class="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300">
                        <span>🌙</span>
                    </button>
                    
                    <!-- 语言切换 -->
                    <button id="languageToggle" class="px-2 md:px-3 py-1 md:py-2 rounded-md md:rounded-lg text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 border border-slate-200 dark:border-slate-700">
                        <span class="language-zh">中文</span>
                        <span class="language-en hidden">EN</span>
                    </button>
                    

                </div>
            </div>
        </div>
        
        <!-- 移动端菜单面板 -->
        <div id="mobileMenu" class="md:hidden hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50">
            <div class="px-4 py-4 space-y-2">
                ${Object.entries(pages).map(([key, page]) => {
                    const isActive = key === currentPage;
                    const activeClass = isActive ? 'bg-blue-500 text-white' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800';
                    
                    return `
                        <a href="${page.href}" class="block px-4 py-3 rounded-lg ${activeClass} font-medium text-sm transition-all duration-300 flex items-center">
                            <span class="mr-3">${page.icon}</span>
                            <span data-key="${key}Page">${page.name}</span>
                        </a>`;
                }).join('')}
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
    projectTitle.textContent = '项目信息';
    
    const projectDetails = document.createElement('div');
    projectDetails.className = 'space-y-2 text-sm text-slate-600 dark:text-slate-400';
    
    const description = document.createElement('p');
    description.setAttribute('data-key', 'projectDescription');
    description.textContent = '哪吒面板JSON配置生成工具';
    
    const version = document.createElement('p');
    version.setAttribute('data-key', 'version');
    version.textContent = '版本: 2.0.0';
    
    const lastUpdate = document.createElement('p');
    lastUpdate.setAttribute('data-key', 'lastUpdate');
    lastUpdate.textContent = '最后更新: 2025年8月5日';
    
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
    originalTitle.textContent = '相关链接';
    
    const originalLinksDiv = document.createElement('div');
    originalLinksDiv.className = 'space-y-2 text-sm';
    
    const sourceLink = document.createElement('a');
    sourceLink.href = 'https://github.com/imrelax/Nezha-Panel-Tools';
    sourceLink.target = '_blank';
    sourceLink.className = 'block text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors';
    sourceLink.setAttribute('data-key', 'sourceCode');
    sourceLink.textContent = '源代码';
    
    const nezhaLink = document.createElement('a');
    nezhaLink.href = 'https://nezha.wiki';
    nezhaLink.target = '_blank';
    nezhaLink.className = 'block text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors';
    nezhaLink.setAttribute('data-key', 'nezhaOfficial');
    nezhaLink.textContent = '哪吒官网';
    
    const authorLink = document.createElement('a');
    authorLink.href = 'https://lagsn.es';
    authorLink.target = '_blank';
    authorLink.className = 'block text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors';
    authorLink.setAttribute('data-key', 'authorSite');
    authorLink.textContent = '作者网站';
    
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
    siteTitle.textContent = '本站相关';
    
    const siteLinksDiv = document.createElement('div');
    siteLinksDiv.className = 'space-y-2 text-sm';
    
    const siteSourceLink = document.createElement('a');
    siteSourceLink.href = 'https://github.com/imrelax/Nezha-Panel-Tools';
    siteSourceLink.target = '_blank';
    siteSourceLink.className = 'block text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors';
    siteSourceLink.setAttribute('data-key', 'siteSource');
    siteSourceLink.textContent = '本站源码';
    
    const siteAuthorLink = document.createElement('a');
    siteAuthorLink.href = 'https://xxxx.im';
    siteAuthorLink.target = '_blank';
    siteAuthorLink.className = 'block text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors';
    siteAuthorLink.setAttribute('data-key', 'siteAuthor');
    siteAuthorLink.textContent = '本站作者';
    
    const aboutLink = document.createElement('a');
    aboutLink.href = 'about.html';
    aboutLink.className = 'block text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors';
    aboutLink.setAttribute('data-key', 'siteAbout');
    aboutLink.textContent = '本站说明';
    
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
    licenseTitle.textContent = '许可证';
    
    const licenseDetails = document.createElement('div');
    licenseDetails.className = 'space-y-2 text-sm text-slate-600 dark:text-slate-400';
    
    const licenseType = document.createElement('p');
    licenseType.setAttribute('data-key', 'licenseType');
    licenseType.textContent = 'MIT License';
    
    const openSource = document.createElement('p');
    openSource.setAttribute('data-key', 'openSource');
    openSource.textContent = '开源免费使用';
    
    const contribution = document.createElement('p');
    contribution.setAttribute('data-key', 'contribution');
    contribution.textContent = '欢迎贡献代码';
    
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
    title.textContent = '警告';
    
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
    cancelButton.textContent = '取消';
    cancelButton.onclick = () => closeWarningModal();
    
    const confirmButton = document.createElement('button');
    confirmButton.id = 'confirmWarning';
    confirmButton.className = 'px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors duration-300';
    confirmButton.setAttribute('data-key', 'confirm');
    confirmButton.textContent = '确认';
    
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
    text.textContent = '复制成功！';
    
    content.appendChild(icon);
    content.appendChild(text);
    toast.appendChild(content);
    
    return toast.outerHTML;
}

// 关于模态框组件
function createAboutModal() {
    const modal = document.createElement('div');
    modal.id = 'aboutModal';
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden items-center justify-center p-4';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden';
    
    // 头部
    const header = document.createElement('div');
    header.className = 'p-6 border-b border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between';
    
    const titleContainer = document.createElement('h3');
    titleContainer.className = 'text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center';
    
    const iconContainer = document.createElement('div');
    iconContainer.className = 'w-8 h-8 flex items-center justify-center mr-3';
    
    const icon = document.createElement('i');
    icon.className = 'text-white text-sm';
        icon.textContent = 'ℹ️';
    iconContainer.appendChild(icon);
    
    const titleSpan = document.createElement('span');
    titleSpan.setAttribute('data-key', 'aboutUs');
    titleSpan.textContent = '关于我们';
    
    titleContainer.appendChild(iconContainer);
    titleContainer.appendChild(titleSpan);
    
    const closeButton = document.createElement('button');
    closeButton.className = 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors duration-300 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700';
    closeButton.onclick = () => closeAbout();
    
    const closeIcon = document.createElement('i');
    closeIcon.className = '';
    closeIcon.textContent = '✕';
    closeButton.appendChild(closeIcon);
    
    header.appendChild(titleContainer);
    header.appendChild(closeButton);
    
    // 主体内容
    const body = document.createElement('div');
    body.className = 'p-6 space-y-4';
    
    // 工具介绍
    const toolSection = document.createElement('div');
    toolSection.className = 'space-y-3';
    
    const toolTitle = document.createElement('h4');
    toolTitle.className = 'text-lg font-semibold text-slate-900 dark:text-slate-100';
    toolTitle.setAttribute('data-key', 'toolTitle');
    toolTitle.textContent = '哪吒面板JSON快捷生成工具';
    
    const toolDescription = document.createElement('p');
    toolDescription.className = 'text-slate-700 dark:text-slate-300';
    toolDescription.setAttribute('data-key', 'toolDescription');
    toolDescription.textContent = '这是一个专为哪吒监控面板设计的JSON配置文件生成工具，帮助用户快速生成各种配置文件。';
    
    toolSection.appendChild(toolTitle);
    toolSection.appendChild(toolDescription);
    
    // 功能列表
    const featuresSection = document.createElement('div');
    featuresSection.className = 'space-y-3';
    
    const featuresTitle = document.createElement('h5');
    featuresTitle.className = 'font-semibold text-slate-900 dark:text-slate-100';
    featuresTitle.setAttribute('data-key', 'mainFeatures');
    featuresTitle.textContent = '主要功能：';
    
    const featuresList = document.createElement('ul');
    featuresList.className = 'list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300';
    
    const features = [
        { key: 'feature1', text: '账单配置生成' },
        { key: 'feature2', text: '套餐配置生成' },
        { key: 'feature3', text: '流量监控规则配置' },
        { key: 'feature4', text: '警报规则配置' },
        { key: 'feature5', text: '支持中英文切换' },
        { key: 'feature6', text: '深色模式支持' }
    ];
    
    features.forEach(feature => {
        const li = document.createElement('li');
        li.setAttribute('data-key', feature.key);
        li.textContent = feature.text;
        featuresList.appendChild(li);
    });
    
    featuresSection.appendChild(featuresTitle);
    featuresSection.appendChild(featuresList);
    
    // 开发团队
    const teamSection = document.createElement('div');
    teamSection.className = 'space-y-3';
    
    const teamTitle = document.createElement('h5');
    teamTitle.className = 'font-semibold text-slate-900 dark:text-slate-100';
    teamTitle.setAttribute('data-key', 'devTeam');
    teamTitle.textContent = '开发团队：';
    
    const teamInfo = document.createElement('p');
    teamInfo.className = 'text-slate-700 dark:text-slate-300';
    teamInfo.textContent = '由 ';
    
    const authorLink = document.createElement('a');
    authorLink.href = 'https://lagsn.es';
    authorLink.target = '_blank';
    authorLink.className = 'text-blue-600 hover:text-blue-700 transition-colors';
    authorLink.textContent = 'LAGSNES';
    
    teamInfo.appendChild(authorLink);
    teamInfo.appendChild(document.createTextNode(' 开发维护'));
    
    const projectInfo = document.createElement('p');
    projectInfo.className = 'text-slate-600 dark:text-slate-400 text-sm';
    projectInfo.textContent = '本项目基于 ';
    
    const projectLink = document.createElement('a');
    projectLink.href = 'https://github.com/imrelax/Nezha-Panel-Tools';
        projectLink.target = '_blank';
        projectLink.className = 'text-blue-600 hover:text-blue-700 transition-colors';
        projectLink.textContent = 'imrelax/Nezha-Panel-Tools';
    
    projectInfo.appendChild(projectLink);
    projectInfo.appendChild(document.createTextNode(' 修改优化'));
    
    teamSection.appendChild(teamTitle);
    teamSection.appendChild(teamInfo);
    teamSection.appendChild(projectInfo);
    
    body.appendChild(toolSection);
    body.appendChild(featuresSection);
    body.appendChild(teamSection);
    
    // 底部
    const footer = document.createElement('div');
    footer.className = 'p-6 border-t border-slate-200/50 dark:border-slate-700/50 flex justify-end';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-lg transition-all duration-300';
    closeBtn.setAttribute('data-key', 'close');
    closeBtn.textContent = '关闭';
    closeBtn.onclick = () => closeAbout();
    
    footer.appendChild(closeBtn);
    
    modalContent.appendChild(header);
    modalContent.appendChild(body);
    modalContent.appendChild(footer);
    modal.appendChild(modalContent);
    
    return modal.outerHTML;
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
        if (icon) {
            icon.className = 'mr-2';
            icon.textContent = '✅';
        }
    } else if (type === 'error') {
        toast.classList.add('bg-red-500/90', 'backdrop-blur-sm', 'border-red-400/50');
        if (icon) {
            icon.className = 'mr-2';
            icon.textContent = '❌';
        }
    } else if (type === 'warning') {
        toast.classList.add('bg-yellow-500/90', 'backdrop-blur-sm', 'border-yellow-400/50');
        if (icon) {
            icon.className = 'mr-2';
            icon.textContent = '⚠️';
        }
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
    const card = headerElement.closest('.bg-white') || headerElement.closest('.bg-slate-800') || headerElement.parentElement;
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
        createAboutModal,
        initializeSharedComponents,
        closeAbout,
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