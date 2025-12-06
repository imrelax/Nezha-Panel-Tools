'use client';

import React, { useState, useEffect } from 'react';
import ConfigLayout from '../../components/ConfigLayout';
import GlassCard from '../../components/GlassCard';
import { useLanguage } from '../../contexts/LanguageContext';

export default function AlertPage() {
  const { t } = useLanguage();
  const [config, setConfig] = useState({
    type: 'offline',
    min: '',
    max: '',
    duration: '10',
    cover: false,
    ignoreList: ''
  });

  const [jsonOutput, setJsonOutput] = useState('');

  useEffect(() => {
    const generateJson = () => {
      const ignore = {};
      if (config.ignoreList) {
        config.ignoreList.split(',').forEach(id => {
          const t = id.trim();
          if (t) ignore[t] = true;
        });
      }

      const obj = { type: config.type };
      if (config.min) obj.min = Number(config.min);
      if (config.max) obj.max = Number(config.max);
      obj.duration = Number(config.duration);
      obj.cover = config.cover ? 1 : 0;
      if (Object.keys(ignore).length) obj.ignore = ignore;

      return JSON.stringify([obj], null, 2);
    };

    setJsonOutput(generateJson());
  }, [config]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRefresh = () => {
    setConfig({
      type: 'offline',
      min: '',
      max: '',
      duration: '10',
      cover: false,
      ignoreList: ''
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonOutput);
      alert(t('copySuccess', 'common'));
    } catch (err) {
      console.error('Copy failed:', err);
      alert(t('copyFailed', 'common'));
    }
  };

  const alertTypes = [
    'cpu', 'gpu', 'memory', 'swap', 'disk', 
    'net_in_speed', 'net_out_speed', 'net_all_speed', 
    'transfer_in', 'transfer_out', 'transfer_all', 
    'offline', 'load1', 'load5', 'load15', 
    'process_count', 'tcp_conn_count', 'udp_conn_count', 
    'temperature_max'
  ].map(type => ({
    value: type,
    label: t(`types.${type}`, 'alert')
  }));

  return (
    <ConfigLayout
      title={t('alertRules', 'alert')}
      description={t('pageDescription', 'alert')}
      jsonOutput={jsonOutput}
      onCopy={handleCopy}
      onReset={handleRefresh}
      defaultOpen={true}
    >
      <GlassCard 
        title={t('alertRules', 'alert')} 
        icon="🔔"
        defaultOpen={true}
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('type', 'alert')}
            </label>
            <select 
              name="type" 
              value={config.type} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
            >
              {alertTypes.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('minValue', 'alert')}
              </label>
              <input
                type="number"
                name="min"
                value={config.min}
                onChange={handleInputChange}
                placeholder="最小值"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('maxValue', 'alert')}
              </label>
              <input
                type="number"
                name="max"
                value={config.max}
                onChange={handleInputChange}
                placeholder="最大值"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('duration', 'alert')}
            </label>
            <input
              type="number"
              name="duration"
              value={config.duration}
              onChange={handleInputChange}
              min="1"
              placeholder="持续时间（秒）"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('cover', 'alert')}
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="cover"
                checked={config.cover}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200/80 dark:bg-slate-700/80 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-primary-500 peer-checked:to-secondary-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('ignoreList', 'alert')}
            </label>
            <input
              type="text"
              name="ignoreList"
              value={config.ignoreList}
              onChange={handleInputChange}
              placeholder="server1,server2,server3"
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('multipleServersTip', 'alert')}
            </p>
          </div>
        </div>
      </GlassCard>
    </ConfigLayout>
  );
}