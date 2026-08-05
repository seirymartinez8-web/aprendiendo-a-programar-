import React from 'react';
import { motion } from 'motion/react';
import { Code2, Award, Terminal, Flame, User, BookOpen, Sun, Moon, ShieldCheck, LayoutDashboard, LogOut, ShieldAlert } from 'lucide-react';
import { LanguageId, AppView, UserRole, AuthUser } from '../types';
import { COURSES } from '../data/coursesIndex';

interface HeaderProps {
  currentView: AppView;
  activeCourseId: LanguageId | null;
  onNavigate: (view: AppView, courseId?: LanguageId) => void;
  streakDays: number;
  userName: string;
  totalCertificatesCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  userRole: UserRole;
  currentUser: AuthUser | null;
  onLogout: () => void;
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
  userRole,
  currentUser,
  onLogout,
}) => {
  if (currentView === 'login' || !currentUser) return null;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm text-slate-800 dark:text-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <motion.button
            id="brand-logo-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate(userRole === 'admin' ? 'admin' : 'catalog')}
            className="flex items-center gap-3 text-left group transition-transform cursor-pointer"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 text-white">
              <Code2 className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  Code<span className="text-indigo-600 dark:text-indigo-400">Master</span>
                </span>
                {userRole === 'admin' ? (
                  <span className="bg-purple-600 text-white font-black text-[9px] uppercase px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" /> ADMIN
                  </span>
                ) : (
                  <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-[9px] uppercase px-1.5 py-0.5 rounded-md">
                    ALUMNO
                  </span>
                )}
              </div>
              <span className="block text-[10px] text-slate-500 dark:text-slate-400 -mt-1 font-semibold uppercase tracking-wider">
                De Cero a Experto
              </span>
            </div>
          </motion.button>

          {/* Quick Course Selector dropdown when inside course */}
          {activeCourseId && currentView === 'course' && (
            <div className="hidden lg:flex items-center gap-2 ml-4 pl-4 border-l border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Curso:</span>
              <select
                id="header-course-select"
                value={activeCourseId}
                onChange={(e) => onNavigate('course', e.target.value as LanguageId)}
                className="bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs rounded-xl px-3 py-1.5 font-semibold focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm cursor-pointer"
              >
                {Object.values(COURSES).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.totalLessons} Lecciones)
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {userRole === 'admin' ? (
            <>
              {/* Admin Views */}
              <motion.button
                id="nav-admin-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('admin')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                  currentView === 'admin'
                    ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/20'
                    : 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/60 hover:bg-purple-100 dark:hover:bg-purple-900/60'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-purple-300" />
                <span>Panel Admin</span>
              </motion.button>

              <motion.button
                id="nav-catalog-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('catalog')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  currentView === 'catalog'
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="hidden sm:inline">Vista Alumno</span>
              </motion.button>
            </>
          ) : (
            <>
              {/* Student Views */}
              <motion.button
                id="nav-catalog-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('catalog')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
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
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  currentView === 'playground'
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Terminal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden sm:inline">Compilador</span>
              </motion.button>

              {/* User Profile & Certificates Button */}
              <motion.button
                id="nav-profile-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('profile')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
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
            </>
          )}

          {/* Dark Mode Toggle Button */}
          <motion.button
            id="dark-mode-toggle-btn"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleDarkMode}
            title={darkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
            aria-label="Alternar Modo Oscuro"
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all font-bold text-xs shadow-xs cursor-pointer"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </motion.button>

          {/* Logout / Exit Session Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogout}
            title="Cerrar Sesión / Salir"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900 transition-all font-bold text-xs cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px]">Salir</span>
          </motion.button>

          {/* Streak Indicator */}
          {userRole === 'student' && (
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 px-2.5 py-1 rounded-full text-xs font-bold shadow-xs cursor-default"
            >
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
              <span className="hidden xs:inline">{streakDays} d</span>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};


