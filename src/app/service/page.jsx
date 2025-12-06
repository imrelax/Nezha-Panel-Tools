'use client';

import { useState, useEffect } from 'react';
import GlassCard from '../../components/GlassCard';
import { Monitor, BookOpen, AlertTriangle, Loader2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function ServicePage() {
  const { t } = useLanguage();
  const [ipData, setIpData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadIPData();
  }, []);

  const loadIPData = async () => {
    try {
      setLoading(true);
      // 添加时间戳防止缓存
      const response = await fetch('/config/ip.json?t=' + Date.now());
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setIpData(data['全国三网IP地址']);
    } catch (err) {
      console.error('Failed to load IP data:', err);
      setError(t('loadError', 'common'));
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(t('copySuccess', 'common') + ': ' + text);
  };

  return (
    <div className="page-container">
      {/* 页面标题 */}
      <div className="text-center mb-8">
        <h2 className="page-title flex items-center justify-center">
          <Monitor className="w-8 h-8 mr-3 text-blue-500" />
          <span>{t('ipService', 'service')}</span>
        </h2>
        <p className="page-description">
          {t('serviceDescription', 'service')}
        </p>
      </div>

      {/* 使用提示通栏 - 优化布局 */}
      <div className="mb-8 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-xl rounded-2xl border border-blue-200/60 dark:border-blue-700/40 p-6 shadow-lg shadow-blue-500/10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-xl shadow-lg">
              💡
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
                {t('howToUse', 'service')}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {t('ipCopyTip', 'service')}
              </p>
            </div>
          </div>
          <a 
            href="https://www.gowall.net/479.html" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            {t('viewTutorial', 'service')}
          </a>
        </div>
      </div>

      {/* IP地址表格 */}
      <div className="max-w-[1200px] mx-auto">
        <GlassCard title={t('ipDataList', 'service')} icon="📊" defaultOpen={true}>
        {loading && (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
            <Loader2 className="w-8 h-8 animate-spin mb-2 text-primary-500" />
            <p>{t('loading', 'common')}</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-12 text-red-500">
            <AlertTriangle className="w-8 h-8 mb-2" />
            <p>{error}</p>
            <button 
              onClick={loadIPData}
              className="mt-4 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {t('retry', 'common')}
            </button>
          </div>
        )}

        {!loading && !error && ipData && (
          <div className="overflow-x-auto rounded-lg border border-slate-200/60 dark:border-slate-700/50">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100/50 dark:bg-slate-800/30 border-b border-slate-200/60 dark:border-slate-700/50">
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-slate-100 text-sm uppercase tracking-wider">
                    {t('region', 'service')}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-slate-100 text-sm uppercase tracking-wider">
                    {t('unicom', 'service')}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-slate-100 text-sm uppercase tracking-wider">
                    {t('mobile', 'service')}
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-slate-100 text-sm uppercase tracking-wider">
                    {t('telecom', 'service')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50 dark:divide-slate-700/30">
                {Object.entries(ipData).map(([region, providers]) => (
                  <tr 
                    key={region}
                    className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-colors duration-200 group"
                  >
                    <td className="py-4 px-6 font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {region}
                    </td>
                    {['联通', '移动', '电信'].map(provider => (
                      <td key={provider} className="py-4 px-6">
                        {providers[provider] ? (
                          <button
                            onClick={() => copyToClipboard(providers[provider])}
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 dark:from-blue-900/20 dark:to-blue-800/20 dark:hover:from-blue-900/30 dark:hover:to-blue-800/30 text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 font-mono text-sm rounded-lg border border-blue-200/60 dark:border-blue-700/40 hover:border-blue-300/60 dark:hover:border-blue-600/40 transition-all duration-200 shadow-sm hover:shadow-md group/copy"
                            title={t('copyToClipboard', 'common')}
                          >
                            <span className="mr-2 opacity-0 group-hover/copy:opacity-100 transition-opacity">📋</span>
                            <span className="font-medium">{providers[provider]}</span>
                            <span className="ml-2 text-blue-400 group-hover/copy:text-blue-500 transition-colors">↵</span>
                          </button>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 text-slate-400 dark:text-slate-500 text-sm bg-slate-100/30 dark:bg-slate-800/20 rounded-md border border-slate-200/40 dark:border-slate-700/30">
                            -
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>
    </div>
    </div>
  );
}
