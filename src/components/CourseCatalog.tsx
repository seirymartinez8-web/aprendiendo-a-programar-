import React from 'react';
import { motion } from 'motion/react';
import { 
  Code2, Terminal, FileCode2, Coffee, Server, Cpu, Database, Layout, 
  CheckCircle2, Play, Award, Sparkles, BookOpen, Layers, Zap
} from 'lucide-react';
import { Course, LanguageId, UserStats } from '../types';
import { COURSES_LIST } from '../data/coursesIndex';

interface CourseCatalogProps {
  userStats: UserStats;
  onSelectCourse: (courseId: LanguageId) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Code2,
  Terminal,
  FileCode2,
  Coffee,
  Server,
  Cpu,
  Database,
  Layout
};

export const CourseCatalog: React.FC<CourseCatalogProps> = ({ userStats, onSelectCourse }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-10 px-4 sm:px-6 lg:px-8 transition-colors"
    >
      {/* Hero Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-7xl mx-auto text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-bold mb-4 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Aprende a Programar Desde Cero Hasta Nivel Experto</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          Catálogo Oficial de <span className="text-indigo-600 dark:text-indigo-400">Cursos de Programación</span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
          Selecciona una tecnología para comenzar. Cada curso incluye 15 lecciones estructuradas secuencialmente en 3 niveles (Básico, Medio y Avanzado), compilador integrado y certificado oficial en PDF.
        </p>
      </motion.div>

      {/* Language Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {COURSES_LIST.map((course: Course, index: number) => {
          const IconComponent = ICON_MAP[course.iconName] || Code2;
          const progress = userStats.coursesProgress[course.id];
          const completedCount = progress?.completedLessonIds?.length || 0;
          const totalLessons = course.totalLessons;
          const progressPercent = Math.round((completedCount / totalLessons) * 100);
          const isCompleted = progress?.certificateEarned || progressPercent === 100;
          const currentLessonNum = (progress?.completedLessonIds?.length || 0) + 1;
          const displayLessonNum = Math.min(currentLessonNum, totalLessons);

          return (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 * index }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/60 rounded-3xl p-6 transition-colors duration-200 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 dark:hover:shadow-indigo-950/50 cursor-pointer"
              onClick={() => onSelectCourse(course.id)}
            >
              {/* Badge Icon Top */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${course.color} p-2.5 shadow-md flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  {isCompleted ? (
                    <span className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full">
                      <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      Certificado
                    </span>
                  ) : (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {totalLessons} Lecciones
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                  {course.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4 font-normal">
                  {course.description}
                </p>

                {/* Levels Indicators */}
                <div className="flex items-center gap-1.5 mb-5 text-[10px] font-bold uppercase tracking-wider">
                  <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">Básico</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">Medio</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">Avanzado</span>
                </div>
              </div>

              {/* Progress & Action Button */}
              <div>
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 mb-1.5 font-semibold">
                    <span>Progreso del Curso</span>
                    <span className="text-slate-900 dark:text-slate-200 font-bold">{completedCount} / {totalLessons} ({progressPercent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className={`h-full rounded-full ${
                        isCompleted ? 'bg-emerald-500' : 'bg-indigo-600 dark:bg-indigo-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Main Action Button */}
                <motion.button
                  id={`course-btn-${course.id}`}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCourse(course.id);
                  }}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm ${
                    isCompleted
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                      : completedCount > 0
                      ? 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white shadow-md shadow-indigo-100 dark:shadow-indigo-950'
                      : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white shadow-md shadow-indigo-100 dark:shadow-indigo-950'
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Ver Curso / Certificado</span>
                    </>
                  ) : completedCount > 0 ? (
                    <>
                      <Play className="w-4 h-4 fill-white text-white" />
                      <span>Continuar (Lección {displayLessonNum})</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span>Iniciar Desde Cero</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Methodology Section */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto mt-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
          ¿Cómo funciona la metodología de aprendizaje?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <motion.div whileHover={{ y: -4 }} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-extrabold text-lg shadow-xs">1</div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Lecciones Secuenciales</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">Cada lección combina teoría detallada y ejercicios prácticos. Para avanzar debes completar la lección actual.</p>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-extrabold text-lg shadow-xs">2</div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Compilador Integrado</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">Prueba tu código en tiempo real dentro de la plataforma con retroalimentación inmediata y tutor IA.</p>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 flex items-center justify-center font-extrabold text-lg shadow-xs">3</div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">Certificado y Reporte PDF</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">Al finalizar las 15 lecciones, descarga tu diploma oficial de graduación y el reporte de calificaciones.</p>
          </motion.div>
        </div>
      </motion.div>

    </motion.div>
  );
};
