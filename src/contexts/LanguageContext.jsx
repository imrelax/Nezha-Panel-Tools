'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { zh } from '../lib/i18n/zh';
import { en } from '../lib/i18n/en';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('zh');
  const [translations, setTranslations] = useState(zh);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
      setTranslations(savedLanguage === 'zh' ? zh : en);
    }
    setMounted(true);
  }, []);

  const switchLanguage = (lang) => {
    if (lang === 'zh' || lang === 'en') {
      setLanguage(lang);
      setTranslations(lang === 'zh' ? zh : en);
      localStorage.setItem('language', lang);
    }
  };

  const t = (key, module = 'common') => {
    if (!translations[module]) {
      console.warn(`Module ${module} not found in translations`);
      return key;
    }
    
    // Support nested keys (e.g. 'cycles.Day')
    const value = key.split('.').reduce((obj, k) => obj && obj[k], translations[module]);
    return value || key;
  };

  // Prevent hydration mismatch by rendering children only after mount
  // or returning a placeholder/loading state if needed.
  // For now, we'll render children but language might switch on client side.
  // To avoid hydration mismatch, we could use a suppressHydrationWarning on html
  // or just accept that initial render is zh.

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
