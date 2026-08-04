import { Course, LanguageId } from '../types';
import { cppCourse } from './cppCourse';
import { pythonCourse } from './pythonCourse';
import { jsCourse } from './jsCourse';
import { javaCourse } from './javaCourse';
import { nodeCourse } from './nodeCourse';
import { rustCourse } from './rustCourse';
import { sqlCourse } from './sqlCourse';
import { htmlCssCourse } from './htmlCssCourse';

export const COURSES: Record<LanguageId, Course> = {
  cpp: cppCourse,
  python: pythonCourse,
  javascript: jsCourse,
  java: javaCourse,
  nodejs: nodeCourse,
  rust: rustCourse,
  sql: sqlCourse,
  html_css: htmlCssCourse,
};

export const COURSES_LIST: Course[] = [
  cppCourse,
  pythonCourse,
  jsCourse,
  javaCourse,
  nodeCourse,
  rustCourse,
  sqlCourse,
  htmlCssCourse,
];
