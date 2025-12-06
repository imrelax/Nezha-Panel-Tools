'use client';

import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';
import { Github, ExternalLink, Heart, Coffee, Info } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const relatedLinks = [
    { key: 'sourceCode', href: 'https://github.com/imrelax/Nezha-Panel-Tools', icon: <Github className="w-3 h-3 ml-1" /> },
    { key: 'nezhaOfficial', href: 'https://nezha.wiki', icon: <ExternalLink className="w-3 h-3 ml-1" /> },
    { key: 'authorSite', href: 'https://lagsn.es', icon: <ExternalLink className="w-3 h-3 ml-1" /> }
  ];
  
  const siteLinks = [
    { key: 'siteSource', href: 'https://github.com/imrelax/Nezha-Panel-Tools', icon: <Github className="w-3 h-3 ml-1" /> },
    { key: 'siteAuthor', href: 'https://xxxx.im', icon: <ExternalLink className="w-3 h-3 ml-1" /> },
    { key: 'siteAbout', href: '/about', icon: <Info className="w-3 h-3 ml-1" />, internal: true }
  ];
  
  const legalLinks = [
    { key: 'licenseType', href: 'https://github.com/imrelax/Nezha-Panel-Tools/blob/main/LICENSE', icon: <ExternalLink className="w-3 h-3 ml-1" /> },
    { key: 'contribution', href: 'https://github.com/imrelax/Nezha-Panel-Tools/pulls', icon: <Github className="w-3 h-3 ml-1" /> }
  ];

  const LinkGroup = ({ titleKey, links }) => (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white tracking-wider uppercase">
        {t(titleKey, 'common')}
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.key}>
            {link.internal ? (
              <Link 
                href={link.href}
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 flex items-center group"
              >
                <span>{t(link.key, 'common')}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-1 group-hover:translate-x-0">
                  {link.icon}
                </span>
              </Link>
            ) : (
              <a 
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300 flex items-center group"
              >
                <span>{t(link.key, 'common')}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-1 group-hover:translate-x-0">
                  {link.icon}
                </span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="mt-auto pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* 1. Brand Section */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
                <span className="text-white text-xl font-bold">N</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
                {t('title', 'common')}
              </span>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              {t('projectDescription', 'common')}
            </p>
            
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400 border border-primary-100 dark:border-primary-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-1.5 animate-pulse"></span>
                {t('version', 'common')}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                {t('lastUpdate', 'common')}
              </span>
            </div>
          </div>
          
          {/* 2. Links Section */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <LinkGroup titleKey="relatedLinks" links={relatedLinks} />
            <LinkGroup titleKey="siteRelated" links={siteLinks} />
            <LinkGroup titleKey="license" links={legalLinks} />
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-500 text-center md:text-left">
            &copy; {currentYear} Nezha Panel Tools. {t('allRightsReserved', 'common')}.
          </p>
          
          <div className="text-sm text-slate-500 dark:text-slate-500 flex items-center gap-1.5">
            <span>{t('madeWith', 'common')}</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse fill-current" />
            <span>{t('and', 'common')}</span>
            <Coffee className="w-4 h-4 text-primary-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
