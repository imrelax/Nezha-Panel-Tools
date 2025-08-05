// 全局状态管理
const state = {
    theme: 'light',
    language: 'zh',
    performanceMode: localStorage.getItem('performanceMode') === null ? false : localStorage.getItem('performanceMode') === 'true',
    config: {
        enableBilling: true,
        enablePlan: true,
        billingDataMod: {
            startDate: '',
            endDate: '',
            autoRenewal: '1',
            cycle: 'Year',
            amount: '200EUR'
        },
        planDataMod: {
            bandwidth: '30Mbps',
            trafficVol: '1TB/Month',
            trafficType: '2',
            IPv4: '1',
            IPv6: '1',
            networkRoute: '4837',
            extra: 'XXXX'
        }
    },
    tags: ['XXXX'],
    isManualRefresh: false
};

// 国际化字典
const i18n = {
    zh: {
        billingConfig: '账单配置',
        planConfig: '套餐配置',
        startDate: '起始日期',
        endDate: '结束日期',
        autoCalc: '自动计算',
        autoRenewal: '自动续费',
        billingCycle: '计费周期',
        english: '英文',
        amount: '金额',
        billing: '计费',
        free: '免费',
        payAsGo: '按量收费',
        bandwidth: '带宽',
        trafficVolume: '流量配额',
        trafficType: '流量类型',
        inbound: '入站',
        bidirectional: '双向',
        networkRoute: '网络路由',
        extraTags: '额外标签',
        jsonConfig: 'JSON 配置',
        refresh: '刷新',
        copy: '复制',
        warning: '警告',
        understand: '我知道了',
        copySuccess: '复制成功！',
        refreshSuccess: '从代码刷新成功！',
        unlimited: '无限制',
        day: '天',
        month: '月',
        quarter: '季',
        year: '年',
        cycles: {
            Day: '天',
            Week: '周',
            Month: '月',
            Quarter: '季',
            HalfYear: '半年',
            Year: '年',
            '2Year': '2年',
            '3Year': '3年',
            '4Year': '4年',
            '5Year': '5年',
            Permanent: '永久'
        },
        cyclesEn: {
            Day: 'Day',
            Week: 'Week',
            Month: 'Month',
            Quarter: 'Quarter',
            HalfYear: 'HalfYear',
            Year: 'Year',
            '2Year': '2Year',
            '3Year': '3Year',
            '4Year': '4Year',
            '5Year': '5Year',
            Permanent: 'Permanent'
        },
        trafficPeriods: {
            Day: '天',
            Month: '月',
            Quarter: '季',
            Year: '年',
            Unlimited: '无限'
        },
        trafficPeriodsEn: {
            Day: 'Day',
            Month: 'Month',
            Quarter: 'Quarter',
            Year: 'Year',
            Unlimited: 'Unlimited'
        },
        warningMessages: {
            unofficial: '您使用的{cycle}的计费周期，并不是官方支持的参数，无法自动刷新及计算规划中的账单统计报表，并禁用autoRenewal及cycle字段'
        }
    },
    en: {
        billingConfig: 'Billing Configuration',
        planConfig: 'Plan Configuration',
        startDate: 'Start Date',
        endDate: 'End Date',
        autoCalc: 'Auto Calculate',
        autoRenewal: 'Auto Renewal',
        billingCycle: 'Billing Cycle',
        english: 'English',
        amount: 'Amount',
        billing: 'Billing',
        free: 'Free',
        payAsGo: 'Pay as Go',
        bandwidth: 'Bandwidth',
        trafficVolume: 'Traffic Volume',
        trafficType: 'Traffic Type',
        inbound: 'Inbound',
        bidirectional: 'Bidirectional',
        networkRoute: 'Network Route',
        extraTags: 'Extra Tags',
        jsonConfig: 'JSON Configuration',
        refresh: 'Refresh',
        copy: 'Copy',
        warning: 'Warning',
        understand: 'I Understand',
        copySuccess: 'Copied Successfully!',
        refreshSuccess: 'Refreshed from code successfully!',
        unlimited: 'Unlimited',
        day: 'Day',
        month: 'Month',
        quarter: 'Quarter',
        year: 'Year',
        cycles: {
            Day: 'Day',
            Week: 'Week',
            Month: 'Month',
            Quarter: 'Quarter',
            HalfYear: 'HalfYear',
            Year: 'Year',
            '2Year': '2Year',
            '3Year': '3Year',
            '4Year': '4Year',
            '5Year': '5Year',
            Permanent: 'Permanent'
        },
        cyclesEn: {
            Day: 'Day',
            Week: 'Week',
            Month: 'Month',
            Quarter: 'Quarter',
            HalfYear: 'HalfYear',
            Year: 'Year',
            '2Year': '2Year',
            '3Year': '3Year',
            '4Year': '4Year',
            '5Year': '5Year',
            Permanent: 'Permanent'
        },
        trafficPeriods: {
            Day: 'Day',
            Month: 'Month',
            Quarter: 'Quarter',
            Year: 'Year',
            Unlimited: 'Unlimited'
        },
        trafficPeriodsEn: {
            Day: 'Day',
            Month: 'Month',
            Quarter: 'Quarter',
            Year: 'Year',
            Unlimited: 'Unlimited'
        },
        warningMessages: {
            unofficial: 'You are using {cycle} billing cycle, which is not officially supported and cannot auto-refresh or calculate planned billing statistics. AutoRenewal and cycle fields are disabled.'
        }
    }
};

// 货币符号映射
const currencySymbols = {
    CNY: '¥',
    USD: '$',
    EUR: '€',
    GBP: '£'
};

// 非官方周期列表
const unofficialCycles = ['Day', 'Week', '2Year', '3Year', '4Year', '5Year', 'Permanent'];

// 国际化函数
function __(key, params = {}) {
    let text = i18n[state.language][key] || key;
    Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, params[param]);
    });
    return text;
}

// 导出配置（如果支持模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { state, i18n, currencySymbols, unofficialCycles, __ };
}