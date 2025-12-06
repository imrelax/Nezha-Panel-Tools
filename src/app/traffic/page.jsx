'use client';

import React, { useState, useEffect } from 'react';
import ConfigLayout from '../../components/ConfigLayout';
import GlassCard from '../../components/GlassCard';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

export default function TrafficPage() {
  const { t } = useLanguage();
  const [config, setConfig] = useState({
    type: 'transfer_out_cycle',
    minValue: '',
    minUnit: '1073741824',
    maxValue: '',
    maxUnit: '1073741824',
    cycleStart: '',
    cycleInterval: '1',
    cycleUnit: 'month',
    cover: false,
    ignoreList: ''
  });

  const [jsonOutput, setJsonOutput] = useState('');

  useEffect(() => {
    // Initialize cycleStart with current local time
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now.getTime() - offset).toISOString().slice(0, 16);
    
    setConfig(prev => ({
      ...prev,
      cycleStart: localISOTime
    }));
  }, []);

  useEffect(() => {
    const generateJson = () => {
      const ignore = {};
      if (config.ignoreList) {
        config.ignoreList.split(',').forEach(id => {
          const t = id.trim();
          if (t) ignore[t] = true;
        });
      }

      const obj = {
        type: config.type,
      };

      if (config.minValue) obj.min = Number(config.minValue) * Number(config.minUnit);
      if (config.maxValue) obj.max = Number(config.maxValue) * Number(config.maxUnit);
      if (config.cycleStart) obj.cycle_start = new Date(config.cycleStart).toISOString();
      
      obj.cycle_interval = Number(config.cycleInterval);
      obj.cycle_unit = config.cycleUnit;
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
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now.getTime() - offset).toISOString().slice(0, 16);

    setConfig({
      type: 'transfer_out_cycle',
      minValue: '',
      minUnit: '1073741824',
      maxValue: '',
      maxUnit: '1073741824',
      cycleStart: localISOTime,
      cycleInterval: '1',
      cycleUnit: 'month',
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

  const trafficTypes = [
    'transfer_out_cycle', 'transfer_in_cycle', 'transfer_all_cycle',
    'net_out_speed', 'net_in_speed', 'net_all_speed'
  ].map(type => ({
    value: type,
    label: t(`types.${type}`, 'traffic')
  }));

  const unitOptions = [
    { value: '1', label: t('units.B', 'traffic') },
    { value: '1024', label: t('units.KB', 'traffic') },
    { value: '1048576', label: t('units.MB', 'traffic') },
    { value: '1073741824', label: t('units.GB', 'traffic') },
    { value: '1099511627776', label: t('units.TB', 'traffic') }
  ];

  const cycleUnits = [
    { value: 'second', label: t('units.second', 'traffic') },
    { value: 'minute', label: t('units.minute', 'traffic') },
    { value: 'hour', label: t('units.hour', 'traffic') },
    { value: 'day', label: t('units.day', 'traffic') },
    { value: 'week', label: t('units.week', 'traffic') },
    { value: 'month', label: t('units.month', 'traffic') }
  ];

  return (
    <ConfigLayout
      title={t('trafficMonitor', 'traffic')}
      description={t('pageDescription', 'traffic')}
      jsonOutput={jsonOutput}
      onCopy={handleCopy}
      onReset={handleRefresh}
      defaultOpen={true}
    >
      <GlassCard 
        title={t('trafficMonitor', 'traffic')} 
        icon="📊"
        defaultOpen={true}
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('type', 'traffic')}
            </label>
            <select 
              name="type" 
              value={config.type} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
            >
              {trafficTypes.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('minValue', 'traffic')}
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="minValue"
                  value={config.minValue}
                  onChange={handleInputChange}
                  placeholder={t('units.minValue', 'traffic')}
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
                />
                <select
                  name="minUnit"
                  value={config.minUnit}
                  onChange={handleInputChange}
                  className="w-20 px-2 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
                >
                  {unitOptions.map(unit => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('maxValue', 'traffic')}
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="maxValue"
                  value={config.maxValue}
                  onChange={handleInputChange}
                  placeholder={t('units.maxValue', 'traffic')}
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
                />
                <select
                  name="maxUnit"
                  value={config.maxUnit}
                  onChange={handleInputChange}
                  className="w-20 px-2 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
                >
                  {unitOptions.map(unit => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('cycleStart', 'traffic')}
              </label>
              <input
                type="datetime-local"
                name="cycleStart"
                value={config.cycleStart}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('cycleInterval', 'traffic')}
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="cycleInterval"
                  value={config.cycleInterval}
                  onChange={handleInputChange}
                  min="1"
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
                />
                <select
                  name="cycleUnit"
                  value={config.cycleUnit}
                  onChange={handleInputChange}
                  className="w-24 px-2 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
                >
                  {cycleUnits.map(unit => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {t('cover', 'traffic')}
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
              {t('ignoreList', 'traffic')}
            </label>
            <input
              type="text"
              name="ignoreList"
              value={config.ignoreList}
              onChange={handleInputChange}
              placeholder={t('ignoreServers', 'traffic')}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t('multipleServersTip', 'traffic')}
            </p>
          </div>
        </div>
      </GlassCard>
    </ConfigLayout>
  );
}