// Alert rules page script

// 页面初始化函数
function initializeAlertPage() {
    updateAlertRule();
}

document.addEventListener('DOMContentLoaded', function() {
    // script.js已经包含了主题的初始化
    updateAlertRule();
});

function updateAlertRule() {
    const type = document.getElementById('alertType').value;
    const min = document.getElementById('alertMin').value;
    const max = document.getElementById('alertMax').value;
    const duration = document.getElementById('alertDuration').value;
    const cover = document.getElementById('alertCover').checked ? 1 : 0;
    const ignoreInput = document.getElementById('alertIgnore').value;
    const ignore = {};
    ignoreInput.split(',').forEach(id => {
        const t = id.trim();
        if (t) ignore[t] = true;
    });

    const obj = { type };
    if (min) obj.min = Number(min);
    if (max) obj.max = Number(max);
    obj.duration = Number(duration);
    obj.cover = cover;
    if (Object.keys(ignore).length) obj.ignore = ignore;

    const json = JSON.stringify([obj], null, 2);
    document.getElementById('alertJson').value = json;
}

// 刷新数据到初始状态
function refreshAlertData(event) {
    event.stopPropagation();
    try {
        // 重置所有表单字段到初始值
        document.getElementById('alertType').value = 'offline';
        document.getElementById('alertMin').value = '';
        document.getElementById('alertMax').value = '';
        document.getElementById('alertDuration').value = '30';
        document.getElementById('alertCover').checked = false;
        document.getElementById('alertIgnore').value = '';
        
        // 更新JSON输出
        updateAlertRule();
        
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

function copyAlertCode(event) {
    event.stopPropagation();
    const textarea = document.getElementById('alertJson');
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
        initializeAlertPage,
        updateAlertRule,
        refreshAlertData,
        copyAlertCode
    };
}
