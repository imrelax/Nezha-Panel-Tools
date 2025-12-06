export const en = {
    // 通用翻译 (common)
    common: {
        // 基础文本
        title: 'Nezha Panel Tools',
        home: 'Home',
        traffic: 'Traffic Monitor',
        alert: 'Alert Rules',
        service: 'Service',
        english: 'English',
        chinese: 'Chinese',
        close: 'Close',
        copy: 'Copy',
        refresh: 'Refresh',
        cancel: 'Cancel',
        confirm: 'Confirm',
        warning: 'Warning',
        reset: 'Reset',
        retry: 'Retry',
        optional: 'Optional',
        beautify: 'Beautify',
        compress: 'Compress',
        clear: 'Clear',
        
        // 页面导航
        indexPage: 'Billing Configuration',
        trafficPage: 'Traffic Monitor',
        alertPage: 'Alert Configuration',
        servicePage: 'Service',
        beautifyPage: 'Panel Design',
        
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
        siteAbout: 'About Us',
        license: 'License',
        licenseType: 'MIT License',
        openSource: 'Open Source Free Use',
        contribution: 'Welcome Code Contribution',
        allRightsReserved: 'All Rights Reserved',
        
        // 通用操作
        refreshSuccess: 'Refreshed Successfully',
        copySuccess: 'Copied Successfully',
        copyFailed: 'Copy Failed',
        unlimited: 'Unlimited',
        loading: 'Loading...',
        loadError: 'Loading Failed, Please Try Again Later',
        
        // 错误消息
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
        
        // 通用占位符
        jsonPlaceholder: 'JSON configuration will be displayed here...',
        addTagPlaceholder: 'Add tags...',
        
        // 通用提示
        noContentToCopy: 'No content to copy',
        copyToClipboard: 'Copy to clipboard',
        manualCopy: 'Manual copy',
        targetNotFound: 'Target element not found',
        copyError: 'Copy operation failed',
        refreshFailed: 'Refresh failed'
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
        
        // 按钮文本
        calculateEndDate: 'Calculate End Date'
    },

    // 告警规则翻译 (alert)
    alert: {
        pageTitle: 'Nezha Panel Tools - Alert Configuration',
        pageDescription: 'Nezha Panel Tools, Supports Alert Rules Configuration, Quickly Generates JSON Configuration Files For Nezha Monitoring Panel',
        alertRules: 'Alert Rules',
        type: 'Type',
        minValue: 'Minimum Value',
        maxValue: 'Maximum Value',
        duration: 'Duration (Seconds)',
        cover: 'Cover',
        ignoreServers: 'Ignore Servers (Comma-Separated IDs)',
        multipleServersTip: 'Multiple server IDs separated by commas',
        
        // Alert Types
        types: {
            cpu: 'CPU Usage',
            gpu: 'GPU Usage',
            memory: 'Memory Usage',
            swap: 'Swap Usage',
            disk: 'Disk Usage',
            net_in_speed: 'Inbound Speed',
            net_out_speed: 'Outbound Speed',
            net_all_speed: 'Total Speed',
            transfer_in: 'Inbound Traffic',
            transfer_out: 'Outbound Traffic',
            transfer_all: 'Total Traffic',
            offline: 'Offline Status',
            load1: 'Load (1 min)',
            load5: 'Load (5 min)',
            load15: 'Load (15 min)',
            process_count: 'Process Count',
            tcp_conn_count: 'TCP Connections',
            udp_conn_count: 'UDP Connections',
            temperature_max: 'Max Temperature'
        }
    },

    // 流量监控翻译 (traffic)
    traffic: {
        pageTitle: 'Nezha Panel Tools - Traffic Monitor Configuration',
        pageDescription: 'Nezha Panel Tools, Supports Traffic Monitor Configuration, Quickly Generates JSON Configuration Files For Nezha Monitoring Panel',
        trafficMonitor: 'Traffic Monitor',
        cycleStart: 'Cycle Start',
        cycleInterval: 'Cycle Interval',
        cycleUnit: 'Cycle Unit',
        cover: 'Cover',
        ignoreServers: 'Ignore Servers (Comma-Separated IDs)',
        minTraffic: 'Minimum Traffic',
        maxTraffic: 'Maximum Traffic',
        
        // Form field translations
        type: 'Type',
        minValue: 'Minimum Value',
        maxValue: 'Maximum Value',
        ignoreList: 'Ignore Servers',
        multipleServersTip: 'Multiple server IDs separated by commas',
        
        // Traffic types translation
        types: {
            'transfer_out_cycle': 'Outbound Traffic Cycle',
            'transfer_in_cycle': 'Inbound Traffic Cycle',
            'transfer_all_cycle': 'Total Traffic Cycle',
            'net_out_speed': 'Outbound Speed',
            'net_in_speed': 'Inbound Speed',
            'net_all_speed': 'Total Speed'
        },
        
        // Units translation
        units: {
            'second': 'Second',
            'minute': 'Minute',
            'hour': 'Hour',
            'day': 'Day',
            'week': 'Week',
            'month': 'Month',
            'B': 'Byte',
            'KB': 'Kilobyte',
            'MB': 'Megabyte',
            'GB': 'Gigabyte',
            'TB': 'Terabyte',
            'minValue': 'Minimum Value',
            'maxValue': 'Maximum Value'
        }
    },

    // 服务翻译 (service)
    service: {
        pageTitle: 'Nezha Panel Tools - IP Service',
        pageDescription: 'Nezha Panel Tools, Provides IP Query And Other Services',
        ipService: 'IP Address Service',
        serviceDescription: 'View IP address information of operators in various regions of China',
        howToUse: 'Don\'t know how to use this feature?',
        viewTutorial: 'View Tutorial',
        ipCopyTip: 'Click on IP addresses to quickly copy to clipboard for configuring Nezha panel server addresses',
        ipDataList: 'IP Data List',
        region: 'Region',
        unicom: 'China Unicom',
        mobile: 'China Mobile',
        telecom: 'China Telecom',
        query: 'Query',
        result: 'Result'
    },

    // 美化翻译 (beautify)
    beautify: {
        pageTitle: 'Nezha Panel Tools - Panel Design',
        pageDescription: 'Nezha Panel Tools, Supports Panel Design Configuration, Quickly Generates JSON Configuration Files For Nezha Monitoring Panel',
        panelBeautify: 'Panel Design',
        panelBeautifyDesc: 'Optimize Nezha panel style, generate JSON configuration file to achieve beautification effect',
        configTitle: 'Click to Configure Nezha Panel V1 Custom Parameters',
        configDescription: 'This page feature is based on https://github.com/hi2shark/nazhua-generator, optimized for Nezha Panel V1.',
        configCode: 'Configuration Code',
        import: 'Import',
        usageTips: 'Usage Tips',
        tip1: 'Enable and set the functional parameters you need in the left configuration area',
        tip2: 'The corresponding configuration code will be generated in real-time on the right',
        tip3: 'Copy the generated configuration code',
        tip4: 'Add the code to the custom code area of Nezha Panel V1 to take effect',
        importModalTitle: 'Import Configuration',
        importModalDesc: 'Please paste the previously exported JSON configuration into the text box below:',
        confirmImport: 'Confirm Import',
        confirmReset: 'Are you sure you want to reset all configurations? This operation cannot be undone.',
        resetSuccess: 'Configuration has been reset to initial values',
        enterConfig: 'Please enter configuration content',
        importSuccess: 'Configuration imported successfully',
        formatError: 'Configuration format error, please check JSON format',
        options: {
            card: 'Card',
            row: 'Row',
            progress: 'Progress',
            donut: 'Donut',
            top: 'Top',
            bottom: 'Bottom',
            single: 'Single',
            multi: 'Multi',
            v0: 'v0 - Default',
            v1: 'v1'
        },
        // Generated code comments
        generatedCode: {
            header: 'This code is generated by Nezha Panel Tools',
            toolUrl: 'Tool URL',
            configJson: 'Config JSON'
        },
        // Default values
        defaults: {
            title: 'Nezha Monitoring',
            freeAmount: 'Free',
            infinityCycle: 'Forever',
            buyBtnText: 'Buy'
        },
        // Field definitions
        fields: {
            title: {
                label: 'Website Title',
                placeholder: 'Enter website title',
                remark: 'Default is "Nezha Probe"'
            },
            customFavicon: {
                label: 'Custom Favicon',
                placeholder: 'Enter custom favicon URL',
                remark: 'Custom favicon URL, recommend using full URL'
            },
            footerSlogan: {
                label: 'Footer Slogan',
                placeholder: 'Enter footer slogan',
                remark: 'Leave empty to hide, supports HTML (script tags not supported)'
            },
            freeAmount: {
                label: 'Free Service Name',
                placeholder: 'Enter free service name',
                remark: 'Default is "Free"'
            },
            buyBtnText: {
                label: 'Buy Button Text',
                placeholder: 'Enter buy button text',
                remark: 'Default is "Buy"'
            },
            infinityCycle: {
                label: 'Infinity Cycle Name',
                placeholder: 'Enter infinity cycle name',
                remark: 'Default is "Long Term"'
            },
            customBackgroundImage: {
                label: 'Custom Background Image',
                placeholder: 'Enter custom background image URL',
                remark: 'Custom background image URL, keep size optimized'
            },
            lightBackground: {
                label: 'Light Background',
                remark: 'Enable light background, forces dot background off, use with custom background image'
            },
            showFireworks: {
                label: 'Enable Fireworks',
                remark: 'Enable fireworks, recommended with light background'
            },
            showLantern: {
                label: 'Enable Lanterns',
                remark: 'Enable "Happy New Year" lanterns'
            },
            enableInnerSearch: {
                label: 'Enable Inner Search',
                remark: 'Enable inner search, enabled by default'
            },
            listServerItemTypeToggle: {
                label: 'Enable List Item Type Toggle',
                remark: 'Enable toggle button for list item type (card/row)'
            },
            listServerItemType: {
                label: 'List Item Type',
                placeholder: 'Select list item type',
                remark: 'Display type of list items'
            },
            listServerStatusType: {
                label: 'List Server Status Type',
                placeholder: 'Select list server status type',
                remark: 'Display type of server status in list view'
            },
            listServerRealTimeShowLoad: {
                label: 'List Real-time Load',
                remark: 'Show real-time load in list view'
            },
            detailServerStatusType: {
                label: 'Detail Server Status Type',
                placeholder: 'Select detail server status type',
                remark: 'Display type of server status in detail view'
            },
            simpleColorMode: {
                label: 'Enable Simple Color Mode',
                remark: 'Enable simple color mode'
            },
            serverStatusLinear: {
                label: 'Server Status Linear Gradient',
                remark: 'Server status linear gradient display - mutually exclusive with simple color mode'
            },
            disableSarasaTermSC: {
                label: 'Disable Sarasa Term SC Font',
                remark: 'Disable Sarasa Term SC font'
            },
            hideWorldMap: {
                label: 'Hide World Map',
                remark: 'Hide world map on both home and detail pages'
            },
            hideHomeWorldMap: {
                label: 'Hide Home World Map'
            },
            hideDetailWorldMap: {
                label: 'Hide Detail World Map'
            },
            homeWorldMapPosition: {
                label: 'Home World Map Position',
                placeholder: 'Select home world map position',
                remark: 'Position of world map on home page'
            },
            detailWorldMapPosition: {
                label: 'Detail World Map Position',
                placeholder: 'Select detail world map position',
                remark: 'Position of world map on detail page'
            },
            hideNavbarServerCount: {
                label: 'Hide Navbar Server Count',
                remark: 'Hide server count in navigation bar'
            },
            hideNavbarServerStat: {
                label: 'Hide Navbar Server Stats',
                remark: 'Hide server statistics in navigation bar'
            },
            hideListItemStatusDonut: {
                label: 'Hide List Item Status Donut',
                remark: 'Hide status donut in list items, does not affect detail page'
            },
            hideListItemStat: {
                label: 'Hide List Item Stats',
                remark: 'Hide statistics in list items, does not affect detail page'
            },
            hideListItemBill: {
                label: 'Hide List Item Billing',
                remark: 'Hide billing info in list items, does not affect detail page'
            },
            hideFilter: {
                label: 'Hide Filter',
                remark: 'Hide tag and online/offline filter in list view'
            },
            hideTag: {
                label: 'Hide Tag Filter',
                remark: 'Hide tag filter in list items'
            },
            hideDotBG: {
                label: 'Hide Dot Background',
                remark: 'Hide dot matrix background in containers'
            },
            monitorRefreshTime: {
                label: 'Monitor Refresh Time',
                placeholder: 'Enter monitor refresh time',
                remark: 'Refresh interval in seconds. 0 to disable. Min 10s to avoid frequent requests.'
            },
            monitorChartType: {
                label: 'Monitor Chart Type',
                placeholder: 'Select monitor chart type',
                remark: 'Chart type: single (separate) / multi (aggregated)'
            },
            monitorChartTypeToggle: {
                label: 'Enable Monitor Chart Type Toggle',
                remark: 'Enable monitor chart type toggle'
            },
            filterGPUKeywords: {
                label: 'GPU Filter Keywords',
                placeholder: 'Enter GPU filter keywords',
                remark: 'Press Enter to add keyword. GPUs containing these keywords will be filtered out.'
            },
            nezhaVersion: {
                label: 'Nezha Version',
                placeholder: 'Select Nezha version',
                remark: 'Nezha probe version. Only v0 and v1 supported. Default v0 before 0.4.13, auto-handled after.'
            }
        }
    },

    // About Page (about)
    about: {
        pageTitle: 'About Us',
        pageDescription: 'Nezha Panel Tools - About Us, Learn about our development history',
        introduction: 'System Introduction',
        introText1: 'Nezha Panel Tools is a collection of auxiliary tools designed specifically for Nezha Monitoring Panel. We are committed to simplifying the configuration process of Nezha Panel, providing one-stop configuration generation services such as beautification, traffic monitoring, and alert rules.',
        introText2: 'This project is open source and free, aiming to help users better use Nezha Panel. If you find it useful, please Star it!',
        techStack: 'Tech Stack',
        updateLog: 'Update Log'
    }
};
