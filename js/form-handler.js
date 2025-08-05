// 表单处理和配置管理模块

// 节的开关
function toggleSection(section) {
    const checkbox = document.getElementById(`enable${section.charAt(0).toUpperCase() + section.slice(1)}`);
    const form = document.getElementById(`${section}Form`);
    
    if (!checkbox || !form) {
        return; // 如果元素不存在，直接返回
    }
    
    // 确保checkbox存在且有checked属性
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
    
    if (typeof updateJsonCode === 'function') {
        updateJsonCode();
    }
}

// 自动计算触发
function triggerAutoCalculation() {
    calculateEndDate();
}

// 计算结束日期
function calculateEndDate() {
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const cycleSelect = document.getElementById('cycle');
    
    if (!startDateInput || !endDateInput || !cycleSelect) {
        return;
    }
    
    const startDate = new Date(startDateInput.value);
    const cycle = cycleSelect.value;
    
    if (isNaN(startDate.getTime())) {
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
        case '2Year':
            endDate.setFullYear(endDate.getFullYear() + 2);
            break;
        case '3Year':
            endDate.setFullYear(endDate.getFullYear() + 3);
            break;
        case '4Year':
            endDate.setFullYear(endDate.getFullYear() + 4);
            break;
        case '5Year':
            endDate.setFullYear(endDate.getFullYear() + 5);
            break;
        case 'Permanent':
            endDate = new Date('2099-12-31T23:59:59');
            break;
        default:
            endDate.setFullYear(endDate.getFullYear() + 1);
    }
    
    endDateInput.value = formatDateTimeLocal(endDate);
    updateBilling();
}

// 格式化日期时间为本地格式
function formatDateTimeLocal(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

// 更新账单配置
function updateBilling() {
    const startDate = document.getElementById('startDate')?.value;
    const endDate = document.getElementById('endDate')?.value;
    const autoRenewal = document.getElementById('autoRenewal')?.value;
    const cycle = getCycleValue();
    const amount = getAmountValue();
    
    if (startDate) {
        state.config.billingDataMod.startDate = new Date(startDate).toISOString();
    }
    if (endDate) {
        state.config.billingDataMod.endDate = new Date(endDate).toISOString();
    }
    if (autoRenewal !== undefined) {
        state.config.billingDataMod.autoRenewal = autoRenewal;
    }
    if (cycle) {
        state.config.billingDataMod.cycle = cycle;
    }
    if (amount !== undefined) {
        state.config.billingDataMod.amount = amount;
    }
    
    // 检查是否使用非官方周期
    if (unofficialCycles.includes(cycle)) {
        showWarning('unofficial', { cycle: getCycleDisplayName(cycle) });
        
        // 禁用自动续费和周期字段
        const autoRenewalSelect = document.getElementById('autoRenewal');
        const cycleSelect = document.getElementById('cycle');
        if (autoRenewalSelect) autoRenewalSelect.disabled = true;
        if (cycleSelect) cycleSelect.disabled = true;
    } else {
        // 启用自动续费和周期字段
        const autoRenewalSelect = document.getElementById('autoRenewal');
        const cycleSelect = document.getElementById('cycle');
        if (autoRenewalSelect) autoRenewalSelect.disabled = false;
        if (cycleSelect) cycleSelect.disabled = false;
    }
    
    updateJsonCode();
}

// 获取周期显示名称
function getCycleDisplayName(cycle) {
    const isEnglish = document.getElementById('cycleLanguage')?.checked || false;
    const dict = isEnglish ? i18n[state.language].cyclesEn : i18n[state.language].cycles;
    return dict[cycle] || cycle;
}

// 获取周期值
function getCycleValue() {
    const cycleSelect = document.getElementById('cycle');
    const isEnglish = document.getElementById('cycleLanguage')?.checked || false;
    
    if (!cycleSelect) return 'Year';
    
    const selectedValue = cycleSelect.value;
    
    if (isEnglish) {
        return selectedValue;
    } else {
        // 如果是中文，需要转换为英文值
        return selectedValue;
    }
}

// 更新周期选项
function updateCycleOptions() {
    const select = document.getElementById('cycle');
    const isEnglish = document.getElementById('cycleLanguage')?.checked || false;
    
    if (!select) return;
    
    Array.from(select.options).forEach(option => {
        const key = option.value;
        const dict = isEnglish ? i18n[state.language].cyclesEn : i18n[state.language].cycles;
        option.textContent = dict[key] || key;
    });
    
    updateBilling();
}

// 更新周期语言
function updateCycleLanguage() {
    updateCycleOptions();
}

// 金额类型更新
function updateAmountType() {
    const amountType = document.getElementById('amountType')?.value;
    const amountInputs = document.getElementById('amountInputs');
    
    if (!amountType || !amountInputs) return;
    
    if (amountType === 'free') {
        amountInputs.style.display = 'none';
        state.config.billingDataMod.amount = '0';
    } else if (amountType === 'payAsGo') {
        amountInputs.style.display = 'none';
        state.config.billingDataMod.amount = '-1';
    } else {
        amountInputs.style.display = 'flex';
        updateBilling();
        return;
    }
    
    updateJsonCode();
}

// 获取金额值
function getAmountValue() {
    const amountType = document.getElementById('amountType')?.value;
    
    if (amountType === 'free') {
        return '0';
    } else if (amountType === 'payAsGo') {
        return '-1';
    } else {
        const amountValue = document.getElementById('amountValue')?.value || '12';
        const currency = document.getElementById('currency')?.value || 'EUR';
        const currencyFormat = document.getElementById('currencyFormat')?.value || 'before';
        
        const symbol = currencySymbols[currency];
        
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
}

// 导出函数（如果支持模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleSection,
        triggerAutoCalculation,
        calculateEndDate,
        formatDateTimeLocal,
        updateBilling,
        getCycleDisplayName,
        getCycleValue,
        updateCycleOptions,
        updateCycleLanguage,
        updateAmountType,
        getAmountValue
    };
}