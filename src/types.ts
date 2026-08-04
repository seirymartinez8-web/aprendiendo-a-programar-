export type DifficultyLevel = 'Básico' | 'Medio' | 'Avanzado';

export type LanguageId = 
  | 'cpp' 
  | 'python' 
  | 'javascript' 
  | 'java' 
  | 'nodejs' 
  | 'rust' 
  | 'sql' 
  | 'html_css';

export interface TestCase {
  id: string;
  input?: string;
  expectedOutput: string;
  description: string;
}

export interface PracticalExercise {
  id: string;
  instruction: string;
  starterCode: string;
  solutionCode: string;
  testCases: TestCase[];
  hint?: string;
}

export interface Lesson {
  id: number;
  title: string;
  level: DifficultyLevel;
  durationMinutes: number;
  summary: string;
  theoryMarkdown: string;
  codeExamples: { title: string; code: string; explanation: string }[];
  exercise: PracticalExercise;
}

export interface Course {
  id: LanguageId;
  title: string;
  iconName: string;
  description: string;
  color: string;
  badgeBg: string;
  totalLessons: number; // Between 15 and 20
  lessons: Lesson[];
  prerequisites: string[];
  skillsGained: string[];
}

export interface LessonProgress {
  completed: boolean;
  userCode: string;
  score: number; // 0 - 100
  completedAt?: string;
  attempts: number;
}

export interface CourseProgress {
  courseId: LanguageId;
  currentLessonId: number;
  completedLessonIds: number[];
  lessonProgressMap: Record<number, LessonProgress>;
  certificateEarned: boolean;
  certificateDate?: string;
  certificateCode?: string;
}

export interface UserStats {
  userName: string;
  totalTimeSpentMinutes: number;
  streakDays: number;
  lastActiveDate: string;
  overallScore: number;
  coursesProgress: Record<LanguageId, CourseProgress>;
}

export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTimeMs?: number;
  testResults?: {
    testCaseId: string;
    passed: boolean;
    actualOutput: string;
    expectedOutput: string;
    description: string;
  }[];
}

export interface CourseKardexItem {
  courseId: LanguageId;
  courseTitle: string;
  completedLessons: number;
  totalLessons: number;
  progressPercent: number;
  status: 'COMPLETADO' | 'EN CURSO' | 'NO INICIADO';
  grade: number;
}

export interface KardexData {
  studentName: string;
  studentId: string;
  issueDate: string;
  overallGpa: number; // 0-100
  totalLessonsCompleted: number;
  totalLessonsInProgram: number;
  totalHoursStudied: number;
  streakDays: number;
  certificatesEarnedCount: number;
  courses: CourseKardexItem[];
}

export interface CertificateData {
  studentName: string;
  courseTitle: string;
  languageId: LanguageId;
  issueDate: string;
  certificateCode: string;
  grade: number;
  hoursCompleted: number;
}

export interface GradeReportData {
  studentName: string;
  courseTitle: string;
  languageId: LanguageId;
  overallGrade: number; // 0-100
  basicLevelGrade: number;
  mediumLevelGrade: number;
  advancedLevelGrade: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
  totalAttempts: number;
  skillsMastered: string[];
  issueDate: string;
}
