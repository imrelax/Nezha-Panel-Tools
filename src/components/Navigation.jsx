'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart2, Bell, Monitor, Palette, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const navItems = [
  { nameKey: 'indexPage', href: '/', icon: Home },
  { nameKey: 'trafficPage', href: '/traffic', icon: BarChart2 },
  { nameKey: 'alertPage', href: '/alert', icon: Bell },
  { nameKey: 'servicePage', href: '/service', icon: Monitor },
  { nameKey: 'beautifyPage', href: '/beautify', icon: Palette },
];

export default function Navigation() {
  const pathname = usePathname();
  const { language, switchLanguage, t } = useLanguage();

  return (
    <nav className="sticky top-0 z-50 mb-8 px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-2xl p-2 border border-white/20 dark:border-slate-700/30 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20 flex flex-wrap items-center justify-center gap-2 relative">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center group relative overflow-hidden
                  ${isActive 
                    ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400 shadow-sm border border-primary-500/20' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-700/50'}
                `}
              >
                <Icon className={`w-4 h-4 mr-2 transition-transform duration-300 ${!isActive && 'group-hover:scale-110'}`} />
                <span className="relative z-10">{t(item.nameKey, 'common')}</span>
              </Link>
            );
          })}

          {/* Language Switcher */}
          <div className="ml-auto pl-2 border-l border-slate-200 dark:border-slate-700 flex items-center">
             <button
                onClick={() => switchLanguage(language === 'zh' ? 'en' : 'zh')}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors group relative"
                title={language === 'zh' ? 'Switch to English' : '切换到中文'}
             >
                <Languages className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="absolute top-full right-0 mt-2 px-2 py-1 text-xs font-medium bg-slate-800 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {language === 'zh' ? 'English' : '中文'}
                </span>
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
