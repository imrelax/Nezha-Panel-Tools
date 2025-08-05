// 计划配置和标签管理模块

// 更新计划配置
function updatePlan() {
    const bandwidth = getBandwidthValue();
    const trafficVol = getTrafficVolValue();
    const trafficType = document.getElementById('trafficType')?.value || '2';
    const ipv4 = document.getElementById('ipv4')?.value || '1';
    const ipv6 = document.getElementById('ipv6')?.value || '1';
    const networkRoute = document.getElementById('networkRoute')?.value || '4837';
    
    state.config.planDataMod.bandwidth = bandwidth;
    state.config.planDataMod.trafficVol = trafficVol;
    state.config.planDataMod.trafficType = trafficType;
    state.config.planDataMod.IPv4 = ipv4;
    state.config.planDataMod.IPv6 = ipv6;
    state.config.planDataMod.networkRoute = networkRoute;
    
    // 更新额外标签
    if (state.tags.length > 0) {
        state.config.planDataMod.extra = state.tags.join(',');
    } else {
        state.config.planDataMod.extra = 'XXXX';
    }
    
    updateJsonCode();
}

// 获取带宽值
function getBandwidthValue() {
    const bandwidthValue = document.getElementById('bandwidthValue')?.value || '30';
    const bandwidthUnit = document.getElementById('bandwidthUnit')?.value || 'Mbps';
    
    return `${bandwidthValue}${bandwidthUnit}`;
}

// 更新带宽单位
function updateBandwidthUnit() {
    const bandwidthValue = document.getElementById('bandwidthValue')?.value || '30';
    const bandwidthUnit = document.getElementById('bandwidthUnit')?.value || 'Mbps';
    const bandwidthUnitSelect = document.getElementById('bandwidthUnit');
    
    if (!bandwidthUnitSelect) return;
    
    // 更新选项显示
    Array.from(bandwidthUnitSelect.options).forEach(option => {
        switch (option.value) {
            case 'Kbps':
                option.textContent = `${bandwidthValue}Kbps`;
                break;
            case 'Mbps':
                option.textContent = `${bandwidthValue}Mbps`;
                break;
            case 'Gbps':
                option.textContent = `${bandwidthValue}Gbps`;
                break;
            case 'Unlimited':
                option.textContent = __('unlimited');
                break;
        }
    });
    
    updatePlan();
}

// 更新流量单位
function updateTrafficUnit() {
    const trafficValue = document.getElementById('trafficValue')?.value || '1';
    const trafficUnit = document.getElementById('trafficUnit')?.value || 'TB';
    const trafficPeriod = document.getElementById('trafficPeriod')?.value || 'Month';
    const isEnglish = document.getElementById('trafficLanguage')?.checked || false;
    const trafficUnitSelect = document.getElementById('trafficUnit');
    
    if (!trafficUnitSelect) return;
    
    const periodDisplay = getPeriodDisplay(trafficPeriod, isEnglish);
    
    // 更新选项显示
    Array.from(trafficUnitSelect.options).forEach(option => {
        switch (option.value) {
            case 'MB':
                option.textContent = `${trafficValue}MB/${periodDisplay}`;
                break;
            case 'GB':
                option.textContent = `${trafficValue}GB/${periodDisplay}`;
                break;
            case 'TB':
                option.textContent = `${trafficValue}TB/${periodDisplay}`;
                break;
            case 'Unlimited':
                option.textContent = __('unlimited');
                break;
        }
    });
    
    updatePlan();
}

// 获取流量配额值
function getTrafficVolValue() {
    const trafficValue = document.getElementById('trafficValue')?.value || '1';
    const trafficUnit = document.getElementById('trafficUnit')?.value || 'TB';
    const trafficPeriod = document.getElementById('trafficPeriod')?.value || 'Month';
    const isEnglish = document.getElementById('trafficLanguage')?.checked || false;
    
    if (trafficUnit === 'Unlimited') {
        return __('unlimited');
    }
    
    const periodDisplay = isEnglish ? 
        i18n[state.language].trafficPeriodsEn[trafficPeriod] || trafficPeriod :
        i18n[state.language].trafficPeriods[trafficPeriod] || trafficPeriod;
    
    return `${trafficValue}${trafficUnit}/${periodDisplay}`;
}

// 获取周期显示
function getPeriodDisplay(period, isEnglish) {
    if (period === 'Unlimited') {
        return __('unlimited');
    }
    
    const dict = isEnglish ? i18n[state.language].trafficPeriodsEn : i18n[state.language].trafficPeriods;
    return dict[period] || period;
}

// 更新流量周期选项
function updateTrafficPeriodOptions() {
    const select = document.getElementById('trafficPeriod');
    const isEnglish = document.getElementById('trafficLanguage')?.checked || false;
    
    if (!select) return;
    
    Array.from(select.options).forEach(option => {
        const key = option.value;
        const baseText = isEnglish ? option.dataset.en : option.dataset.zh;
        option.textContent = baseText;
    });
    
    updatePlan();
}

// 更新流量语言
function updateTrafficLanguage() {
    updateTrafficPeriodOptions();
}

// 更新货币格式选项
function updateCurrencyFormatOptions() {
    const amountValue = document.getElementById('amountValue')?.value || '12';
    const currency = document.getElementById('currency')?.value || 'EUR';
    const select = document.getElementById('currencyFormat');
    
    if (!select) return;
    
    const symbol = currencySymbols[currency];
    
    Array.from(select.options).forEach(option => {
        switch (option.value) {
            case 'before':
                option.textContent = `${amountValue}${currency}`;
                break;
            case 'symbol_before':
                option.textContent = `${symbol}${amountValue}`;
                break;
            case 'after':
                option.textContent = `${amountValue}${symbol}`;
                break;
        }
    });
}

// 标签管理
function addTag() {
    const input = document.getElementById('newTag');
    if (!input) return;
    
    const tagText = input.value.trim();
    
    if (tagText && !state.tags.includes(tagText)) {
        state.tags.push(tagText);
        renderTags();
        input.value = '';
        updatePlan();
    }
}

function removeTag(button) {
    const tagElement = button.parentElement;
    const tagText = tagElement.querySelector('span')?.textContent;
    
    if (tagText) {
        state.tags = state.tags.filter(tag => tag !== tagText);
        renderTags();
        updatePlan();
    }
}

function renderTags() {
    const container = document.getElementById('tagsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    state.tags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'inline-flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm';
        tagElement.innerHTML = `
            <span>${tag}</span>
            <button type="button" onclick="removeTag(this)" class="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100">
                <i class="fas fa-times text-xs"></i>
            </button>
        `;
        container.appendChild(tagElement);
    });
}

function handleTagInput(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addTag();
    }
}

// 导出函数（如果支持模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updatePlan,
        getBandwidthValue,
        updateBandwidthUnit,
        updateTrafficUnit,
        getTrafficVolValue,
        getPeriodDisplay,
        updateTrafficPeriodOptions,
        updateTrafficLanguage,
        updateCurrencyFormatOptions,
        addTag,
        removeTag,
        renderTags,
        handleTagInput
    };
}