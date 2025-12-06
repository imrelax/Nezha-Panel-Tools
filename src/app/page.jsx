'use client';

import { useState, useEffect } from 'react';
import ConfigLayout from '../components/ConfigLayout';
import GlassCard from '../components/GlassCard';
import { Calculator } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const [config, setConfig] = useState({
    startDate: '',
    endDate: '',
    autoRenewal: true,
    cycle: 'Year'
  });

  const [jsonResult, setJsonResult] = useState('');

  // 自动计算逻辑
  useEffect(() => {
    updateBilling();
  }, [config]);

  const updateBilling = () => {
    const { startDate, endDate, autoRenewal, cycle } = config;
    
    if (!startDate && !endDate) {
      setJsonResult('');
      return;
    }

    const billingData = {
      startDate: startDate || null,
      endDate: endDate || null,
      autoRenewal,
      cycle
    };

    // 格式化输出，移除 null 值
    const cleanData = Object.fromEntries(
      Object.entries(billingData).filter(([_, v]) => v != null && v !== '')
    );

    setJsonResult(JSON.stringify(cleanData, null, 2));
  };

  const calculateEndDate = () => {
    if (!config.startDate) return;
    
    const start = new Date(config.startDate);
    let end = new Date(start);

    switch (config.cycle) {
      case 'Day': end.setDate(end.getDate() + 1); break;
      case 'Week': end.setDate(end.getDate() + 7); break;
      case 'Month': end.setMonth(end.getMonth() + 1); break;
      case 'Quarter': end.setMonth(end.getMonth() + 3); break;
      case 'HalfYear': end.setMonth(end.getMonth() + 6); break;
      case 'Year': end.setFullYear(end.getFullYear() + 1); break;
      case '2Year': end.setFullYear(end.getFullYear() + 2); break;
      case '3Year': end.setFullYear(end.getFullYear() + 3); break;
      case '4Year': end.setFullYear(end.getFullYear() + 4); break;
      case '5Year': end.setFullYear(end.getFullYear() + 5); break;
      case 'Permanent': end.setFullYear(end.getFullYear() + 99); break;
    }

    // 格式化为 datetime-local 所需格式 (YYYY-MM-DDThh:mm)
    const toLocalISOString = (date) => {
      const offset = date.getTimezoneOffset() * 60000;
      return new Date(date.getTime() - offset).toISOString().slice(0, 16);
    };

    setConfig(prev => ({ ...prev, endDate: toLocalISOString(end) }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonResult);
    alert(t('copySuccess', 'common'));
  };

  return (
    <ConfigLayout
      title={t('indexPage', 'common')}
      description={t('pageDescription', 'index')}
      jsonOutput={jsonResult}
      onCopy={copyToClipboard}
      onReset={() => setConfig({
        startDate: '',
        endDate: '',
        autoRenewal: true,
        cycle: 'Year'
      })}
    >
      <GlassCard 
        title={t('billingConfig', 'index')} 
        icon="💳"

      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('startDate', 'index')}
              </label>
              <input
                type="datetime-local"
                value={config.startDate}
                onChange={(e) => setConfig(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('endDate', 'index')}
              </label>
              <input
                type="datetime-local"
                value={config.endDate}
                onChange={(e) => setConfig(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('cycle', 'index')}
            </label>
            <div className="relative">
              <select
                value={config.cycle}
                onChange={(e) => setConfig(prev => ({ ...prev, cycle: e.target.value }))}
                className="w-full px-4 py-2 pr-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm appearance-none"
              >
                <option value="Day">{t('cycles.Day', 'index')}</option>
                <option value="Week">{t('cycles.Week', 'index')}</option>
                <option value="Month">{t('cycles.Month', 'index')}</option>
                <option value="Quarter">{t('cycles.Quarter', 'index')}</option>
                <option value="HalfYear">{t('cycles.HalfYear', 'index')}</option>
                <option value="Year">{t('cycles.Year', 'index')}</option>
                <option value="2Year">{t('cycles.2Year', 'index')}</option>
                <option value="3Year">{t('cycles.3Year', 'index')}</option>
                <option value="4Year">{t('cycles.4Year', 'index')}</option>
                <option value="5Year">{t('cycles.5Year', 'index')}</option>
                <option value="Permanent">{t('cycles.Permanent', 'index')}</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                ▼
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('autoRenewal', 'index')}
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.autoRenewal}
                onChange={(e) => setConfig(prev => ({ ...prev, autoRenewal: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200/80 dark:bg-slate-700/80 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-primary-500 peer-checked:to-secondary-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>

          <button
            onClick={calculateEndDate}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white py-3 rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transform hover:-translate-y-0.5 transition-all duration-300 font-medium flex items-center justify-center"
          >
            <Calculator className="w-5 h-5 mr-2" />
            {t('calculateEndDate', 'index')}
          </button>
        </div>
      </GlassCard>
    </ConfigLayout>
  );
}