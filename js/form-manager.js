// 表单和计划管理模块 - 合并自 form-handler.js 和 plan-manager.js

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
            
            if (!isEnabled) {
                input.classList.add('opacity-50', 'cursor-not-allowed');
                input.setAttribute('aria-disabled', 'true');
            } else {
                input.classList.remove('opacity-50', 'cursor-not-allowed');
                input.removeAttribute('aria-disabled');
            }
        });
        
        section.dispatchEvent(new CustomEvent('sectionToggled', {
            detail: { sectionId, isEnabled }
        }));
        
    } catch (error) {
        console.error('Error in handleSectionToggle:', error);
        if (typeof showToast === 'function') {
            showToast('切换节状态时发生错误');
        }
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
        const cycleSelect = document.getElementById('cycle');
        
        if (!startDateInput || !endDateInput || !cycleSelect) {
            console.warn('Required date calculation elements not found');
            return;
        }
        
        const startDate = new Date(startDateInput.value);
        const cycle = cycleSelect.value;
        
        if (!startDateInput.value || isNaN(startDate.getTime())) {
            console.warn('Invalid start date provided');
            return;
        }
        
        let endDate = new Date(startDate);
        
        switch (cycle) {
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
            case 'HalfYear':
                endDate.setMonth(endDate.getMonth() + 6);
                break;
            case 'Year':
                endDate.setFullYear(endDate.getFullYear() + 1);
                break;
            case 'TwoYear':
                endDate.setFullYear(endDate.getFullYear() + 2);
                break;
            case 'ThreeYear':
                endDate.setFullYear(endDate.getFullYear() + 3);
                break;
            default:
                endDate.setFullYear(endDate.getFullYear() + 1);
        }
        
        endDateInput.value = formatDateTimeLocal(endDate);
        updateBilling();
    } catch (error) {
        console.error('Error in calculateEndDate:', error);
        if (typeof showToast === 'function') {
            showToast('计算结束日期时发生错误');
        }
    }
}

// 更新账单配置
function updateBilling() {
    try {
        const startDate = document.getElementById('startDate')?.value;
        const endDate = document.getElementById('endDate')?.value;
        const autoRenewal = document.getElementById('autoRenewal')?.value;
        const cycle = getCycleValue();
        const amount = getAmountValue();
        
        if (startDate && isNaN(new Date(startDate).getTime())) {
            console.warn('Invalid start date format');
            return;
        }
        
        if (endDate && isNaN(new Date(endDate).getTime())) {
            console.warn('Invalid end date format');
            return;
        }
        
        if (startDate) {
            state.config.billingDataMod.startDate = new Date(startDate).toISOString();
        }
        
        if (endDate) {
            state.config.billingDataMod.endDate = new Date(endDate).toISOString();
        }
        
        if (autoRenewal) {
            state.config.billingDataMod.autoRenewal = autoRenewal;
        }
        
        if (cycle) {
            state.config.billingDataMod.cycle = cycle;
        }
        
        if (amount) {
            state.config.billingDataMod.amount = amount;
        }
        
        updateJsonCode();
    } catch (error) {
        console.error('Error in updateBilling:', error);
        if (typeof showToast === 'function') {
            showToast('更新账单配置时发生错误');
        }
    }
}

// 获取周期值
function getCycleValue() {
    const cycle = document.getElementById('cycle')?.value;
    const isEnglish = document.getElementById('cycleLanguage')?.checked || false;
    
    if (!cycle) return 'Year';
    
    if (isEnglish && i18n[state.language] && i18n[state.language].cyclesEn) {
        return i18n[state.language].cyclesEn[cycle] || cycle;
    }
    
    return cycle;
}

// 更新周期选项
function updateCycleOptions() {
    const cycleSelect = document.getElementById('cycle');
    const isEnglish = document.getElementById('cycleLanguage')?.checked || false;
    
    if (!cycleSelect) return;
    
    const currentValue = cycleSelect.value;
    const cycles = isEnglish ? 
        (i18n[state.language]?.cyclesEn || {}) : 
        (i18n[state.language]?.cycles || {});
    
    cycleSelect.innerHTML = '';
    
    Object.entries(cycles).forEach(([key, value]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = value;
        if (key === currentValue) {
            option.selected = true;
        }
        cycleSelect.appendChild(option);
    });
    
    updateBilling();
}

// 更新货币格式
function updateCurrencyFormat() {
    updateBilling();
}

// 更新金额类型
function updateAmountType() {
    const amountType = document.getElementById('amountType')?.value;
    const amountValueGroup = document.getElementById('amountValueGroup');
    
    if (!amountValueGroup) return;
    
    if (amountType === 'custom') {
        amountValueGroup.classList.remove('hidden');
    } else {
        amountValueGroup.classList.add('hidden');
    }
    
    updateBilling();
}

// 获取金额值
function getAmountValue() {
    try {
        const amountType = document.getElementById('amountType')?.value;
        
        if (amountType === 'free') {
            return '0';
        } else if (amountType === 'payAsGo') {
            return '-1';
        } else {
            const amountValue = document.getElementById('amountValue')?.value || '12';
            const currency = document.getElementById('currency')?.value || 'EUR';
            const currencyFormat = document.getElementById('currencyFormat')?.value || 'before';
            
            const numericAmount = parseFloat(amountValue);
            if (isNaN(numericAmount) || numericAmount < 0) {
                console.warn('Invalid amount value:', amountValue);
                return '12EUR';
            }
            
            const symbol = (typeof currencySymbols !== 'undefined' && currencySymbols[currency]) || currency;
            
            switch (currencyFormat) {
                case 'before':
                    return `${amountValue}${currency}`;
                case 'symbol_before':
                    return `${symbol}${amountValue}`;
                case 'after':
                    return `${amountValue}${symbol}`;
                default:
                    return `${amountValue}${currency}`;
            }
        }
    } catch (error) {
        console.error('Error in getAmountValue:', error);
        return '12EUR';
    }
}

// ==================== 计划管理部分 ====================

// 增强的计划配置更新
function updatePlan() {
    try {
        const bandwidth = getBandwidthValue();
        const trafficVol = getTrafficVolValue();
        const trafficType = document.getElementById('trafficType')?.value || '2';
        const ipv4 = document.getElementById('ipv4')?.value || '1';
        const ipv6 = document.getElementById('ipv6')?.value || '1';
        const networkRoute = document.getElementById('networkRoute')?.value || '4837';
        
        if (!bandwidth || !trafficVol) {
            console.warn('Bandwidth or traffic values are missing');
        }
        
        const validRoutes = ['4837', '9929', 'CN2', 'BGP'];
        if (!validRoutes.includes(networkRoute)) {
            console.warn('Invalid network route, using default 4837');
        }
        
        state.config.planDataMod.bandwidth = bandwidth;
        state.config.planDataMod.trafficVol = trafficVol;
        state.config.planDataMod.trafficType = trafficType;
        state.config.planDataMod.IPv4 = ipv4;
        state.config.planDataMod.IPv6 = ipv6;
        state.config.planDataMod.networkRoute = networkRoute;
        
        if (state.tags && state.tags.length > 0) {
            state.config.planDataMod.extra = state.tags.join(',');
        } else {
            state.config.planDataMod.extra = 'xxxx.im';
        }
        
        if (typeof updateJsonCode === 'function') {
            updateJsonCode();
        }
        
    } catch (error) {
        console.error('Error in updatePlan:', error);
        if (typeof showToast === 'function') {
            showToast('更新计划配置时发生错误');
        }
    }
}

// 获取带宽值
function getBandwidthValue() {
    try {
        const bandwidthValue = document.getElementById('bandwidthValue')?.value || '30';
        const bandwidthUnit = document.getElementById('bandwidthUnit')?.value || 'Mbps';
        
        const numValue = parseFloat(bandwidthValue);
        if (isNaN(numValue) || numValue <= 0) {
            console.warn('Invalid bandwidth value, using default 30');
            return '30Mbps';
        }
        
        const validUnits = ['Kbps', 'Mbps', 'Gbps', 'Unlimited'];
        if (!validUnits.includes(bandwidthUnit)) {
            console.warn('Invalid bandwidth unit, using default Mbps');
            return `${bandwidthValue}Mbps`;
        }
        
        return `${bandwidthValue}${bandwidthUnit}`;
    } catch (error) {
        console.error('Error in getBandwidthValue:', error);
        return '30Mbps';
    }
}

// 获取流量配额值
function getTrafficVolValue() {
    try {
        const trafficValue = document.getElementById('trafficValue')?.value || '1';
        const trafficUnit = document.getElementById('trafficUnit')?.value || 'TB';
        const trafficPeriod = document.getElementById('trafficPeriod')?.value || 'Month';
        const isEnglish = document.getElementById('trafficLanguage')?.checked || false;
        
        if (trafficUnit === 'Unlimited') {
            return typeof __ === 'function' ? __('unlimited') : 'Unlimited';
        }
        
        const numValue = parseFloat(trafficValue);
        if (isNaN(numValue) || numValue <= 0) {
            console.warn('Invalid traffic value, using default 1');
            return '1TB/Month';
        }
        
        const validUnits = ['MB', 'GB', 'TB', 'Unlimited'];
        if (!validUnits.includes(trafficUnit)) {
            console.warn('Invalid traffic unit, using default TB');
            return `${trafficValue}TB/Month`;
        }
        
        const periodDisplay = isEnglish ? 
            (i18n && i18n[state.language] && i18n[state.language].trafficPeriodsEn ? 
                i18n[state.language].trafficPeriodsEn[trafficPeriod] : trafficPeriod) :
            (i18n && i18n[state.language] && i18n[state.language].trafficPeriods ? 
                i18n[state.language].trafficPeriods[trafficPeriod] : trafficPeriod);
        
        return `${trafficValue}${trafficUnit}/${periodDisplay}`;
    } catch (error) {
        console.error('Error in getTrafficVolValue:', error);
        return '1TB/Month';
    }
}

// 更新单位选项
function updateUnitOptions() {
    updatePlan();
}

// 更新周期选项（流量）
function updateTrafficPeriodOptions() {
    const trafficPeriodSelect = document.getElementById('trafficPeriod');
    const isEnglish = document.getElementById('trafficLanguage')?.checked || false;
    
    if (!trafficPeriodSelect) return;
    
    const currentValue = trafficPeriodSelect.value;
    const periods = isEnglish ? 
        (i18n[state.language]?.trafficPeriodsEn || {}) : 
        (i18n[state.language]?.trafficPeriods || {});
    
    trafficPeriodSelect.innerHTML = '';
    
    Object.entries(periods).forEach(([key, value]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = value;
        if (key === currentValue) {
            option.selected = true;
        }
        trafficPeriodSelect.appendChild(option);
    });
    
    updatePlan();
}

// 更新货币格式（计划）
function updatePlanCurrencyFormat() {
    updatePlan();
}

// ==================== 标签管理部分 ====================

// 标签管理
function addTag() {
    try {
        const input = document.getElementById('newTag');
        if (!input) {
            console.warn('Tag input element not found');
            return;
        }
        
        const tagText = input.value.trim();
        
        if (!tagText) {
            console.warn('Tag text is empty');
            return;
        }
        
        if (tagText.length > 50) {
            console.warn('Tag text too long, maximum 50 characters allowed');
            if (typeof showToast === 'function') {
                showToast('标签长度不能超过50个字符');
            }
            return;
        }
        
        if (state.tags && state.tags.includes(tagText)) {
            console.warn('Tag already exists');
            if (typeof showToast === 'function') {
                showToast('标签已存在');
            }
            return;
        }
        
        if (state.tags && state.tags.length >= 10) {
            console.warn('Maximum 10 tags allowed');
            if (typeof showToast === 'function') {
                showToast('最多只能添加10个标签');
            }
            return;
        }
        
        if (!state.tags) {
            state.tags = [];
        }
        
        state.tags.push(tagText);
        renderTags();
        input.value = '';
        updatePlan();
        
    } catch (error) {
        console.error('Error in addTag:', error);
        if (typeof showToast === 'function') {
            showToast('添加标签时发生错误');
        }
    }
}

// 移除标签
function removeTag(button) {
    try {
        const tagElement = button.closest('.tag-item');
        if (!tagElement) return;
        
        const tagText = tagElement.querySelector('span').textContent;
        const tagIndex = state.tags.indexOf(tagText);
        
        if (tagIndex > -1) {
            state.tags.splice(tagIndex, 1);
            renderTags();
            updatePlan();
        }
    } catch (error) {
        console.error('Error in removeTag:', error);
        if (typeof showToast === 'function') {
            showToast('移除标签时发生错误');
        }
    }
}

// 渲染标签
function renderTags() {
    try {
        const container = document.getElementById('tagsContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        if (!state.tags || state.tags.length === 0) {
            const defaultTag = document.createElement('div');
            defaultTag.className = 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm flex items-center space-x-2 tag-item';
            defaultTag.innerHTML = `
                <span>xxxx.im</span>
                <button onclick="removeTag(this)" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-300">
                    <i class="fas fa-times"></i>
                </button>
            `;
            container.appendChild(defaultTag);
            return;
        }
        
        state.tags.forEach(tag => {
            const tagElement = document.createElement('div');
            tagElement.className = 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm flex items-center space-x-2 tag-item';
            tagElement.innerHTML = `
                <span>${escapeHtml(tag)}</span>
                <button onclick="removeTag(this)" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-300">
                    <i class="fas fa-times"></i>
                </button>
            `;
            container.appendChild(tagElement);
        });
    } catch (error) {
        console.error('Error in renderTags:', error);
    }
}

// HTML转义函数
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 处理标签输入
function handleTagInput(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTag();
    }
}

// 导出函数（如果支持模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleSection,
        handleSectionToggle,
        triggerAutoCalculation,
        calculateEndDate,
        updateBilling,
        getCycleValue,
        updateCycleOptions,
        updateCurrencyFormat,
        updateAmountType,
        getAmountValue,
        updatePlan,
        getBandwidthValue,
        getTrafficVolValue,
        updateUnitOptions,
        updateTrafficPeriodOptions,
        updatePlanCurrencyFormat,
        addTag,
        removeTag,
        renderTags,
        handleTagInput
    };
}