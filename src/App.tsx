import React, { useState, useEffect } from 'react';
import { LanguageId, UserStats, CourseProgress } from './types';
import { COURSES } from './data/coursesIndex';
import { Header } from './components/Header';
import { CourseCatalog } from './components/CourseCatalog';
import { CourseView } from './components/CourseView';
import { FreePlayground } from './components/FreePlayground';
import { UserProfileModal } from './components/UserProfileModal';

const USER_STATS_KEY = 'codemaster_user_stats_v1';
const THEME_KEY = 'codemaster_theme_v1';

const INITIAL_USER_STATS: UserStats = {
  userName: 'Estudiante',
  streakDays: 3,
  lastActiveDate: new Date().toISOString(),
  totalTimeSpentMinutes: 45,
  overallScore: 98,
  coursesProgress: {
    cpp: { courseId: 'cpp', currentLessonId: 1, completedLessonIds: [], lessonProgressMap: {}, certificateEarned: false },
    python: { courseId: 'python', currentLessonId: 1, completedLessonIds: [], lessonProgressMap: {}, certificateEarned: false },
    javascript: { courseId: 'javascript', currentLessonId: 1, completedLessonIds: [], lessonProgressMap: {}, certificateEarned: false },
    java: { courseId: 'java', currentLessonId: 1, completedLessonIds: [], lessonProgressMap: {}, certificateEarned: false },
    nodejs: { courseId: 'nodejs', currentLessonId: 1, completedLessonIds: [], lessonProgressMap: {}, certificateEarned: false },
    rust: { courseId: 'rust', currentLessonId: 1, completedLessonIds: [], lessonProgressMap: {}, certificateEarned: false },
    sql: { courseId: 'sql', currentLessonId: 1, completedLessonIds: [], lessonProgressMap: {}, certificateEarned: false },
    html_css: { courseId: 'html_css', currentLessonId: 1, completedLessonIds: [], lessonProgressMap: {}, certificateEarned: false }
  }
};

export function App() {
  const [currentView, setCurrentView] = useState<'catalog' | 'course' | 'playground' | 'profile'>('catalog');
  const [activeCourseId, setActiveCourseId] = useState<LanguageId | null>(null);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, JSON.stringify(darkMode));
    } catch (e) {
      console.warn('Theme save error:', e);
    }
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const [userStats, setUserStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(USER_STATS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    return INITIAL_USER_STATS;
  });

  // Save progress changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(USER_STATS_KEY, JSON.stringify(userStats));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [userStats]);

  const handleNavigate = (
    view: 'catalog' | 'course' | 'playground' | 'profile',
    courseId?: LanguageId
  ) => {
    if (view === 'course' && courseId) {
      setActiveCourseId(courseId);
    }
    setCurrentView(view);
  };

  const handleSelectCourse = (courseId: LanguageId) => {
    setActiveCourseId(courseId);
    setCurrentView('course');
  };

  const handleUpdateProgress = (
    courseId: LanguageId,
    lessonId: number,
    userCode: string,
    passed: boolean
  ) => {
    setUserStats((prev) => {
      const currentCourseProgress = prev.coursesProgress[courseId] || {
        courseId,
        currentLessonId: 1,
        completedLessonIds: [],
        lessonProgressMap: {},
        certificateEarned: false
      };

      const newCompletedList = currentCourseProgress.completedLessonIds.includes(lessonId)
        ? currentCourseProgress.completedLessonIds
        : [...currentCourseProgress.completedLessonIds, lessonId];

      const course = COURSES[courseId];
      const isFinished = newCompletedList.length >= course.totalLessons;
      const nextLessonId = Math.min(lessonId + 1, course.totalLessons);

      return {
        ...prev,
        coursesProgress: {
          ...prev.coursesProgress,
          [courseId]: {
            ...currentCourseProgress,
            currentLessonId: nextLessonId,
            completedLessonIds: newCompletedList,
            certificateEarned: isFinished || currentCourseProgress.certificateEarned,
            certificateDate: isFinished && !currentCourseProgress.certificateDate
              ? new Date().toLocaleDateString('es-ES')
              : currentCourseProgress.certificateDate,
            certificateCode: isFinished && !currentCourseProgress.certificateCode
              ? `CM-${courseId.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`
              : currentCourseProgress.certificateCode,
            lessonProgressMap: {
              ...currentCourseProgress.lessonProgressMap,
              [lessonId]: {
                lessonId,
                completed: passed,
                userCode,
                score: 100
              }
            }
          }
        }
      };
    });
  };

  const totalCertificatesCount = (Object.values(userStats.coursesProgress) as CourseProgress[]).filter(
    (p) => p?.certificateEarned
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white transition-colors duration-200">
      <Header
        currentView={currentView}
        activeCourseId={activeCourseId}
        onNavigate={handleNavigate}
        streakDays={userStats.streakDays}
        userName={userStats.userName}
        totalCertificatesCount={totalCertificatesCount}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main className="flex-1">
        {currentView === 'catalog' && (
          <CourseCatalog userStats={userStats} onSelectCourse={handleSelectCourse} />
        )}

        {currentView === 'course' && activeCourseId && COURSES[activeCourseId] && (
          <CourseView
            course={COURSES[activeCourseId]}
            userStats={userStats}
            onUpdateProgress={handleUpdateProgress}
            onBackToCatalog={() => setCurrentView('catalog')}
          />
        )}

        {currentView === 'playground' && <FreePlayground />}

        {currentView === 'profile' && (
          <UserProfileModal
            userStats={userStats}
            onUpdateUserName={(newName) => setUserStats(prev => ({ ...prev, userName: newName }))}
            onNavigateToCourse={handleSelectCourse}
            onBackToCatalog={() => setCurrentView('catalog')}
          />
        )}
      </main>
    </div>
  );
}

export default App;
