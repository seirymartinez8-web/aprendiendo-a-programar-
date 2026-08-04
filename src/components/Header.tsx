import React from 'react';
import { motion } from 'motion/react';
import { Code2, Award, Terminal, Flame, User, BookOpen, Sun, Moon } from 'lucide-react';
import { LanguageId } from '../types';
import { COURSES } from '../data/coursesIndex';

interface HeaderProps {
  currentView: 'catalog' | 'course' | 'playground' | 'profile';
  activeCourseId: LanguageId | null;
  onNavigate: (view: 'catalog' | 'course' | 'playground' | 'profile', courseId?: LanguageId) => void;
  streakDays: number;
  userName: string;
  totalCertificatesCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  activeCourseId,
  onNavigate,
  streakDays,
  userName,
  totalCertificatesCount,
  darkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm text-slate-800 dark:text-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <motion.button
            id="brand-logo-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('catalog')}
            className="flex items-center gap-3 text-left group transition-transform"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 text-white">
              <Code2 className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Code<span className="text-indigo-600 dark:text-indigo-400">Master</span>
              </span>
              <span className="block text-[10px] text-slate-500 dark:text-slate-400 -mt-1 font-semibold uppercase tracking-wider">
                De Cero a Experto
              </span>
            </div>
          </motion.button>

          {/* Quick Course Selector dropdown when inside course */}
          {activeCourseId && (
            <div className="hidden md:flex items-center gap-2 ml-6 pl-6 border-l border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Curso:</span>
              <select
                id="header-course-select"
                value={activeCourseId}
                onChange={(e) => onNavigate('course', e.target.value as LanguageId)}
                className="bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs rounded-xl px-3 py-1.5 font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm cursor-pointer"
              >
                {Object.values(COURSES).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} (15 Lecciones)
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.button
            id="nav-catalog-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('catalog')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              currentView === 'catalog'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden sm:inline">Cursos</span>
          </motion.button>

          <motion.button
            id="nav-playground-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('playground')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              currentView === 'playground'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline">Compilador Libre</span>
          </motion.button>

          {/* User Profile & Certificates Button */}
          <motion.button
            id="nav-profile-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('profile')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
              currentView === 'profile'
                ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <User className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="hidden md:inline font-bold">{userName}</span>
            {totalCertificatesCount > 0 && (
              <span className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-700 shadow-xs">
                <Award className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                {totalCertificatesCount}
              </span>
            )}
          </motion.button>

          {/* Dark Mode Toggle Button */}
          <motion.button
            id="dark-mode-toggle-btn"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleDarkMode}
            title={darkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
            aria-label="Alternar Modo Oscuro"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all font-bold text-xs shadow-xs"
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                <span className="hidden lg:inline text-[11px]">Modo Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600" />
                <span className="hidden lg:inline text-[11px]">Modo Oscuro</span>
              </>
            )}
          </motion.button>

          {/* Streak Indicator */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 px-3 py-1 rounded-full text-xs font-bold shadow-xs cursor-default"
          >
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
            <span className="hidden xs:inline">{streakDays} d</span>
          </motion.div>
        </div>
      </div>
    </header>
  );
};
