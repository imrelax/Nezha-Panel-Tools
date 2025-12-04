// 告警页面功能模块
// 从 unified-core.js 分离

// 页面初始化函数
function initializeAlertPage() {
    updateAlertRule();
}

// 更新告警规则
function updateAlertRule() {
    const type = document.getElementById('alertType').value;
    const min = document.getElementById('alertMin').value;
    const max = document.getElementById('alertMax').value;
    const duration = document.getElementById('alertDuration').value;
    const cover = document.getElementById('alertCover').checked ? 1 : 0;
    const ignoreInput = document.getElementById('alertIgnore').value;
    const ignore = {};
    
    if (ignoreInput) {
        ignoreInput.split(',').forEach(id => {
            const t = id.trim();
            if (t) ignore[t] = true;
        });
    }

    const obj = { type };
    if (min) obj.min = Number(min);
    if (max) obj.max = Number(max);
    obj.duration = Number(duration);
    obj.cover = cover;
    if (Object.keys(ignore).length) obj.ignore = ignore;

    const json = JSON.stringify([obj], null, 2);
    const outputElement = document.getElementById('alertJson');
    if (outputElement) {
        outputElement.value = json;
    }
}

// 刷新数据到初始状态
function refreshAlertData(event) {
    event.stopPropagation();
    
    function resetAlertForm() {
        const setVal = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.value = val;
        };
        const setCheck = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.checked = val;
        };

        setVal('alertType', 'offline');
        setVal('alertMin', '');
        setVal('alertMax', '');
        setVal('alertDuration', '30');
        setCheck('alertCover', false);
        setVal('alertIgnore', '');
    }
    
    if (typeof refreshData === 'function') {
        refreshData(resetAlertForm, updateAlertRule);
    } else {
        resetAlertForm();
        updateAlertRule();
        if (typeof showToast === 'function') {
            showToast('配置已刷新', 'success');
        }
    }
}

// 复制代码
function copyAlertCode(event) {
    event.stopPropagation();
    const alertJson = document.getElementById('alertJson');
    if (alertJson && alertJson.value) {
        if (typeof commonUtils !== 'undefined' && commonUtils.copyToClipboard) {
            commonUtils.copyToClipboard(alertJson.value);
        } else if (typeof copyToClipboard === 'function') {
            copyToClipboard(alertJson.value);
        } else {
            // Fallback
            alertJson.select();
            document.execCommand('copy');
        }
    }
}

// 导出全局函数供HTML调用
window.initializeAlertPage = initializeAlertPage;
window.updateAlertRule = updateAlertRule;
window.refreshAlertData = refreshAlertData;
window.copyAlertCode = copyAlertCode;
