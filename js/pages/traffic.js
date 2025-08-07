// Traffic monitoring page script

// 页面初始化函数
function initializeTrafficPage() {
    initializeTraffic();
}

document.addEventListener('DOMContentLoaded', function() {
    if (typeof initializePage === 'function') {
        initializePage(initializeTraffic, { initTheme: false }); // 主题已在其他地方初始化
    } else {
        initializeTraffic();
    }
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
    
    function resetTrafficForm() {
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
    }
    
    refreshData(resetTrafficForm, updateTrafficRule);
}

function copyTrafficCode(event) {
    event.stopPropagation();
    const trafficJson = document.getElementById('trafficJson').value;
    commonUtils.copyToClipboard(trafficJson);
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
