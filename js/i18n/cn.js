// 中文翻译文件
const cnTranslations = {
    // 通用翻译 (common)
    common: {
        // 基础文本
        title: '哪吒面板工具',
        home: '首页',
        traffic: '流量监控',
        alert: '告警规则',
        service: '服务',
        english: '英文',
        chinese: '中文',
        close: '关闭',
        copy: '复制',
        refresh: '刷新',
        cancel: '取消',
        confirm: '确定',
        warning: '警告',
        
        // 页面导航
        indexPage: '账单配置',
        trafficPage: '流量监控',
        alertPage: '警报配置',
        servicePage: '服务',
        beautifyPage: '面板美化',
        
        // 页脚信息
        footerText: '© 2025 Nezha Panel Tools. 保留所有权利.',
        madeWith: '用',
        and: '和',
        madeBy: '制作',
        projectInfo: '项目信息',
        projectDescription: '哪吒面板工具',
        version: '版本: 2.0.1',
        lastUpdate: '最后更新: 2025年8月7日',
        relatedLinks: '相关链接',
        sourceCode: '源代码',
        nezhaOfficial: '哪吒官网',
        authorSite: '作者网站',
        siteRelated: '本站相关',
        siteSource: '本站源码',
        siteAuthor: '本站作者',
        siteAbout: '本站地址',
        license: '许可证',
        licenseType: 'MIT License',
        openSource: '开源免费使用',
        contribution: '欢迎贡献代码',
        allRightsReserved: '保留所有权利',
        
        // 通用操作
        refreshSuccess: '刷新成功！',
        copySuccess: '复制成功',
        copyFailed: '复制失败',
        unlimited: '不限',
        loading: '加载中...',
        loadError: '加载失败，请稍后重试',
        
        // 错误消息
        globalError: '发生错误，请刷新页面重试',
        typeError: '数据类型错误，请检查输入格式',
        moduleLoadError: '功能模块加载失败，请刷新页面',
        jsonError: 'JSON格式错误，请检查配置语法',
        promiseRejection: '操作失败，请重试',
        networkError: '网络请求失败，请检查网络连接',
        parseError: '数据解析失败，请检查数据格式',
        pageInitError: '页面初始化失败',
        configUpdateError: '配置更新失败',
        appUpdated: '应用已更新到新版本！',
        pageVisible: '页面重新可见',
        
        // 通用占位符
        jsonPlaceholder: 'JSON 配置将在这里显示...',
        addTagPlaceholder: '添加标签...',
        
        // 通用提示
        noContentToCopy: '没有可复制的内容',
        copyToClipboard: '复制到剪贴板',
        manualCopy: '复制失败，请手动复制',
        targetNotFound: '复制失败：未找到目标区域',
        copyError: '发生错误，请手动复制',
        refreshFailed: '刷新失败，请检查页面'
    },
    
    // 首页翻译 (index)
    index: {
        // 页面标题和描述
        pageTitle: '哪吒面板工具 - 账单配置生成器',
        pageDescription: '哪吒面板工具，支持账单配置、套餐配置生成，快速生成哪吒监控面板的JSON配置文件',
        pageKeywords: '哪吒面板,JSON生成器,账单配置,套餐配置,服务器监控,配置工具',
        
        // 配置标题
        billingConfig: '账单配置',
        planConfig: '套餐配置',
        jsonConfig: 'JSON 配置',
        
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
        
        // 账单信息
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
        
        // 流量类型翻译
        trafficTypes: {
            '1': '入站',
            '2': '双向'
        },
        
        // 时间单位翻译
        timeUnits: {
            'hour': '小时',
            'day': '天',
            'week': '周',
            'month': '月',
            'year': '年'
        },
        
        // 网络线路类型说明
        networkLineTypes: '网络线路类型说明',
        lineTypeLabel: '标签',
        lineTypeMeaning: '含义',
        lineTypeScenario: '适用场景',
        
        // 网络线路类型
        lineType163: '中国电信普通国际线路（AS4134）',
        lineType163Desc: '普通国际网络，价格低，但延迟和丢包较高',
        lineTypeCN2: '中国电信 CN2 GT（Global Transit）线路',
        lineTypeCN2Desc: '比普通 163 线路更稳定，但非最优高端线路',
        lineTypeCN2GIA: '中国电信 CN2 GIA（Global Internet Access）线路',
        lineTypeCN2GIADesc: '高端线路，低延迟、低丢包，适合游戏/视频',
        lineTypeCMI: '中国移动国际线路（CMI, China Mobile International）',
        lineTypeCMIDesc: '移动用户访问境外网络优化',
        lineTypeCMIN2: '中国移动高端 CN2 级优化线路（类似电信 CN2）',
        lineTypeCMIN2Desc: '移动用户的高质量国际网络',
        lineType4837: '中国联通 AS4837 国际线路',
        lineType4837Desc: '联通用户常用，性价比适中',
        lineType10099: '中国联通 CUII（China Unicom International IP）线路',
        lineType10099Desc: '联通高端优化线路，比 4837 更稳定',
        lineTypeIEPL: 'International Ethernet Private Line（国际以太网专线）',
        lineTypeIEPLDesc: '企业级低延迟专线，价格高',
        lineTypeIPLC: 'International Private Leased Circuit（国际私有租用线路）',
        lineTypeIPLCDesc: '最高质量专线，完全独享带宽，无公网干扰'
    },
    
    // 告警规则翻译 (alert)
    alert: {
        // 页面标题和描述
        pageTitle: '哪吒面板工具 - 告警规则配置',
        pageDescription: '哪吒面板工具，支持告警规则配置，快速生成哪吒监控面板的JSON配置文件',
        pageKeywords: '哪吒面板,JSON生成器,告警规则,服务器监控,配置工具',
        
        // 配置标题
        alertRules: '警报规则',
        
        // 表单字段
        type: '类型',
        minValue: '最小值',
        maxValue: '最大值',
        duration: '持续时间 (秒)',
        cover: '覆盖',
        ignoreServers: '忽略服务器 (用逗号分隔ID)',
        jsonConfig: 'JSON 配置',
        
        // 警报类型翻译
        alertTypes: {
            'cpu': 'CPU使用率',
            'gpu': 'GPU使用率',
            'memory': '内存使用率',
            'swap': '交换空间',
            'disk': '磁盘使用率',
            'net_in_speed': '入站网速',
            'net_out_speed': '出站网速',
            'net_all_speed': '总网速',
            'transfer_in': '入站流量',
            'transfer_out': '出站流量',
            'transfer_all': '总流量',
            'offline': '离线状态',
            'load1': '1分钟负载',
            'load5': '5分钟负载',
            'load15': '15分钟负载',
            'process_count': '进程数量',
            'tcp_conn_count': 'TCP连接数',
            'udp_conn_count': 'UDP连接数',
            'temperature_max': '最高温度'
        },
        
        // 时间单位翻译
        timeUnits: {
            'hour': '小时',
            'day': '天',
            'week': '周',
            'month': '月',
            'year': '年'
        }
    },
    
    // 流量监控翻译 (traffic)
    traffic: {
        // 页面标题和描述
        pageTitle: '哪吒面板工具 - 流量监控规则配置',
        pageDescription: '哪吒面板工具，支持流量监控规则配置，快速生成哪吒监控面板的JSON配置文件',
        pageKeywords: '哪吒面板,JSON生成器,流量监控,服务器监控,配置工具',
        
        // 配置标题
        trafficMonitoring: '流量监控规则',
        
        // 表单字段
        type: '类型',
        minValue: '最小值',
        maxValue: '最大值',
        cover: '覆盖',
        jsonConfig: 'JSON 配置',
        cycleStart: '周期开始',
        cycleInterval: '周期数量',
        cycleUnit: '周期单位',
        ignoreList: '忽略服务器 (用逗号分隔ID)',
        inboundTraffic: '入站流量',
        outboundTraffic: '出站流量',
        bidirectionalTraffic: '双向流量',
        
        // 流量周期选项
        trafficPeriods: {
            'Day': '天',
            'Month': '月',
            'Quarter': '季度',
            'Year': '年',
            'Unlimited': '不限'
        },
        
        // 流量类型翻译
        trafficTypes: {
            '1': '入站',
            '2': '双向'
        },
        
        // 时间单位翻译
        timeUnits: {
            'hour': '小时',
            'day': '天',
            'week': '周',
            'month': '月',
            'year': '年'
        }
    },
    
    // 服务页面翻译 (service)
    service: {
        // 页面标题和描述
        pageTitle: '哪吒面板工具 - 服务',
        pageDescription: '哪吒面板工具，服务IP地址查询',
        pageKeywords: '哪吒面板,IP地址,服务器监控,网络服务',
        
        // 服务页面
        serviceTitle: 'IP地址服务',
        serviceDescription: '以下IP数据来自互联网，不保证可用性。<br><br>如需反馈问题或获取更多IP资源，请访问：<br><a href="https://github.com/imrelax/Nezha-Panel-Tools" target="_blank" class="text-blue-500 hover:text-blue-600 underline">https://github.com/imrelax/Nezha-Panel-Tools</a>',
        region: '地区',
        unicom: '联通',
        mobile: '移动',
        telecom: '电信',
        serviceHelpText: '不知道如何使用本功能？',
        viewTutorial: '查看教程',
        routeQuery: '路由查询'
    },
    
    // 美化页面翻译 (beautify)
    beautify: {
        // 页面标题和描述
        pageTitle: '哪吒面板工具 - 面板美化',
        pageDescription: '哪吒面板美化工具，生成JSON配置文件优化面板样式',
        pageKeywords: '哪吒面板,美化,样式优化,JSON配置,面板定制',
        
        // 美化页面
        beautifyTitle: 'Panel Design',
        beautifyDescription: '自定义哪吒面板样式，生成美化配置',
        beautifyHelpText: '配置哪吒面板V1版本自定义参数，生成配置代码导入面板后台实现美化效果',
        beautifyBasedOn: '本页面功能基于',
        beautifyOptimized: '实现，专为哪吒面板V1版本优化。',
        v1ModeLabel: 'V1模式',
        configSettings: '配置设置',
        resetConfig: '重置配置',
        resetConfirm: '确定要重置所有配置吗？此操作不可撤销。',
        resetSuccess: '配置已重置到初始值',
        importConfig: '导入配置',
        loadingConfig: '正在加载配置选项...',
        configCode: '配置代码',
        usageInstructions: '使用说明',
        usageTips: '使用提示',
        tip1: '在左侧配置区域启用并设置您需要的功能参数',
        tip2: '右侧会实时生成对应的配置代码',
        tip3: '复制生成的配置代码',
        tip4: '将代码添加到哪吒面板V1版本的自定义代码区域即可生效',
        instruction1: '1. 在左侧配置区域启用并设置您需要的功能参数',
        instruction2: '2. 右侧会实时生成对应的配置代码',
        instruction3: '3. 复制生成的配置代码',
        instruction4: '4. 将代码添加到哪吒面板的自定义代码区域即可生效',
        instruction5: '5. V1模式适用于哪吒面板V1版本，普通模式适用于V0版本',
        importConfigTitle: '导入配置',
        
        // 占位符文本
        outputPlaceholder: '// 生成的配置代码将在这里显示',
        importPlaceholder: '请粘贴配置代码...',
        
        // 配置分组标题
        basicConfig: '基础配置',
        displayConfig: '显示配置',
        monitorConfig: '监控配置',
        networkConfig: '网络配置',
        notificationConfig: '通知配置',
        advancedConfig: '高级配置',
        customCodeConfig: '自定义代码',
        
        // 默认配置值
        defaultTitle: '哪吒监控',
        defaultFreeAmount: '白嫖',
        defaultInfinityCycle: '长期有效',
        defaultBuyBtnText: '购买',
        
        // 配置字段标签
        websiteTitle: '网站标题',
        customFavicon: '自定义图标',
        footerSlogan: '页脚标语',
        freeServiceName: '免费服务名称',
        buyButtonText: '购买按钮文案',
        infinityCycleName: '无限周期名称',
        customBackgroundImage: '自定义背景图片',
        lightBackground: '浅色背景',
        
        // 配置字段占位符
        titlePlaceholder: '请输入网站标题',
        faviconPlaceholder: '请输入自定义favicon地址',
        sloganPlaceholder: '请输入页脚标语',
        freeAmountPlaceholder: '请输入免费服务的费用名称',
        buyBtnPlaceholder: '请输入购买按钮文案',
        infinityPlaceholder: '请输入无限周期名称',
        backgroundPlaceholder: '请输入自定义背景图片地址',
        
        // 配置字段说明
        titleRemark: '默认显示为"哪吒探针"',
        faviconRemark: '自定义favicon地址，建议您输入完整的图标地址',
        sloganRemark: '留空不占位，支持HTML代码（不支持script标签动态代码）',
        freeAmountRemark: '默认显示为"免费"，万一你想叫它"白嫖"呢？',
        buyBtnRemark: '默认显示为"购买"，万一你想叫它"下单"呢？',
        infinityRemark: '默认显示为"长期有效"，万一你想叫它"永久"呢？',
        backgroundRemark: '自定义背景图片地址，注意不要太大',
        lightBackgroundRemark: '启用浅色背景，会强制关闭点点背景，配合自定义背景图片使用',
        fireworksRemark: '启用烟花，建议开启浅色背景',
        lanternRemark: '启用"新年快乐"灯笼',
        innerSearchRemark: '启用内部搜索，默认启用',
        itemTypeToggleRemark: '启用列表项类型切换，启用后列表项类型会显示为切换按钮，可以切换为卡片和行',
        
        // 选择器选项
        cardOption: '卡片(card)',
        rowOption: '行(row)',
        progressOption: '进度条(progress)',
        donutOption: '饼图(donut)',
        topOption: '顶部(top)',
        bottomOption: '底部(bottom)',
        singleOption: '单个(single)',
        multiOption: '多个(multi)',
        
        // 选择器占位符
        selectItemType: '请选择列表项类型',
        selectListStatus: '请选择列表服务器状态类型',
        selectDetailStatus: '请选择详情服务器状态类型',
        selectHomeMapPos: '请选择首页地图位置',
        selectDetailMapPos: '请选择详情页地图位置',
        selectChartType: '请选择监控图表类型',
        selectNezhaVersion: '请选择哪吒版本',
        selectDataReadType: '请选择哪吒v0数据读取类型',
        selectRouteMode: '请选择路由模式',
        
        // 选择器说明
        itemTypeRemark: '列表项的显示类型',
        listStatusRemark: '列表页服务器状态的显示类型',
        detailStatusRemark: '详情页服务器状态的显示类型',
        homeMapRemark: '首页地图位置',
        detailMapRemark: '详情页地图位置',
        chartTypeRemark: '监控图表类型，single单独显示/multi聚合在一起',
        nezhaVersionRemark: '哪吒探针的版本，目前仅支持v0和v1，0.4.13前默认为v0，0.4.13后默认为自动处理',
        routeModeRemark: '默认为h5，如果是hash模式，需要后端支持',
        
        // 输入框占位符和说明
        monitorRefreshPlaceholder: '请输入监控刷新时间',
        monitorRefreshRemark: '监控刷新时间间隔，单位s（秒）, 0为不刷新，为保证不频繁请求源站，最低生效值为10s',
        gpuFilterPlaceholder: '请输入GPU过滤关键字',
        gpuFilterRemark: '按下Enter键(回车)确定关键词；如果GPU名称中包含这些关键字，则过滤掉',
        apiMonitorPlaceholder: '请输入网络服务监控API路径',
        apiMonitorRemark: '主要是网络服务那个监控数据的读取，目前只会替换关键词 {id}',
        wsPathPlaceholder: '请输入WebSocket路径',
        wsPathRemark: 'WebSocket连接路径',
        nezhaPathPlaceholder: '请输入哪吒路径',
        nezhaPathRemark: '哪吒探针的路径',
        v1ApiMonitorPlaceholder: '请输入v1监控API路径',
        v1ApiMonitorRemark: 'v1版本的监控API',
        v1WsPathPlaceholder: '请输入v1 WebSocket路径',
        v1WsPathRemark: 'v1版本的WebSocket连接路径',
        v1ApiGroupPlaceholder: '请输入v1分组API路径',
        v1ApiGroupRemark: 'v1版本的分组API',
        v1ApiSettingPlaceholder: '请输入v1设置API路径',
        v1ApiSettingRemark: 'v1版本的设置API',
        v1ApiProfilePlaceholder: '请输入v1用户信息API路径',
        v1ApiProfileRemark: 'v1版本的用户信息API',
        v1DashboardPlaceholder: '请输入v1控制台地址',
        v1DashboardRemark: 'v1版本的控制台地址，默认为 /dashboard',
        
        // 开关配置说明
        realTimeLoadRemark: '列表实时显示负载',
        simpleColorRemark: '启用简约色系',
        statusLinearRemark: '服务器状态渐变线性显示 - 与简约色系互斥',
        disableFontRemark: '禁用Sarasa Term SC字体',
        hideMapRemark: '隐藏地图后，首页和详情页都不会显示地图',
        hideServerCountRemark: '隐藏导航栏的服务器数量统计',
        hideServerStatRemark: '隐藏导航栏的服务器统计信息',
        hideStatusDonutRemark: '隐藏列表项的状态饼图，不影响详情页的状态饼图',
        hideItemStatRemark: '隐藏列表项的统计信息，不影响详情页的统计信息',
        hideItemBillRemark: '隐藏列表项的账单信息，不影响详情页的账单信息',
        hideFilterRemark: '隐藏列表页的标签和在线/离线筛选功能',
        hideTagRemark: '隐藏列表项的标签筛选功能',
        hideDotBGRemark: '隐藏盒子里面的点阵背景',
        chartTypeToggleRemark: '启用监控图表类型切换',
        dataReadTypeRemark: '哪吒v0数据读取类型',
        hideDashboardBtnRemark: '隐藏导航栏的控制台入口/登录按钮',
        
        // 生成代码相关
        codeGeneratedBy: '// 本代码由哪吒面板工具生成',
        toolWebsite: '// 工具网址: https://nztools.xxxx.im',
        configJson: '// 配置JSON',
        generateError: '// 生成配置时出错: ',
        
        // 页面初始化
        pageInitComplete: '美化页面初始化完成',
        loadLocalConfigError: '加载本地配置失败',
        
        // 导入配置
        importContentEmpty: '请输入配置内容',
        importSuccess: '配置导入成功',
        importFormatError: '配置格式错误，请检查JSON格式',
        
        // 美化配置选项
        themeSelect: '主题选择',
        defaultTheme: '默认主题',
        darkTheme: '深色主题',
        blueTheme: '蓝色主题',
        greenTheme: '绿色主题',
        purpleTheme: '紫色主题',
        primaryColor: '主色调',
        backgroundColor: '背景色',
        borderRadius: '圆角大小',
        fontSize: '字体大小',
        animations: '动画效果',
        animationsDesc: '启用页面过渡动画',
        shadows: '阴影效果',
        shadowsDesc: '为卡片添加阴影效果',
        gradients: '渐变背景',
        gradientsDesc: '使用渐变色背景',
        customCSS: '自定义CSS',
        
        // 美化页面字段翻译
        beautifyFields: {
            title: '网站标题',
            customFavicon: '自定义favicon',
            footerSlogan: '页脚标语',
            freeAmount: '免费的叫啥',
            buyBtnText: '购买按钮文案',
            infinityCycle: '无限周期名称',
            customBackgroundImage: '自定义背景图片',
            lightBackground: '启用浅色背景',
            showFireworks: '启用烟花',
            showLantern: '启用灯笼',
            enableInnerSearch: '启用内部搜索',
            listServerItemTypeToggle: '列表项类型切换',
            listServerItemType: '列表项类型',
            listServerStatusType: '列表服务器状态类型',
            listServerRealTimeShowLoad: '列表实时显示负载',
            detailServerStatusType: '详情服务器状态类型',
            simpleColorMode: '启用简约色系',
            serverStatusLinear: '服务器状态渐变',
            disableSarasaTermSC: '禁用内置字体',
            hideWorldMap: '隐藏地图',
            hideHomeWorldMap: '首页隐藏地图',
            hideDetailWorldMap: '详情页隐藏地图',
            homeWorldMapPosition: '首页地图位置',
            detailWorldMapPosition: '详情页地图位置',
            hideNavbarServerCount: '隐藏服务器数量',
            hideNavbarServerStat: '隐藏服务器统计',
            hideListItemStatusDonut: '隐藏列表饼图',
            hideListItemStat: '隐藏列表统计',
            hideListItemBill: '隐藏列表账单',
            hideFilter: '隐藏筛选',
            hideTag: '隐藏标签',
            hideDotBG: '隐藏点阵背景',
            monitorRefreshTime: '监控刷新时间',
            monitorChartType: '监控图表类型',
            monitorChartTypeToggle: '监控图表类型切换',
            filterGPUKeywords: 'GPU过滤关键字',
            nezhaVersion: '哪吒版本',
            apiMonitorPath: '监控API地址',
            wsPath: 'WebSocket地址',
            nezhaPath: '哪吒路径',
            nezhaV0ConfigType: '哪吒v0数据读取类型',
            v1ApiMonitorPath: 'v1监控API地址',
            v1WsPath: 'v1 WebSocket地址',
            v1ApiGroupPath: 'v1分组API地址',
            v1ApiSettingPath: 'v1设置API地址',
            v1ApiProfilePath: 'v1用户信息地址',
            v1DashboardUrl: 'v1控制台地址',
            v1HideNezhaDashboardBtn: '隐藏控制台按钮',
            routeMode: '路由模式'
        }
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = cnTranslations;
} else if (typeof window !== 'undefined') {
    window.cnTranslations = cnTranslations;
}