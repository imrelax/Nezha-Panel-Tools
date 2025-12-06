'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function GlassCard({ title, icon, children, defaultOpen = true, actions, className = '' }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`glass-card glass-card-hover overflow-hidden mb-6 ${className}`}>
      {/* Header - 点击切换状态 */}
      <div 
        className={`glass-header cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors duration-300 ${!isOpen ? 'opacity-60' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between w-full">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center">
            {icon && (
              <div className="w-8 h-8 flex items-center justify-center mr-3 bg-primary-500/10 dark:bg-primary-500/20 rounded-lg">
                <span className="text-primary-600 dark:text-primary-400 text-lg">{icon}</span>
              </div>
            )}
            <span>{title}</span>
          </h3>
          
          <div className="flex items-center space-x-2">
            {/* 额外的操作按钮 (如复制、刷新) */}
            <div onClick={(e) => e.stopPropagation()}>
              {actions}
            </div>
            
            {/* 折叠图标 - 自动根据状态旋转 */}
            <motion.div
              animate={{ rotate: isOpen ? 0 : -90 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-slate-500" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content - 保持渲染但隐藏，避免重新挂载导致的卡顿 */}
      <motion.div
        initial={false}
        animate={{ 
          height: isOpen ? 'auto' : 0, 
          opacity: isOpen ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden w-full"
      >
        <div className="glass-content">
          <div className="pt-4">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
