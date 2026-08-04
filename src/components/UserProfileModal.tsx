import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Flame, 
  BookOpen, 
  CheckCircle2, 
  Download, 
  User, 
  ArrowLeft, 
  Trophy, 
  Clock, 
  Edit2, 
  Save, 
  Sparkles, 
  Zap, 
  Target, 
  Star, 
  GraduationCap, 
  TrendingUp, 
  FileText
} from 'lucide-react';
import { LanguageId, UserStats, CourseProgress, CourseKardexItem } from '../types';
import { COURSES, COURSES_LIST } from '../data/coursesIndex';
import { downloadCertificatePDF, downloadGradeReportPDF, downloadKardexPDF } from '../utils/pdfGenerator';

interface UserProfileModalProps {
  userStats: UserStats;
  onUpdateUserName?: (newName: string) => void;
  onNavigateToCourse: (courseId: LanguageId) => void;
  onBackToCatalog: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  userStats,
  onUpdateUserName,
  onNavigateToCourse,
  onBackToCatalog,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(userStats.userName || 'Estudiante');

  const progressList = Object.values(userStats.coursesProgress) as CourseProgress[];
  const earnedCertificatesCount = progressList.filter(p => p?.certificateEarned).length;
  const totalLessonsCompleted = progressList.reduce(
    (acc, p) => acc + (p?.completedLessonIds?.length || 0),
    0
  );
  const totalLessonsInProgram = COURSES_LIST.reduce(
    (acc, c) => acc + (c.totalLessons || 15),
    0
  );

  const handleSaveName = () => {
    if (editedName.trim() && onUpdateUserName) {
      onUpdateUserName(editedName.trim());
    }
    setIsEditingName(false);
  };

  // Weekly study calendar state simulation
  const daysOfWeek = [
    { label: 'L', active: true, name: 'Lunes' },
    { label: 'M', active: true, name: 'Martes' },
    { label: 'M', active: true, name: 'Miércoles' },
    { label: 'J', active: false, name: 'Jueves' },
    { label: 'V', active: false, name: 'Viernes' },
    { label: 'S', active: false, name: 'Sábado' },
    { label: 'D', active: false, name: 'Domingo' },
  ];

  // System Achievements
  const achievements = [
    {
      id: 'first_lesson',
      title: 'Primer Código',
      description: 'Completaste tu primer ejercicio compilado con éxito.',
      icon: Zap,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
      unlocked: totalLessonsCompleted > 0,
    },
    {
      id: 'streak_3',
      title: 'Fuego Constante',
      description: 'Mantuviste una racha de 3 días consecutivos estudiando.',
      icon: Flame,
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
      unlocked: userStats.streakDays >= 3,
    },
    {
      id: 'score_100',
      title: 'Perfeccionista',
      description: 'Obtuviste puntuación de 100/100 en un ejercicio.',
      icon: Star,
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/30',
      unlocked: true,
    },
    {
      id: 'time_30',
      title: 'Atleta del Código',
      description: 'Dedicaste más de 30 minutos de aprendizaje activo.',
      icon: Clock,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
      unlocked: userStats.totalTimeSpentMinutes >= 30,
    },
    {
      id: 'first_certificate',
      title: 'Titulado',
      description: 'Obtuviste tu primer Certificado de Especialización.',
      icon: GraduationCap,
      color: 'text-sky-500 bg-sky-500/10 border-sky-500/30',
      unlocked: earnedCertificatesCount > 0,
    },
    {
      id: 'polyglot',
      title: 'Políglota Tech',
      description: 'Avanzaste en lecciones de múltiples lenguajes.',
      icon: Trophy,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/30',
      unlocked: totalLessonsCompleted >= 3,
    },
  ];

  // Competency level mapping based on completed lessons
  const competencies = [
    { name: 'Sintaxis y Estructuras Básicas', pct: Math.min(100, Math.max(15, totalLessonsCompleted * 12)), icon: BookOpen },
    { name: 'Lógica y Control de Flujo', pct: Math.min(100, Math.max(10, totalLessonsCompleted * 10)), icon: Target },
    { name: 'Resolución de Problemas Prácticos', pct: Math.min(100, Math.max(20, totalLessonsCompleted * 15)), icon: CheckCircle2 },
    { name: 'Estructuras de Datos y Memoria', pct: Math.min(100, Math.max(5, totalLessonsCompleted * 8)), icon: TrendingUp },
  ];

  // Overall General Transcript PDF (Kárdex Académico)
  const handleDownloadTranscript = () => {
    const courseItems: CourseKardexItem[] = COURSES_LIST.map((course) => {
      const progress = userStats.coursesProgress[course.id];
      const completedCount = progress?.completedLessonIds?.length || 0;
      const totalLessons = course.totalLessons || 15;
      const percent = Math.round((completedCount / totalLessons) * 100);
      const isCompleted = completedCount >= totalLessons;

      let status: 'COMPLETADO' | 'EN CURSO' | 'NO INICIADO' = 'NO INICIADO';
      if (isCompleted) status = 'COMPLETADO';
      else if (completedCount > 0) status = 'EN CURSO';

      const courseGrade = completedCount > 0 ? (userStats.overallScore || 96) : 0;

      return {
        courseId: course.id,
        courseTitle: course.title,
        completedLessons: completedCount,
        totalLessons: totalLessons,
        progressPercent: percent,
        status,
        grade: courseGrade,
      };
    });

    const hoursStudied = Math.max(1, Math.round(userStats.totalTimeSpentMinutes / 60));
    const studentId = `EST-${(userStats.userName.length * 137 + 1042).toString().slice(0, 4)}-2026`;

    downloadKardexPDF({
      studentName: userStats.userName,
      studentId,
      issueDate: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
      overallGpa: userStats.overallScore || 98,
      totalLessonsCompleted,
      totalLessonsInProgram,
      totalHoursStudied: hoursStudied,
      streakDays: userStats.streakDays,
      certificatesEarnedCount: earnedCertificatesCount,
      courses: courseItems,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-8 px-4 sm:px-6 lg:px-8 transition-colors"
    >
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Back Navigation & Overall Report Export */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <motion.button
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBackToCatalog}
            className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Catálogo de Cursos</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownloadTranscript}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Descargar Kárdex Académico (PDF)</span>
          </motion.button>
        </div>

        {/* Profile Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-sm"
        >
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-500 p-0.5 shadow-lg flex items-center justify-center text-white shrink-0">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center">
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            
            <div className="flex-1">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-indigo-500 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold text-lg sm:text-2xl focus:outline-none"
                    autoFocus
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSaveName}
                    className="p-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                    title="Guardar Nombre"
                  >
                    <Save className="w-4 h-4" />
                  </motion.button>
                </div>
              ) : (
                <div className="flex items-center gap-2 group">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {userStats.userName}
                  </h1>
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsEditingName(true)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Editar nombre"
                  >
                    <Edit2 className="w-4 h-4" />
                  </motion.button>
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Estudiante de Programación • De Cero a Experto</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 px-4 py-2.5 rounded-2xl text-center shadow-xs min-w-[110px]">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-black block tracking-wider">
                Racha Actual
              </span>
              <span className="text-lg sm:text-xl font-black text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1 mt-0.5">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
                {userStats.streakDays} Días
              </span>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 px-4 py-2.5 rounded-2xl text-center shadow-xs min-w-[110px]">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-black block tracking-wider">
                Certificados
              </span>
              <span className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                {earnedCertificatesCount}
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-2xl border border-indigo-100 dark:border-indigo-900/60">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">Lecciones Completadas</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white block mt-0.5">
                {totalLessonsCompleted} / 120
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-2xl border border-amber-100 dark:border-amber-900/60">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">Promedio General</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white block mt-0.5">
                {userStats.overallScore || 98}/100
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-900/60">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">Tiempo de Estudio</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white block mt-0.5">
                {userStats.totalTimeSpentMinutes} mins
              </span>
            </div>
          </div>
        </div>

        {/* Study Streak & Competencies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Study Calendar & Habit Tracker */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <span>Racha de Práctica Semanal</span>
              </h2>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 px-2.5 py-1 rounded-full">
                🔥 3 Días Activo
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Practica al menos 1 lección diaria para mantener viva tu racha y desbloquear certificados especiales.
            </p>

            <div className="grid grid-cols-7 gap-2 pt-2">
              {daysOfWeek.map((day, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-xs transition-all ${
                      day.active
                        ? 'bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-md shadow-amber-500/20 scale-105'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700/60'
                    }`}
                  >
                    {day.active ? <Flame className="w-4 h-4 fill-white text-white" /> : day.label}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{day.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Radar / Competencies Breakdown */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              <span>Nivel de Competencias Técnicas</span>
            </h2>

            <div className="space-y-3">
              {competencies.map((comp, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <comp.icon className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      {comp.name}
                    </span>
                    <span className="font-extrabold text-indigo-600 dark:text-indigo-400">{comp.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${comp.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Unlockable Badges & Achievements Section */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              <span>Insignias y Logros Desbloqueables</span>
            </h2>
            <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400">
              {achievements.filter(a => a.unlocked).length} de {achievements.length} Desbloqueados
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((ach) => {
              const IconComp = ach.icon;
              return (
                <div
                  key={ach.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    ach.unlocked
                      ? 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-xs'
                      : 'bg-slate-50/50 dark:bg-slate-950/40 border-slate-200/60 dark:border-slate-800/40 opacity-60'
                  }`}
                >
                  <div className={`p-3 rounded-xl border shrink-0 ${ach.color}`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-extrabold text-xs text-slate-900 dark:text-white">{ach.title}</h3>
                      {ach.unlocked && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-snug">
                      {ach.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Course Progress List */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-500" />
            <span>Progreso por Curso y Certificados de Especialidad</span>
          </h2>

          <div className="space-y-4">
            {Object.values(COURSES).map((course) => {
              const progress = userStats.coursesProgress[course.id];
              const completedCount = progress?.completedLessonIds?.length || 0;
              const total = course.totalLessons;
              const pct = Math.round((completedCount / total) * 100);
              const isEarned = progress?.certificateEarned || pct === 100;
              const missingLessons = total - completedCount;

              return (
                <div
                  key={course.id}
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xs transition-colors"
                >
                  {/* Left info & icon */}
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${course.color} p-2 flex items-center justify-center text-white font-black text-sm shrink-0 shadow-md`}>
                      {course.title.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{course.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                        {completedCount} de {total} lecciones completadas
                      </p>
                    </div>
                  </div>

                  {/* Center Circular Progress Indicator */}
                  <div className="flex items-center gap-3 w-full md:w-auto bg-white dark:bg-slate-900/80 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="relative flex items-center justify-center shrink-0 w-10 h-10">
                      <svg width="40" height="40" className="rotate-[-90deg]">
                        <circle
                          cx="20"
                          cy="20"
                          r="16"
                          className="stroke-slate-200 dark:stroke-slate-800"
                          strokeWidth="3.5"
                          fill="transparent"
                        />
                        <circle
                          cx="20"
                          cy="20"
                          r="16"
                          className="stroke-indigo-600 dark:stroke-indigo-400 transition-all duration-500"
                          strokeWidth="3.5"
                          strokeDasharray={2 * Math.PI * 16}
                          strokeDashoffset={2 * Math.PI * 16 * (1 - pct / 100)}
                          strokeLinecap="round"
                          fill="transparent"
                        />
                      </svg>
                      <span className="absolute text-[10px] font-black text-slate-900 dark:text-white">
                        {pct}%
                      </span>
                    </div>

                    <div className="text-left">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estatus</span>
                      <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                        {pct === 100 ? (
                          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Certificado Listo
                          </span>
                        ) : (
                          `Faltan ${missingLessons} ${missingLessons === 1 ? 'lección' : 'lecciones'}`
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Right Action buttons */}
                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    {isEarned ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => downloadCertificatePDF({
                            studentName: userStats.userName,
                            courseTitle: course.title,
                            languageId: course.id,
                            issueDate: progress.certificateDate || new Date().toLocaleDateString('es-ES'),
                            certificateCode: progress.certificateCode || `CM-${course.id.toUpperCase()}-2026`,
                            grade: userStats.overallScore || 98,
                            hoursCompleted: 20
                          })}
                          className="px-3.5 py-2 rounded-xl bg-amber-100 dark:bg-amber-950/80 hover:bg-amber-200 dark:hover:bg-amber-900 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Certificado PDF</span>
                        </button>

                        <button
                          onClick={() => downloadGradeReportPDF({
                            studentName: userStats.userName,
                            courseTitle: course.title,
                            languageId: course.id,
                            overallGrade: userStats.overallScore || 98,
                            basicLevelGrade: 100,
                            mediumLevelGrade: 95,
                            advancedLevelGrade: 98,
                            completedLessonsCount: total,
                            totalLessonsCount: total,
                            totalAttempts: total * 2,
                            skillsMastered: course.skillsGained,
                            issueDate: progress.certificateDate || new Date().toLocaleDateString('es-ES')
                          })}
                          className="px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Reporte PDF</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onNavigateToCourse(course.id)}
                        className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-xs font-extrabold shadow-md transition-all active:scale-95"
                      >
                        Continuar Lección
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </motion.div>
  );
};
