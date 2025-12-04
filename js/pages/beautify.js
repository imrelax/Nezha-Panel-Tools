// 哪吒面板配置生成器
// 基于nazhua-config-generator.html的功能实现

// 注意：configTemplate 和 getFieldLabels 已移至 beautify-config.js

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
    if (typeof configTemplate !== 'undefined') {
        Object.keys(configTemplate).forEach(key => {
            if (!(key in configFormData)) {
                configFormData[key] = configTemplate[key];
            }
            if (!(key in configFieldEnable)) {
                configFieldEnable[key] = false;
            }
        });
    }
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
    if (typeof getFieldLabels !== 'function') {
        console.error('getFieldLabels function not found');
        return;
    }

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
    formItem.className = 'glass-card p-4 mb-4';
    
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
        control.className = 'glass-input text-sm';
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
        control.className = 'glass-input text-sm';
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
    container.className = 'glass-input flex flex-wrap gap-2 h-auto min-h-[50px]';
    
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
    const translations = (window.unifiedI18nManager && window.unifiedI18nManager.translations && window.unifiedI18nManager.translations[currentLang] && window.unifiedI18nManager.translations[currentLang].beautify) || {};
    const confirmMessage = translations.resetConfirm || '确定要重置所有配置吗？此操作不可撤销。';
    
    // 使用统一翻译管理器获取重置成功消息
    const successMessage = window.unifiedI18nManager ? 
        window.unifiedI18nManager.__('resetSuccess') : 
        '配置已重置到初始值';
    
    if (confirm(confirmMessage)) {
        // 重置配置数据为默认值
        if (typeof configTemplate !== 'undefined') {
            configFormData = { ...configTemplate };
        }
        
        // 重置所有字段的启用状态为false
        configFieldEnable = {};
        if (typeof getFieldLabels === 'function') {
            const currentFieldLabels = getFieldLabels();
            Object.keys(currentFieldLabels).forEach(key => {
                if (currentFieldLabels[key].v1customCode) {
                    configFieldEnable[key] = false;
                }
            });
        }
        
        // 保存配置并重新渲染界面
        saveLocalConfig();
        renderForm();
        updateCodeOutput();
        
        if (typeof commonUtils !== 'undefined' && commonUtils.showToast) {
            commonUtils.showToast(successMessage, 'success');
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
        if (typeof commonUtils !== 'undefined' && commonUtils.showToast) {
            commonUtils.showToast('请输入配置内容', 'error');
        }
        return;
    }
    
    try {
        const imported = JSON.parse(textarea.value);
        if (typeof configTemplate !== 'undefined') {
            configFormData = { ...configTemplate, ...imported };
        } else {
            configFormData = { ...imported };
        }
        
        // 自动启用导入的字段
        Object.keys(imported).forEach(key => {
            configFieldEnable[key] = true;
        });
        saveLocalConfig();
        renderForm();
        updateCodeOutput();
        handleHideImportDialog();
        
        if (typeof commonUtils !== 'undefined' && commonUtils.showToast) {
            commonUtils.showToast('配置导入成功', 'success');
        }
        
        textarea.value = '';
    } catch (e) {
        if (typeof commonUtils !== 'undefined' && commonUtils.showToast) {
            commonUtils.showToast('配置格式错误，请检查JSON格式', 'error');
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
