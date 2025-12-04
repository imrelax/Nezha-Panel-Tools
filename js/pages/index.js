/**
 * 首页初始化与逻辑处理模块
 * 负责 index.html (Nezha Config Generator) 的所有交互逻辑
 * 整合了原 index-utils.js 和 app.js 中的相关逻辑
 */
(function() {
    'use strict';

    // ==================== 初始化部分 ====================

    function initializeIndexPage() {
        // 设置默认开始时间
        const now = new Date();
        const startDateElement = document.getElementById('start-date');
        if (startDateElement) {
             if (typeof commonUtils !== 'undefined' && commonUtils.formatDateTimeLocal) {
                 startDateElement.value = commonUtils.formatDateTimeLocal(now);
             } else {
                 // Fallback
                 const year = now.getFullYear();
                 const month = String(now.getMonth() + 1).padStart(2, '0');
                 const day = String(now.getDate()).padStart(2, '0');
                 const hours = String(now.getHours()).padStart(2, '0');
                 const minutes = String(now.getMinutes()).padStart(2, '0');
                 startDateElement.value = `${year}-${month}-${day}T${hours}:${minutes}`;
             }
        }
        
        // 初始化复选框状态
        const enableBillingCheckbox = document.getElementById('enable-billing');
        const enablePlanCheckbox = document.getElementById('enable-plan');
        const billingForm = document.getElementById('billing-form');
        const planForm = document.getElementById('plan-form');
        
        if (enableBillingCheckbox) {
            enableBillingCheckbox.checked = state.config.enableBilling;
        }
        if (enablePlanCheckbox) {
            enablePlanCheckbox.checked = state.config.enablePlan;
        }
        if (billingForm) {
            if (state.config.enableBilling) {
                billingForm.classList.remove('hidden');
            } else {
                billingForm.classList.add('hidden');
            }
        }
        if (planForm) {
            if (state.config.enablePlan) {
                planForm.classList.remove('hidden');
            } else {
                planForm.classList.add('hidden');
            }
        }
        
        // 初始化配置
        updateBilling();
        
        // 初始化标签
        renderTags();
        
        // 更新计划和JSON（在标签渲染后）
        updatePlan();
        updateJsonCode();
        
        // 绑定事件监听器
        bindEventListeners();
    }

    function bindEventListeners() {
        // 表单变化监听
        const formElements = document.querySelectorAll('input, select, textarea');
        formElements.forEach(element => {
            if (element.id === 'jsonCode') return; // Skip jsonCode, handled separately
            
            if (element.type === 'checkbox') {
                element.addEventListener('change', handleFormChange);
            } else {
                if (typeof commonUtils !== 'undefined' && commonUtils.debounce) {
                     element.addEventListener('input', commonUtils.debounce(handleFormChange, 300, 'formInput'));
                } else {
                     element.addEventListener('input', handleFormChange);
                }
            }
        });
        
        // 标签输入监听
        const newTagInput = document.getElementById('newTag');
        if (newTagInput) {
            newTagInput.addEventListener('keypress', handleTagInput);
        }
        
        // JSON代码变化监听
        const jsonCode = document.getElementById('jsonCode');
        if (jsonCode) {
             if (typeof commonUtils !== 'undefined' && commonUtils.debounce) {
                jsonCode.addEventListener('input', commonUtils.debounce(handleCodeChange, 500, 'jsonInput'));
             } else {
                jsonCode.addEventListener('input', handleCodeChange);
             }
        }
        
        // 键盘快捷键
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + S 保存/复制
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                copyCode(e);
            }
            
            // Ctrl/Cmd + R 刷新配置
            if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
                e.preventDefault();
                refreshFromCode(e);
            }
            
            // Ctrl/Cmd + C 复制JSON (智能处理)
            if ((e.ctrlKey || e.metaKey) && e.key === 'c' && !e.target.matches('input, textarea')) {
                const selection = window.getSelection();
                const selectedText = selection.toString().trim();
                
                // 只有在没有选中任何文本，或者选中的文本来自JSON代码区域时才拦截
                if (!selectedText || (selection.anchorNode && selection.anchorNode.parentElement && 
                    (selection.anchorNode.parentElement.id === 'jsonCode' || 
                     selection.anchorNode.parentElement.closest('#jsonCode')))) {
                    e.preventDefault();
                    copyCode(e);
                }
            }
        });
    }

    function handleFormChange(event) {
        const element = event.target;
        const id = element.id;
        
        // 根据不同的表单元素执行相应的更新
        switch (id) {
            case 'enable-billing':
                toggleSection('billing');
                break;
            case 'enable-plan':
                toggleSection('plan');
                break;
            case 'start-date':
            case 'end-date':
            case 'auto-renewal':
            case 'cycle':
                updateBilling();
                break;
            case 'amount-type':
                updateAmountType();
                break;
            case 'amount-value':
            case 'currency':
            case 'currency-format':
                updateBilling();
                break;
            case 'bandwidth-value':
            case 'bandwidth-unit':
                if (typeof updateBandwidthUnit === 'function') {
                    updateBandwidthUnit();
                } else {
                    updatePlan();
                }
                break;
            case 'traffic-value':
            case 'trafficUnit':
            case 'trafficPeriod':
                if (typeof updateTrafficUnit === 'function') {
                    updateTrafficUnit();
                } else {
                    updatePlan();
                }
                break;

            case 'trafficType':
                updatePlan();
                break;
            case 'ipv4':
            case 'ipv6':
            case 'networkRoute':
            case 'extraTags':
                updatePlan();
                break;     
            default:
                // 通用更新
                if (element.closest('#billing-form')) {
                    updateBilling();
                } else if (element.closest('#plan-form')) {
                    updatePlan();
                }
        }
        
        // 自动保存状态
        if (typeof commonUtils !== 'undefined' && commonUtils.debounce && typeof storage !== 'undefined') {
            commonUtils.debounce(() => {
                storage.set('appState', {
                    config: state.config,
                    tags: state.tags,
                    theme: state.theme,
                    language: state.language
                });
            }, 1000, 'autoSave')();
        }
    }

    function copyCode(event) {
        if(event) event.stopPropagation();
        const jsonCode = document.getElementById('jsonCode').value;
        if (typeof commonUtils !== 'undefined' && commonUtils.copyToClipboard) {
            commonUtils.copyToClipboard(jsonCode);
        } else {
             // Fallback
             const textArea = document.createElement('textarea');
             textArea.value = jsonCode;
             document.body.appendChild(textArea);
             textArea.select();
             document.execCommand('copy');
             document.body.removeChild(textArea);
             alert('已复制到剪贴板');
        }
    }

    // ==================== 原始 index-utils.js 逻辑 ====================

    // 节的开关
    function toggleSection(section) {
        try {
            const checkbox = document.getElementById(`enable-${section}`);
            const form = document.getElementById(`${section}-form`);
            
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
            
            handleSectionToggle(`${section}-form`, isChecked);
            
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
            const startDateInput = document.getElementById('start-date');
            const endDateInput = document.getElementById('end-date');
            const cycleSelect = document.getElementById('cycle');
            
            if (!startDateInput || !endDateInput || !cycleSelect) {
                console.warn('Required elements for date calculation not found');
                return;
            }
            
            if (!startDateInput.value) {
                if (typeof commonUtils !== 'undefined') {
                    commonUtils.showToast('请先选择开始日期', 'warning');
                }
                return;
            }
            
            const startDate = new Date(startDateInput.value);
            const cycleValue = cycleSelect.value;
            
            if (isNaN(startDate.getTime())) {
                return;
            }
            
            let endDate = new Date(startDate);
            
            // 辅助函数：处理月份增加，防止月末溢出
            const addMonths = (date, months) => {
                const d = new Date(date);
                const currentMonth = d.getMonth();
                d.setMonth(currentMonth + months);
                
                // 如果月份跨度超过预期（说明溢出了，例如1月31日+1个月变成3月），则回退到上个月最后一天
                if (d.getMonth() !== (currentMonth + months) % 12) {
                    d.setDate(0);
                }
                return d;
            };

            switch (cycleValue) {
                case 'Day':
                    endDate.setDate(endDate.getDate() + 1);
                    break;
                case 'Week':
                    endDate.setDate(endDate.getDate() + 7);
                    break;
                case 'Month':
                    endDate = addMonths(endDate, 1);
                    break;
                case 'Quarter':
                    endDate = addMonths(endDate, 3);
                    break;
                case 'HalfYear':
                    endDate = addMonths(endDate, 6);
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
                    endDate.setFullYear(endDate.getFullYear() + 99);
                    break;
                default:
                    endDate = addMonths(endDate, 1);
            }
            
            endDate.setDate(endDate.getDate() - 1);
            
            if (typeof commonUtils !== 'undefined' && commonUtils.formatDateTimeLocal) {
                endDateInput.value = commonUtils.formatDateTimeLocal(endDate);
            } else {
                const year = endDate.getFullYear();
                const month = String(endDate.getMonth() + 1).padStart(2, '0');
                const day = String(endDate.getDate()).padStart(2, '0');
                const hours = String(endDate.getHours()).padStart(2, '0');
                const minutes = String(endDate.getMinutes()).padStart(2, '0');
                endDateInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
            }
            
            updateBilling();
            
            if (typeof commonUtils !== 'undefined') {
                commonUtils.showToast('已自动计算结束日期');
            }
        } catch (error) {
            console.error('Error calculating end date:', error);
        }
    }

    // 更新账单配置
    function updateBilling() {
        try {
            const startDate = document.getElementById('start-date')?.value || '';
            const endDate = document.getElementById('end-date')?.value || '';
            const autoRenewal = document.getElementById('auto-renewal')?.checked || false;
            const cycle = getCycleValue();
            const amount = getAmountValue();
            
            state.config.billingDataMod = {
                startDate,
                endDate,
                autoRenewal: autoRenewal.toString(),
                cycle,
                amount
            };
            
            updateJsonCode();
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
        const amountType = document.getElementById('amount-type')?.value || 'billing';
        
        if (amountType === 'free') {
            return '0';
        }
        
        const amountValue = document.getElementById('amount-value')?.value || '0';
        const currency = document.getElementById('currency')?.value || 'CNY';
        const currencyFormat = document.getElementById('currency-format')?.value || 'before';
        
        // 获取货币符号 (Assuming currencySymbols is global from core.js)
        const symbol = (typeof currencySymbols !== 'undefined' && currencySymbols[currency]) ? currencySymbols[currency] : currency;
        
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

    // 更新金额类型显示逻辑
    function updateAmountType() {
        const amountType = document.getElementById('amount-type');
        const amountInputs = document.getElementById('amount-inputs');
        
        if (amountType && amountInputs) {
            const selectedValue = amountType.value;
            if (selectedValue === 'free') {
                amountInputs.style.display = 'none';
            } else {
                amountInputs.style.display = 'flex';
            }
        }
        
        updateBilling();
    }

    // 更新套餐配置
    function updatePlan() {
        try {
            const bandwidth = getBandwidthValue();
            const trafficVol = getTrafficVolValue();
            const networkRoute = document.getElementById('networkRoute')?.value || '';
            
            // 收集额外标签
            const tagsContainer = document.getElementById('tagsContainer');
            let extraTags = '';
            if (tagsContainer) {
                const tagDivs = tagsContainer.querySelectorAll('div');
                const tags = Array.from(tagDivs).map(div => {
                    const textSpan = div.querySelector('span:first-child');
                    return textSpan ? textSpan.textContent.trim() : '';
                }).filter(tag => tag && tag !== '✕');
                extraTags = tags.join(', ');
            }
            
            state.config.planDataMod = {
                bandwidth,
                trafficVol,
                networkRoute,
                extra: extraTags
            };
            
            updateJsonCode();
        } catch (error) {
            console.error('Error updating plan:', error);
        }
    }

    // 获取带宽值
    function getBandwidthValue() {
        const bandwidthUnit = document.getElementById('bandwidth-unit')?.value || 'Mbps';
        
        if (bandwidthUnit === 'Unlimited') {
            return 'Unlimited';
        } else {
            const bandwidth = document.getElementById('bandwidth-value')?.value || '0';
            return `${bandwidth} ${bandwidthUnit}`;
        }
    }

    // 更新带宽单位显示
    function updateBandwidthUnit() {
        const bandwidthUnit = document.getElementById('bandwidth-unit');
        const bandwidthValue = document.getElementById('bandwidth-value');
        
        if (bandwidthUnit && bandwidthValue) {
            if (bandwidthUnit.value === 'Unlimited') {
                bandwidthValue.style.display = 'none';
            } else {
                bandwidthValue.style.display = 'block';
            }
        }
        
        updatePlan();
    }

    // 获取流量值
    function getTrafficVolValue() {
        const trafficUnit = document.getElementById('trafficUnit')?.value || 'GB';
        const trafficPeriod = document.getElementById('trafficPeriod')?.value || 'Month';
        
        if (trafficUnit === 'Unlimited' || trafficPeriod === 'Unlimited') {
            return 'Unlimited';
        } else {
            const trafficVol = document.getElementById('traffic-value')?.value || '0';
            return `${trafficVol} ${trafficUnit}/${trafficPeriod}`;
        }
    }

    // 更新流量单位显示
    function updateTrafficUnit() {
        const trafficUnit = document.getElementById('trafficUnit');
        const trafficPeriod = document.getElementById('trafficPeriod');
        const trafficValue = document.getElementById('traffic-value');
        
        if (trafficUnit && trafficPeriod && trafficValue) {
            if (trafficUnit.value === 'Unlimited' || trafficPeriod.value === 'Unlimited') {
                if (trafficUnit.value === 'Unlimited') {
                    trafficValue.style.display = 'none';
                }
            } else {
                trafficValue.style.display = 'block';
            }
        }
        
        updatePlan();
    }

    // ==================== 标签处理部分 ====================

    // 渲染标签
    function renderTags() {
        const tagsContainer = document.getElementById('tagsContainer');
        if (!tagsContainer) return;
        
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
        
        updatePlan();
    }

    // 移除标签
    function removeTag(button) {
        const tagElement = button.parentElement;
        if (tagElement) {
            tagElement.remove();
            updatePlan();
        }
    }

    // 处理标签输入
    function handleTagInput(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTag();
        }
    }

    // 添加网络路由选项
    function addRouteOption(routeValue) {
        try {
            const networkRouteInput = document.getElementById('networkRoute');
            if (!networkRouteInput) {
                console.warn('Network route input not found');
                return;
            }
            
            const currentValue = networkRouteInput.value.trim();
            let newValue = '';
            
            if (currentValue === '') {
                newValue = routeValue;
            } else {
                const currentRoutes = currentValue.split(/[,，\s]+/).filter(route => route.length > 0);
                
                if (!currentRoutes.includes(routeValue)) {
                    currentRoutes.push(routeValue);
                    newValue = currentRoutes.join(', ');
                } else {
                    return;
                }
            }
            
            networkRouteInput.value = newValue;
            updatePlan();
            
            if (typeof commonUtils !== 'undefined') {
                commonUtils.showToast(`已添加网络路由: ${routeValue}`);
            }
        } catch (error) {
            console.error('Error in addRouteOption:', error);
        }
    }

    // 处理代码变化
    function handleCodeChange(event) {
        try {
            const jsonCode = document.getElementById('jsonCode');
            if (!jsonCode) return;
            
            const parseResult = safeJsonParse(jsonCode.value);
            
            if (!parseResult.success) {
                return;
            }
            
            const config = parseResult.data;
            const errors = validateConfig(config);
            
            if (errors.length === 0) {
                refreshFromCode(event);
                
                // 自动保存
                if (typeof commonUtils !== 'undefined' && commonUtils.debounce && typeof storage !== 'undefined') {
                    commonUtils.debounce(() => {
                        storage.set('appState', {
                            config: state.config,
                            tags: state.tags,
                            theme: state.theme,
                            language: state.language
                        });
                    }, 1000, 'autoSave')();
                }
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
        const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/;
        const dateTimePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
        return !isNaN(date.getTime()) && (dateString.match(dateOnlyPattern) || dateString.match(dateTimePattern));
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
                if (typeof commonUtils !== 'undefined') {
                    commonUtils.showToast(parseResult.error, 'error');
                }
                return;
            }
            
            const config = parseResult.data;
            const errors = validateConfig(config);
            
            if (errors.length > 0) {
                if (typeof commonUtils !== 'undefined') {
                    commonUtils.showToast(`配置验证失败: ${errors.join(', ')}`, 'error');
                }
                return;
            }
            
            // 更新状态
            if (config.billingDataMod) {
                state.config.enableBilling = true;
                state.config.billingDataMod = config.billingDataMod;
                
                // 更新UI
                const enableBilling = document.getElementById('enable-billing');
                if (enableBilling) {
                    enableBilling.checked = true;
                    toggleSection('billing');
                }
                
                // 更新表单字段
                if (config.billingDataMod.startDate) {
                    const startDate = document.getElementById('start-date');
                    if (startDate) startDate.value = config.billingDataMod.startDate;
                }
                
                if (config.billingDataMod.endDate) {
                    const endDate = document.getElementById('end-date');
                    if (endDate) endDate.value = config.billingDataMod.endDate;
                }

                if (config.billingDataMod.autoRenewal !== undefined) {
                    const autoRenewal = document.getElementById('auto-renewal');
                    if (autoRenewal) autoRenewal.checked = config.billingDataMod.autoRenewal === 'true';
                }

                if (config.billingDataMod.cycle) {
                    const cycle = document.getElementById('cycle');
                    if (cycle) cycle.value = config.billingDataMod.cycle;
                }
                
                // 尝试回显金额（简单解析）
                if (config.billingDataMod.amount) {
                    const amountStr = String(config.billingDataMod.amount);
                    const amountType = document.getElementById('amount-type');
                    const amountValue = document.getElementById('amount-value');
                    
                    if (amountStr === '0') {
                         if (amountType) amountType.value = 'free';
                         if (amountValue) amountValue.value = '0';
                    } else {
                         if (amountType) amountType.value = 'billing';
                         const match = amountStr.match(/(\d+(\.\d+)?)/);
                         if (match && amountValue) {
                             amountValue.value = match[0];
                         }
                    }
                    updateAmountType();
                }

            } else {
                 state.config.enableBilling = false;
                 const enableBilling = document.getElementById('enable-billing');
                 if (enableBilling) {
                     enableBilling.checked = false;
                     toggleSection('billing');
                 }
            }
            
            if (config.planDataMod) {
                state.config.enablePlan = true;
                state.config.planDataMod = config.planDataMod;
                
                const enablePlan = document.getElementById('enable-plan');
                if (enablePlan) {
                    enablePlan.checked = true;
                    toggleSection('plan');
                }
            } else {
                 state.config.enablePlan = false;
                 const enablePlan = document.getElementById('enable-plan');
                 if (enablePlan) {
                     enablePlan.checked = false;
                     toggleSection('plan');
                 }
            }
            
            if (typeof commonUtils !== 'undefined') {
                commonUtils.showToast('刷新成功', 'success');
            }
            
        } catch (error) {
            console.error('Error refreshing from code:', error);
            if (typeof commonUtils !== 'undefined') {
                commonUtils.showToast('刷新配置时发生错误', 'error');
            }
        }
    }

    // 导出函数到全局
    window.initializeIndexPage = initializeIndexPage;
    window.renderTags = renderTags;
    window.copyCode = copyCode;
    window.updateBilling = updateBilling;
    window.updatePlan = updatePlan;
    window.addTag = addTag;
    window.removeTag = removeTag;
    window.handleTagInput = handleTagInput;
    window.addRouteOption = addRouteOption;
    window.updateJsonCode = updateJsonCode;
    window.toggleSection = toggleSection;
    window.triggerAutoCalculation = triggerAutoCalculation;
    window.updateAmountType = updateAmountType;
    window.updateBandwidthUnit = updateBandwidthUnit;
    window.updateTrafficUnit = updateTrafficUnit;
    window.refreshFromCode = refreshFromCode;
    
    // 兼容性导出，防止旧代码报错
    window.initializeMainPage = initializeIndexPage;
    
})();
