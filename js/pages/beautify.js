// 哪吒面板配置生成器
// 基于nazhua-config-generator.html的功能实现

// 配置模板
const configTemplate = {
    title: '哪吒监控',
    customFavicon: '',
    footerSlogan: '',
    freeAmount: '白嫖',
    infinityCycle: '长期有效',
    buyBtnText: '购买',
    customBackgroundImage: '',
    lightBackground: false,
    showFireworks: true,
    showLantern: true,
    enableInnerSearch: true,
    listServerItemTypeToggle: true,
    listServerItemType: 'card',
    listServerStatusType: 'progress',
    listServerRealTimeShowLoad: false,
    detailServerStatusType: 'progress',
    simpleColorMode: false,
    serverStatusLinear: true,
    disableSarasaTermSC: true,
    hideWorldMap: false,
    hideHomeWorldMap: false,
    hideDetailWorldMap: false,
    homeWorldMapPosition: 'top',
    detailWorldMapPosition: 'top',
    hideNavbarServerCount: false,
    hideNavbarServerStat: false,
    hideListItemStatusDonut: false,
    hideListItemStat: false,
    hideListItemBill: false,
    hideFilter: false,
    hideTag: false,
    hideDotBG: false,
    monitorRefreshTime: 10,
    monitorChartType: 'multi',
    monitorChartTypeToggle: true,
    filterGPUKeywords: ['Virtual Display'],
    nezhaVersion: 'v0',
    apiMonitorPath: '/api/v1/monitor/{id}',
    wsPath: '/ws',
    nezhaPath: '/nezha/',
    nezhaV0ConfigType: 'servers',
    v1ApiMonitorPath: '/api/v1/service/{id}',
    v1WsPath: '/api/v1/ws/server',
    v1ApiGroupPath: '/api/v1/server-group',
    v1ApiSettingPath: '/api/v1/setting',
    v1ApiProfilePath: '/api/v1/profile',
    v1DashboardUrl: '/dashboard',
    v1HideNezhaDashboardBtn: false,
    routeMode: 'h5'
};

// 字段标签和配置
function getFieldLabels() {
        const currentLang = localStorage.getItem('language') || 'zh';
        // 使用统一翻译管理器
        const manager = window.unifiedI18nManager || window.i18nManager;
        
        let beautifyFields = {};
        if (manager && manager.translations && manager.translations[currentLang]) {
            const langTranslations = manager.translations[currentLang];
            if (langTranslations.beautify && langTranslations.beautify.beautifyFields) {
                beautifyFields = langTranslations.beautify.beautifyFields;
            }
        }
        
        // 如果没有找到翻译，使用默认值
        if (Object.keys(beautifyFields).length === 0) {
            beautifyFields = {
                title: currentLang === 'zh' ? '网站标题' : 'Website Title',
                customFavicon: currentLang === 'zh' ? '自定义图标' : 'Custom Favicon',
                footerSlogan: currentLang === 'zh' ? '页脚标语' : 'Footer Slogan',
                freeAmount: currentLang === 'zh' ? '免费服务名称' : 'Free Service Name',
                buyBtnText: currentLang === 'zh' ? '购买按钮文案' : 'Buy Button Text',
                infinityCycle: currentLang === 'zh' ? '无限周期名称' : 'Infinity Cycle Name',
                customBackgroundImage: currentLang === 'zh' ? '自定义背景图片' : 'Custom Background Image',
                lightBackground: currentLang === 'zh' ? '浅色背景' : 'Light Background'
            };
        }
        
        return {
        title: {
            label: beautifyFields.title,
            placeholder: currentLang === 'zh' ? '请输入网站标题' : 'Please enter website title',
            remark: currentLang === 'zh' ? '默认显示为"哪吒探针"' : 'Default display as "Nezha Probe"',
            type: 'input',
            v1customCode: true
        },
        customFavicon: {
            label: beautifyFields.customFavicon,
            placeholder: currentLang === 'zh' ? '请输入自定义favicon地址' : 'Please enter custom favicon URL',
            remark: currentLang === 'zh' ? '自定义favicon地址，建议您输入完整的图标地址' : 'Custom favicon URL, recommend entering complete icon address',
            type: 'input',
            v1customCode: true,
            version: '0.5.7+'
        },
        footerSlogan: {
            label: beautifyFields.footerSlogan,
            placeholder: currentLang === 'zh' ? '请输入页脚标语' : 'Please enter footer slogan',
            remark: currentLang === 'zh' ? '留空不占位，支持HTML代码（不支持script标签动态代码）' : 'Leave empty for no space, supports HTML code (no script tags)',
            type: 'input',
            v1customCode: true,
            version: '0.5.2+'
        },
        freeAmount: {
            label: beautifyFields.freeAmount,
            placeholder: currentLang === 'zh' ? '请输入免费服务的费用名称' : 'Please enter free service name',
            remark: currentLang === 'zh' ? '默认显示为"免费"，万一你想叫它"白嫖"呢？' : 'Default display as "Free", what if you want to call it something else?',
            type: 'input',
            v1customCode: true
        },
        buyBtnText: {
            label: beautifyFields.buyBtnText,
            placeholder: currentLang === 'zh' ? '请输入购买按钮文案' : 'Please enter buy button text',
            remark: currentLang === 'zh' ? '默认显示为"购买"，万一你想叫它"下单"呢？' : 'Default display as "Buy", what if you want to call it "Order"?',
            type: 'input',
            v1customCode: true
        },
        infinityCycle: {
            label: beautifyFields.infinityCycle,
            placeholder: currentLang === 'zh' ? '请输入无限周期名称' : 'Please enter infinity cycle name',
            remark: currentLang === 'zh' ? '默认显示为"长期有效"，万一你想叫它"永久"呢？' : 'Default display as "Long-term Valid", what if you want to call it "Permanent"?',
            type: 'input',
            v1customCode: true
        },
        customBackgroundImage: {
            label: beautifyFields.customBackgroundImage,
            placeholder: currentLang === 'zh' ? '请输入自定义背景图片地址' : 'Please enter custom background image URL',
            remark: currentLang === 'zh' ? '自定义背景图片地址，注意不要太大' : 'Custom background image URL, note not too large',
            type: 'input',
            v1customCode: true,
            version: '0.4.23+'
        },
        lightBackground: {
            label: beautifyFields.lightBackground,
            type: 'switch',
            remark: currentLang === 'zh' ? '启用浅色背景，会强制关闭点点背景，配合自定义背景图片使用' : 'Enable light background, will force close dot background, use with custom background image',
            v1customCode: true,
            version: '0.4.23+'
        },
        showFireworks: {
            label: beautifyFields.showFireworks,
            type: 'switch',
            remark: currentLang === 'zh' ? '启用烟花，建议开启浅色背景' : 'Enable fireworks, recommend enabling light background',
            v1customCode: true,
            version: '0.5.1+'
        },
        showLantern: {
            label: beautifyFields.showLantern,
            type: 'switch',
            remark: currentLang === 'zh' ? '启用"新年快乐"灯笼' : 'Enable "Happy New Year" lantern',
            v1customCode: true,
            version: '0.5.1+'
        },
        enableInnerSearch: {
            label: beautifyFields.enableInnerSearch,
            type: 'switch',
            remark: currentLang === 'zh' ? '启用内部搜索，默认启用' : 'Enable inner search, enabled by default',
            v1customCode: true,
            version: '0.5.4+'
        },
        listServerItemTypeToggle: {
            label: beautifyFields.listServerItemTypeToggle,
            type: 'switch',
            remark: currentLang === 'zh' ? '启用列表项类型切换，启用后列表项类型会显示为切换按钮，可以切换为卡片和行' : 'Enable list item type toggle, when enabled, list item type will show as toggle button, can switch between card and row',
            v1customCode: true,
            version: '0.5.0+'
        },
    listServerItemType: {
        label: beautifyFields.listServerItemType,
        placeholder: currentLang === 'zh' ? '请选择列表项类型' : 'Please select list item type',
        remark: currentLang === 'zh' ? '列表项的显示类型' : 'Display type of list items',
        type: 'select',
        options: [
            { label: '卡片(card)', value: 'card' },
            { label: '行(row)', value: 'row' }
        ],
        v1customCode: true
    },
    listServerStatusType: {
        label: beautifyFields.listServerStatusType,
        placeholder: currentLang === 'zh' ? '请选择列表服务器状态类型' : 'Please select list server status type',
        remark: currentLang === 'zh' ? '列表页服务器状态的显示类型' : 'Display type of server status on list page',
        type: 'select',
        options: [
            { label: '进度条(progress)', value: 'progress' },
            { label: '饼图(donut)', value: 'donut' }
        ],
        v1customCode: true
    },
    listServerRealTimeShowLoad: {
        label: beautifyFields.listServerRealTimeShowLoad,
        type: 'switch',
        remark: currentLang === 'zh' ? '列表实时显示负载' : 'Show real-time load on list',
        v1customCode: true
    },
    detailServerStatusType: {
        label: beautifyFields.detailServerStatusType,
        placeholder: currentLang === 'zh' ? '请选择详情服务器状态类型' : 'Please select detail server status type',
        remark: currentLang === 'zh' ? '详情页服务器状态的显示类型' : 'Display type of server status on detail page',
        type: 'select',
        options: [
            { label: '进度条(progress)', value: 'progress' },
            { label: '饼图(donut)', value: 'donut' }
        ],
        v1customCode: true
    },
    simpleColorMode: {
        label: beautifyFields.simpleColorMode,
        type: 'switch',
        remark: currentLang === 'zh' ? '启用简约色系' : 'Enable simple color mode',
        v1customCode: true
    },
    serverStatusLinear: {
        label: beautifyFields.serverStatusLinear,
        type: 'switch',
        remark: currentLang === 'zh' ? '服务器状态渐变线性显示 - 与简约色系互斥' : 'Server status linear gradient display - mutually exclusive with simple color mode',
        v1customCode: true
    },
    disableSarasaTermSC: {
        label: beautifyFields.disableSarasaTermSC,
        type: 'switch',
        remark: currentLang === 'zh' ? '禁用Sarasa Term SC字体' : 'Disable Sarasa Term SC font',
        v1customCode: true
    },
    hideWorldMap: {
        label: beautifyFields.hideWorldMap,
        type: 'switch',
        remark: currentLang === 'zh' ? '隐藏地图后，首页和详情页都不会显示地图' : 'After hiding the map, neither the homepage nor the detail page will display the map',
        v1customCode: true
    },
    hideHomeWorldMap: {
        label: beautifyFields.hideHomeWorldMap,
        type: 'switch',
        v1customCode: true
    },
    hideDetailWorldMap: {
        label: beautifyFields.hideDetailWorldMap,
        type: 'switch',
        v1customCode: true
    },
    homeWorldMapPosition: {
        label: beautifyFields.homeWorldMapPosition,
        placeholder: currentLang === 'zh' ? '请选择首页地图位置' : 'Please select homepage map position',
        remark: currentLang === 'zh' ? '首页地图位置' : 'Homepage map position',
        type: 'select',
        options: [
            { label: '顶部(top)', value: 'top' },
            { label: '底部(bottom)', value: 'bottom' }
        ],
        v1customCode: true,
        version: '0.6.4+'
    },
    detailWorldMapPosition: {
        label: beautifyFields.detailWorldMapPosition,
        placeholder: currentLang === 'zh' ? '请选择详情页地图位置' : 'Please select detail page map position',
        remark: currentLang === 'zh' ? '详情页地图位置' : 'Detail page map position',
        type: 'select',
        options: [
            { label: '顶部(top)', value: 'top' },
            { label: '底部(bottom)', value: 'bottom' }
        ],
        v1customCode: true,
        version: '0.6.4+'
    },
    hideNavbarServerCount: {
        label: beautifyFields.hideNavbarServerCount,
        type: 'switch',
        remark: currentLang === 'zh' ? '隐藏导航栏的服务器数量统计' : 'Hide server count statistics in navigation bar',
        v1customCode: true
    },
    hideNavbarServerStat: {
        label: beautifyFields.hideNavbarServerStat,
        type: 'switch',
        remark: currentLang === 'zh' ? '隐藏导航栏的服务器统计信息' : 'Hide server statistics in navigation bar',
        v1customCode: true
    },
    hideListItemStatusDonut: {
        label: beautifyFields.hideListItemStatusDonut,
        remark: currentLang === 'zh' ? '隐藏列表项的状态饼图，不影响详情页的状态饼图' : 'Hide status donut chart in list items, does not affect detail page donut chart',
        type: 'switch',
        v1customCode: true
    },
    hideListItemStat: {
        label: beautifyFields.hideListItemStat,
        remark: currentLang === 'zh' ? '隐藏列表项的统计信息，不影响详情页的统计信息' : 'Hide statistics in list items, does not affect detail page statistics',
        type: 'switch',
        v1customCode: true
    },
    hideListItemBill: {
        label: beautifyFields.hideListItemBill,
        remark: currentLang === 'zh' ? '隐藏列表项的账单信息，不影响详情页的账单信息' : 'Hide billing information in list items, does not affect detail page billing',
        type: 'switch',
        v1customCode: true
    },
    hideFilter: {
        label: beautifyFields.hideFilter,
        remark: currentLang === 'zh' ? '隐藏列表页的标签和在线/离线筛选功能' : 'Hide tag and online/offline filter functions on list page',
        type: 'switch',
        v1customCode: true
    },
    hideTag: {
        label: beautifyFields.hideTag,
        remark: currentLang === 'zh' ? '隐藏列表项的标签筛选功能' : 'Hide tag filter function in list items',
        type: 'switch',
        v1customCode: true
    },
    hideDotBG: {
        label: beautifyFields.hideDotBG,
        type: 'switch',
        remark: currentLang === 'zh' ? '隐藏盒子里面的点阵背景' : 'Hide dot pattern background inside boxes',
        v1customCode: true
    },
    monitorRefreshTime: {
        label: beautifyFields.monitorRefreshTime,
        placeholder: currentLang === 'zh' ? '请输入监控刷新时间' : 'Please enter monitor refresh time',
        remark: currentLang === 'zh' ? '监控刷新时间间隔，单位s（秒）, 0为不刷新，为保证不频繁请求源站，最低生效值为10s' : 'Monitor refresh interval in seconds, 0 for no refresh, minimum effective value is 10s to avoid frequent requests',
        type: 'input',
        v1customCode: true,
        version: '0.4.8+'
    },
    monitorChartType: {
        label: beautifyFields.monitorChartType,
        placeholder: currentLang === 'zh' ? '请选择监控图表类型' : 'Please select monitor chart type',
        remark: currentLang === 'zh' ? '监控图表类型，single单独显示/multi聚合在一起' : 'Monitor chart type, single for individual display/multi for aggregated display',
        type: 'select',
        options: [
            { label: '单个(single)', value: 'single' },
            { label: '多个(multi)', value: 'multi' }
        ],
        v1customCode: true,
        version: '0.6.4+'
    },
    monitorChartTypeToggle: {
        label: beautifyFields.monitorChartTypeToggle,
        type: 'switch',
        remark: currentLang === 'zh' ? '启用监控图表类型切换' : 'Enable monitor chart type toggle',
        v1customCode: true,
        version: '0.6.4+'
    },
    filterGPUKeywords: {
        label: beautifyFields.filterGPUKeywords,
        placeholder: currentLang === 'zh' ? '请输入GPU过滤关键字' : 'Please enter GPU filter keywords',
        remark: currentLang === 'zh' ? '按下Enter键(回车)确定关键词；如果GPU名称中包含这些关键字，则过滤掉' : 'Press Enter to confirm keywords; GPUs containing these keywords will be filtered out',
        type: 'input-tag',
        v1customCode: true,
        version: '0.4.9+'
    },
    nezhaVersion: {
        label: beautifyFields.nezhaVersion,
        placeholder: currentLang === 'zh' ? '请选择哪吒版本' : 'Please select Nezha version',
        remark: currentLang === 'zh' ? '哪吒探针的版本，目前仅支持v0和v1，0.4.13前默认为v0，0.4.13后默认为自动处理' : 'Nezha probe version, currently supports v0 and v1, defaults to v0 before 0.4.13, auto-handled after 0.4.13',
        type: 'select',
        options: [
            { label: 'v0 - 默认', value: 'v0' },
            { label: 'v1', value: 'v1' }
        ]
    },
    apiMonitorPath: {
        label: beautifyFields.apiMonitorPath,
        placeholder: currentLang === 'zh' ? '请输入网络服务监控API路径' : 'Please enter network service monitor API path',
        remark: currentLang === 'zh' ? '主要是网络服务那个监控数据的读取，目前只会替换关键词 {id}' : 'Mainly for reading network service monitoring data, currently only replaces keyword {id}',
        type: 'input'
    },
    wsPath: {
        label: beautifyFields.wsPath,
        placeholder: currentLang === 'zh' ? '请输入WebSocket路径' : 'Please enter WebSocket path',
        remark: currentLang === 'zh' ? 'WebSocket连接路径' : 'WebSocket connection path',
        type: 'input'
    },
    nezhaPath: {
        label: beautifyFields.nezhaPath,
        placeholder: currentLang === 'zh' ? '请输入哪吒路径' : 'Please enter Nezha path',
        remark: currentLang === 'zh' ? '哪吒探针的路径' : 'Nezha probe path',
        type: 'input'
    },
    nezhaV0ConfigType: {
        label: beautifyFields.nezhaV0ConfigType,
        placeholder: currentLang === 'zh' ? '请选择哪吒v0数据读取类型' : 'Please select Nezha v0 data read type',
        remark: currentLang === 'zh' ? '哪吒v0数据读取类型' : 'Nezha v0 data read type',
        type: 'select',
        options: [
            { label: 'servers', value: 'servers' }
        ]
    },
    v1ApiMonitorPath: {
        label: beautifyFields.v1ApiMonitorPath,
        placeholder: currentLang === 'zh' ? '请输入v1监控API路径' : 'Please enter v1 monitor API path',
        remark: currentLang === 'zh' ? 'v1版本的监控API' : 'v1 version monitor API',
        type: 'input'
    },
    v1WsPath: {
        label: beautifyFields.v1WsPath,
        placeholder: currentLang === 'zh' ? '请输入v1 WebSocket路径' : 'Please enter v1 WebSocket path',
        remark: currentLang === 'zh' ? 'v1版本的WebSocket连接路径' : 'v1 version WebSocket connection path',
        type: 'input'
    },
    v1ApiGroupPath: {
        label: beautifyFields.v1ApiGroupPath,
        placeholder: currentLang === 'zh' ? '请输入v1分组API路径' : 'Please enter v1 group API path',
        remark: currentLang === 'zh' ? 'v1版本的分组API' : 'v1 version group API',
        type: 'input'
    },
    v1ApiSettingPath: {
        label: beautifyFields.v1ApiSettingPath,
        placeholder: currentLang === 'zh' ? '请输入v1设置API路径' : 'Please enter v1 setting API path',
        remark: currentLang === 'zh' ? 'v1版本的设置API' : 'v1 version setting API',
        type: 'input'
    },
    v1ApiProfilePath: {
        label: beautifyFields.v1ApiProfilePath,
        placeholder: currentLang === 'zh' ? '请输入v1用户信息API路径' : 'Please enter v1 profile API path',
        remark: currentLang === 'zh' ? 'v1版本的用户信息API' : 'v1 version profile API',
        type: 'input'
    },
    v1DashboardUrl: {
        label: beautifyFields.v1DashboardUrl,
        placeholder: currentLang === 'zh' ? '请输入v1控制台地址' : 'Please enter v1 dashboard URL',
        remark: currentLang === 'zh' ? 'v1版本的控制台地址，默认为 /dashboard' : 'v1 version dashboard URL, default is /dashboard',
        type: 'input',
        v1customCode: true
    },
    v1HideNezhaDashboardBtn: {
        label: beautifyFields.v1HideNezhaDashboardBtn,
        type: 'switch',
        remark: currentLang === 'zh' ? '隐藏导航栏的控制台入口/登录按钮' : 'Hide dashboard entry/login button in navigation bar',
        v1customCode: true
    },
    routeMode: {
        label: beautifyFields.routeMode,
        placeholder: currentLang === 'zh' ? '请选择路由模式' : 'Please select route mode',
        remark: currentLang === 'zh' ? '默认为h5，如果是hash模式，需要后端支持' : 'Default is h5, hash mode requires backend support',
        type: 'select',
        options: [
            { label: 'h5', value: 'h5' },
            { label: 'hash', value: 'hash' }
        ]
    }
    };
}

// 注意：不再使用全局fieldLabels常量，改为动态获取以支持语言切换

// 全局状态
let configFormData = {};
let configFieldEnable = {};
let isV1CustomCode = true; // 默认启用V1模式

// 初始化
function init() {
    // 加载本地存储的配置
    loadLocalConfig();
    
    // 渲染表单
    renderForm();
    
    // 初始更新代码输出
    updateCodeOutput();
    
    // 添加语言切换监听器
    document.addEventListener('languageChanged', function() {
        renderForm();
    });
    
    console.log('美化页面初始化完成');
}

// 加载本地配置
function loadLocalConfig() {
    const localData = localStorage.getItem('nazhua-custom-config');
    if (localData) {
        try {
            const data = JSON.parse(localData);
            configFormData = data.formData || {};
            configFieldEnable = data.enable || {};
        } catch (e) {
            console.error('加载本地配置失败:', e);
        }
    }
    
    // 初始化默认值
    Object.keys(configTemplate).forEach(key => {
        if (!(key in configFormData)) {
            configFormData[key] = configTemplate[key];
        }
        if (!(key in configFieldEnable)) {
            configFieldEnable[key] = false;
        }
    });
}

// 保存本地配置
function saveLocalConfig() {
    const data = {
        formData: configFormData,
        enable: configFieldEnable
    };
    localStorage.setItem('nazhua-custom-config', JSON.stringify(data));
}

// 渲染表单
function renderForm() {
    const container = document.getElementById('configForm');
    if (!container) return;
    
    container.innerHTML = '';
    
    // 动态获取字段标签
    const currentFieldLabels = getFieldLabels();
    
    Object.keys(currentFieldLabels).forEach(key => {
        const field = currentFieldLabels[key];
        
        // 只显示支持V1的字段
        if (!field.v1customCode) {
            return;
        }
        
        const formItem = createFormItem(key, field);
        container.appendChild(formItem);
    });
}

// 获取分类图标
function getCategoryIcon(categoryName) {
    const icons = {
        '基础配置': '⚙️',
        '显示配置': '👁️',
        '监控配置': '📊',
        '网络配置': '🌐',
        '通知配置': '🔔',
        '高级配置': '🔧',
        '自定义代码': '💻'
    };
    return icons[categoryName] || '📋';
}

// 创建表单项
function createFormItem(key, field) {
    // 表单项容器
    const formItem = document.createElement('div');
    formItem.className = 'bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-4';
    
    // 标签
    const label = document.createElement('div');
    label.className = 'flex items-center justify-between mb-3';
    label.innerHTML = `<span class="text-sm font-medium text-gray-900 dark:text-white">${field.label}</span>` + (field.version ? `<span class="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full">${field.version}</span>` : '');
    
    // 内容区域
    const content = document.createElement('div');
    content.className = 'space-y-3';
    
    // 第一行：启用开关和控件
    const contentRow = document.createElement('div');
    contentRow.className = 'flex items-center gap-3';
    
    // 启用开关
    const switchContainer = document.createElement('div');
    switchContainer.className = 'flex-shrink-0';
    const switchLabel = document.createElement('label');
    switchLabel.className = 'relative inline-flex items-center cursor-pointer';
    const switchInput = document.createElement('input');
    switchInput.type = 'checkbox';
    switchInput.className = 'sr-only peer';
    switchInput.checked = configFieldEnable[key];
    switchInput.addEventListener('change', function() {
        configFieldEnable[key] = this.checked;
        saveLocalConfig();
        updateCodeOutput();
    });
    const switchSlider = document.createElement('div');
    switchSlider.className = 'w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[\'\'] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600';
    switchLabel.appendChild(switchInput);
    switchLabel.appendChild(switchSlider);
    switchContainer.appendChild(switchLabel);
    
    // 控件容器
    const controlContainer = document.createElement('div');
    controlContainer.className = 'flex-1';
    
    // 根据类型创建控件
    let control;
    if (field.type === 'input') {
        control = document.createElement('input');
        control.className = 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm';
        control.type = 'text';
        control.placeholder = field.placeholder || '';
        control.value = configFormData[key] || '';
        control.addEventListener('input', function() {
            configFormData[key] = this.value;
            saveLocalConfig();
            updateCodeOutput();
        });
    } else if (field.type === 'select') {
        control = document.createElement('select');
        control.className = 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 sm:text-sm';
        field.options.forEach(option => {
            const optionEl = document.createElement('option');
            optionEl.value = option.value;
            optionEl.textContent = option.label;
            control.appendChild(optionEl);
        });
        control.value = configFormData[key] || '';
        control.addEventListener('change', function() {
            configFormData[key] = this.value;
            saveLocalConfig();
            updateCodeOutput();
        });
    } else if (field.type === 'switch') {
        control = document.createElement('label');
        control.className = 'relative inline-flex items-center cursor-pointer';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.className = 'sr-only peer';
        input.checked = configFormData[key] || false;
        input.addEventListener('change', function() {
            configFormData[key] = this.checked;
            saveLocalConfig();
            updateCodeOutput();
        });
        const slider = document.createElement('div');
        slider.className = 'w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[\'\'] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600';
        control.appendChild(input);
        control.appendChild(slider);
    } else if (field.type === 'input-tag') {
        control = createTagInput(key, field);
    }
    
    controlContainer.appendChild(control);
    
    contentRow.appendChild(switchContainer);
    contentRow.appendChild(controlContainer);
    content.appendChild(contentRow);
    
    // 备注
    if (field.remark) {
        const remark = document.createElement('div');
        remark.className = 'text-xs text-gray-500 dark:text-gray-400 mt-2';
        remark.textContent = 'Tips: ' + field.remark;
        content.appendChild(remark);
    }
    
    formItem.appendChild(label);
    formItem.appendChild(content);
    
    return formItem;
}

// 创建标签输入控件
function createTagInput(key, field) {
    const container = document.createElement('div');
    container.className = 'flex flex-wrap gap-2 p-3 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 min-h-[42px] focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500';
    
    const tags = configFormData[key] || [];
    
    function renderTags() {
        container.innerHTML = '';
        
        tags.forEach((tag, index) => {
            const tagEl = document.createElement('span');
            tagEl.className = 'inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full';
            tagEl.innerHTML = `${tag} <button type="button" class="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200" onclick="removeTag('${key}', ${index})">&times;</button>`;
            container.appendChild(tagEl);
        });
        
        const input = document.createElement('input');
        input.className = 'flex-1 min-w-[120px] border-0 bg-transparent text-sm placeholder-gray-400 focus:outline-none focus:ring-0 dark:text-white dark:placeholder-gray-400';
        input.placeholder = field.placeholder || '';
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                tags.push(this.value.trim());
                configFormData[key] = tags;
                saveLocalConfig();
                updateCodeOutput();
                renderTags();
            }
        });
        container.appendChild(input);
    }
    
    renderTags();
    return container;
}

// 移除标签
function removeTag(key, index) {
    const tags = configFormData[key] || [];
    tags.splice(index, 1);
    configFormData[key] = tags;
    saveLocalConfig();
    updateCodeOutput();
    renderForm(); // 重新渲染以更新标签显示
}

// 更新代码输出
function updateCodeOutput() {
    const output = document.getElementById('beautifyJsonOutput');
    if (!output) return;
    
    try {
        // 生成V1自定义代码
        const code = generateV1CustomCode();
        output.value = code;
    } catch (e) {
        output.value = '// 生成配置时出错: ' + e.message;
    }
}

// 生成V1自定义代码
function generateV1CustomCode() {
    let code = `// 本代码由哪吒面板工具生成\n// 工具网址: https://nztools.xxxx.im\n\n`;
    
    // 构建启用的配置
    const enabledConfig = {};
    Object.keys(configFieldEnable).forEach(key => {
        if (configFieldEnable[key] && configFormData[key] !== undefined && configFormData[key] !== '') {
            enabledConfig[key] = configFormData[key];
        }
    });
    
    // 如果有启用的配置，生成JSON配置
    if (Object.keys(enabledConfig).length > 0) {
        code += '// 配置JSON\n';
        code += '<script>\n';
        code += 'window.theme_config = ';
        code += JSON.stringify(enabledConfig, null, 2);
        code += ';\n';
        code += '</script>\n\n';
    }
    
    return code;
}

// 重置配置
function handleResetConfig() {
    const currentLang = localStorage.getItem('language') || 'zh';
    const translations = i18nManager.translations.beautify || {};
    const langTranslations = translations[currentLang] || translations['zh'] || {};
    const confirmMessage = langTranslations.resetConfirm || '确定要重置所有配置吗？此操作不可撤销。';
    
    // 使用统一翻译管理器获取重置成功消息
    const successMessage = window.unifiedI18nManager ? 
        window.unifiedI18nManager.__('resetSuccess') : 
        (langTranslations.resetSuccess || '配置已重置到初始值');
    
    if (confirm(confirmMessage)) {
        // 重置配置数据为默认值
        configFormData = { ...configTemplate };
        
        // 重置所有字段的启用状态为false
        configFieldEnable = {};
        const currentFieldLabels = getFieldLabels();
        Object.keys(currentFieldLabels).forEach(key => {
            if (currentFieldLabels[key].v1customCode) {
                configFieldEnable[key] = false;
            }
        });
        
        // 保存配置并重新渲染界面
        saveLocalConfig();
        renderForm();
        updateCodeOutput();
        
        commonUtils.showToast(successMessage, 'success');
    }
}

// 显示导入对话框
function handleShowImportDialog() {
    const modal = document.getElementById('importModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

// 隐藏导入对话框
function handleHideImportDialog() {
    const modal = document.getElementById('importModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// 导入配置
function handleImportConfig() {
    const textarea = document.getElementById('importText');
    if (!textarea || !textarea.value.trim()) {
        commonUtils.showToast('请输入配置内容', 'error');
        return;
    }
    
    try {
        const imported = JSON.parse(textarea.value);
        configFormData = { ...configTemplate, ...imported };
        // 自动启用导入的字段
        Object.keys(imported).forEach(key => {
            configFieldEnable[key] = true;
        });
        saveLocalConfig();
        renderForm();
        updateCodeOutput();
        handleHideImportDialog();
        
        commonUtils.showToast('配置导入成功', 'success');
        
        textarea.value = '';
    } catch (e) {
        commonUtils.showToast('配置格式错误，请检查JSON格式', 'error');
    }
}



// 生成美化配置（兼容原有接口）
function generateBeautifyConfig() {
    updateCodeOutput();
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// 导出函数供全局使用
window.handleResetConfig = handleResetConfig;
window.handleShowImportDialog = handleShowImportDialog;
window.handleHideImportDialog = handleHideImportDialog;
window.handleImportConfig = handleImportConfig;
window.generateBeautifyConfig = generateBeautifyConfig;
window.removeTag = removeTag;