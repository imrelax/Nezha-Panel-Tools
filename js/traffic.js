// Traffic monitoring page script

// 页面初始化函数
function initializeTrafficPage() {
    initializeTraffic();
}

document.addEventListener('DOMContentLoaded', function() {
    // script.js已经包含了主题的初始化
    initializeTraffic();
});

function initializeTraffic() {
    const now = new Date();
    document.getElementById('cycleStart').value = formatLocal(now);
    updateTrafficRule();
}

function formatLocal(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function updateTrafficRule() {
    const type = document.getElementById('ruleType').value;
    const min = document.getElementById('minValue').value;
    const minUnit = Number(document.getElementById('minUnit').value);
    const max = document.getElementById('maxValue').value;
    const maxUnit = Number(document.getElementById('maxUnit').value);
    const start = document.getElementById('cycleStart').value;
    const interval = document.getElementById('cycleInterval').value;
    const unit = document.getElementById('cycleUnit').value;
    const cover = document.getElementById('cover').checked ? 1 : 0;
    const ignoreInput = document.getElementById('ignoreList').value;
    const ignore = {};
    ignoreInput.split(',').forEach(id => {
        const t = id.trim();
        if (t) ignore[t] = true;
    });

    const obj = {
        type: type,
    };
    if (min) obj.min = Number(min) * minUnit;
    if (max) obj.max = Number(max) * maxUnit;
    if (start) obj.cycle_start = new Date(start).toISOString();
    obj.cycle_interval = Number(interval);
    obj.cycle_unit = unit;
    obj.cover = cover;
    if (Object.keys(ignore).length) obj.ignore = ignore;

    const json = JSON.stringify([obj], null, 2);
    document.getElementById('trafficJson').value = json;
}

// 刷新数据到初始状态
function refreshTrafficData(event) {
    event.stopPropagation();
    try {
        // 重置所有表单字段到初始值
        document.getElementById('ruleType').value = 'monthly';
        document.getElementById('minValue').value = '';
        document.getElementById('minUnit').value = '1073741824'; // 1GB
        document.getElementById('maxValue').value = '';
        document.getElementById('maxUnit').value = '1073741824'; // 1GB
        
        // 重置时间到当前时间
        const now = new Date();
        document.getElementById('cycleStart').value = formatLocal(now);
        
        document.getElementById('cycleInterval').value = '1';
        document.getElementById('cycleUnit').value = 'month';
        document.getElementById('cover').checked = false;
        document.getElementById('ignoreList').value = '';
        
        // 更新JSON输出
        updateTrafficRule();
        
        // 显示成功提示
        if (typeof showToast === 'function') {
            showToast('刷新成功！');
        }
    } catch (error) {
        console.error('Refresh failed:', error);
        if (typeof showToast === 'function') {
            showToast('刷新失败，请检查页面');
        }
    }
}

function copyTrafficCode(event) {
    event.stopPropagation();
    const textarea = document.getElementById('trafficJson');
    if (!textarea) {
        if (typeof showToast === 'function') {
            showToast('复制失败：未找到JSON代码区域');
        }
        return;
    }
    
    if (!textarea.value.trim()) {
        if (typeof showToast === 'function') {
            showToast('复制失败：JSON代码为空');
        }
        return;
    }
    
    textarea.select();
    try {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(textarea.value).then(() => {
                if (typeof showToast === 'function') {
                    showToast('复制成功！');
                }
            }).catch(err => {
                console.error('Clipboard API failed:', err);
                // 降级到document.execCommand
                if (document.execCommand('copy')) {
                    if (typeof showToast === 'function') {
                        showToast('复制成功！');
                    }
                } else {
                    if (typeof showToast === 'function') {
                        showToast('复制失败，请手动复制');
                    }
                }
            });
        } else {
            // 降级到document.execCommand
            if (document.execCommand('copy')) {
                if (typeof showToast === 'function') {
                    showToast('复制成功！');
                }
            } else {
                if (typeof showToast === 'function') {
                    showToast('复制失败，请手动复制');
                }
            }
        }
    } catch (err) {
        console.error('Copy failed:', err);
        if (typeof showToast === 'function') {
            showToast('发生错误，请手动复制');
        }
    }
}

// 模块导出（如果在模块环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeTrafficPage,
        initializeTraffic,
        formatLocal,
        updateTrafficRule,
        refreshTrafficData,
        copyTrafficCode
    };
}
