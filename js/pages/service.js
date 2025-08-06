// 服务页面功能

// 直接使用fetch加载IP数据
async function loadIPDataWithLoader() {
    try {
        const response = await fetch('config/ip.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        validateIPData(data);
        return data;
    } catch (error) {
        console.error('Failed to load IP data:', error);
        throw error;
    }
}

// 验证IP数据格式
function validateIPData(data) {
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid data format: expected object');
    }
    
    const ipData = data['全国三网IP地址'];
    if (!ipData || typeof ipData !== 'object') {
        throw new Error('Invalid data format: missing IP data');
    }
    
    // 验证数据结构
    const providers = ['联通', '移动', '电信'];
    for (const [region, regionData] of Object.entries(ipData)) {
        if (!regionData || typeof regionData !== 'object') {
            console.warn(`Invalid region data for ${region}`);
            continue;
        }
        
        for (const provider of providers) {
            const ip = regionData[provider];
            if (ip && !isValidIP(ip)) {
                console.warn(`Invalid IP address for ${region} ${provider}: ${ip}`);
            }
        }
    }
    
    return true;
}

// 验证IP地址格式
function isValidIP(ip) {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;
    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

// 加载IP数据
async function loadIPData() {
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    const ipTable = document.getElementById('ipTableContainer');
    
    try {
        // 显示加载状态
        loadingState.classList.remove('hidden');
        errorState.classList.add('hidden');
        ipTable.classList.add('hidden');
        
        // 使用资源加载器获取IP数据
        const data = await loadIPDataWithLoader();
        
        // 渲染表格
        renderIPTable(data);
        
        // 隐藏加载状态，显示表格
        loadingState.classList.add('hidden');
        ipTable.classList.remove('hidden');
        
    } catch (error) {
        console.error('Error loading IP data:', error);
        
        // 显示错误状态
        loadingState.classList.add('hidden');
        errorState.classList.remove('hidden');
        
        // 显示用户友好的错误信息
        const errorMessage = getErrorMessage(error);
        if (typeof showToast === 'function') {
            showToast(errorMessage, 'error');
        }
    }
    
    // 应用当前语言设置
    if (typeof setLanguage === 'function') {
        const currentLang = localStorage.getItem('language') || 'zh';
        setLanguage(currentLang);
    }
}

// 获取用户友好的错误信息
function getErrorMessage(error) {
    if (error.message.includes('Failed to fetch')) {
        return '网络连接失败，请检查网络连接后重试';
    } else if (error.message.includes('HTTP 404')) {
        return 'IP数据文件未找到，请联系管理员';
    } else if (error.message.includes('HTTP 5')) {
        return '服务器错误，请稍后重试';
    } else if (error.message.includes('Invalid data format')) {
        return 'IP数据格式错误，请联系管理员';
    } else {
        return '加载失败，请刷新页面重试';
    }
}

// 渲染IP表格
function renderIPTable(data) {
    const tbody = document.getElementById('ipTableBody');
    tbody.innerHTML = '';
    
    // 获取全国三网IP地址数据
    const ipData = data['全国三网IP地址'];
    
    if (!ipData) {
        console.error('No IP data found');
        return;
    }
    
    // 遍历每个地区
    Object.entries(ipData).forEach(([region, providers]) => {
        const row = document.createElement('tr');
        row.className = 'border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors duration-300';
        
        // 地区列
        const regionCell = document.createElement('td');
        regionCell.className = 'py-3 md:py-4 px-2 md:px-4 font-medium text-slate-900 dark:text-slate-100 text-sm md:text-base';
        regionCell.textContent = region;
        row.appendChild(regionCell);
        
        // 联通、移动、电信列
        ['联通', '移动', '电信'].forEach(provider => {
            const cell = document.createElement('td');
            cell.className = 'py-3 md:py-4 px-2 md:px-4';
            
            const ip = providers[provider];
            if (ip) {
                // 创建可点击的IP地址
                const ipButton = document.createElement('button');
                ipButton.className = 'text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-mono text-xs md:text-sm bg-blue-50 dark:bg-blue-900/20 px-2 md:px-3 py-1 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all duration-300 cursor-pointer break-all border border-blue-200 dark:border-blue-700';
                ipButton.textContent = ip;
                ipButton.title = '点击复制IP地址';
                
                // 添加点击复制功能
                ipButton.addEventListener('click', () => copyToClipboard(ip));
                
                cell.appendChild(ipButton);
            } else {
                // 如果没有IP地址，显示占位符
                const placeholder = document.createElement('span');
                placeholder.className = 'text-slate-400 dark:text-slate-500 text-xs md:text-sm';
                placeholder.textContent = '-';
                cell.appendChild(placeholder);
            }
            
            row.appendChild(cell);
        });
        
        tbody.appendChild(row);
    });
}

// 复制到剪贴板
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showCopyToast();
    } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        
        // 降级方案：使用传统的复制方法
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showCopyToast();
        } catch (fallbackError) {
            console.error('Fallback copy failed:', fallbackError);
        }
        
        document.body.removeChild(textArea);
    }
}

// 显示复制成功提示
function showCopyToast() {
    if (typeof showToast === 'function') {
        showToast('IP地址已复制到剪贴板', 'success');
    }
}

// 导出函数（如果在Node.js环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadIPData,
        renderIPTable,
        copyToClipboard,
        showCopyToast
    };
}