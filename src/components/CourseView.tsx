import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, Lock, Play, RotateCcw, Award, Sparkles, BookOpen, Terminal, 
  ChevronRight, Lightbulb, Bot, ArrowLeft, ArrowRight, FileText, Check, AlertCircle, Loader2, Eye,
  ChevronDown, ChevronUp, PanelRightClose, PanelRightOpen, Layers
} from 'lucide-react';
import { Course, LanguageId, Lesson, ExecutionResult, UserStats, CourseProgress } from '../types';
import { runCode } from '../utils/codeRunners';
import { AITutorModal } from './AITutorModal';
import { CertificateModal } from './CertificateModal';
import { ReportModal } from './ReportModal';

interface CourseViewProps {
  course: Course;
  userStats: UserStats;
  onUpdateProgress: (courseId: LanguageId, lessonId: number, userCode: string, passed: boolean) => void;
  onBackToCatalog: () => void;
}

export const CourseView: React.FC<CourseViewProps> = ({
  course,
  userStats,
  onUpdateProgress,
  onBackToCatalog,
}) => {
  const courseProgress: CourseProgress = userStats.coursesProgress[course.id] || {
    courseId: course.id,
    currentLessonId: 1,
    completedLessonIds: [],
    lessonProgressMap: {},
    certificateEarned: false
  };

  const [activeLessonId, setActiveLessonId] = useState<number>(() => {
    return courseProgress.currentLessonId || 1;
  });

  const activeLesson: Lesson = course.lessons.find(l => l.id === activeLessonId) || course.lessons[0];

  const [activeTab, setActiveTab] = useState<'theory' | 'compiler' | 'preview'>('theory');
  const [code, setCode] = useState<string>(() => {
    const saved = courseProgress.lessonProgressMap[activeLessonId]?.userCode;
    return (saved && saved !== activeLesson.exercise.starterCode) ? saved : '';
  });

  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showAITutor, setShowAITutor] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openLevels, setOpenLevels] = useState<Record<string, boolean>>({
    'Básico': true,
    'Medio': true,
    'Avanzado': true,
  });

  const toggleLevel = (level: string) => {
    setOpenLevels(prev => ({
      ...prev,
      [level]: !prev[level]
    }));
  };
  const [copyPasteWarning, setCopyPasteWarning] = useState<string | null>(null);

  const handleCopyPasteBlock = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setCopyPasteWarning('No se puede Copiar Y Pegar :(');
    setTimeout(() => {
      setCopyPasteWarning(null);
    }, 2500);
  };

  // Update editor code when active lesson changes
  useEffect(() => {
    const savedCode = courseProgress.lessonProgressMap[activeLessonId]?.userCode;
    setCode((savedCode && savedCode !== activeLesson.exercise.starterCode) ? savedCode : '');
    setExecutionResult(null);
    setShowHint(false);
  }, [activeLessonId, activeLesson, courseProgress.lessonProgressMap]);

  const isLessonCompleted = (lessonId: number) => {
    return courseProgress.completedLessonIds.includes(lessonId);
  };

  const isLessonUnlocked = (lessonId: number) => {
    if (lessonId === 1) return true;
    return courseProgress.completedLessonIds.includes(lessonId - 1);
  };

  const handleRunCode = async () => {
    setIsExecuting(true);
    const result = await runCode(course.id, code, activeLesson.exercise);
    setExecutionResult(result);
    setIsExecuting(false);
  };

  const handleVerifySolution = async () => {
    const isCompleted = isLessonCompleted(activeLessonId);
    const canVerify = isCompleted || (executionResult !== null && executionResult.success === true);
    if (!canVerify) return;

    setIsExecuting(true);
    let result = executionResult;
    if (!result) {
      result = await runCode(course.id, code, activeLesson.exercise);
      setExecutionResult(result);
    }
    setIsExecuting(false);

    if (result && result.success) {
      // Mark lesson completed
      onUpdateProgress(course.id, activeLessonId, code, true);

      // Auto-open certificate if course finished
      const newCompletedCount = courseProgress.completedLessonIds.includes(activeLessonId)
        ? courseProgress.completedLessonIds.length
        : courseProgress.completedLessonIds.length + 1;

      if (newCompletedCount >= course.totalLessons) {
        setTimeout(() => {
          setShowCertificateModal(true);
        }, 800);
      } else {
        // Auto-advance to next lesson if available
        if (activeLessonId < course.totalLessons) {
          setTimeout(() => {
            setActiveLessonId(prev => prev + 1);
            setActiveTab('theory');
          }, 600);
        }
      }
    }
  };

  const isCompleted = isLessonCompleted(activeLessonId);
  const canVerify = isCompleted || (executionResult !== null && executionResult.success === true);

  const completedCount = courseProgress.completedLessonIds.length;
  const progressPercent = Math.round((completedCount / course.totalLessons) * 100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 flex flex-col transition-colors">
      
      {/* Course Top Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCatalog}
            className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors flex items-center gap-1 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Catálogo</span>
          </button>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
          <h1 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
            <span>Curso de {course.title}</span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              Lección {activeLesson.id} de {course.totalLessons}
            </span>
          </h1>

          {/* Circular Progress Badge for Specialty Certificate */}
          <div className="hidden lg:flex items-center gap-2.5 px-3 py-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80">
            <div className="relative flex items-center justify-center shrink-0 w-9 h-9">
              <svg width="36" height="36" className="rotate-[-90deg]">
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  className="stroke-slate-200 dark:stroke-slate-700"
                  strokeWidth="3.5"
                  fill="transparent"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  className="stroke-indigo-600 dark:stroke-indigo-400 transition-all duration-500 ease-out"
                  strokeWidth="3.5"
                  strokeDasharray={2 * Math.PI * 14}
                  strokeDashoffset={2 * Math.PI * 14 * (1 - progressPercent / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <span className="absolute text-[10px] font-extrabold text-slate-800 dark:text-slate-100">
                {progressPercent}%
              </span>
            </div>
            <div className="flex flex-col text-left pr-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Certificación
              </span>
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">
                {progressPercent === 100 ? (
                  <span className="text-emerald-600 dark:text-emerald-400">¡Listo!</span>
                ) : (
                  `Faltan ${course.totalLessons - completedCount} lecc.`
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setShowAITutor(true)}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden sm:inline">Tutor IA</span>
          </button>

          {(progressPercent === 100 || courseProgress.certificateEarned) && (
            <button
              id="view-cert-btn"
              onClick={() => setShowCertificateModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/80 hover:bg-amber-200 dark:hover:bg-amber-900 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Ver Certificado</span>
            </button>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            title={isSidebarOpen ? "Plegar el temario del curso" : "Desplegar el temario del curso"}
          >
            {isSidebarOpen ? (
              <>
                <PanelRightClose className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="hidden sm:inline">Plegar Temario</span>
              </>
            ) : (
              <>
                <PanelRightOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Ver Temario</span>
              </>
            )}
          </motion.button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-slate-50 dark:bg-slate-950">
        
        {/* CENTER / LEFT: Lesson Content & Compiler Editor */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 space-y-6">
          
          {/* Lesson Header Banner */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-[10px] font-bold px-3 py-0.5 rounded-full border uppercase tracking-wider ${
                  activeLesson.level === 'Básico'
                    ? 'bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
                    : activeLesson.level === 'Medio'
                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}>
                  Nivel {activeLesson.level}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  {activeLesson.durationMinutes} minutos estimados
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {activeLesson.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
                {activeLesson.summary}
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shrink-0">
              <button
                id="tab-theory-btn"
                onClick={() => setActiveTab('theory')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === 'theory'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Teoría</span>
              </button>

              <button
                id="tab-compiler-btn"
                onClick={() => setActiveTab('compiler')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === 'compiler'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Práctica & Compilador</span>
              </button>

              {course.id === 'html_css' && (
                <button
                  id="tab-preview-btn"
                  onClick={() => setActiveTab('preview')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    activeTab === 'preview'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>Vista Previa</span>
                </button>
              )}
            </div>
          </div>

          {/* TAB 1: THEORY */}
          {activeTab === 'theory' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm leading-relaxed font-sans text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-4">
                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 font-medium">
                  <div className="whitespace-pre-line">
                    {activeLesson.theoryMarkdown}
                  </div>
                </div>
              </div>

              {/* Code Examples Breakdown */}
              {activeLesson.codeExamples.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Ejemplos Explicados de Código</span>
                  </h3>
                  {activeLesson.codeExamples.map((ex, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3">
                      <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                        {ex.title}
                      </div>
                      <pre className="bg-[#1e293b] p-4 rounded-2xl font-mono text-xs text-sky-300 border border-slate-800 overflow-x-auto">
                        <code>{ex.code}</code>
                      </pre>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium italic">
                        💡 {ex.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Bottom Action: Go to Exercise */}
              <div className="flex justify-end pt-2">
                <button
                  id="go-to-exercise-btn"
                  onClick={() => setActiveTab('compiler')}
                  className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-indigo-100 dark:shadow-none active:scale-95 transition-all"
                >
                  <span>Ir al Ejercicio Práctico</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: COMPILER / PRACTICAL EXERCISE */}
          {(activeTab === 'compiler' || activeTab === 'preview') && (
            <div className="space-y-6">
              
              {/* Challenge Instruction Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Desafío Práctico de la Lección
                  </span>
                  {activeLesson.exercise.hint && (
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-bold flex items-center gap-1"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>{showHint ? 'Ocultar Pista' : 'Ver Pista'}</span>
                    </button>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                  {activeLesson.exercise.instruction}
                </p>


                {showHint && activeLesson.exercise.hint && (
                  <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl text-xs font-medium">
                    💡 <strong>Pista del Tutor:</strong> {activeLesson.exercise.hint}
                  </div>
                )}
              </div>

              {/* Code Editor & Execution Console */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Editor Container matching prompt IDE spec */}
                <div className="bg-[#1e293b] rounded-3xl flex flex-col h-[480px] overflow-hidden shadow-2xl relative border-4 border-slate-800">
                  <AnimatePresence>
                    {copyPasteWarning && (
                      <motion.div 
                        initial={{ opacity: 0, y: -15, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -15, scale: 0.9 }}
                        className="absolute top-14 left-1/2 -translate-x-1/2 z-30 bg-rose-600 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-2xl border border-rose-400 flex items-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4 text-white shrink-0" />
                        <span>{copyPasteWarning}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/50 border-b border-slate-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>

                    <div className="text-xs font-mono text-slate-400 px-2 py-0.5 border border-slate-700 rounded">
                      ejercicio_{activeLesson.id}.{course.id === 'python' ? 'py' : course.id === 'cpp' ? 'cpp' : course.id === 'rust' ? 'rs' : course.id === 'java' ? 'java' : course.id === 'sql' ? 'sql' : course.id === 'html_css' ? 'html' : 'js'}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCode('')}
                        title="Reiniciar código inicial"
                        className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1 text-xs"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Reiniciar</span>
                      </button>

                      <button
                        id="run-code-btn"
                        onClick={handleRunCode}
                        disabled={isExecuting}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
                      >
                        {isExecuting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                        <span>Ejecutar Código</span>
                      </button>
                    </div>
                  </div>

                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onPaste={handleCopyPasteBlock}
                    onCopy={handleCopyPasteBlock}
                    onCut={handleCopyPasteBlock}
                    placeholder={activeLesson.exercise.starterCode}
                    className="flex-1 w-full p-4 bg-[#1e293b] font-mono text-xs sm:text-sm text-slate-100 placeholder:text-slate-500/80 placeholder:italic focus:outline-none resize-none leading-relaxed"
                    spellCheck={false}
                  />
                </div>

                {/* Execution Output Panel / Real Terminal Style */}
                <div className="bg-[#0f172a] rounded-3xl flex flex-col h-[480px] overflow-hidden shadow-2xl relative border-4 border-slate-800 font-mono">
                  <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-slate-300 tracking-wider">
                        CONSOLA DE SALIDA
                      </span>
                    </div>
                    {executionResult && (
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                        executionResult.success
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                          : 'bg-rose-950 text-rose-400 border-rose-800'
                      }`}>
                        {executionResult.success ? '[OK - PASS]' : '[FAIL]'}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 p-4 bg-slate-950 text-xs text-slate-200 overflow-y-auto space-y-3 leading-relaxed">
                    {activeTab === 'preview' && course.id === 'html_css' ? (
                      <iframe
                        srcDoc={code}
                        title="HTML Live Preview"
                        className="w-full h-full border-0 bg-white rounded-xl"
                      />
                    ) : isExecuting ? (
                      <div className="flex items-center gap-2 text-slate-400 py-3">
                        <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                        <span>$ compilando y ejecutando pruebas...</span>
                      </div>
                    ) : executionResult ? (
                      <div className="space-y-4">
                        {/* Terminal Stdout */}
                        <div>
                          <div className="text-[11px] text-slate-500 font-semibold mb-1">
                            $ ./stdout
                          </div>
                          <pre className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-slate-100 whitespace-pre-wrap font-mono">
                            {executionResult.output || '(Sin salida)'}
                          </pre>
                        </div>

                        {/* Summary Status */}
                        <div className={`p-2.5 rounded-xl border font-mono text-xs font-semibold ${
                          executionResult.success
                            ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-300'
                            : 'bg-rose-950/40 border-rose-700/60 text-rose-300'
                        }`}>
                          {executionResult.success
                            ? 'El código esta correcto ! felicidades por tu logro :) !'
                            : '[STATUS]: Error en pruebas. Revisa la salida e intenta nuevamente.'
                          }
                        </div>
                      </div>
                    ) : (
                      <div className="text-slate-500 py-3">
                        $ Consola lista. Haz clic en &quot;Ejecutar Código&quot; para verificar tu programa.
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Bottom Verification & Unlock Action Panel */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
                    canVerify
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}>
                    {canVerify ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Lock className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Verificación de la Lección
                      </h4>
                      {isCompleted ? (
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                          Lección Completada
                        </span>
                      ) : executionResult?.success ? (
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                          Aprobado - Listo para guardar
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                          Bloqueado
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                      {canVerify
                        ? '¡Tu código es correcto! Haz clic en Verificar Lección para guardar tu avance y continuar.'
                        : 'Ejecuta tu código en el compilador. Este botón se desbloqueará únicamente cuando el ejercicio esté correcto.'
                      }
                    </p>
                  </div>
                </div>

                <button
                  id="verify-code-btn"
                  onClick={handleVerifySolution}
                  disabled={!canVerify || isExecuting}
                  className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                    canVerify
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20 active:scale-95 cursor-pointer'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-slate-700/60 cursor-not-allowed opacity-75'
                  }`}
                >
                  {isExecuting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : canVerify ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                  <span>Verificar Lección</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* RIGHT SIDEBAR ON THE RIGHT SIDE matching design prompt spec */}
        <AnimatePresence mode="wait">
          {isSidebarOpen ? (
            <motion.aside
              key="sidebar-expanded"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full lg:w-80 bg-white dark:bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 flex flex-col h-auto lg:h-full shrink-0 shadow-lg transition-colors"
            >
              
              {/* Sidebar Header with Circular Certificate Progress */}
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>Temario: {course.title}</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {course.totalLessons} Lecciones en total
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                    title="Plegar Temario"
                  >
                    <PanelRightClose className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Circular Progress Badge */}
                <div className="flex items-center gap-3.5 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                  <div className="relative flex items-center justify-center shrink-0 w-12 h-12">
                    <svg width="48" height="48" className="rotate-[-90deg]">
                      <circle
                        cx="24"
                        cy="24"
                        r="19"
                        className="stroke-slate-200 dark:stroke-slate-700"
                        strokeWidth="4"
                        fill="transparent"
                      />
                      <circle
                        cx="24"
                        cy="24"
                        r="19"
                        className="stroke-indigo-600 dark:stroke-indigo-400 transition-all duration-500 ease-out"
                        strokeWidth="4"
                        strokeDasharray={2 * Math.PI * 19}
                        strokeDashoffset={2 * Math.PI * 19 * (1 - progressPercent / 100)}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <span className="absolute text-xs font-black text-slate-900 dark:text-white">
                      {progressPercent}%
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-800 dark:text-slate-200">
                      <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Avance de Certificado</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5 leading-tight">
                      {progressPercent === 100 ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">¡Felicidades! Certificado disponible.</span>
                      ) : (
                        <>Te faltan <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{course.totalLessons - completedCount}</strong> {course.totalLessons - completedCount === 1 ? 'lección' : 'lecciones'} para tu certificado de {course.title}.</>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Expand / Collapse Controls */}
              <div className="px-5 py-2.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-500" />
                  Niveles del Curso
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setOpenLevels({ 'Básico': true, 'Medio': true, 'Avanzado': true })}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    Expandir
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => setOpenLevels({ 'Básico': false, 'Medio': false, 'Avanzado': false })}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    Plegar
                  </button>
                </div>
              </div>

              {/* Lessons Navigation List grouped by Collapsible Levels */}
              <div className="flex-1 overflow-y-auto">
                {['Básico', 'Medio', 'Avanzado'].map((levelName) => {
                  const levelLessons = course.lessons.filter(l => l.level === levelName);
                  if (levelLessons.length === 0) return null;

                  const isLevelOpen = openLevels[levelName] ?? true;
                  const levelCompletedCount = levelLessons.filter(l => isLessonCompleted(l.id)).length;

                  return (
                    <div key={levelName} className="border-b border-slate-200/80 dark:border-slate-800">
                      {/* Level Header Accordion Toggle */}
                      <button
                        onClick={() => toggleLevel(levelName)}
                        className="w-full px-5 py-2.5 bg-slate-100/90 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-800 flex items-center justify-between text-left transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          {isLevelOpen ? (
                            <ChevronDown className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                          <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200">
                            Nivel {levelName}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-xs">
                          {levelCompletedCount}/{levelLessons.length}
                        </span>
                      </button>

                      {/* Level Lessons Content */}
                      <AnimatePresence initial={false}>
                        {isLevelOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            {levelLessons.map((lesson) => {
                              const completed = isLessonCompleted(lesson.id);
                              const unlocked = isLessonUnlocked(lesson.id);
                              const isActive = lesson.id === activeLessonId;

                              return (
                                <motion.button
                                  key={lesson.id}
                                  id={`lesson-item-${lesson.id}`}
                                  disabled={!unlocked}
                                  whileHover={unlocked ? { x: 4, scale: 1.01 } : {}}
                                  whileTap={unlocked ? { scale: 0.98 } : {}}
                                  onClick={() => {
                                    if (unlocked) {
                                      setActiveLessonId(lesson.id);
                                      setActiveTab('theory');
                                    }
                                  }}
                                  className={`w-full text-left px-6 py-3.5 flex items-start space-x-3.5 border-b border-slate-100 dark:border-slate-800/60 transition-colors ${
                                    isActive
                                      ? 'border-l-4 border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-bold'
                                      : completed
                                      ? 'bg-green-50/50 dark:bg-green-950/20 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-900 dark:text-slate-200'
                                      : unlocked
                                      ? 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-800 dark:text-slate-200'
                                      : 'opacity-60 text-slate-500 dark:text-slate-500 cursor-not-allowed'
                                  }`}
                                >
                                  {/* Status Icon */}
                                  <div className="mt-0.5 shrink-0">
                                    {completed ? (
                                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white">
                                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                                      </div>
                                    ) : isActive ? (
                                      <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[11px] font-bold">
                                        {lesson.id < 10 ? `0${lesson.id}` : lesson.id}
                                      </div>
                                    ) : unlocked ? (
                                      <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 text-[11px] font-bold">
                                        {lesson.id < 10 ? `0${lesson.id}` : lesson.id}
                                      </div>
                                    ) : (
                                      <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                                        <Lock className="w-3 h-3" />
                                      </div>
                                    )}
                                  </div>

                                  {/* Lesson Text */}
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-xs sm:text-sm font-bold ${isActive ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-900 dark:text-slate-200'}`}>
                                      {lesson.id < 10 ? `0${lesson.id}` : lesson.id}. {lesson.title}
                                    </p>
                                  </div>
                                </motion.button>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Render any un-categorized lessons if present */}
                {(() => {
                  const otherLessons = course.lessons.filter(
                    l => !['Básico', 'Medio', 'Avanzado'].includes(l.level)
                  );
                  if (otherLessons.length === 0) return null;
                  return (
                    <div>
                      {otherLessons.map((lesson) => {
                        const completed = isLessonCompleted(lesson.id);
                        const unlocked = isLessonUnlocked(lesson.id);
                        const isActive = lesson.id === activeLessonId;
                        return (
                          <motion.button
                            key={lesson.id}
                            id={`lesson-item-${lesson.id}`}
                            disabled={!unlocked}
                            whileHover={unlocked ? { x: 4, scale: 1.01 } : {}}
                            whileTap={unlocked ? { scale: 0.98 } : {}}
                            onClick={() => {
                              if (unlocked) {
                                setActiveLessonId(lesson.id);
                                setActiveTab('theory');
                              }
                            }}
                            className={`w-full text-left px-6 py-3.5 flex items-start space-x-3.5 border-b border-slate-100 dark:border-slate-800/60 transition-colors ${
                              isActive
                                ? 'border-l-4 border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-bold'
                                : completed
                                ? 'bg-green-50/50 dark:bg-green-950/20 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-900 dark:text-slate-200'
                                : unlocked
                                ? 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-800 dark:text-slate-200'
                                : 'opacity-60 text-slate-500 dark:text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            <div className="mt-0.5 shrink-0">
                              {completed ? (
                                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </div>
                              ) : isActive ? (
                                <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[11px] font-bold">
                                  {lesson.id < 10 ? `0${lesson.id}` : lesson.id}
                                </div>
                              ) : unlocked ? (
                                <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 text-[11px] font-bold">
                                  {lesson.id < 10 ? `0${lesson.id}` : lesson.id}
                                </div>
                              ) : (
                                <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                                  <Lock className="w-3 h-3" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-xs sm:text-sm font-bold ${isActive ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-900 dark:text-slate-200'}`}>
                                {lesson.id < 10 ? `0${lesson.id}` : lesson.id}. {lesson.title}
                              </p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* Sidebar Footer Certificate Banner */}
              {progressPercent === 100 && (
                <div className="p-6 bg-slate-900 dark:bg-slate-950 text-white border-t border-slate-800">
                  <button
                    onClick={() => setShowCertificateModal(true)}
                    className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl font-bold transition-all shadow-md shadow-indigo-500/20"
                  >
                    <Award className="w-5 h-5 text-amber-300" />
                    <span>Descargar Certificado</span>
                  </button>
                </div>
              )}

            </motion.aside>
          ) : (
            /* COLLAPSED MINI RAIL SIDEBAR (Matching reference image with vertical icon list) */
            <motion.aside
              key="sidebar-collapsed"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="w-16 lg:w-16 bg-white dark:bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 flex flex-col items-center py-4 h-auto lg:h-full shrink-0 shadow-md transition-colors gap-3 z-10"
            >
              {/* Top Header Badge & Expand Button */}
              <div className="flex flex-col items-center gap-2.5 w-full border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-[11px] shadow-sm shadow-indigo-500/30">
                  {course.id.toUpperCase().slice(0, 3)}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                  title="Desplegar Temario Completo"
                >
                  <PanelRightOpen className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Circular Progress Badge Small */}
              <div 
                className="relative flex items-center justify-center shrink-0 w-9 h-9 cursor-pointer my-1"
                onClick={() => setIsSidebarOpen(true)}
                title={`Avance de Temario: ${progressPercent}%`}
              >
                <svg width="36" height="36" className="rotate-[-90deg]">
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    className="stroke-slate-200 dark:stroke-slate-800"
                    strokeWidth="3"
                    fill="transparent"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    className="stroke-indigo-600 dark:stroke-indigo-400 transition-all duration-500 ease-out"
                    strokeWidth="3"
                    strokeDasharray={2 * Math.PI * 14}
                    strokeDashoffset={2 * Math.PI * 14 * (1 - progressPercent / 100)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <span className="absolute text-[9px] font-black text-slate-900 dark:text-white">
                  {progressPercent}%
                </span>
              </div>

              {/* Collapsed Lesson Icons Bar (Vertical Rail) */}
              <div className="flex-1 overflow-y-auto w-full px-2 space-y-2 flex flex-col items-center py-1 no-scrollbar">
                {course.lessons.map((lesson) => {
                  const completed = isLessonCompleted(lesson.id);
                  const unlocked = isLessonUnlocked(lesson.id);
                  const isActive = lesson.id === activeLessonId;

                  return (
                    <motion.button
                      key={lesson.id}
                      disabled={!unlocked}
                      whileHover={unlocked ? { scale: 1.1 } : {}}
                      whileTap={unlocked ? { scale: 0.95 } : {}}
                      onClick={() => {
                        if (unlocked) {
                          setActiveLessonId(lesson.id);
                          setActiveTab('theory');
                        }
                      }}
                      title={`${lesson.id < 10 ? '0' + lesson.id : lesson.id}. ${lesson.title} (${lesson.level})`}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400 font-black'
                          : completed
                          ? 'bg-emerald-500 text-white shadow-xs'
                          : unlocked
                          ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold'
                          : 'bg-slate-100/50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60'
                      }`}
                    >
                      {completed ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : isActive ? (
                        <span className="text-[11px] font-black">
                          {lesson.id < 10 ? `0${lesson.id}` : lesson.id}
                        </span>
                      ) : unlocked ? (
                        <span className="text-[11px] font-bold">
                          {lesson.id < 10 ? `0${lesson.id}` : lesson.id}
                        </span>
                      ) : (
                        <Lock className="w-3.5 h-3.5" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Award icon if complete */}
              {progressPercent === 100 && (
                <button
                  onClick={() => setShowCertificateModal(true)}
                  className="p-2 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-colors cursor-pointer shadow-md shadow-amber-500/20 mt-1"
                  title="Descargar Certificado"
                >
                  <Award className="w-4 h-4" />
                </button>
              )}

            </motion.aside>
          )}
        </AnimatePresence>

      </div>

      {/* AI Tutor Modal */}
      <AITutorModal
        isOpen={showAITutor}
        onClose={() => setShowAITutor(false)}
        courseTitle={course.title}
        lessonTitle={activeLesson.title}
        currentCode={code}
        lastError={executionResult?.error}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={showCertificateModal}
        onClose={() => setShowCertificateModal(false)}
        data={{
          studentName: userStats.userName,
          courseTitle: course.title,
          languageId: course.id,
          issueDate: new Date().toLocaleDateString('es-ES'),
          certificateCode: `CM-${course.id.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`,
          grade: 98,
          hoursCompleted: 20
        }}
        onOpenReport={() => {
          setShowCertificateModal(false);
          setShowReportModal(true);
        }}
      />

      {/* Academic Grade Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        data={{
          studentName: userStats.userName,
          courseTitle: course.title,
          languageId: course.id,
          overallGrade: 98,
          basicLevelGrade: 100,
          mediumLevelGrade: 95,
          advancedLevelGrade: 98,
          completedLessonsCount: course.totalLessons,
          totalLessonsCount: course.totalLessons,
          totalAttempts: course.totalLessons * 2,
          skillsMastered: course.skillsGained,
          issueDate: new Date().toLocaleDateString('es-ES')
        }}
      />

    </div>
  );
};
