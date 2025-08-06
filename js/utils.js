// 工具函数模块 - 合并表单管理和JSON处理功能

// ==================== 表单处理部分 ====================

// 节的开关
function toggleSection(section) {
    try {
        const checkbox = document.getElementById(`enable${section.charAt(0).toUpperCase() + section.slice(1)}`);
        const form = document.getElementById(`${section}Form`);
        
        if (!checkbox || !form) {
            console.warn(`Elements not found for section: ${section}`);
            return;
        }
        
        const isChecked = checkbox && checkbox.checked;
        
        if (section === 'billing') {
            state.config.enableBilling = isChecked;
        } else if (section === 'plan') {
            state.config.enablePlan = isChecked;
        }
        
        if (isChecked) {
            form.classList.remove('hidden');
        } else {
            form.classList.add('hidden');
        }
        
        handleSectionToggle(`${section}Form`, isChecked);
        
        if (typeof updateJsonCode === 'function') {
            updateJsonCode();
        }
    } catch (error) {
        console.error('Error in toggleSection:', error);
        if (typeof showToast === 'function') {
            showToast('切换节状态时发生错误');
        }
    }
}

// 增强的节开关处理
function handleSectionToggle(sectionId, isEnabled) {
    try {
        const section = document.getElementById(sectionId);
        if (!section) {
            console.warn(`Section with id '${sectionId}' not found`);
            return;
        }
        
        const inputs = section.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.disabled = !isEnabled;
            if (isEnabled) {
                input.classList.remove('opacity-50', 'cursor-not-allowed');
            } else {
                input.classList.add('opacity-50', 'cursor-not-allowed');
            }
        });
        
        const buttons = section.querySelectorAll('button');
        buttons.forEach(button => {
            button.disabled = !isEnabled;
            if (isEnabled) {
                button.classList.remove('opacity-50', 'cursor-not-allowed');
            } else {
                button.classList.add('opacity-50', 'cursor-not-allowed');
            }
        });
        
        if (isEnabled) {
            section.classList.remove('opacity-50');
        } else {
            section.classList.add('opacity-50');
        }
    } catch (error) {
        console.error('Error in handleSectionToggle:', error);
    }
}

// 自动计算触发
function triggerAutoCalculation() {
    calculateEndDate();
}

// 计算结束日期
function calculateEndDate() {
    try {
        const startDateInput = document.getElementById('startDate');
        const endDateInput = document.getElementById('endDate');
        const autoCalcCheckbox = document.getElementById('autoCalc');
        const cycleSelect = document.getElementById('cycle');
        
        if (!startDateInput || !endDateInput || !autoCalcCheckbox || !cycleSelect) {
            return;
        }
        
        if (!autoCalcCheckbox.checked || !startDateInput.value) {
            return;
        }
        
        const startDate = new Date(startDateInput.value);
        const cycleValue = cycleSelect.value;
        
        if (isNaN(startDate.getTime())) {
            return;
        }
        
        let endDate = new Date(startDate);
        
        switch (cycleValue) {
            case 'Day':
                endDate.setDate(endDate.getDate() + 1);
                break;
            case 'Week':
                endDate.setDate(endDate.getDate() + 7);
                break;
            case 'Month':
                endDate.setMonth(endDate.getMonth() + 1);
                break;
            case 'Quarter':
                endDate.setMonth(endDate.getMonth() + 3);
                break;
            case 'Year':
                endDate.setFullYear(endDate.getFullYear() + 1);
                break;
            default:
                endDate.setMonth(endDate.getMonth() + 1);
        }
        
        endDate.setDate(endDate.getDate() - 1);
        
        const year = endDate.getFullYear();
        const month = String(endDate.getMonth() + 1).padStart(2, '0');
        const day = String(endDate.getDate()).padStart(2, '0');
        
        endDateInput.value = `${year}-${month}-${day}`;
        
        updateBilling();
    } catch (error) {
        console.error('Error calculating end date:', error);
    }
}

// 更新账单配置
function updateBilling() {
    try {
        const startDate = document.getElementById('startDate')?.value || '';
        const endDate = document.getElementById('endDate')?.value || '';
        const autoRenewal = document.getElementById('autoRenewal')?.checked || false;
        const cycle = getCycleValue();
        const amount = getAmountValue();
        
        state.config.billingDataMod = {
            startDate,
            endDate,
            autoRenewal: autoRenewal.toString(),
            cycle,
            amount
        };
        
        if (typeof updateJsonCode === 'function') {
            updateJsonCode();
        }
    } catch (error) {
        console.error('Error updating billing:', error);
    }
}

// 获取周期值
function getCycleValue() {
    const cycleSelect = document.getElementById('cycle');
    return cycleSelect ? cycleSelect.value : 'Month';
}

// 获取金额值
function getAmountValue() {
    const amountType = document.getElementById('amountType')?.value || 'fixed';
    
    if (amountType === 'fixed') {
        const amount = document.getElementById('amount')?.value || '0';
        return parseFloat(amount) || 0;
    } else {
        const minAmount = document.getElementById('minAmount')?.value || '0';
        const maxAmount = document.getElementById('maxAmount')?.value || '0';
        return {
            min: parseFloat(minAmount) || 0,
            max: parseFloat(maxAmount) || 0
        };
    }
}

// 更新套餐配置
function updatePlan() {
    try {
        const bandwidth = getBandwidthValue();
        const trafficVol = getTrafficVolValue();
        const networkRoute = document.getElementById('networkRoute')?.value || '';
        
        state.config.planDataMod = {
            bandwidth,
            trafficVol,
            networkRoute
        };
        
        if (typeof updateJsonCode === 'function') {
            updateJsonCode();
        }
    } catch (error) {
        console.error('Error updating plan:', error);
    }
}

// 获取带宽值
function getBandwidthValue() {
    const bandwidthType = document.getElementById('bandwidthType')?.value || 'fixed';
    const bandwidthUnit = document.getElementById('bandwidthUnit')?.value || 'Mbps';
    
    if (bandwidthType === 'unlimited') {
        return 'Unlimited';
    } else {
        const bandwidth = document.getElementById('bandwidth')?.value || '0';
        return `${bandwidth} ${bandwidthUnit}`;
    }
}

// 获取流量值
function getTrafficVolValue() {
    const trafficType = document.getElementById('trafficType')?.value || 'fixed';
    
    if (trafficType === 'unlimited') {
        return 'Unlimited';
    } else {
        const trafficVol = document.getElementById('trafficVol')?.value || '0';
        const trafficUnit = document.getElementById('trafficUnit')?.value || 'GB';
        const trafficPeriod = document.getElementById('trafficPeriod')?.value || 'Month';
        return `${trafficVol} ${trafficUnit}/${trafficPeriod}`;
    }
}

// ==================== 标签处理部分 ====================

// 渲染标签
function renderTags() {
    const tagsContainer = document.getElementById('tagsContainer');
    if (!tagsContainer) return;
    
    // 清空现有标签
    tagsContainer.innerHTML = '';
    
    // 添加默认标签
    const defaultTag = document.createElement('div');
    defaultTag.className = 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm flex items-center space-x-2';
    defaultTag.innerHTML = `
        <span>xxxx.im</span>
        <button onclick="removeTag(this)" class="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-2 py-1 rounded transition-all duration-300">
            <span>✕</span>
        </button>
    `;
    tagsContainer.appendChild(defaultTag);
}

// 添加标签
function addTag() {
    const newTagInput = document.getElementById('newTag');
    const tagsContainer = document.getElementById('tagsContainer');
    
    if (!newTagInput || !tagsContainer) return;
    
    const tagText = newTagInput.value.trim();
    if (!tagText) return;
    
    // 创建新标签
    const tagElement = document.createElement('div');
    tagElement.className = 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm flex items-center space-x-2';
    tagElement.innerHTML = `
        <span>${tagText}</span>
        <button onclick="removeTag(this)" class="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-2 py-1 rounded transition-all duration-300">
            <span>✕</span>
        </button>
    `;
    
    tagsContainer.appendChild(tagElement);
    newTagInput.value = '';
}

// 移除标签
function removeTag(button) {
    const tagElement = button.closest('div');
    if (tagElement) {
        tagElement.remove();
    }
}

// 处理标签输入
function handleTagInput(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTag();
    }
}

// 处理代码变化
function handleCodeChange(event) {
    try {
        const jsonCode = document.getElementById('jsonCode');
        if (!jsonCode) return;
        
        const parseResult = safeJsonParse(jsonCode.value);
        
        if (!parseResult.success) {
            // 静默处理JSON解析错误，不显示错误提示
            return;
        }
        
        const config = parseResult.data;
        const errors = validateConfig(config);
        
        if (errors.length === 0) {
            // 配置有效时更新状态
            refreshFromCode(event);
        }
    } catch (error) {
        console.error('Error handling code change:', error);
    }
}

// ==================== JSON处理部分 ====================

// 更新JSON代码
function updateJsonCode() {
    const jsonCode = document.getElementById('jsonCode');
    if (!jsonCode) return;
    
    const config = {};
    
    if (state.config.enableBilling) {
        config.billingDataMod = { ...state.config.billingDataMod };
    }
    
    if (state.config.enablePlan) {
        config.planDataMod = { ...state.config.planDataMod };
    }
    
    jsonCode.value = JSON.stringify(config, null, 2);
}

// 验证JSON配置结构
function validateConfig(config) {
    const errors = [];
    
    if (typeof config !== 'object' || config === null) {
        errors.push('配置必须是一个有效的对象');
        return errors;
    }
    
    // 验证账单配置
    if (config.billingDataMod) {
        const billing = config.billingDataMod;
        
        if (billing.startDate && !isValidDate(billing.startDate)) {
            errors.push('账单开始日期格式无效');
        }
        
        if (billing.endDate && !isValidDate(billing.endDate)) {
            errors.push('账单结束日期格式无效');
        }
        
        if (billing.startDate && billing.endDate) {
            const start = new Date(billing.startDate);
            const end = new Date(billing.endDate);
            if (start >= end) {
                errors.push('账单开始日期必须早于结束日期');
            }
        }
    }
    
    return errors;
}

// 验证日期格式
function isValidDate(dateString) {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && dateString.match(/^\d{4}-\d{2}-\d{2}$/);
}

// 安全的JSON解析
function safeJsonParse(jsonString) {
    try {
        if (!jsonString || typeof jsonString !== 'string') {
            return { success: false, error: 'JSON字符串为空或无效' };
        }
        
        const trimmed = jsonString.trim();
        if (!trimmed) {
            return { success: false, error: 'JSON字符串为空' };
        }
        
        const parsed = JSON.parse(trimmed);
        
        if (typeof parsed !== 'object' || parsed === null) {
            return { success: false, error: 'JSON必须是一个对象' };
        }
        
        return { success: true, data: parsed };
    } catch (error) {
        return { 
            success: false, 
            error: `JSON解析错误: ${error.message}` 
        };
    }
}

// 从代码刷新配置
function refreshFromCode(event) {
    try {
        const jsonCode = document.getElementById('jsonCode');
        if (!jsonCode) return;
        
        const parseResult = safeJsonParse(jsonCode.value);
        
        if (!parseResult.success) {
            if (typeof showToast === 'function') {
                showToast(parseResult.error, 'error');
            }
            return;
        }
        
        const config = parseResult.data;
        const errors = validateConfig(config);
        
        if (errors.length > 0) {
            if (typeof showToast === 'function') {
                showToast(`配置验证失败: ${errors.join(', ')}`, 'error');
            }
            return;
        }
        
        // 更新状态
        if (config.billingDataMod) {
            state.config.enableBilling = true;
            state.config.billingDataMod = config.billingDataMod;
            
            // 更新UI
            const enableBilling = document.getElementById('enableBilling');
            if (enableBilling) {
                enableBilling.checked = true;
                toggleSection('billing');
            }
            
            // 更新表单字段
            if (config.billingDataMod.startDate) {
                const startDate = document.getElementById('startDate');
                if (startDate) startDate.value = config.billingDataMod.startDate;
            }
            
            if (config.billingDataMod.endDate) {
                const endDate = document.getElementById('endDate');
                if (endDate) endDate.value = config.billingDataMod.endDate;
            }
        }
        
        if (config.planDataMod) {
            state.config.enablePlan = true;
            state.config.planDataMod = config.planDataMod;
            
            // 更新UI
            const enablePlan = document.getElementById('enablePlan');
            if (enablePlan) {
                enablePlan.checked = true;
                toggleSection('plan');
            }
        }
        
        if (typeof showToast === 'function') {
            showToast('配置已从JSON代码更新', 'success');
        }
        
    } catch (error) {
        console.error('Error refreshing from code:', error);
        if (typeof showToast === 'function') {
            showToast('刷新配置时发生错误', 'error');
        }
    }
}

// 导出函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleSection,
        handleSectionToggle,
        triggerAutoCalculation,
        calculateEndDate,
        updateBilling,
        getCycleValue,
        getAmountValue,
        updatePlan,
        getBandwidthValue,
        getTrafficVolValue,
        renderTags,
        addTag,
        removeTag,
        handleTagInput,
        handleCodeChange,
        updateJsonCode,
        validateConfig,
        isValidDate,
        safeJsonParse,
        refreshFromCode
    };
}