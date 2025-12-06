export const zh = {
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
        reset: '重置',
        retry: '重试',
        optional: '可选',
        
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
        version: '版本: 2.0.2',
        lastUpdate: '最后更新: 2025年12月4日',
        relatedLinks: '相关链接',
        sourceCode: '源代码',
        nezhaOfficial: '哪吒官网',
        authorSite: '作者网站',
        siteRelated: '本站相关',
        siteSource: '本站源码',
        siteAuthor: '本站作者',
        siteAbout: '关于本站',
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
        
        // 按钮文本
        calculateEndDate: '计算结束日期'
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
        multipleServersTip: '多个服务器ID用逗号分隔',
        
        // 告警类型
        types: {
            cpu: 'CPU使用率',
            gpu: 'GPU使用率',
            memory: '内存使用率',
            swap: '交换空间',
            disk: '磁盘使用率',
            net_in_speed: '入站网速',
            net_out_speed: '出站网速',
            net_all_speed: '总网速',
            transfer_in: '入站流量',
            transfer_out: '出站流量',
            transfer_all: '总流量',
            offline: '离线状态',
            load1: '1分钟负载',
            load5: '5分钟负载',
            load15: '15分钟负载',
            process_count: '进程数量',
            tcp_conn_count: 'TCP连接数',
            udp_conn_count: 'UDP连接数',
            temperature_max: '最高温度'
        }
    },

    // 流量监控翻译 (traffic)
    traffic: {
        pageTitle: '哪吒面板工具 - 流量监控配置',
        pageDescription: '哪吒面板工具，支持流量监控配置，快速生成哪吒监控面板的JSON配置文件',
        trafficMonitor: '流量监控',
        cycleStart: '周期开始',
        cycleInterval: '周期数量',
        cycleUnit: '周期单位',
        cover: '覆盖',
        ignoreServers: '忽略服务器 (用逗号分隔ID)',
        minTraffic: '最小流量',
        maxTraffic: '最大流量',
        
        // 表单字段翻译
        type: '类型',
        minValue: '最小值',
        maxValue: '最大值',
        ignoreList: '忽略服务器',
        multipleServersTip: '多个服务器ID用逗号分隔',
        
        // 流量类型翻译
        types: {
            'transfer_out_cycle': '出站流量周期',
            'transfer_in_cycle': '入站流量周期',
            'transfer_all_cycle': '总流量周期',
            'net_out_speed': '出站网速',
            'net_in_speed': '入站网速',
            'net_all_speed': '总网速'
        },
        
        // 单位翻译
        units: {
            'second': '秒',
            'minute': '分钟',
            'hour': '小时',
            'day': '天',
            'week': '周',
            'month': '月',
            'B': '字节',
            'KB': '千字节',
            'MB': '兆字节',
            'GB': '吉字节',
            'TB': '太字节',
            'minValue': '最小值',
            'maxValue': '最大值'
        }
    },

    // 服务翻译 (service)
    service: {
        pageTitle: '哪吒面板工具 - IP服务',
        pageDescription: '哪吒面板工具，提供IP查询和其他服务',
        ipService: 'IP地址服务',
        serviceDescription: '查看全国各地区运营商IP地址信息',
        howToUse: '不知道如何使用本功能？',
        viewTutorial: '查看教程',
        ipCopyTip: '点击IP地址可以快速复制到剪贴板，方便配置哪吒面板服务器地址',
        ipDataList: 'IP 数据列表',
        region: '地区',
        unicom: '联通',
        mobile: '移动',
        telecom: '电信',
        query: '查询',
        result: '结果'
    },

    // 美化翻译 (beautify)
    beautify: {
        pageTitle: '哪吒面板工具 - 面板美化',
        pageDescription: '哪吒面板工具，支持面板美化配置，快速生成哪吒监控面板的JSON配置文件',
        panelBeautify: '面板美化',
        panelBeautifyDesc: '优化哪吒面板样式，生成JSON配置文件实现美化效果',
        configTitle: '点击配置哪吒面板V1版本自定义参数',
        configDescription: '本页面功能基于 https://github.com/hi2shark/nazhua-generator 实现，专为哪吒面板V1版本优化。',
        configCode: '配置代码',
        import: '导入',
        usageTips: '使用提示',
        tip1: '在左侧配置区域启用并设置您需要的功能参数',
        tip2: '右侧会实时生成对应的配置代码',
        tip3: '复制生成的配置代码',
        tip4: '将代码添加到哪吒面板V1版本的自定义代码区域即可生效',
        importModalTitle: '导入配置',
        importModalDesc: '请将之前导出的JSON配置粘贴到下方文本框中：',
        confirmImport: '确认导入',
        confirmReset: '确定要重置所有配置吗？此操作不可撤销。',
        resetSuccess: '配置已重置到初始值',
        enterConfig: '请输入配置内容',
        importSuccess: '配置导入成功',
        formatError: '配置格式错误，请检查JSON格式',
        options: {
            card: '卡片(card)',
            row: '行(row)',
            progress: '进度条(progress)',
            donut: '饼图(donut)',
            top: '顶部(top)',
            bottom: '底部(bottom)',
            single: '单个(single)',
            multi: '多个(multi)',
            v0: 'v0 - 默认',
            v1: 'v1'
        },
        // 生成代码注释
        generatedCode: {
            header: '本代码由哪吒面板工具生成',
            toolUrl: '工具网址',
            configJson: '配置JSON'
        },
        // 默认值
        defaults: {
            title: '哪吒监控',
            freeAmount: '白嫖',
            infinityCycle: '长期有效',
            buyBtnText: '购买'
        },
        // 字段定义
        fields: {
            title: {
                label: '网站标题',
                placeholder: '请输入网站标题',
                remark: '默认显示为"哪吒探针"'
            },
            customFavicon: {
                label: '自定义图标',
                placeholder: '请输入自定义favicon地址',
                remark: '自定义favicon地址，建议您输入完整的图标地址'
            },
            footerSlogan: {
                label: '页脚标语',
                placeholder: '请输入页脚标语',
                remark: '留空不占位，支持HTML代码（不支持script标签动态代码）'
            },
            freeAmount: {
                label: '免费服务名称',
                placeholder: '请输入免费服务的费用名称',
                remark: '默认显示为"免费"，万一你想叫它"白嫖"呢？'
            },
            buyBtnText: {
                label: '购买按钮文案',
                placeholder: '请输入购买按钮文案',
                remark: '默认显示为"购买"，万一你想叫它"下单"呢？'
            },
            infinityCycle: {
                label: '无限周期名称',
                placeholder: '请输入无限周期名称',
                remark: '默认显示为"长期有效"，万一你想叫它"永久"呢？'
            },
            customBackgroundImage: {
                label: '自定义背景图片',
                placeholder: '请输入自定义背景图片地址',
                remark: '自定义背景图片地址，注意不要太大'
            },
            lightBackground: {
                label: '浅色背景',
                remark: '启用浅色背景，会强制关闭点点背景，配合自定义背景图片使用'
            },
            showFireworks: {
                label: '启用烟花',
                remark: '启用烟花，建议开启浅色背景'
            },
            showLantern: {
                label: '启用灯笼',
                remark: '启用"新年快乐"灯笼'
            },
            enableInnerSearch: {
                label: '启用内部搜索',
                remark: '启用内部搜索，默认启用'
            },
            listServerItemTypeToggle: {
                label: '启用列表项类型切换',
                remark: '启用后列表项类型会显示为切换按钮，可以切换为卡片和行'
            },
            listServerItemType: {
                label: '列表项类型',
                placeholder: '请选择列表项类型',
                remark: '列表项的显示类型'
            },
            listServerStatusType: {
                label: '列表服务器状态类型',
                placeholder: '请选择列表服务器状态类型',
                remark: '列表页服务器状态的显示类型'
            },
            listServerRealTimeShowLoad: {
                label: '列表实时显示负载',
                remark: '列表实时显示负载'
            },
            detailServerStatusType: {
                label: '详情服务器状态类型',
                placeholder: '请选择详情服务器状态类型',
                remark: '详情页服务器状态的显示类型'
            },
            simpleColorMode: {
                label: '启用简约色系',
                remark: '启用简约色系'
            },
            serverStatusLinear: {
                label: '服务器状态渐变线性显示',
                remark: '服务器状态渐变线性显示 - 与简约色系互斥'
            },
            disableSarasaTermSC: {
                label: '禁用Sarasa Term SC字体',
                remark: '禁用Sarasa Term SC字体'
            },
            hideWorldMap: {
                label: '隐藏地图',
                remark: '隐藏地图后，首页和详情页都不会显示地图'
            },
            hideHomeWorldMap: {
                label: '隐藏首页地图'
            },
            hideDetailWorldMap: {
                label: '隐藏详情页地图'
            },
            homeWorldMapPosition: {
                label: '首页地图位置',
                placeholder: '请选择首页地图位置',
                remark: '首页地图位置'
            },
            detailWorldMapPosition: {
                label: '详情页地图位置',
                placeholder: '请选择详情页地图位置',
                remark: '详情页地图位置'
            },
            hideNavbarServerCount: {
                label: '隐藏导航栏服务器数量',
                remark: '隐藏导航栏的服务器数量统计'
            },
            hideNavbarServerStat: {
                label: '隐藏导航栏服务器统计',
                remark: '隐藏导航栏的服务器统计信息'
            },
            hideListItemStatusDonut: {
                label: '隐藏列表项状态饼图',
                remark: '隐藏列表项的状态饼图，不影响详情页的状态饼图'
            },
            hideListItemStat: {
                label: '隐藏列表项统计信息',
                remark: '隐藏列表项的统计信息，不影响详情页的统计信息'
            },
            hideListItemBill: {
                label: '隐藏列表项账单信息',
                remark: '隐藏列表项的账单信息，不影响详情页的账单信息'
            },
            hideFilter: {
                label: '隐藏筛选功能',
                remark: '隐藏列表页的标签和在线/离线筛选功能'
            },
            hideTag: {
                label: '隐藏标签筛选',
                remark: '隐藏列表项的标签筛选功能'
            },
            hideDotBG: {
                label: '隐藏点阵背景',
                remark: '隐藏盒子里面的点阵背景'
            },
            monitorRefreshTime: {
                label: '监控刷新时间',
                placeholder: '请输入监控刷新时间',
                remark: '监控刷新时间间隔，单位s（秒）, 0为不刷新，为保证不频繁请求源站，最低生效值为10s'
            },
            monitorChartType: {
                label: '监控图表类型',
                placeholder: '请选择监控图表类型',
                remark: '监控图表类型，single单独显示/multi聚合在一起'
            },
            monitorChartTypeToggle: {
                label: '启用监控图表类型切换',
                remark: '启用监控图表类型切换'
            },
            filterGPUKeywords: {
                label: 'GPU过滤关键字',
                placeholder: '请输入GPU过滤关键字',
                remark: '按下Enter键(回车)确定关键词；如果GPU名称中包含这些关键字，则过滤掉'
            },
            nezhaVersion: {
                label: '哪吒版本',
                placeholder: '请选择哪吒版本',
                remark: '哪吒探针的版本，目前仅支持v0和v1，0.4.13前默认为v0，0.4.13后默认为自动处理'
            }
        }
    },

    // 关于页面翻译 (about)
    about: {
        pageTitle: '关于本站',
        pageDescription: '哪吒面板工具 - 关于本站，了解我们的开发历程',
        introduction: '系统介绍',
        introText1: '哪吒面板工具是一个专为哪吒监控面板设计的辅助工具集合。我们致力于简化哪吒面板的配置过程，提供美化、流量监控、告警规则等一站式配置生成服务。',
        introText2: '本项目开源免费，旨在帮助用户更好地使用哪吒面板。如果您觉得好用，欢迎 Star 支持！',
        techStack: '技术栈',
        updateLog: '更新记录'
    }
};
