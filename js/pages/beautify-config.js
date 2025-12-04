// 哪吒面板配置生成器 - 配置文件
// 包含配置模板和字段定义

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

// 导出
if (typeof window !== 'undefined') {
    window.configTemplate = configTemplate;
    window.getFieldLabels = getFieldLabels;
}
