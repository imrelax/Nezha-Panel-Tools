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
const fieldLabels = {
    title: {
        label: '网站标题',
        placeholder: '请输入网站标题',
        remark: '默认显示为"哪吒探针"',
        type: 'input',
        v1customCode: true
    },
    customFavicon: {
        label: '自定义favicon',
        placeholder: '请输入自定义favicon地址',
        remark: '自定义favicon地址，建议您输入完整的图标地址',
        type: 'input',
        v1customCode: true,
        version: '0.5.7+'
    },
    footerSlogan: {
        label: '页脚标语',
        placeholder: '请输入页脚标语',
        remark: '留空不占位，支持HTML代码（不支持script标签动态代码）',
        type: 'input',
        v1customCode: true,
        version: '0.5.2+'
    },
    freeAmount: {
        label: '免费的叫啥',
        placeholder: '请输入免费服务的费用名称',
        remark: '默认显示为"免费"，万一你想叫它"白嫖"呢？',
        type: 'input',
        v1customCode: true
    },
    buyBtnText: {
        label: '购买按钮文案',
        placeholder: '请输入购买按钮文案',
        remark: '默认显示为"购买"，万一你想叫它"下单"呢？',
        type: 'input',
        v1customCode: true
    },
    infinityCycle: {
        label: '无限周期名称',
        placeholder: '请输入无限周期名称',
        remark: '默认显示为"长期有效"，万一你想叫它"永久"呢？',
        type: 'input',
        v1customCode: true
    },
    customBackgroundImage: {
        label: '自定义背景图片',
        placeholder: '请输入自定义背景图片地址',
        remark: '自定义背景图片地址，注意不要太大',
        type: 'input',
        v1customCode: true,
        version: '0.4.23+'
    },
    lightBackground: {
        label: '启用浅色背景',
        type: 'switch',
        remark: '启用浅色背景，会强制关闭点点背景，配合自定义背景图片使用',
        v1customCode: true,
        version: '0.4.23+'
    },
    showFireworks: {
        label: '启用烟花',
        type: 'switch',
        remark: '启用烟花，建议开启浅色背景',
        v1customCode: true,
        version: '0.5.1+'
    },
    showLantern: {
        label: '启用灯笼',
        type: 'switch',
        remark: '启用"新年快乐"灯笼',
        v1customCode: true,
        version: '0.5.1+'
    },
    enableInnerSearch: {
        label: '启用内部搜索',
        type: 'switch',
        remark: '启用内部搜索，默认启用',
        v1customCode: true,
        version: '0.5.4+'
    },
    listServerItemTypeToggle: {
        label: '列表项类型切换',
        type: 'switch',
        remark: '启用列表项类型切换，启用后列表项类型会显示为切换按钮，可以切换为卡片和行',
        v1customCode: true,
        version: '0.5.0+'
    },
    listServerItemType: {
        label: '列表项类型',
        placeholder: '请选择列表项类型',
        remark: '列表项的显示类型',
        type: 'select',
        options: [
            { label: '卡片(card)', value: 'card' },
            { label: '行(row)', value: 'row' }
        ],
        v1customCode: true
    },
    listServerStatusType: {
        label: '列表服务器状态类型',
        placeholder: '请选择列表服务器状态类型',
        remark: '列表页服务器状态的显示类型',
        type: 'select',
        options: [
            { label: '进度条(progress)', value: 'progress' },
            { label: '饼图(donut)', value: 'donut' }
        ],
        v1customCode: true
    },
    listServerRealTimeShowLoad: {
        label: '列表实时显示负载',
        type: 'switch',
        remark: '列表实时显示负载',
        v1customCode: true
    },
    detailServerStatusType: {
        label: '详情服务器状态类型',
        placeholder: '请选择详情服务器状态类型',
        remark: '详情页服务器状态的显示类型',
        type: 'select',
        options: [
            { label: '进度条(progress)', value: 'progress' },
            { label: '饼图(donut)', value: 'donut' }
        ],
        v1customCode: true
    },
    simpleColorMode: {
        label: '启用简约色系',
        type: 'switch',
        remark: '启用简约色系',
        v1customCode: true
    },
    serverStatusLinear: {
        label: '服务器状态渐变',
        type: 'switch',
        remark: '服务器状态渐变线性显示 - 与简约色系互斥',
        v1customCode: true
    },
    disableSarasaTermSC: {
        label: '禁用内置字体',
        type: 'switch',
        remark: '禁用Sarasa Term SC字体',
        v1customCode: true
    },
    hideWorldMap: {
        label: '隐藏地图',
        type: 'switch',
        remark: '隐藏地图后，首页和详情页都不会显示地图',
        v1customCode: true
    },
    hideHomeWorldMap: {
        label: '首页隐藏地图',
        type: 'switch',
        v1customCode: true
    },
    hideDetailWorldMap: {
        label: '详情页隐藏地图',
        type: 'switch',
        v1customCode: true
    },
    homeWorldMapPosition: {
        label: '首页地图位置',
        placeholder: '请选择首页地图位置',
        remark: '首页地图位置',
        type: 'select',
        options: [
            { label: '顶部(top)', value: 'top' },
            { label: '底部(bottom)', value: 'bottom' }
        ],
        v1customCode: true,
        version: '0.6.4+'
    },
    detailWorldMapPosition: {
        label: '详情页地图位置',
        placeholder: '请选择详情页地图位置',
        remark: '详情页地图位置',
        type: 'select',
        options: [
            { label: '顶部(top)', value: 'top' },
            { label: '底部(bottom)', value: 'bottom' }
        ],
        v1customCode: true,
        version: '0.6.4+'
    },
    hideNavbarServerCount: {
        label: '隐藏服务器数量',
        type: 'switch',
        remark: '隐藏导航栏的服务器数量统计',
        v1customCode: true
    },
    hideNavbarServerStat: {
        label: '隐藏服务器统计',
        type: 'switch',
        remark: '隐藏导航栏的服务器统计信息',
        v1customCode: true
    },
    hideListItemStatusDonut: {
        label: '隐藏列表饼图',
        remark: '隐藏列表项的状态饼图，不影响详情页的状态饼图',
        type: 'switch',
        v1customCode: true
    },
    hideListItemStat: {
        label: '隐藏列表统计',
        remark: '隐藏列表项的统计信息，不影响详情页的统计信息',
        type: 'switch',
        v1customCode: true
    },
    hideListItemBill: {
        label: '隐藏列表账单',
        remark: '隐藏列表项的账单信息，不影响详情页的账单信息',
        type: 'switch',
        v1customCode: true
    },
    hideFilter: {
        label: '隐藏筛选',
        remark: '隐藏列表页的标签和在线/离线筛选功能',
        type: 'switch',
        v1customCode: true
    },
    hideTag: {
        label: '隐藏标签',
        remark: '隐藏列表项的标签筛选功能',
        type: 'switch',
        v1customCode: true
    },
    hideDotBG: {
        label: '隐藏点阵背景',
        type: 'switch',
        remark: '隐藏盒子里面的点阵背景',
        v1customCode: true
    },
    monitorRefreshTime: {
        label: '监控刷新时间',
        placeholder: '请输入监控刷新时间',
        remark: '监控刷新时间间隔，单位s（秒）, 0为不刷新，为保证不频繁请求源站，最低生效值为10s',
        type: 'input',
        v1customCode: true,
        version: '0.4.8+'
    },
    monitorChartType: {
        label: '监控图表类型',
        placeholder: '请选择监控图表类型',
        remark: '监控图表类型，single单独显示/multi聚合在一起',
        type: 'select',
        options: [
            { label: '单个(single)', value: 'single' },
            { label: '多个(multi)', value: 'multi' }
        ],
        v1customCode: true,
        version: '0.6.4+'
    },
    monitorChartTypeToggle: {
        label: '监控图表类型切换',
        type: 'switch',
        remark: '启用监控图表类型切换',
        v1customCode: true,
        version: '0.6.4+'
    },
    filterGPUKeywords: {
        label: 'GPU过滤关键字',
        placeholder: '请输入GPU过滤关键字',
        remark: '按下Enter键(回车)确定关键词；如果GPU名称中包含这些关键字，则过滤掉',
        type: 'input-tag',
        v1customCode: true,
        version: '0.4.9+'
    },
    nezhaVersion: {
        label: '哪吒版本',
        placeholder: '请选择哪吒版本',
        remark: '哪吒探针的版本，目前仅支持v0和v1，0.4.13前默认为v0，0.4.13后默认为自动处理',
        type: 'select',
        options: [
            { label: 'v0 - 默认', value: 'v0' },
            { label: 'v1', value: 'v1' }
        ]
    },
    apiMonitorPath: {
        label: '监控API地址',
        placeholder: '请输入网络服务监控API路径',
        remark: '主要是网络服务那个监控数据的读取，目前只会替换关键词 {id}',
        type: 'input'
    },
    wsPath: {
        label: 'WebSocket地址',
        placeholder: '请输入WebSocket路径',
        remark: 'WebSocket连接路径',
        type: 'input'
    },
    nezhaPath: {
        label: '哪吒路径',
        placeholder: '请输入哪吒路径',
        remark: '哪吒探针的路径',
        type: 'input'
    },
    nezhaV0ConfigType: {
        label: '哪吒v0数据读取类型',
        placeholder: '请选择哪吒v0数据读取类型',
        remark: '哪吒v0数据读取类型',
        type: 'select',
        options: [
            { label: 'servers', value: 'servers' }
        ]
    },
    v1ApiMonitorPath: {
        label: 'v1监控API地址',
        placeholder: '请输入v1监控API路径',
        remark: 'v1版本的监控API',
        type: 'input'
    },
    v1WsPath: {
        label: 'v1 WebSocket地址',
        placeholder: '请输入v1 WebSocket路径',
        remark: 'v1版本的WebSocket连接路径',
        type: 'input'
    },
    v1ApiGroupPath: {
        label: 'v1分组API地址',
        placeholder: '请输入v1分组API路径',
        remark: 'v1版本的分组API',
        type: 'input'
    },
    v1ApiSettingPath: {
        label: 'v1设置API地址',
        placeholder: '请输入v1设置API路径',
        remark: 'v1版本的设置API',
        type: 'input'
    },
    v1ApiProfilePath: {
        label: 'v1用户信息地址',
        placeholder: '请输入v1用户信息API路径',
        remark: 'v1版本的用户信息API',
        type: 'input'
    },
    v1DashboardUrl: {
        label: 'v1控制台地址',
        placeholder: '请输入v1控制台地址',
        remark: 'v1版本的控制台地址，默认为 /dashboard',
        type: 'input',
        v1customCode: true
    },
    v1HideNezhaDashboardBtn: {
        label: '隐藏控制台按钮',
        type: 'switch',
        remark: '隐藏导航栏的控制台入口/登录按钮',
        v1customCode: true
    },
    routeMode: {
        label: '路由模式',
        placeholder: '请选择路由模式',
        remark: '默认为h5，如果是hash模式，需要后端支持',
        type: 'select',
        options: [
            { label: 'h5', value: 'h5' },
            { label: 'hash', value: 'hash' }
        ]
    }
};

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
    
    Object.keys(fieldLabels).forEach(key => {
        const field = fieldLabels[key];
        
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
    if (confirm('确定要重置所有配置吗？此操作不可撤销。')) {
        // 重置配置数据为默认值
        configFormData = { ...configTemplate };
        
        // 重置所有字段的启用状态为false
        configFieldEnable = {};
        Object.keys(fieldLabels).forEach(key => {
            if (fieldLabels[key].v1customCode) {
                configFieldEnable[key] = false;
            }
        });
        
        // 保存配置并重新渲染界面
        saveLocalConfig();
        renderForm();
        updateCodeOutput();
        
        if (typeof showToast === 'function') {
            showToast('配置已重置到初始值', 'success');
        } else {
            alert('配置已重置到初始值');
        }
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
        if (typeof showToast === 'function') {
            showToast('请输入配置内容', 'error');
        }
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
        
        if (typeof showToast === 'function') {
            showToast('配置导入成功', 'success');
        }
        
        textarea.value = '';
    } catch (e) {
        if (typeof showToast === 'function') {
            showToast('配置格式错误，请检查JSON格式', 'error');
        }
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