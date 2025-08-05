// JSON处理和解析模块

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

// 从代码刷新配置
function refreshFromCode(event) {
    event.stopPropagation();
    const jsonCode = document.getElementById('jsonCode');
    if (!jsonCode) return;
    
    try {
        const parsedConfig = JSON.parse(jsonCode.value);
        
        // 重置状态
        state.isManualRefresh = true;
        
        // 解析账单配置
        if (parsedConfig.billingDataMod) {
            state.config.enableBilling = true;
            state.config.billingDataMod = { ...parsedConfig.billingDataMod };
            const enableBillingCheckbox = document.getElementById('enableBilling');
            const billingForm = document.getElementById('billingForm');
            if (enableBillingCheckbox) enableBillingCheckbox.checked = true;
            if (billingForm) billingForm.classList.remove('hidden');
            
            // 解析日期
            if (parsedConfig.billingDataMod.startDate) {
                const startDate = new Date(parsedConfig.billingDataMod.startDate);
                const startDateElement = document.getElementById('startDate');
                if (startDateElement) startDateElement.value = formatDateTimeLocal(startDate);
            }
            if (parsedConfig.billingDataMod.endDate) {
                const endDate = new Date(parsedConfig.billingDataMod.endDate);
                const endDateElement = document.getElementById('endDate');
                if (endDateElement) endDateElement.value = formatDateTimeLocal(endDate);
            }
            
            // 解析自动续费
            if (parsedConfig.billingDataMod.autoRenewal) {
                const autoRenewalElement = document.getElementById('autoRenewal');
                if (autoRenewalElement) autoRenewalElement.value = parsedConfig.billingDataMod.autoRenewal;
            }
            
            // 解析周期
            if (parsedConfig.billingDataMod.cycle) {
                parseAndSetCycle(parsedConfig.billingDataMod.cycle);
            }
            
            // 解析金额
            if (parsedConfig.billingDataMod.amount) {
                parseAndSetAmount(parsedConfig.billingDataMod.amount);
            }
        } else {
            state.config.enableBilling = false;
            const enableBillingCheckbox = document.getElementById('enableBilling');
            const billingForm = document.getElementById('billingForm');
            if (enableBillingCheckbox) enableBillingCheckbox.checked = false;
            if (billingForm) billingForm.classList.add('hidden');
        }
        
        if (parsedConfig.planDataMod) {
            state.config.enablePlan = true;
            state.config.planDataMod = { ...parsedConfig.planDataMod };
            const enablePlanCheckbox = document.getElementById('enablePlan');
            const planForm = document.getElementById('planForm');
            if (enablePlanCheckbox) enablePlanCheckbox.checked = true;
            if (planForm) planForm.classList.remove('hidden');
            
            // 解析带宽
            if (parsedConfig.planDataMod.bandwidth) {
                parseAndSetBandwidth(parsedConfig.planDataMod.bandwidth);
            }
            
            // 解析流量
            if (parsedConfig.planDataMod.trafficVol) {
                parseAndSetTrafficVol(parsedConfig.planDataMod.trafficVol);
            }
            
            // 更新其他字段
            if (parsedConfig.planDataMod.trafficType) {
                const trafficTypeElement = document.getElementById('trafficType');
                if (trafficTypeElement) trafficTypeElement.value = parsedConfig.planDataMod.trafficType;
            }
            if (parsedConfig.planDataMod.IPv4) {
                const ipv4Element = document.getElementById('ipv4');
                if (ipv4Element) ipv4Element.value = parsedConfig.planDataMod.IPv4;
            }
            if (parsedConfig.planDataMod.IPv6) {
                const ipv6Element = document.getElementById('ipv6');
                if (ipv6Element) ipv6Element.value = parsedConfig.planDataMod.IPv6;
            }
            if (parsedConfig.planDataMod.networkRoute) {
                const networkRouteElement = document.getElementById('networkRoute');
                if (networkRouteElement) networkRouteElement.value = parsedConfig.planDataMod.networkRoute;
            }
            
            // 解析标签
            if (parsedConfig.planDataMod.extra && parsedConfig.planDataMod.extra !== 'xxxx.im') {
                state.tags = parsedConfig.planDataMod.extra.split(',').map(tag => tag.trim()).filter(tag => tag);
                renderTags();
            }
        } else {
            state.config.enablePlan = false;
            const enablePlanCheckbox = document.getElementById('enablePlan');
            const planForm = document.getElementById('planForm');
            if (enablePlanCheckbox) enablePlanCheckbox.checked = false;
            if (planForm) planForm.classList.add('hidden');
        }
        
        state.isManualRefresh = false;
        showToast(__('refreshSuccess'));
        
    } catch (error) {
        console.error('JSON解析错误:', error);
        showToast('JSON格式错误，请检查语法');
    }
}

// 解析并设置周期
function parseAndSetCycle(cycleValue) {
    const cycleSelect = document.getElementById('cycle');
    const cycleLanguageToggle = document.getElementById('cycleLanguage');
    
    if (!cycleSelect || !cycleLanguageToggle) return;
    
    // 检查是否为英文周期
    const isEnglishCycle = ['Day', 'Week', 'Quarter', 'HalfYear', 'Year', '2Year', '3Year', '4Year', '5Year', 'Permanent'].includes(cycleValue);
    
    if (isEnglishCycle) {
        cycleLanguageToggle.checked = true;
        cycleSelect.value = cycleValue;
    } else {
        cycleLanguageToggle.checked = false;
        // 查找对应的中文周期
        if (typeof i18n !== 'undefined' && i18n[state.language] && i18n[state.language].cycles) {
            for (const [key, value] of Object.entries(i18n[state.language].cycles)) {
                if (value === cycleValue) {
                    cycleSelect.value = key;
                    break;
                }
            }
        }
    }
    updateCycleOptions();
}

// 解析并设置金额
function parseAndSetAmount(amountValue) {
    const amountTypeSelect = document.getElementById('amountType');
    const amountValueInput = document.getElementById('amountValue');
    const currencySelect = document.getElementById('currency');
    const currencyFormatSelect = document.getElementById('currencyFormat');
    
    if (!amountTypeSelect || !amountValueInput || !currencySelect || !currencyFormatSelect) return;
    
    if (amountValue === '0') {
        amountTypeSelect.value = 'free';
        updateAmountType();
        return;
    }
    
    if (amountValue === '-1') {
        amountTypeSelect.value = 'payAsGo';
        updateAmountType();
        return;
    }
    
    amountTypeSelect.value = 'billing';
    updateAmountType();
    
    // 解析金额格式
    const currencyRegex = /([¥$€£])(\d+)|(\d+)(CNY|USD|EUR|GBP|¥|$|€|£)/;
    const match = amountValue.match(currencyRegex);
    
    if (match) {
        if (match[1] && match[2]) {
            // 符号在前 ¥12
            const symbol = match[1];
            const value = match[2];
            amountValueInput.value = value;
            
            // 找到对应的货币
            if (typeof currencySymbols !== 'undefined') {
                for (const [curr, sym] of Object.entries(currencySymbols)) {
                    if (sym === symbol) {
                        currencySelect.value = curr;
                        break;
                    }
                }
            }
            currencyFormatSelect.value = 'symbol_before';
        } else if (match[3] && match[4]) {
            const value = match[3];
            const currencyOrSymbol = match[4];
            amountValueInput.value = value;
            
            // 检查是否为货币代码
            if (['CNY', 'USD', 'EUR', 'GBP'].includes(currencyOrSymbol)) {
                currencySelect.value = currencyOrSymbol;
                currencyFormatSelect.value = 'before';
            } else {
                // 符号在后
                if (typeof currencySymbols !== 'undefined') {
                    for (const [curr, sym] of Object.entries(currencySymbols)) {
                        if (sym === currencyOrSymbol) {
                            currencySelect.value = curr;
                            break;
                        }
                    }
                }
                currencyFormatSelect.value = 'after';
            }
        }
    } else {
        // 默认处理
        amountValueInput.value = amountValue.replace(/[^\d]/g, '') || '12';
    }
    
    updateCurrencyFormatOptions();
}

// 解析并设置带宽
function parseAndSetBandwidth(bandwidthValue) {
    const bandwidthValueInput = document.getElementById('bandwidthValue');
    const bandwidthUnitSelect = document.getElementById('bandwidthUnit');
    
    if (!bandwidthValueInput || !bandwidthUnitSelect) return;
    
    if (bandwidthValue === __('unlimited')) {
        bandwidthUnitSelect.value = 'Unlimited';
        bandwidthValueInput.value = '0';
    } else {
        const match = bandwidthValue.match(/(\d+)(\w+)/);
        if (match) {
            bandwidthValueInput.value = match[1];
            bandwidthUnitSelect.value = match[2];
        }
    }
    
    updateBandwidthUnit();
}

// 解析并设置流量配额
function parseAndSetTrafficVol(trafficVolValue) {
    const trafficValueInput = document.getElementById('trafficValue');
    const trafficUnitSelect = document.getElementById('trafficUnit');
    const trafficPeriodSelect = document.getElementById('trafficPeriod');
    const trafficLanguageToggle = document.getElementById('trafficLanguage');
    
    if (!trafficValueInput || !trafficUnitSelect || !trafficPeriodSelect || !trafficLanguageToggle) return;
    
    if (trafficVolValue === (typeof __ === 'function' ? __('unlimited') : 'Unlimited') || trafficVolValue === 'Unlimited' || trafficVolValue === '不限') {
        trafficUnitSelect.value = 'Unlimited';
        trafficValueInput.value = '0';
        return;
    }
    
    // 解析格式如 "1TB/Month" 或 "1TB/月"
    const match = trafficVolValue.match(/(\d+)(\w+)\/(\w+)/);
    if (match) {
        const value = match[1];
        const unit = match[2];
        const period = match[3];
        
        trafficValueInput.value = value;
        trafficUnitSelect.value = unit;
        
        // 检查周期是否为英文
        const isEnglishPeriod = ['Day', 'Month', 'Quarter', 'Year', 'Unlimited'].includes(period);
        trafficLanguageToggle.checked = isEnglishPeriod;
        
        if (isEnglishPeriod) {
            trafficPeriodSelect.value = period;
        } else {
            // 查找对应的中文周期
            if (typeof i18n !== 'undefined' && i18n[state.language] && i18n[state.language].trafficPeriods) {
                for (const [key, value] of Object.entries(i18n[state.language].trafficPeriods)) {
                    if (value === period) {
                        trafficPeriodSelect.value = key;
                        break;
                    }
                }
            }
        }
    }
    
    updateTrafficPeriodOptions();
    updateTrafficUnit();
}

// 代码变化处理
function handleCodeChange() {
    if (!state.isManualRefresh) {
        // 实时更新逻辑可以在这里添加
    }
}

// 导出函数（如果支持模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateJsonCode,
        refreshFromCode,
        parseAndSetCycle,
        parseAndSetAmount,
        parseAndSetBandwidth,
        parseAndSetTrafficVol,
        handleCodeChange
    };
}