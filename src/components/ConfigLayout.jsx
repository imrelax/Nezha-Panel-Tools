'use client';

import GlassCard from './GlassCard';
import { Copy, RotateCcw } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ConfigLayout({ 
  children, 
  title, 
  description, 
  jsonOutput, 
  onCopy, 
  onReset,
  headerActions,
  defaultOpen = true
}) {
  const { t } = useLanguage();
  return (
    <div className="page-container">
      {/* 页面标题区域 */}
      <div className="text-center mb-8">
        <h2 className="page-title">
          {title}
        </h2>
        {description && (
          <p className="page-description">
            {description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 左侧配置区域 - 固定5列 */}
        <div className="lg:col-span-5 space-y-6">
          {children}
        </div>

        {/* 右侧JSON输出区域 - 固定7列 */}
        <div className="lg:col-span-7 space-y-6">
          <GlassCard 
          title={t('configCode', 'beautify')} 
          icon="💻"
          defaultOpen={defaultOpen}
          headerActions={
            <div className="flex items-center space-x-2">
              {headerActions}
              <button 
                onClick={onReset}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-4 py-2 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium flex items-center"
              >
                <RotateCcw className="w-4 h-4 mr-1.5" />
                {t('reset', 'common')}
              </button>
              <button 
                onClick={onCopy}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-2 rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transform hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium flex items-center"
                disabled={!jsonOutput}
              >
                <Copy className="w-4 h-4 mr-1.5" />
                {t('copy', 'common')}
              </button>
            </div>
          }
        >
          <div className="bg-slate-900 dark:bg-slate-950 rounded-lg overflow-hidden">
            <textarea 
              value={jsonOutput}
              readOnly
              className="w-full p-6 bg-slate-900 dark:bg-slate-950 text-green-400 font-mono text-sm border-0 focus:ring-0 resize-none leading-relaxed h-[500px]"
              placeholder={t('enterConfig', 'beautify')}
            />
          </div>
        </GlassCard>
        </div>
      </div>
    </div>
  );
}