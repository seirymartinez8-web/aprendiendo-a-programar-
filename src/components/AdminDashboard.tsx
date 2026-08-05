import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, BookOpen, Award, Settings, BarChart3, Search, Plus, Edit3, Trash2, 
  CheckCircle, ShieldAlert, Sparkles, UserCheck, GraduationCap, ArrowUpRight, 
  Layers, FileText, ToggleLeft, ToggleRight, Download, RefreshCw, Eye, X, Check, Save
} from 'lucide-react';
import { LanguageId, StudentRecord, SystemConfig, UserStats, Course, Lesson, DifficultyLevel } from '../types';
import { COURSES_LIST } from '../data/coursesIndex';
import { downloadKardexPDF, downloadCertificatePDF } from '../utils/pdfGenerator';

interface AdminDashboardProps {
  userStats: UserStats;
  courses: Record<LanguageId, Course>;
  onUpdateCourse: (updatedCourse: Course) => void;
  onSwitchToStudentView: () => void;
  onNavigateToCourse: (courseId: LanguageId) => void;
}

const MOCK_STUDENTS: StudentRecord[] = [
  {
    id: 'EST-1042-2026',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@codemaster.edu',
    enrolledDate: '12 Ene 2026',
    overallGpa: 98,
    completedLessons: 28,
    streakDays: 14,
    certificatesEarned: 2,
    status: 'Activo',
    primaryCourse: 'cpp',
  },
  {
    id: 'EST-2081-2026',
    name: 'Sofia Ramirez',
    email: 'sofia.ramirez@codemaster.edu',
    enrolledDate: '18 Ene 2026',
    overallGpa: 94,
    completedLessons: 42,
    streakDays: 21,
    certificatesEarned: 3,
    status: 'Graduado',
    primaryCourse: 'python',
  },
  {
    id: 'EST-3105-2026',
    name: 'Mateo Lopez',
    email: 'mateo.lopez@gmail.com',
    enrolledDate: '01 Feb 2026',
    overallGpa: 88,
    completedLessons: 12,
    streakDays: 5,
    certificatesEarned: 0,
    status: 'Activo',
    primaryCourse: 'javascript',
  },
  {
    id: 'EST-4192-2026',
    name: 'Valentina Gomez',
    email: 'v.gomez@tech.io',
    enrolledDate: '10 Feb 2026',
    overallGpa: 91,
    completedLessons: 19,
    streakDays: 9,
    certificatesEarned: 1,
    status: 'Activo',
    primaryCourse: 'java',
  },
  {
    id: 'EST-5033-2026',
    name: 'Diego Fernandez',
    email: 'diego.f@hotmail.com',
    enrolledDate: '15 Ene 2026',
    overallGpa: 76,
    completedLessons: 4,
    streakDays: 1,
    certificatesEarned: 0,
    status: 'Inactivo',
    primaryCourse: 'sql',
  },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  userStats,
  courses,
  onUpdateCourse,
  onSwitchToStudentView,
  onNavigateToCourse,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'courses' | 'certificates' | 'settings'>('overview');
  
  // Student Management state
  const [studentsList, setStudentsList] = useState<StudentRecord[]>(MOCK_STUDENTS);
  const [searchStudentQuery, setSearchStudentQuery] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudentData, setNewStudentData] = useState({ name: '', email: '', primaryCourse: 'cpp' as LanguageId });

  // Course & Curriculum Edit state
  const [selectedAdminCourseId, setSelectedAdminCourseId] = useState<LanguageId>('cpp');
  
  // Lesson Modal State
  const [lessonModalMode, setLessonModalMode] = useState<'add' | 'edit' | null>(null);
  const [targetLessonId, setTargetLessonId] = useState<number | null>(null);
  const [lessonFormData, setLessonFormData] = useState({
    title: '',
    level: 'Básico' as DifficultyLevel,
    durationMinutes: 15,
    summary: '',
    theoryMarkdown: '',
    starterCode: '',
    solutionCode: '',
    hint: '',
  });

  // Certificates Audit state
  const [searchCertCode, setSearchCertCode] = useState('');
  const [auditMessage, setAuditMessage] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  // System Settings state
  const [systemConfig, setSystemConfig] = useState<SystemConfig>({
    academyName: 'CodeMaster Academy',
    passingGradeThreshold: 70,
    allowPlaygroundAccess: true,
    enableAiTutor: true,
    maintenanceMode: false,
  });

  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Filter students
  const filteredStudents = studentsList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchStudentQuery.toLowerCase()) || 
                          s.id.toLowerCase().includes(searchStudentQuery.toLowerCase()) ||
                          s.email.toLowerCase().includes(searchStudentQuery.toLowerCase());
    const matchesCourse = selectedCourseFilter === 'all' || s.primaryCourse === selectedCourseFilter;
    return matchesSearch && matchesCourse;
  });

  // Handle Add Student
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentData.name || !newStudentData.email) return;

    const newId = `EST-${Math.floor(1000 + Math.random() * 9000)}-2026`;
    const newStudent: StudentRecord = {
      id: newId,
      name: newStudentData.name,
      email: newStudentData.email,
      enrolledDate: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
      overallGpa: 100,
      completedLessons: 0,
      streakDays: 1,
      certificatesEarned: 0,
      status: 'Activo',
      primaryCourse: newStudentData.primaryCourse,
    };

    setStudentsList([newStudent, ...studentsList]);
    setShowAddStudentModal(false);
    setNewStudentData({ name: '', email: '', primaryCourse: 'cpp' });
    showToast(`Estudiante "${newStudent.name}" registrado correctamente.`);
  };

  // Handle Delete Student
  const handleDeleteStudent = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este registro de estudiante?')) {
      setStudentsList(prev => prev.filter(s => s.id !== id));
      showToast('Registro de estudiante eliminado.');
    }
  };

  // Verify Certificate Code
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCertCode.trim()) return;

    const code = searchCertCode.trim().toUpperCase();
    if (code.startsWith('CM-') || code.length >= 8) {
      setAuditMessage({
        type: 'success',
        msg: `Certificado ${code} VERIFICADO. Emitido a favor del estudiante con validez oficial.`,
      });
    } else {
      setAuditMessage({
        type: 'error',
        msg: `Código ${code} NO encontrado en el registro nacional de diplomas.`,
      });
    }
  };

  // Course Lesson Handlers
  const handleOpenAddLesson = () => {
    setLessonModalMode('add');
    setTargetLessonId(null);
    setLessonFormData({
      title: '',
      level: 'Básico',
      durationMinutes: 20,
      summary: '',
      theoryMarkdown: '## Introducción al Módulo\n\nEscribe aquí el contenido teórico para esta lección...',
      starterCode: '// Código inicial para el estudiante\n',
      solutionCode: '// Solución esperada\n',
      hint: 'Revisa los conceptos básicos presentados en la teoría.',
    });
  };

  const handleOpenEditLesson = (lesson: Lesson) => {
    setLessonModalMode('edit');
    setTargetLessonId(lesson.id);
    setLessonFormData({
      title: lesson.title,
      level: lesson.level,
      durationMinutes: lesson.durationMinutes,
      summary: lesson.summary,
      theoryMarkdown: lesson.theoryMarkdown || '',
      starterCode: lesson.exercise?.starterCode || '',
      solutionCode: lesson.exercise?.solutionCode || '',
      hint: lesson.exercise?.hint || '',
    });
  };

  const handleDeleteLesson = (lessonId: number) => {
    const currentCourse = courses[selectedAdminCourseId] || COURSES_LIST.find(c => c.id === selectedAdminCourseId)!;
    if (confirm(`¿Estás seguro de eliminar la lección ${lessonId}?`)) {
      const updatedLessons = currentCourse.lessons.filter(l => l.id !== lessonId);
      const updatedCourse: Course = {
        ...currentCourse,
        lessons: updatedLessons,
        totalLessons: updatedLessons.length
      };
      onUpdateCourse(updatedCourse);
      showToast('Lección eliminada correctamente.');
    }
  };

  const handleSaveLessonModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonFormData.title.trim()) return;

    const currentCourse = courses[selectedAdminCourseId] || COURSES_LIST.find(c => c.id === selectedAdminCourseId)!;
    let updatedLessons = [...currentCourse.lessons];

    if (lessonModalMode === 'add') {
      const nextId = currentCourse.lessons.length > 0
        ? Math.max(...currentCourse.lessons.map(l => l.id)) + 1
        : 1;

      const newLesson: Lesson = {
        id: nextId,
        title: lessonFormData.title,
        level: lessonFormData.level,
        durationMinutes: Number(lessonFormData.durationMinutes) || 15,
        summary: lessonFormData.summary,
        theoryMarkdown: lessonFormData.theoryMarkdown,
        codeExamples: [
          {
            title: 'Ejemplo Introductorio',
            code: lessonFormData.starterCode || '// Código de demostración',
            explanation: 'Sigue el patrón de sintaxis presentado arriba.'
          }
        ],
        exercise: {
          id: `ex-${selectedAdminCourseId}-${nextId}`,
          instruction: `Completa las instrucciones para implementar "${lessonFormData.title}".`,
          starterCode: lessonFormData.starterCode,
          solutionCode: lessonFormData.solutionCode,
          testCases: [
            {
              id: `tc-${nextId}-1`,
              expectedOutput: 'OK',
              description: 'Prueba automática'
            }
          ],
          hint: lessonFormData.hint
        }
      };

      updatedLessons.push(newLesson);
      showToast(`Nueva lección "${newLesson.title}" agregada al curso.`);
    } else if (lessonModalMode === 'edit' && targetLessonId !== null) {
      updatedLessons = updatedLessons.map(l => {
        if (l.id !== targetLessonId) return l;
        return {
          ...l,
          title: lessonFormData.title,
          level: lessonFormData.level,
          durationMinutes: Number(lessonFormData.durationMinutes) || 15,
          summary: lessonFormData.summary,
          theoryMarkdown: lessonFormData.theoryMarkdown,
          exercise: {
            ...l.exercise,
            starterCode: lessonFormData.starterCode,
            solutionCode: lessonFormData.solutionCode,
            hint: lessonFormData.hint,
          }
        };
      });
      showToast(`Lección "${lessonFormData.title}" actualizada.`);
    }

    const updatedCourse: Course = {
      ...currentCourse,
      lessons: updatedLessons,
      totalLessons: updatedLessons.length
    };

    onUpdateCourse(updatedCourse);
    setLessonModalMode(null);
  };

  const selectedAdminCourse = courses[selectedAdminCourseId] || COURSES_LIST.find(c => c.id === selectedAdminCourseId) || COURSES_LIST[0];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-16 transition-colors">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 font-bold text-sm"
          >
            <CheckCircle className="w-5 h-5 text-emerald-300" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner indicating Admin Mode */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-indigo-900/50 text-white px-4 sm:px-8 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm tracking-wide uppercase">Panel de Control Administrador</span>
                <span className="bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Acceso Total
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Gestión integral de alumnos, cursos, certificados, métricas y plataforma.
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSwitchToStudentView}
            className="px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-black shadow-md flex items-center gap-2 transition-all cursor-pointer"
          >
            <UserCheck className="w-4 h-4 text-indigo-600" />
            <span>Ir a Vista de Estudiante</span>
          </motion.button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Navigation Tabs Header */}
        <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap gap-1 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Métricas Globales</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab('students')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'students'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Gestión de Estudiantes ({studentsList.length})</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'courses'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Cursos y Temarios</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab('certificates')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'certificates'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Auditoría de Certificados</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Configuración</span>
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {/* TAB 1: OVERVIEW METRICS */}
          {activeTab === 'overview' && (
            <motion.div
              key="tab-overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="space-y-8"
            >
              {/* Top Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Estudiantes Totales</p>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">1,248</h3>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5" /> +14% este mes
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Diplomas Emitidos</p>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">382</h3>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5" /> 98% Tasa aprobación
                    </span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Cursos Especializados</p>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">8 Cursos</h3>
                    <span className="text-[11px] font-bold text-slate-500 mt-0.5 block">120 Lecciones Totales</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Ejecuciones de Código</p>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">45,820</h3>
                    <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 mt-0.5 block">En compiladores Web</span>
                  </div>
                </div>
              </div>

              {/* Course Metrics Table */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-4">
                  Estado de Inscripciones y Avance por Curso
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase font-black text-slate-400">
                        <th className="py-3 px-4">Curso / Lenguaje</th>
                        <th className="py-3 px-4">Inscritos</th>
                        <th className="py-3 px-4">Completados</th>
                        <th className="py-3 px-4">Promedio Calificación</th>
                        <th className="py-3 px-4 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                      {COURSES_LIST.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">
                              {c.id.toUpperCase().slice(0, 3)}
                            </div>
                            <span>{c.title}</span>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-600 dark:text-slate-300">
                            {Math.floor(120 + (c.title.length * 23))} alumnos
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-600 dark:text-slate-300">
                            {Math.floor(40 + (c.title.length * 7))} graduados
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-block px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              96.4 / 100
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => onNavigateToCourse(c.id)}
                              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                            >
                              Ver Vista Alumno →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: STUDENT MANAGEMENT */}
          {activeTab === 'students' && (
            <motion.div
              key="tab-students"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex flex-1 items-center gap-3 w-full">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Buscar estudiante por nombre, correo o matrícula..."
                      value={searchStudentQuery}
                      onChange={(e) => setSearchStudentQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <select
                    value={selectedCourseFilter}
                    onChange={(e) => setSelectedCourseFilter(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs rounded-xl px-3 py-2 font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="all">Todos los Cursos</option>
                    {COURSES_LIST.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddStudentModal(true)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Registrar Nuevo Estudiante</span>
                </motion.button>
              </div>

              {/* Student Table */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase font-black text-slate-400">
                        <th className="py-3 px-4">Estudiante / Matrícula</th>
                        <th className="py-3 px-4">Curso Principal</th>
                        <th className="py-3 px-4">Promedio GPA</th>
                        <th className="py-3 px-4">Lecciones</th>
                        <th className="py-3 px-4">Estado</th>
                        <th className="py-3 px-4 text-right">Acciones de Admin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
                      {filteredStudents.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-400 text-xs font-semibold">
                            No se encontraron estudiantes con los filtros aplicados.
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map((st) => (
                          <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                            <td className="py-4 px-4">
                              <p className="font-extrabold text-slate-900 dark:text-white">{st.name}</p>
                              <p className="text-xs text-slate-400 font-mono">{st.id} • {st.email}</p>
                            </td>
                            <td className="py-4 px-4">
                              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                                {courses[st.primaryCourse]?.title || st.primaryCourse}
                              </span>
                            </td>
                            <td className="py-4 px-4 font-black text-indigo-600 dark:text-indigo-400">
                              {st.overallGpa} / 100
                            </td>
                            <td className="py-4 px-4 font-semibold text-slate-600 dark:text-slate-300">
                              {st.completedLessons} completadas
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase ${
                                st.status === 'Graduado'
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                  : st.status === 'Activo'
                                  ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                                  : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                              }`}>
                                {st.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => {
                                    downloadKardexPDF({
                                      studentName: st.name,
                                      studentId: st.id,
                                      issueDate: new Date().toLocaleDateString('es-ES'),
                                      overallGpa: st.overallGpa,
                                      totalLessonsCompleted: st.completedLessons,
                                      totalLessonsInProgram: 120,
                                      totalHoursStudied: 35,
                                      streakDays: st.streakDays,
                                      certificatesEarnedCount: st.certificatesEarned,
                                      courses: COURSES_LIST.map(c => ({
                                        courseId: c.id,
                                        courseTitle: c.title,
                                        completedLessons: c.id === st.primaryCourse ? st.completedLessons : 0,
                                        totalLessons: c.totalLessons,
                                        progressPercent: c.id === st.primaryCourse ? Math.min(100, Math.round((st.completedLessons / c.totalLessons) * 100)) : 0,
                                        status: c.id === st.primaryCourse ? (st.completedLessons >= c.totalLessons ? 'COMPLETADO' : 'EN CURSO') : 'NO INICIADO',
                                        grade: c.id === st.primaryCourse ? st.overallGpa : 0,
                                      }))
                                    });
                                    showToast(`Kárdex generado para ${st.name}`);
                                  }}
                                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                                  title="Descargar Kárdex Oficial PDF"
                                >
                                  <Download className="w-3.5 h-3.5 text-indigo-500" />
                                  <span>Kárdex</span>
                                </button>

                                <button
                                  onClick={() => handleDeleteStudent(st.id)}
                                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                                  title="Eliminar Estudiante"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: COURSE & CURRICULUM MANAGEMENT */}
          {activeTab === 'courses' && (
            <motion.div
              key="tab-courses"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Editor de Temarios y Cursos
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Selecciona una especialidad para auditar, crear módulos nuevos o editar las lecciones existentes.
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <select
                    value={selectedAdminCourseId}
                    onChange={(e) => setSelectedAdminCourseId(e.target.value as LanguageId)}
                    className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 font-bold text-xs rounded-xl px-4 py-2.5 focus:outline-none cursor-pointer"
                  >
                    {COURSES_LIST.map((c) => {
                      const dynamicCourse = courses[c.id] || c;
                      return (
                        <option key={c.id} value={c.id}>
                          {dynamicCourse.title} ({dynamicCourse.lessons.length} Lecciones)
                        </option>
                      );
                    })}
                  </select>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpenAddLesson}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar Nuevo Módulo</span>
                  </motion.button>
                </div>
              </div>

              {/* Lessons List for Selected Course */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                      Lecciones del Curso de {selectedAdminCourse.title}
                    </h4>
                    <button
                      onClick={() => onNavigateToCourse(selectedAdminCourse.id)}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 ml-2"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver en Vivo</span>
                    </button>
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    {selectedAdminCourse.lessons.length} lecciones configuradas
                  </span>
                </div>

                {selectedAdminCourse.lessons.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs font-semibold">
                    Este curso aún no tiene módulos. Haz clic en "Agregar Nuevo Módulo" para añadir la primera lección.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedAdminCourse.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-3"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">
                              Lección {lesson.id < 10 ? `0${lesson.id}` : lesson.id}
                            </span>
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                              {lesson.level}
                            </span>
                          </div>
                          <h5 className="font-bold text-slate-900 dark:text-white text-sm mt-1">
                            {lesson.title}
                          </h5>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                            {lesson.summary}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                          <span className="text-[11px] font-semibold text-slate-400">
                            ⏱️ {lesson.durationMinutes} min
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleOpenEditLesson(lesson)}
                              className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-200 dark:hover:bg-indigo-900 transition-colors cursor-pointer flex items-center gap-1"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Editar</span>
                            </button>
                            <button
                              onClick={() => handleDeleteLesson(lesson.id)}
                              className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                              title="Eliminar lección"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 4: CERTIFICATES AUDIT */}
          {activeTab === 'certificates' && (
            <motion.div
              key="tab-certificates"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Verificador Oficial de Certificados
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ingresa el código único del certificado (ej. CM-CPP-104920) para validar su autenticidad.
                </p>

                <form onSubmit={handleVerifyCode} className="flex gap-3 max-w-lg">
                  <input
                    type="text"
                    placeholder="Ej. CM-CPP-104920"
                    value={searchCertCode}
                    onChange={(e) => setSearchCertCode(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer shrink-0"
                  >
                    Verificar Código
                  </button>
                </form>

                {auditMessage && (
                  <div className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2.5 ${
                    auditMessage.type === 'success' 
                      ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                  }`}>
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>{auditMessage.msg}</span>
                  </div>
                )}
              </div>

              {/* Issued Certificates Log Table */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mb-4">
                  Registro Reciente de Diplomas Emitidos
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 font-black text-slate-400 uppercase">
                        <th className="py-3 px-4">Código Diploma</th>
                        <th className="py-3 px-4">Estudiante</th>
                        <th className="py-3 px-4">Especialidad</th>
                        <th className="py-3 px-4">Fecha Emisión</th>
                        <th className="py-3 px-4 text-right">Descargar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold text-slate-700 dark:text-slate-300">
                      <tr>
                        <td className="py-3.5 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">CM-CPP-839201</td>
                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Carlos Mendoza</td>
                        <td className="py-3.5 px-4">C++ Profesional</td>
                        <td className="py-3.5 px-4">04/08/2026</td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => downloadCertificatePDF({
                              studentName: 'Carlos Mendoza',
                              courseTitle: 'C++ de Cero a Experto',
                              languageId: 'cpp',
                              issueDate: '04/08/2026',
                              certificateCode: 'CM-CPP-839201',
                              grade: 98,
                              hoursCompleted: 45
                            })}
                            className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-bold hover:bg-indigo-100 cursor-pointer"
                          >
                            PDF
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">CM-PY-559102</td>
                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">Sofia Ramirez</td>
                        <td className="py-3.5 px-4">Python & Data</td>
                        <td className="py-3.5 px-4">01/08/2026</td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => downloadCertificatePDF({
                              studentName: 'Sofia Ramirez',
                              courseTitle: 'Python de Cero a Experto',
                              languageId: 'python',
                              issueDate: '01/08/2026',
                              certificateCode: 'CM-PY-559102',
                              grade: 95,
                              hoursCompleted: 40
                            })}
                            className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-bold hover:bg-indigo-100 cursor-pointer"
                          >
                            PDF
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: SYSTEM CONFIGURATION */}
          {activeTab === 'settings' && (
            <motion.div
              key="tab-settings"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 max-w-3xl"
            >
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Parámetros Globales de la Academia
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Ajusta la configuración general de evaluaciones, compiladores y accesos de alumnos.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nombre Institucional de la Plataforma
                  </label>
                  <input
                    type="text"
                    value={systemConfig.academyName}
                    onChange={(e) => setSystemConfig({ ...systemConfig, academyName: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Puntaje Mínimo de Aprobación para Certificados (%):
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={systemConfig.passingGradeThreshold}
                    onChange={(e) => setSystemConfig({ ...systemConfig, passingGradeThreshold: Number(e.target.value) })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Compilador Libre Activo</h4>
                    <p className="text-[11px] text-slate-500">Permite a los alumnos probar código en la consola libre.</p>
                  </div>
                  <button
                    onClick={() => setSystemConfig({ ...systemConfig, allowPlaygroundAccess: !systemConfig.allowPlaygroundAccess })}
                    className="text-indigo-600 dark:text-indigo-400 cursor-pointer"
                  >
                    {systemConfig.allowPlaygroundAccess ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-slate-400" />}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Asistente IA Tutor de Programación</h4>
                    <p className="text-[11px] text-slate-500">Pistas automáticas y explicación de errores en lecciones.</p>
                  </div>
                  <button
                    onClick={() => setSystemConfig({ ...systemConfig, enableAiTutor: !systemConfig.enableAiTutor })}
                    className="text-indigo-600 dark:text-indigo-400 cursor-pointer"
                  >
                    {systemConfig.enableAiTutor ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-slate-400" />}
                  </button>
                </div>
              </div>

              <button
                onClick={() => showToast('Configuración de la Academia guardada exitosamente.')}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Modal Add Student */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-black text-slate-900 dark:text-white text-base">
                Registrar Nuevo Estudiante
              </h3>
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Ana Lucía Fernández"
                  value={newStudentData.name}
                  onChange={(e) => setNewStudentData({ ...newStudentData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  placeholder="ana.fernandez@correo.com"
                  value={newStudentData.email}
                  onChange={(e) => setNewStudentData({ ...newStudentData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Curso Inicial Asignado
                </label>
                <select
                  value={newStudentData.primaryCourse}
                  onChange={(e) => setNewStudentData({ ...newStudentData, primaryCourse: e.target.value as LanguageId })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none cursor-pointer"
                >
                  {COURSES_LIST.map((c) => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Guardar Estudiante
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add / Edit Lesson */}
      {lessonModalMode !== null && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-black text-slate-900 dark:text-white text-base">
                  {lessonModalMode === 'add' ? 'Agregar Nuevo Módulo / Lección' : `Editar Lección ${targetLessonId}`}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Curso: <span className="font-bold text-indigo-600 dark:text-indigo-400">{selectedAdminCourse.title}</span>
                </p>
              </div>
              <button
                onClick={() => setLessonModalMode(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLessonModal} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Título de la Lección / Módulo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Bucles avanzades y estructuras de control"
                    value={lessonFormData.title}
                    onChange={(e) => setLessonFormData({ ...lessonFormData, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nivel de Dificultad
                  </label>
                  <select
                    value={lessonFormData.level}
                    onChange={(e) => setLessonFormData({ ...lessonFormData, level: e.target.value as DifficultyLevel })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold focus:outline-none cursor-pointer"
                  >
                    <option value="Básico">Básico</option>
                    <option value="Medio">Medio</option>
                    <option value="Avanzado">Avanzado</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Duración Estimada (minutos)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={180}
                    value={lessonFormData.durationMinutes}
                    onChange={(e) => setLessonFormData({ ...lessonFormData, durationMinutes: parseInt(e.target.value) || 15 })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Pista o Ayuda para el Alumno
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Recuerda declarar las variables antes del ciclo..."
                    value={lessonFormData.hint}
                    onChange={(e) => setLessonFormData({ ...lessonFormData, hint: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Resumen Breve del Módulo
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Explica sintéticamente qué aprenderá el alumno en este módulo..."
                  value={lessonFormData.summary}
                  onChange={(e) => setLessonFormData({ ...lessonFormData, summary: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Contenido Teórico Markdown
                </label>
                <textarea
                  rows={5}
                  value={lessonFormData.theoryMarkdown}
                  onChange={(e) => setLessonFormData({ ...lessonFormData, theoryMarkdown: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono focus:outline-none"
                  placeholder="## Título de la Teoría..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Código Inicial del Editor
                  </label>
                  <textarea
                    rows={4}
                    value={lessonFormData.starterCode}
                    onChange={(e) => setLessonFormData({ ...lessonFormData, starterCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 text-indigo-300 border border-slate-700 text-xs font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Código Solución Recomendado
                  </label>
                  <textarea
                    rows={4}
                    value={lessonFormData.solutionCode}
                    onChange={(e) => setLessonFormData({ ...lessonFormData, solutionCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 text-emerald-300 border border-slate-700 text-xs font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setLessonModalMode(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Módulo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
