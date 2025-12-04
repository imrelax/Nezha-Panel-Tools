// 英文翻译文件
const enTranslations = {
    // 通用翻译 (common)
    common: {
        // 基础文本
        title: 'Nezha Panel Tools',
        home: 'Home',
        traffic: 'Traffic Monitor',
        alert: 'Alert Rules',

        english: 'English',
        close: 'Close',
        copy: 'Copy',
        refresh: 'Refresh',
        cancel: 'Cancel',
        confirm: 'Confirm',
        warning: 'Warning',
        beautify: 'Beautify',
        compress: 'Compress',
        clear: 'Clear',
        
        // 操作提示信息
        refreshSuccess: 'Refreshed Successfully',
        copySuccess: 'Copied Successfully',
        configRefreshed: 'Configuration Refreshed',
        resetSuccess: 'Configuration Reset To Default Values',
        copyFailed: 'Copy Failed',
        refreshFailed: 'Refresh Failed',
        emptyContent: 'No Content To Copy',
        operationSuccess: 'Operation Successful',
        operationFailed: 'Operation Failed',
        
        // 错误和状态消息
        globalError: 'Global Error',
        typeError: 'Type Error',
        moduleLoadError: 'Module Load Failed',
        jsonError: 'JSON Format Error',
        promiseRejection: 'Promise Rejection',
        networkError: 'Network Request Failed',
        parseError: 'Data Parse Failed',
        pageInitError: 'Page Initialization Failed',
        configUpdateError: 'Configuration Update Failed',
        appUpdated: 'Application Updated',
        pageVisible: 'Page Visible',
        
        // 占位符文本
        jsonPlaceholder: 'JSON configuration will be displayed here...',
        addTagPlaceholder: 'Add tags...',
        
        // 通用提示信息
        noContentToCopy: 'No content to copy',
        copyToClipboard: 'Copy to clipboard',
        manualCopy: 'Manual copy',
        targetNotFound: 'Target element not found',
        copyError: 'Copy operation failed',
        refreshFailedNew: 'Refresh failed',
        
        // 页面导航
        indexPage: 'Billing Configuration',
        trafficPage: 'Traffic Monitor',
        alertPage: 'Alert Configuration',
        servicePage: 'Service',
        beautifyPage: 'Panel Design',
        
        // 功能标题
        jsonBeautify: 'JSON Beautify Tool',
        
        // 页脚信息
        footerText: '© 2025 Nezha Panel Tools. All rights reserved.',
        madeWith: 'Made with',
        and: 'and',
        madeBy: 'by',
        projectInfo: 'Project Info',
        projectDescription: 'Nezha Panel Tools',
        version: 'Version: 2.0.2',
        lastUpdate: 'Last Update: December 4, 2025',
        relatedLinks: 'Related Links',
        sourceCode: 'Source Code',
        nezhaOfficial: 'Nezha Official',
        authorSite: 'Author Site',
        siteRelated: 'Site Related',
        siteSource: 'Site Source',
        siteAuthor: 'Site Author',
        siteAbout: 'Site About',
        license: 'License',
        licenseType: 'MIT License',
        openSource: 'Open Source Free Use',
        contribution: 'Welcome Code Contribution',
        allRightsReserved: 'All Rights Reserved',
        

        

        
        // 通用操作
        refreshSuccessOld: 'Refreshed Successfully',
        copySuccessOld: 'Copied Successfully',
        unlimited: 'Unlimited',
        loading: 'Loading...',
        loadError: 'Loading Failed, Please Try Again Later'
    },
    
    // 首页翻译 (index)
    index: {
        // 页面标题和描述
        pageTitle: 'Nezha Panel Tools - Billing Configuration Generator',
        pageDescription: 'Nezha Panel Tools, Supports Billing Configuration And Plan Configuration Generation, Quickly Generates JSON Configuration Files For Nezha Monitoring Panel',
        pageKeywords: 'Nezha Panel,JSON Generator,Billing Configuration,Plan Configuration,Server Monitoring,Configuration Tool',
        
        // 配置标题
        billingConfig: 'Billing Settings',
        planConfig: 'Plan Settings',
        jsonConfig: 'JSON Output',
        
        // 表单字段
        type: 'Type',
        ignoreList: 'Ignore Servers (Comma-Separated IDs)',
        autoCalc: 'Auto Calculate',
        billingCycle: 'Billing Period',
        minValue: 'Minimum Value',
        maxValue: 'Maximum Value',
        duration: 'Duration (Seconds)',
        cover: 'Cover',
        ignoreServers: 'Ignore Servers (Comma-Separated IDs)',
        trafficVolume: 'Traffic Quota',
        trafficType: 'Traffic Type',
        inboundTraffic: 'Inbound Traffic',
        outboundTraffic: 'Outbound Traffic',
        bidirectionalTraffic: 'Bidirectional Traffic',
        cycleStart: 'Cycle Start',
        cycleInterval: 'Cycle Interval',
        cycleUnit: 'Cycle Unit',
        
        // 账单信息
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
        extraTags: 'Additional Tags',
        
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
        
        // 流量类型翻译
        trafficTypes: {
            '1': 'Inbound',
            '2': 'Bidirectional'
        },
        
        // 时间单位翻译
        timeUnits: {
            'hour': 'Hour',
            'day': 'Day',
            'week': 'Week',
            'month': 'Month',
            'year': 'Year'
        },
        
        // Network line types description
        networkLineTypes: 'Network Line Types Description',
        lineTypeLabel: 'Label',
        lineTypeMeaning: 'Meaning',
        lineTypeScenario: 'Applicable Scenario',
        
        // Network Line Types
        lineType163: 'China Telecom Regular International Line (AS4134)',
        lineType163Desc: 'Regular International Network, Low Price But High Latency And Packet Loss',
        lineTypeCN2: 'China Telecom CN2 GT (Global Transit) Line',
        lineTypeCN2Desc: 'More Stable Than Regular 163 Line, But Not The Optimal High-End Line',
        lineTypeCN2GIA: 'China Telecom CN2 GIA (Global Internet Access) Line',
        lineTypeCN2GIADesc: 'High-End Line, Low Latency, Low Packet Loss, Suitable For Gaming/Video',
        lineTypeCMI: 'China Mobile International Line (CMI, China Mobile International)',
        lineTypeCMIDesc: 'Optimized For Mobile Users Accessing Overseas Networks',
        lineTypeCMIN2: 'China Mobile High-End CN2-Level Optimized Line (Similar To Telecom CN2)',
        lineTypeCMIN2Desc: 'High-Quality International Network For Mobile Users',
        lineType4837: 'China Unicom AS4837 International Line',
        lineType4837Desc: 'Commonly Used By Unicom Users, Moderate Cost-Performance',
        lineType10099: 'China Unicom CUII (China Unicom International IP) Line',
        lineType10099Desc: 'Unicom High-End Optimized Line, More Stable Than 4837',
        lineTypeIEPL: 'International Ethernet Private Line',
        lineTypeIEPLDesc: 'Enterprise-Grade Low Latency Private Line, High Price',
        lineTypeIPLC: 'International Private Leased Circuit',
        lineTypeIPLCDesc: 'Highest Quality Private Line, Fully Dedicated Bandwidth, No Public Network Interference'
    },
    
    // 告警规则翻译 (alert)
    alert: {
        // 页面标题和描述
        pageTitle: 'Nezha Panel Tools - Alert Rules Configuration',
        pageDescription: 'Nezha Panel Tools, Supports Alert Rules Configuration, Quickly Generates JSON Configuration Files For Nezha Monitoring Panel',
        pageKeywords: 'Nezha Panel,JSON Generator,Alert Rules,Server Monitoring,Configuration Tool',
        
        // 配置标题
        alertRules: 'Alert Rules',
        
        // 表单字段
        type: 'Type',
        minValue: 'Minimum Value',
        maxValue: 'Maximum Value',
        duration: 'Duration (Seconds)',
        cover: 'Cover',
        ignoreServers: 'Ignore Servers (Comma-Separated IDs)',
        jsonConfig: 'JSON Output',
        
        // 警报类型翻译
        alertTypes: {
            'cpu': 'CPU Usage',
            'gpu': 'GPU Usage',
            'memory': 'Memory Usage',
            'swap': 'Swap Usage',
            'disk': 'Disk Usage',
            'net_in_speed': 'Inbound Speed',
            'net_out_speed': 'Outbound Speed',
            'net_all_speed': 'Total Speed',
            'transfer_in': 'Inbound Traffic',
            'transfer_out': 'Outbound Traffic',
            'transfer_all': 'Total Traffic',
            'offline': 'Offline',
            'load1': '1-Min Load',
            'load5': '5-Min Load',
            'load15': '15-Min Load',
            'process_count': 'Process Count',
            'tcp_conn_count': 'TCP Connections',
            'udp_conn_count': 'UDP Connections',
            'temperature_max': 'Max Temperature'
        },
        
        // 时间单位翻译
        timeUnits: {
            'hour': 'Hour',
            'day': 'Day',
            'week': 'Week',
            'month': 'Month',
            'year': 'Year'
        }
    },
    
    // 流量监控翻译 (traffic)
    traffic: {
        // 页面标题和描述
        pageTitle: 'Nezha Panel Tools - Traffic Monitoring Rules Configuration',
        pageDescription: 'Nezha Panel Tools, Supports Traffic Monitoring Rules Configuration, Quickly Generates JSON Configuration Files For Nezha Monitoring Panel',
        pageKeywords: 'Nezha Panel,JSON Generator,Traffic Monitoring,Server Monitoring,Configuration Tool',
        
        // 配置标题
        trafficMonitoring: 'Traffic Monitoring Rules',
        
        // 表单字段
        type: 'Type',
        minValue: 'Minimum Value',
        maxValue: 'Maximum Value',
        cover: 'Cover',
        jsonConfig: 'JSON Output',
        cycleStart: 'Cycle Start',
        cycleInterval: 'Cycle Interval',
        cycleUnit: 'Cycle Unit',
        ignoreList: 'Ignore Servers (Comma-Separated IDs)',
        inboundTraffic: 'Inbound Traffic',
        outboundTraffic: 'Outbound Traffic',
        bidirectionalTraffic: 'Bidirectional Traffic',
        
        // 流量周期选项
        trafficPeriods: {
            'Day': 'Day',
            'Month': 'Month',
            'Quarter': 'Quarter',
            'Year': 'Year',
            'Unlimited': 'Unlimited'
        },
        
        // 流量类型翻译
        trafficTypes: {
            '1': 'Inbound',
            '2': 'Bidirectional'
        },
        
        // 时间单位翻译
        timeUnits: {
            'hour': 'Hour',
            'day': 'Day',
            'week': 'Week',
            'month': 'Month',
            'year': 'Year'
        }
    },
    
    // 服务页面翻译 (service)
    service: {
        // 页面标题和描述
        pageTitle: 'Nezha Panel Tools - Service',
        pageDescription: 'Nezha Panel Tools, Service IP Address Query',
        pageKeywords: 'Nezha Panel,IP Address,Server Monitoring,Network Service',
        
        // 服务页面
        serviceTitle: 'IP Address Service',
        serviceDescription: 'View IP Address Information For Operators Across Regions In China',
        region: 'Region',
        unicom: 'China Unicom',
        mobile: 'China Mobile',
        telecom: 'China Telecom',
        serviceHelpText: 'Don\'t Know How To Use This Feature?',
        viewTutorial: 'View Tutorial',
        routeQuery: 'Route Query'
    },
    
    // 美化页面翻译 (beautify)
    beautify: {
        // 页面标题和描述
        pageTitle: 'Nezha Panel Tools - Panel Beautify',
        pageDescription: 'Nezha Panel Beautification Tool, Generates JSON Configuration Files To Optimize Panel Styles',
        pageKeywords: 'Nezha Panel,Beautification,Style Optimization,JSON Configuration,Panel Customization',
        
        // 美化页面
        beautifyTitle: 'Panel Design',
        beautifyDescription: 'Optimize Nezha Panel Styles, Generate JSON Configuration Files For Beautification Effects',
        beautifyHelpText: 'Configure Nezha Panel V1 Version Custom Parameters, Generate Configuration Code For Import Into Panel Backend To Achieve Beautification Effects',
        beautifyBasedOn: 'This Page Functionality Is Based On',
        beautifyOptimized: ', Optimized Specifically For Nezha Panel V1 Version.',
        v1ModeLabel: 'V1 Mode',
        configSettings: 'Configuration Settings',
        resetConfig: 'Reset Configuration',
        resetConfigDesc: 'Reset All Configurations To Default Values',
        resetConfirm: 'Are You Sure You Want To Reset All Configurations? This Operation Cannot Be Undone.',
        resetConfigConfirm: 'Are You Sure You Want To Reset All Configurations? This Action Cannot Be Undone.',
        resetSuccess: 'Configuration Has Been Reset To Initial Values',
        importConfig: 'Import Configuration',
        loadingConfig: 'Loading Configuration Options...',
        configCode: 'Configuration Code',
        usageInstructions: 'Usage Instructions',
        usageTips: 'Usage Tips',
        tip1: 'Enable And Configure The Function Parameters You Need In The Left Configuration Area',
        tip2: 'The Corresponding Configuration Code Will Be Generated In Real-Time On The Right',
        tip3: 'Copy The Generated Configuration Code',
        tip4: 'Add The Code To The Custom Code Area Of Nezha Panel V1 Version To Take Effect',
        instruction1: '1. Enable And Configure The Function Parameters You Need In The Left Configuration Area',
        instruction2: '2. The Corresponding Configuration Code Will Be Generated In Real-Time On The Right',
        instruction3: '3. Copy The Generated Configuration Code',
        instruction4: '4. Add The Code To The Custom Code Area Of Nezha Panel To Take Effect',
        instruction5: '5. V1 Mode Is Suitable For Nezha Panel V1 Version, Normal Mode Is Suitable For V0 Version',
        importConfigTitle: 'Import Configuration',
        importConfigDesc: 'Import Existing Configuration For Editing',
        importConfigPlaceholder: 'Please Paste The Configuration JSON Code Here...',
        importConfigButton: 'Import Configuration',
        importConfigSuccess: 'Configuration Imported Successfully',
        importConfigError: 'Configuration Import Failed, Please Check The Format',
        
        // 美化配置选项
        themeSelect: 'Theme Selection',
        defaultTheme: 'Default Theme',
        darkTheme: 'Dark Theme',
        blueTheme: 'Blue Theme',
        greenTheme: 'Green Theme',
        purpleTheme: 'Purple Theme',
        primaryColor: 'Primary Color',
        backgroundColor: 'Background Color',
        borderRadius: 'Border Radius',
        fontSize: 'Font Size',
        animations: 'Animations',
        animationsDesc: 'Enable Page Transition Animations',
        shadows: 'Shadow Effects',
        shadowsDesc: 'Add Shadow Effects To Cards',
        gradients: 'Gradient Background',
        gradientsDesc: 'Use Gradient Color Backgrounds',
        customCSS: 'Custom CSS',
        customCSSDesc: 'Add Custom CSS Styles',
        customCSSPlaceholder: 'Enter Custom CSS Code...',
        
        // 美化页面字段翻译
        // Placeholder texts
        outputPlaceholder: '// Generated configuration code will be displayed here',
        importPlaceholder: 'Please paste configuration code...',
        
        // Configuration group titles
        basicConfig: 'Basic Configuration',
        displayConfig: 'Display Configuration',
        monitorConfig: 'Monitor Configuration',
        networkConfig: 'Network Configuration',
        notificationConfig: 'Notification Configuration',
        advancedConfig: 'Advanced Configuration',
        customCodeConfig: 'Custom Code',
        
        // Default configuration values
        defaultTitle: 'Nezha Monitor',
        defaultFreeAmount: 'Free',
        defaultInfinityCycle: 'Long-term Valid',
        defaultBuyBtnText: 'Buy',
        
        // Configuration field labels
        websiteTitle: 'Website Title',
        customFavicon: 'Custom Icon',
        footerSlogan: 'Footer Slogan',
        freeServiceName: 'Free Service Name',
        buyButtonText: 'Buy Button Text',
        infinityCycleName: 'Infinity Cycle Name',
        customBackgroundImage: 'Custom Background Image',
        lightBackground: 'Light Background',
        
        // Configuration field placeholders
        titlePlaceholder: 'Please enter website title',
        faviconPlaceholder: 'Please enter custom favicon URL',
        sloganPlaceholder: 'Please enter footer slogan',
        freeAmountPlaceholder: 'Please enter free service fee name',
        buyBtnPlaceholder: 'Please enter buy button text',
        infinityPlaceholder: 'Please enter infinity cycle name',
        backgroundPlaceholder: 'Please enter custom background image URL',
        
        // Configuration field descriptions
        titleRemark: 'Default display as "Nezha Probe"',
        faviconRemark: 'Custom favicon URL, recommend entering complete icon address',
        sloganRemark: 'Leave empty for no placeholder, supports HTML code (script tags not supported)',
        freeAmountRemark: 'Default display as "Free", what if you want to call it "Freebie"?',
        buyBtnRemark: 'Default display as "Buy", what if you want to call it "Order"?',
        infinityRemark: 'Default display as "Long-term Valid", what if you want to call it "Permanent"?',
        backgroundRemark: 'Custom background image URL, note not too large',
        lightBackgroundRemark: 'Enable light background, will force disable dot background, use with custom background image',
        fireworksRemark: 'Enable fireworks, recommend enabling light background',
        lanternRemark: 'Enable "Happy New Year" lanterns',
        innerSearchRemark: 'Enable inner search, enabled by default',
        itemTypeToggleRemark: 'Enable list item type toggle, when enabled list item type will show as toggle button, can switch between card and row',
        
        // Selector options
        cardOption: 'Card',
        rowOption: 'Row',
        progressOption: 'Progress',
        donutOption: 'Donut',
        topOption: 'Top',
        bottomOption: 'Bottom',
        singleOption: 'Single',
        multiOption: 'Multi',
        
        // Selector placeholders
        selectItemType: 'Please select list item type',
        selectListStatus: 'Please select list server status type',
        selectDetailStatus: 'Please select detail server status type',
        selectHomeMapPos: 'Please select home map position',
        selectDetailMapPos: 'Please select detail map position',
        selectChartType: 'Please select monitor chart type',
        selectNezhaVersion: 'Please select Nezha version',
        selectDataReadType: 'Please select Nezha v0 data read type',
        selectRouteMode: 'Please select route mode',
        
        // Selector descriptions
        itemTypeRemark: 'Display type of list items',
        listStatusRemark: 'Display type of server status on list page',
        detailStatusRemark: 'Display type of server status on detail page',
        homeMapRemark: 'Home page map position',
        detailMapRemark: 'Detail page map position',
        chartTypeRemark: 'Monitor chart type, single display separately/multi aggregate together',
        nezhaVersionRemark: 'Nezha probe version, currently only supports v0 and v1, before 0.4.13 defaults to v0, after 0.4.13 defaults to auto handling',
        routeModeRemark: 'Default is h5, if hash mode, backend support required',
        
        // Input field placeholders and descriptions
        monitorRefreshPlaceholder: 'Please enter monitor refresh time',
        monitorRefreshRemark: 'Monitor refresh time interval, unit s (seconds), 0 for no refresh, to ensure not frequent requests to source site, minimum effective value is 10s',
        gpuFilterPlaceholder: 'Please enter GPU filter keywords',
        gpuFilterRemark: 'Press Enter key to confirm keywords; if GPU name contains these keywords, filter them out',
        apiMonitorPlaceholder: 'Please enter network service monitor API path',
        apiMonitorRemark: 'Mainly for network service monitor data reading, currently only replaces keyword {id}',
        wsPathPlaceholder: 'Please enter WebSocket path',
        wsPathRemark: 'WebSocket connection path',
        nezhaPathPlaceholder: 'Please enter Nezha path',
        nezhaPathRemark: 'Nezha probe path',
        v1ApiMonitorPlaceholder: 'Please enter v1 monitor API path',
        v1ApiMonitorRemark: 'v1 version monitor API',
        v1WsPathPlaceholder: 'Please enter v1 WebSocket path',
        v1WsPathRemark: 'v1 version WebSocket connection path',
        v1ApiGroupPlaceholder: 'Please enter v1 group API path',
        v1ApiGroupRemark: 'v1 version group API',
        v1ApiSettingPlaceholder: 'Please enter v1 setting API path',
        v1ApiSettingRemark: 'v1 version setting API',
        v1ApiProfilePlaceholder: 'Please enter v1 profile API path',
        v1ApiProfileRemark: 'v1 version profile API',
        v1DashboardPlaceholder: 'Please enter v1 dashboard URL',
        v1DashboardRemark: 'v1 version dashboard URL, default is /dashboard',
        
        // Switch configuration descriptions
        showFireworks: 'Enable Fireworks',
        showLantern: 'Enable Lantern',
        enableInnerSearch: 'Enable Inner Search',
        listServerItemTypeToggle: 'List Item Type Toggle',
        listServerItemType: 'List Item Type',
        listServerStatusType: 'List Server Status Type',
        listServerRealTimeShowLoad: 'List Real-Time Show Load',
        detailServerStatusType: 'Detail Server Status Type',
        simpleColorMode: 'Enable Simple Color Mode',
        serverStatusLinear: 'Server Status Linear',
        disableSarasaTermSC: 'Disable Built-In Font',
        hideWorldMap: 'Hide World Map',
        hideHomeWorldMap: 'Hide Home World Map',
        hideDetailWorldMap: 'Hide Detail World Map',
        homeWorldMapPosition: 'Home World Map Position',
        detailWorldMapPosition: 'Detail World Map Position',
        hideNavbarServerCount: 'Hide Server Count',
        hideNavbarServerStat: 'Hide Server Statistics',
        hideListItemStatusDonut: 'Hide List Status Donut',
        hideListItemStat: 'Hide List Statistics',
        hideListItemBill: 'Hide List Bill',
        hideFilter: 'Hide Filter',
        hideTag: 'Hide Tag',
        hideDotBG: 'Hide Dot Background',
        monitorRefreshTime: 'Monitor Refresh Time',
        monitorChartType: 'Monitor Chart Type',
        monitorChartTypeToggle: 'Monitor Chart Type Toggle',
        filterGPUKeywords: 'GPU Filter Keywords',
        nezhaVersion: 'Nezha Version',
        apiMonitorPath: 'Monitor API Path',
        wsPath: 'WebSocket Path',
        nezhaPath: 'Nezha Path',
        nezhaV0ConfigType: 'Nezha V0 Config Type',
        v1ApiMonitorPath: 'V1 Monitor API Path',
        v1WsPath: 'V1 WebSocket Path',
        v1ApiGroupPath: 'V1 Group API Path',
        v1ApiSettingPath: 'V1 Setting API Path',
        v1ApiProfilePath: 'V1 Profile API Path',
        v1DashboardUrl: 'V1 Dashboard URL',
        v1HideNezhaDashboardBtn: 'Hide Dashboard Button',
        routeMode: 'Route Mode',
        
        // Switch configuration detailed descriptions
        realTimeLoadRemark: 'List real-time display load',
        simpleColorRemark: 'Enable simple color mode',
        statusLinearRemark: 'Server status gradient linear display - mutually exclusive with simple color mode',
        disableFontRemark: 'Disable Sarasa Term SC font',
        hideMapRemark: 'After hiding map, both home and detail pages will not display map',
        hideServerCountRemark: 'Hide server count statistics in navigation bar',
        hideServerStatRemark: 'Hide server statistics information in navigation bar',
        hideStatusDonutRemark: 'Hide status donut chart in list items, does not affect detail page status donut chart',
        hideItemStatRemark: 'Hide statistics information in list items, does not affect detail page statistics information',
        hideItemBillRemark: 'Hide bill information in list items, does not affect detail page bill information',
        hideFilterRemark: 'Hide tag and online/offline filter function on list page',
        hideTagRemark: 'Hide tag filter function in list items',
        hideDotBGRemark: 'Hide dot background inside boxes',
        chartTypeToggleRemark: 'Enable monitor chart type toggle',
        dataReadTypeRemark: 'Nezha v0 data read type',
        hideDashboardBtnRemark: 'Hide dashboard entry/login button in navigation bar',
        
        // Generated code related
        codeGeneratedBy: '// This code is generated by Nezha Panel Tools',
        toolWebsite: '// Tool website: https://nztools.xxxx.im',
        configJson: '// Configuration JSON',
        generateError: '// Error generating configuration: ',
        
        // Page initialization
        pageInitComplete: 'Beautify page initialization complete',
        loadLocalConfigError: 'Failed to load local configuration',
        
        // Import configuration
        importContentEmpty: 'Please enter configuration content',
        importSuccess: 'Configuration imported successfully',
        importFormatError: 'Configuration format error, please check JSON format',
        
        // Legacy field mappings for compatibility
        beautifyFields: {
            title: 'Website Title',
            customFavicon: 'Custom Favicon',
            footerSlogan: 'Footer Slogan',
            freeAmount: 'Free Amount Name',
            buyBtnText: 'Buy Button Text',
            infinityCycle: 'Infinity Cycle Name',
            customBackgroundImage: 'Custom Background Image',
            lightBackground: 'Enable Light Background',
            showFireworks: 'Enable Fireworks',
            showLantern: 'Enable Lantern',
            enableInnerSearch: 'Enable Inner Search',
            listServerItemTypeToggle: 'List Item Type Toggle',
            listServerItemType: 'List Item Type',
            listServerStatusType: 'List Server Status Type',
            listServerRealTimeShowLoad: 'List Real-Time Show Load',
            detailServerStatusType: 'Detail Server Status Type',
            simpleColorMode: 'Enable Simple Color Mode',
            serverStatusLinear: 'Server Status Linear',
            disableSarasaTermSC: 'Disable Built-In Font',
            hideWorldMap: 'Hide World Map',
            hideHomeWorldMap: 'Hide Home World Map',
            hideDetailWorldMap: 'Hide Detail World Map',
            homeWorldMapPosition: 'Home World Map Position',
            detailWorldMapPosition: 'Detail World Map Position',
            hideNavbarServerCount: 'Hide Server Count',
            hideNavbarServerStat: 'Hide Server Statistics',
            hideListItemStatusDonut: 'Hide List Status Donut',
            hideListItemStat: 'Hide List Statistics',
            hideListItemBill: 'Hide List Bill',
            hideFilter: 'Hide Filter',
            hideTag: 'Hide Tag',
            hideDotBG: 'Hide Dot Background',
            monitorRefreshTime: 'Monitor Refresh Time',
            monitorChartType: 'Monitor Chart Type',
            monitorChartTypeToggle: 'Monitor Chart Type Toggle',
            filterGPUKeywords: 'GPU Filter Keywords',
            nezhaVersion: 'Nezha Version',
            apiMonitorPath: 'Monitor API Path',
            wsPath: 'WebSocket Path',
            nezhaPath: 'Nezha Path',
            nezhaV0ConfigType: 'Nezha V0 Config Type',
            v1ApiMonitorPath: 'V1 Monitor API Path',
            v1WsPath: 'V1 WebSocket Path',
            v1ApiGroupPath: 'V1 Group API Path',
            v1ApiSettingPath: 'V1 Setting API Path',
            v1ApiProfilePath: 'V1 Profile API Path',
            v1DashboardUrl: 'V1 Dashboard URL',
            v1HideNezhaDashboardBtn: 'Hide Dashboard Button',
            routeMode: 'Route Mode',
            previewMode: 'Preview Mode',
            previewModeDesc: 'Enable Preview Mode To See Effects In Real-Time'
        }
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = enTranslations;
} else if (typeof window !== 'undefined') {
    window.enTranslations = enTranslations;
}