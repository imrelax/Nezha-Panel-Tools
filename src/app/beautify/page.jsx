'use client';

import React, { useState, useEffect } from 'react';
import GlassCard from '../../components/GlassCard';
import { getConfigTemplate, getFieldDefinitions } from './config';
import { useLanguage } from '../../contexts/LanguageContext';

export default function BeautifyPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState(getConfigTemplate(t));
  const [fieldEnable, setFieldEnable] = useState({});
  const [jsonOutput, setJsonOutput] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState('');

  // Ensure t is available before using it
  const fieldDefinitions = typeof t === 'function' ? getFieldDefinitions(t) : {};

  useEffect(() => {
    // Load from local storage on mount
    const localData = localStorage.getItem('nazhua-custom-config');
    if (localData) {
      try {
        const data = JSON.parse(localData);
        setFormData(prev => ({ ...prev, ...data.formData }));
        setFieldEnable(prev => ({ ...prev, ...data.enable }));
      } catch (e) {
        console.error('Failed to load local config', e);
      }
    } else {
      // Initialize fieldEnable keys
      const initialEnable = {};
      // Only iterate if fieldDefinitions is valid
      if (Object.keys(fieldDefinitions).length > 0) {
        Object.keys(fieldDefinitions).forEach(key => {
          if (fieldDefinitions[key].v1customCode) {
            initialEnable[key] = false;
          }
        });
      }
      setFieldEnable(initialEnable);
    }
  }, [t]); // Add t dependency to re-run if t becomes available (though it should be stable)

  // If fieldDefinitions is empty (t not ready), show loading or return null
  if (Object.keys(fieldDefinitions).length === 0) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  useEffect(() => {
    // Save to local storage and generate JSON
    const data = {
      formData,
      enable: fieldEnable
    };
    localStorage.setItem('nazhua-custom-config', JSON.stringify(data));
    generateCode();
  }, [formData, fieldEnable]);

  const generateCode = () => {
    let code = `// ${t('generatedCode.header', 'beautify')}\n// ${t('generatedCode.toolUrl', 'beautify')}: https://nztools.xxxx.im\n\n`;
    
    const enabledConfig = {};
    Object.keys(fieldEnable).forEach(key => {
      if (fieldEnable[key] && formData[key] !== undefined && formData[key] !== '') {
        enabledConfig[key] = formData[key];
      }
    });

    if (Object.keys(enabledConfig).length > 0) {
      code += `// ${t('generatedCode.configJson', 'beautify')}\n`;
      code += '<script>\n';
      code += 'window.theme_config = ';
      code += JSON.stringify(enabledConfig, null, 2);
      code += ';\n';
      code += '</script>\n\n';
    }

    setJsonOutput(code);
  };

  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleEnableChange = (key, checked) => {
    setFieldEnable(prev => ({ ...prev, [key]: checked }));
  };

  const handleReset = () => {
    if (confirm(t('confirmReset', 'beautify'))) {
      setFormData(getConfigTemplate(t));
      const newEnable = {};
      Object.keys(fieldDefinitions).forEach(key => {
        if (fieldDefinitions[key].v1customCode) {
          newEnable[key] = false;
        }
      });
      setFieldEnable(newEnable);
      alert(t('resetSuccess', 'beautify'));
    }
  };

  const handleImport = () => {
    if (!importText.trim()) {
      alert(t('enterConfig', 'beautify'));
      return;
    }
    try {
      const imported = JSON.parse(importText);
      setFormData(prev => ({ ...prev, ...imported }));
      const newEnable = { ...fieldEnable };
      Object.keys(imported).forEach(key => {
        newEnable[key] = true;
      });
      setFieldEnable(newEnable);
      setShowImportModal(false);
      setImportText('');
      alert(t('importSuccess', 'beautify'));
    } catch (e) {
      alert(t('formatError', 'beautify'));
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonOutput);
      alert(t('copySuccess', 'common'));
    } catch (err) {
      console.error('Copy failed:', err);
      alert(t('copyFailed', 'common'));
    }
  };

  const renderField = (key, field) => {
    if (!field.v1customCode) return null;

    return (
      <div key={key} className="glass-card p-4 mb-4 rounded-xl border border-white/20 bg-white/10 dark:bg-slate-900/10 backdrop-blur-md">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2">
            {field.label}
            {field.version && (
              <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full">
                {field.version}
              </span>
            )}
          </span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={fieldEnable[key] || false}
                  onChange={(e) => handleEnableChange(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
            <div className="flex-1">
              {field.type === 'input' && (
                <input
                  type="text"
                  value={formData[key] || ''}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm text-sm"
                />
              )}
              {field.type === 'select' && (
                <select
                  value={formData[key] || ''}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-300 backdrop-blur-sm text-sm"
                >
                  {field.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              )}
              {field.type === 'switch' && (
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData[key] || false}
                    onChange={(e) => handleInputChange(key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary-600"></div>
                </label>
              )}
              {field.type === 'input-tag' && (
                <TagInput 
                  value={formData[key] || []}
                  onChange={(newTags) => handleInputChange(key, newTags)}
                  placeholder={field.placeholder}
                />
              )}
            </div>
          </div>
          {field.remark && (
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Tips: {field.remark}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="page-container">
      <div className="text-center mb-8">
        <h2 className="page-title">
          <span className="mr-2 md:mr-3 text-purple-500">🎨</span>
          <span>{t('panelBeautify', 'beautify')}</span>
        </h2>
        <p className="page-description">
          {t('panelBeautifyDesc', 'beautify')}
        </p>
      </div>

      <div className="mb-6">
        <GlassCard 
          title={t('configTitle', 'beautify')}
          icon="✨"
          defaultOpen={false}
          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10"
        >
          <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {t('configDescription', 'beautify')}
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div id="configForm" className="space-y-4">
            {Object.keys(fieldDefinitions).map(key => renderField(key, fieldDefinitions[key]))}
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <GlassCard 
            title={t('configCode', 'beautify')}
            icon="💻"
            defaultOpen={true}
            actions={
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setShowImportModal(true)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-2 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium flex items-center"
                >
                  <span className="mr-1.5">📥</span>
                  {t('import', 'beautify')}
                </button>
                <button 
                  onClick={handleReset}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-4 py-2 rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium flex items-center"
                >
                  <span className="mr-1.5">🔄</span>
                  {t('reset', 'common')}
                </button>
                <button 
                  onClick={copyToClipboard}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-2 rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transform hover:-translate-y-0.5 transition-all duration-200 text-sm font-medium flex items-center"
                  disabled={!jsonOutput}
                >
                  <span className="mr-1.5">📋</span>
                  {t('copy', 'common')}
                </button>
              </div>
            }
          >
            <div className="bg-slate-900 dark:bg-slate-950 rounded-lg overflow-hidden">
              <textarea 
                value={jsonOutput}
                readOnly
                className="w-full p-6 bg-slate-900 dark:bg-slate-950 text-green-400 font-mono text-sm border-0 focus:ring-0 resize-none leading-relaxed h-[600px]"
              />
            </div>
          </GlassCard>

          <GlassCard title={t('usageTips', 'beautify')} icon="💡" defaultOpen={true}>
            <ul className="space-y-4 text-slate-700 dark:text-slate-300">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                <span>{t('tip1', 'beautify')}</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                <span>{t('tip2', 'beautify')}</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                <span>{t('tip3', 'beautify')}</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">4</span>
                <span>{t('tip4', 'beautify')}</span>
              </li>
            </ul>
          </GlassCard>
        </div>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('importModalTitle', 'beautify')}</h3>
              <button 
                onClick={() => setShowImportModal(false)}
                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                {t('importModalDesc', 'beautify')}
              </p>
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                className="w-full h-64 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
                placeholder="{ ... }"
              />
            </div>
            <div className="p-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3 bg-slate-50 dark:bg-slate-900/50">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {t('cancel', 'common')}
              </button>
              <button
                onClick={handleImport}
                className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30"
              >
                {t('confirmImport', 'beautify')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TagInput({ value, onChange, placeholder }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeTag = (index) => {
    const newTags = [...value];
    newTags.splice(index, 1);
    onChange(newTags);
  };

  return (
    <div className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent transition-all duration-300 backdrop-blur-sm flex flex-wrap gap-2 min-h-[42px]">
      {value.map((tag, index) => (
        <span key={index} className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full animate-in fade-in zoom-in duration-200">
          {tag}
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 focus:outline-none"
          >
            ×
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[100px] bg-transparent border-none focus:ring-0 p-0 text-sm text-slate-900 dark:text-white placeholder-slate-400"
      />
    </div>
  );
}
