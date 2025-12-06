'use client';

import React from 'react';
import GlassCard from '../../components/GlassCard';
import { useLanguage } from '../../contexts/LanguageContext';
import { Info, History } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

  const updates = [
    {
      date: '2025-12-06',
      version: 'v2.1.0',
      content: [
        '新增关于本站页面',
        '优化多语言支持，清理冗余翻译',
        '重构网站主题风格',
        '修复页脚链接问题'
      ]
    },
    {
      date: '2025-12-05',
      version: 'v2.0.2',
      content: [
        '新增美化配置生成功能',
        '新增流量监控配置功能',
        '新增告警规则配置功能',
        '新增IP服务查询功能'
      ]
    }
  ];

  return (
    <div className="page-container space-y-6">
      {/* 页面标题 */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400 mb-4">
          {t('pageTitle', 'about')}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {t('pageDescription', 'about')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 系统介绍 */}
        <div className="lg:col-span-5 h-full">
          <GlassCard className="h-full">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
              <Info className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              {t('introduction', 'about')}
            </h2>
          </div>
          
          <div className="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>{t('introText1', 'about')}</p>
            <p>{t('introText2', 'about')}</p>
            
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 mt-6">
              <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-3">
                {t('techStack', 'about')}
              </h3>
              <ul className="grid grid-cols-2 gap-2">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Next.js 14</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                  <span>React 18</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  <span>Tailwind CSS</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  <span>Lucide Icons</span>
                </li>
              </ul>
            </div>
          </div>
        </GlassCard>
        </div>

        {/* 更新记录 */}
        <div className="lg:col-span-7 h-full">
        <GlassCard className="h-full">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
              <History className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              {t('updateLog', 'about')}
            </h2>
          </div>
          
          <div className="relative pl-4 border-l-2 border-slate-200 dark:border-slate-700 space-y-8">
            {updates.map((update, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-800 border-2 border-indigo-500"></div>
                <div className="mb-1 flex items-center space-x-3">
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded">
                    {update.version}
                  </span>
                  <span className="text-sm text-slate-500">{update.date}</span>
                </div>
                <ul className="space-y-1 mt-2">
                  {update.content.map((item, i) => (
                    <li key={i} className="text-slate-600 dark:text-slate-400 text-sm flex items-start">
                      <span className="mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GlassCard>
        </div>
      </div>
    </div>
  );
}
