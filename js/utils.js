// 工具函数模块 - 合并表单管理和JSON处理功能

// ==================== 表单处理部分 ====================

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
        
        // 使用与startDate相同的格式化函数
        if (typeof formatDateTimeLocal === 'function') {
            endDateInput.value = formatDateTimeLocal(endDate);
        } else {
            console.error('formatDateTimeLocal function not available');
            // 回退到手动格式化
            const year = endDate.getFullYear();
            const month = String(endDate.getMonth() + 1).padStart(2, '0');
            const day = String(endDate.getDate()).padStart(2, '0');
            const hours = String(endDate.getHours()).padStart(2, '0');
            const minutes = String(endDate.getMinutes()).padStart(2, '0');
            endDateInput.value = `${year}-${month}-${day}T${hours}:${minutes}`;
        }
        
        updateBilling();
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

// ==================== 卡片折叠功能 ====================

// 切换卡片折叠状态
function toggleCardCollapse(header) {
    const card = header.closest('[class*="bg-white"], [class*="bg-slate-800"]') || header.parentElement;
    const content = card.querySelector('.card-content');
    const icon = header.querySelector('.collapse-icon');
    const isCollapsed = content.style.display === 'none';
    
    if (isCollapsed) {
        content.style.display = 'block';
        header.classList.remove('opacity-60');
        if (icon) icon.style.transform = 'rotate(0deg)';
    } else {
        content.style.display = 'none';
        header.classList.add('opacity-60');
        if (icon) icon.style.transform = 'rotate(-90deg)';
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
    
    // 更新JSON
    if (typeof updatePlan === 'function') {
        updatePlan();
    }
}

// 移除标签
function removeTag(button) {
    const tagElement = button.parentElement;
    if (tagElement) {
        tagElement.remove();
        
        // 更新JSON
        if (typeof updatePlan === 'function') {
            updatePlan();
        }
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
            // 如果输入框为空，直接设置新值
            newValue = routeValue;
        } else {
            // 如果输入框有值，检查是否已存在该值
            const currentRoutes = currentValue.split(/[,，\s]+/).filter(route => route.length > 0);
            
            if (!currentRoutes.includes(routeValue)) {
                // 如果不存在，添加到末尾
                currentRoutes.push(routeValue);
                newValue = currentRoutes.join(', ');
            } else {
                // 如果已存在，不做任何操作
                return;
            }
        }
        
        networkRouteInput.value = newValue;
        
        // 触发change事件以更新JSON
        if (typeof updatePlan === 'function') {
            updatePlan();
        }
        
        // 显示提示
        if (typeof showToast === 'function') {
            showToast(`已添加网络路由: ${routeValue}`);
        }
    } catch (error) {
        console.error('Error in addRouteOption:', error);
        if (typeof showToast === 'function') {
            showToast('添加网络路由时发生错误');
        }
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
    // 支持 YYYY-MM-DD 和 YYYY-MM-DDTHH:MM 格式
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
            const successMessage = window.unifiedI18nManager ? 
                window.unifiedI18nManager.__('refreshSuccess') : '配置已从JSON代码更新';
            showToast(successMessage, 'success');
        }
        
    } catch (error) {
        console.error('Error refreshing from code:', error);
        if (typeof showToast === 'function') {
            const errorMessage = window.unifiedI18nManager ? 
                window.unifiedI18nManager.__('refreshFailed') : '刷新配置时发生错误';
            showToast(errorMessage, 'error');
        }
    }
}

// 导出函数
// ==================== 通用工具函数部分 ====================

/**
 * 通用复制到剪贴板函数
 * @param {string} textareaId - 要复制的textarea元素ID
 * @param {string} successMessage - 成功提示消息
 * @param {string} emptyMessage - 内容为空时的提示消息
 * @param {string} errorMessage - 错误时的提示消息
 */
function copyToClipboard(textareaId, successMessage = '复制成功！', emptyMessage = '复制失败：内容为空', errorMessage = '复制失败，请手动复制') {
    const textarea = document.getElementById(textareaId);
    if (!textarea) {
        if (typeof showToast === 'function') {
            showToast('复制失败：未找到目标区域');
        }
        return false;
    }
    
    if (!textarea.value.trim()) {
        if (typeof showToast === 'function') {
            showToast(emptyMessage);
        }
        return false;
    }
    
    textarea.select();
    try {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textarea.value).then(() => {
                if (typeof showToast === 'function') {
                    showToast(successMessage);
                }
            }).catch(err => {
                console.error('Clipboard API failed:', err);
                // 降级到document.execCommand
                if (document.execCommand('copy')) {
                    if (typeof showToast === 'function') {
                        showToast(successMessage);
                    }
                } else {
                    if (typeof showToast === 'function') {
                        showToast(errorMessage);
                    }
                }
            });
        } else {
            // 降级到document.execCommand
            if (document.execCommand('copy')) {
                if (typeof showToast === 'function') {
                    showToast(successMessage);
                }
            } else {
                if (typeof showToast === 'function') {
                    showToast(errorMessage);
                }
            }
        }
        return true;
    } catch (err) {
        console.error('Copy failed:', err);
        if (typeof showToast === 'function') {
            showToast('发生错误，请手动复制');
        }
        return false;
    }
}

/**
 * 通用刷新数据函数
 * @param {Function} resetFunction - 重置表单数据的函数
 * @param {Function} updateFunction - 更新输出的函数
 * @param {string} successMessage - 成功提示消息
 * @param {string} errorMessage - 错误提示消息
 */
function refreshData(resetFunction, updateFunction, successMessage, errorMessage) {
    // 使用翻译系统获取默认消息
    if (!successMessage) {
        successMessage = window.unifiedI18nManager ? 
            window.unifiedI18nManager.__('refreshSuccess') : '刷新成功！';
    }
    if (!errorMessage) {
        errorMessage = window.unifiedI18nManager ? 
            window.unifiedI18nManager.__('refreshFailed') : '刷新失败，请检查页面';
    }
    try {
        if (typeof resetFunction === 'function') {
            resetFunction();
        }
        if (typeof updateFunction === 'function') {
            updateFunction();
        }
        if (typeof showToast === 'function') {
            showToast(successMessage);
        }
        return true;
    } catch (error) {
        console.error('Refresh failed:', error);
        if (typeof showToast === 'function') {
            showToast(errorMessage);
        }
        return false;
    }
}

/**
 * 通用页面初始化函数
 * @param {Function} initFunction - 页面特定的初始化函数
 * @param {Object} options - 初始化选项
 */
function initializePage(initFunction, options = {}) {
    try {
        // 初始化主题（如果需要）
        if (options.initTheme !== false && typeof initializeTheme === 'function') {
            initializeTheme();
        }
        
        // 初始化多语言（如果需要）
        if (options.initI18n !== false && typeof i18nManager !== 'undefined') {
            const savedLanguage = localStorage.getItem('language') || 'zh';
            if (i18nManager.setLanguage) {
                i18nManager.setLanguage(savedLanguage);
            }
        }
        
        // 执行页面特定的初始化
        if (typeof initFunction === 'function') {
            initFunction();
        }
        
        return true;
    } catch (error) {
        console.error('Page initialization failed:', error);
        return false;
    }
}

/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间（毫秒）
 * @param {boolean} immediate - 是否立即执行
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

/**
 * 节流函数
 * @param {Function} func - 要节流的函数
 * @param {number} limit - 限制时间（毫秒）
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * 创建通用的函数代理
 * @param {string} functionName - 函数名称
 * @param {Function} fallback - 降级函数
 */
function createFunctionProxy(functionName, fallback) {
    return function(...args) {
        if (typeof window[functionName] === 'function') {
            return window[functionName](...args);
        } else if (typeof fallback === 'function') {
            return fallback(...args);
        } else {
            console.warn(`函数 ${functionName} 不存在且没有提供降级方案`);
        }
    };
}

/**
 * 创建模态框事件监听器
 * @param {string} modalId - 模态框ID
 * @param {Function} closeHandler - 关闭处理函数
 */
function setupModalEventListener(modalId, closeHandler) {
    const modal = document.getElementById(modalId);
    if (modal && typeof closeHandler === 'function') {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeHandler();
            }
        });
    }
}

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
        toggleCardCollapse,
        renderTags,
        addTag,
        removeTag,
        handleTagInput,
        addRouteOption,
        handleCodeChange,
        updateJsonCode,
        validateConfig,
        isValidDate,
        safeJsonParse,
        refreshFromCode,
        // 新增的通用工具函数
        copyToClipboard,
        refreshData,
        initializePage,
        debounce,
        throttle,
        createFunctionProxy,
        setupModalEventListener
    };
}