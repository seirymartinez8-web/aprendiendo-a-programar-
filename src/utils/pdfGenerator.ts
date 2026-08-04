import jsPDF from 'jspdf';
import { CertificateData, GradeReportData, KardexData } from '../types';

/**
 * Generates and downloads the Official Completion Certificate PDF
 */
export function downloadCertificatePDF(data: CertificateData) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  // Background card
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, width, height, 'F');

  // Decorative Golden/Navy Borders
  doc.setDrawColor(217, 119, 6); // Amber border
  doc.setLineWidth(3);
  doc.rect(10, 10, width - 20, height - 20);

  doc.setDrawColor(30, 58, 138); // Deep Navy inner border
  doc.setLineWidth(1);
  doc.rect(14, 14, width - 28, height - 28);

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(26);
  doc.text('CERTIFICADO DE FINALIZACION', width / 2, 38, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139);
  doc.text('CODEMASTER ACADEMY • PROGRAMACION DESDE CERO A EXPERTO', width / 2, 46, { align: 'center' });

  // Divider line
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.5);
  doc.line(40, 52, width - 40, 52);

  // Certification Text
  doc.setFontSize(13);
  doc.setTextColor(71, 85, 105);
  doc.text('Se otorga el presente certificado a:', width / 2, 66, { align: 'center' });

  // Student Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(15, 23, 42);
  doc.text(data.studentName.toUpperCase(), width / 2, 82, { align: 'center' });

  // Underline for name
  doc.setDrawColor(217, 119, 6);
  doc.setLineWidth(1.5);
  doc.line(width / 2 - 50, 86, width / 2 + 50, 86);

  // Course Details
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(51, 65, 85);
  doc.text('Por haber completado con exito el programa de formacion profesional:', width / 2, 98, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(2, 132, 199);
  doc.text(`Curso Completo de ${data.courseTitle}`, width / 2, 112, { align: 'center' });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(12);
  doc.setTextColor(71, 85, 105);
  doc.text(`Nivel Alcanzado: De Cero a Experto • Calificacion Promedio: ${data.grade}/100`, width / 2, 122, { align: 'center' });

  // Footer Metadata
  const yBottom = 160;

  // Date
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text('FECHA DE EMISION', 40, yBottom);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(data.issueDate, 40, yBottom + 6);

  // Code
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(30, 41, 59);
  doc.text('CODIGO DE VERIFICACION', width - 40, yBottom, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(data.certificateCode, width - 40, yBottom + 6, { align: 'right' });

  // Center Badge / Stamp
  doc.setFillColor(217, 119, 6);
  doc.circle(width / 2, yBottom + 2, 12, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('EXCELENCIA', width / 2, yBottom + 1, { align: 'center' });
  doc.text('ACADEMICA', width / 2, yBottom + 5, { align: 'center' });

  const safeName = data.studentName.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Certificado_${data.languageId}_${safeName}.pdf`);
}

/**
 * Generates and downloads Individual Course Performance Report PDF
 */
export function downloadGradeReportPDF(data: GradeReportData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const width = doc.internal.pageSize.getWidth();

  // Header Banner
  doc.setFillColor(15, 23, 42); // Slate dark
  doc.rect(0, 0, width, 38, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('REPORTE ACADEMICO DE CURSO', 15, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184);
  doc.text('CodeMaster - Evaluacion Integral de Rendimiento', 15, 28);

  // Student & Course Summary Card
  let y = 48;
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(15, y, width - 30, 32, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text(`Estudiante: ${data.studentName}`, 22, y + 10);
  doc.text(`Curso: ${data.courseTitle}`, 22, y + 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(`Fecha del Reporte: ${data.issueDate}`, 22, y + 25);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(2, 132, 199);
  doc.text(`Nota Final: ${data.overallGrade}/100`, width - 25, y + 18, { align: 'right' });

  // Breakdown Table by Level
  y += 42;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('Desglose de Desempeno por Nivel de Dificultad', 15, y);

  y += 8;
  // Table Header
  doc.setFillColor(226, 232, 240);
  doc.rect(15, y, width - 30, 8, 'F');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  doc.text('Nivel de Dificultad', 20, y + 5.5);
  doc.text('Puntuacion', width - 25, y + 5.5, { align: 'right' });

  // Row 1: Básico
  y += 8;
  doc.rect(15, y, width - 30, 8);
  doc.setFont('helvetica', 'normal');
  doc.text('Nivel Basico (Sintaxis, Estructuras, Control de flujo)', 20, y + 5.5);
  doc.setFont('helvetica', 'bold');
  doc.text(`${data.basicLevelGrade}%`, width - 25, y + 5.5, { align: 'right' });

  // Row 2: Medio
  y += 8;
  doc.rect(15, y, width - 30, 8);
  doc.setFont('helvetica', 'normal');
  doc.text('Nivel Medio (POO, Colecciones, Modularidad)', 20, y + 5.5);
  doc.setFont('helvetica', 'bold');
  doc.text(`${data.mediumLevelGrade}%`, width - 25, y + 5.5, { align: 'right' });

  // Row 3: Avanzado
  y += 8;
  doc.rect(15, y, width - 30, 8);
  doc.setFont('helvetica', 'normal');
  doc.text('Nivel Avanzado (Asincronia, Memoria, Arquitectura)', 20, y + 5.5);
  doc.setFont('helvetica', 'bold');
  doc.text(`${data.advancedLevelGrade}%`, width - 25, y + 5.5, { align: 'right' });

  // Skills Mastered Section
  y += 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('Competencias y Habilidades Dominadas', 15, y);

  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);

  data.skillsMastered.forEach(skill => {
    doc.setFillColor(16, 185, 129); // Green check mark dot
    doc.circle(20, y + 3, 2, 'F');
    doc.text(skill, 26, y + 4.5);
    y += 7;
  });

  // Performance Statistics Summary
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('Metricas de Aprendizaje', 15, y);

  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  doc.text(`- Total de Lecciones Completadas: ${data.completedLessonsCount} / ${data.totalLessonsCount}`, 20, y + 2);
  doc.text(`- Total de Ejercicios y Pruebas Ejecutadas: ${data.totalAttempts}`, 20, y + 8);
  doc.text(`- Estado de Graduacion del Curso: COMPLETADO`, 20, y + 14);

  // Footer
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text('Documento oficial generado por la plataforma CodeMaster Academy.', width / 2, 280, { align: 'center' });

  const safeName = data.studentName.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Reporte_Notas_${data.languageId}_${safeName}.pdf`);
}

/**
 * Generates and downloads the Complete General Academic Kardex PDF
 */
export function downloadKardexPDF(data: KardexData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const width = doc.internal.pageSize.getWidth(); // 210mm
  const height = doc.internal.pageSize.getHeight(); // 297mm

  // Background
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, width, height, 'F');

  // Top Dark Header Banner
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.rect(0, 0, width, 40, 'F');

  // Gold accent line
  doc.setFillColor(217, 119, 6); // Amber 600
  doc.rect(0, 40, width, 2.5, 'F');

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('KARDEX ACADEMICO Y HISTORIAL DE ESTUDIOS', 15, 17);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(203, 213, 225);
  doc.text('CODEMASTER ACADEMY • ACADEMIA DE PROGRAMACION PROFESIONAL', 15, 25);
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('CONSTANCIA Y DOCUMENTO OFICIAL DE EVALUACIONES INTEGRALES', 15, 32);

  // Student Info Card Box
  let y = 50;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.roundedRect(15, y, width - 30, 36, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(`Estudiante: ${data.studentName}`, 20, y + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Matricula Oficial: ${data.studentId}`, 20, y + 18);
  doc.text(`Fecha de Emision: ${data.issueDate}`, 20, y + 25);
  doc.text(`Avance Global: ${data.totalLessonsCompleted} / ${data.totalLessonsInProgram} lecciones completadas`, 20, y + 31);

  // GPA Badge Box (Right Side)
  doc.setFillColor(238, 242, 255);
  doc.setDrawColor(199, 210, 254);
  doc.roundedRect(width - 70, y + 5, 50, 26, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(67, 56, 202);
  doc.text('PROMEDIO GENERAL (GPA)', width - 45, y + 12, { align: 'center' });

  doc.setFontSize(17);
  doc.setTextColor(79, 70, 229);
  doc.text(`${data.overallGpa} / 100`, width - 45, y + 23, { align: 'center' });

  // Course History Table
  y = 96;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text('Historial de Cursos y Especialidades', 15, y);

  y += 5;
  // Table Header Bar
  doc.setFillColor(30, 41, 59);
  doc.rect(15, y, width - 30, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('CODIGO', 19, y + 5.5);
  doc.text('ASIGNATURA / CURSO', 42, y + 5.5);
  doc.text('LECCIONES', 118, y + 5.5, { align: 'center' });
  doc.text('PROGRESO', 148, y + 5.5, { align: 'center' });
  doc.text('NOTA', 170, y + 5.5, { align: 'center' });
  doc.text('ESTATUS', width - 18, y + 5.5, { align: 'right' });

  // Rows
  y += 8;
  data.courses.forEach((item, index) => {
    const isEven = index % 2 === 0;
    if (isEven) {
      doc.setFillColor(248, 250, 252);
      doc.rect(15, y, width - 30, 9, 'F');
    }
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.2);
    doc.line(15, y + 9, width - 15, y + 9);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    doc.text(item.courseId.toUpperCase(), 19, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.text(item.courseTitle, 42, y + 6);

    doc.text(`${item.completedLessons} / ${item.totalLessons}`, 118, y + 6, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.text(`${item.progressPercent}%`, 148, y + 6, { align: 'center' });

    doc.text(`${item.grade}/100`, 170, y + 6, { align: 'center' });

    if (item.status === 'COMPLETADO') {
      doc.setTextColor(16, 185, 129); // Emerald
    } else if (item.status === 'EN CURSO') {
      doc.setTextColor(2, 132, 199); // Sky
    } else {
      doc.setTextColor(148, 163, 184); // Gray
    }
    doc.text(item.status, width - 18, y + 6, { align: 'right' });

    y += 9;
  });

  // Summary Metrics Card
  y += 6;
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(15, y, width - 30, 26, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 59);
  doc.text('RESUMEN DE DESEMPEÑO Y LOGROS', 20, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`- Racha Consecutiva de Estudio: ${data.streakDays} dias de actividad`, 20, y + 14);
  doc.text(`- Total Horas Invertidas en Practica: ${data.totalHoursStudied} horas`, 20, y + 20);
  doc.text(`- Certificados Oficiales Obtenidos: ${data.certificatesEarnedCount} diploma(s)`, 115, y + 14);
  doc.text(`- Condicion Academica: ALUMNO REGULAR ACTIVO`, 115, y + 20);

  // Signatures Section
  y += 32;
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.5);

  // Signature 1
  doc.line(25, y + 10, 80, y + 10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text('DIRECCION ACADEMICA', 52.5, y + 15, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('CodeMaster Educational Board', 52.5, y + 19, { align: 'center' });

  // Official Seal Stamp
  doc.setFillColor(217, 119, 6);
  doc.circle(width / 2, y + 8, 9, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(255, 255, 255);
  doc.text('OFICIAL', width / 2, y + 7, { align: 'center' });
  doc.text('VALIDADO', width / 2, y + 10.5, { align: 'center' });

  // Signature 2
  doc.line(130, y + 10, 185, y + 10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text('REGISTRO ESCOLAR', 157.5, y + 15, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Sistema Verificado CodeMaster', 157.5, y + 19, { align: 'center' });

  // Document Footer
  const docCode = `KDX-${data.studentId.replace(/[^a-zA-Z0-9]/g, '')}-${Date.now().toString().slice(-6)}`;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(`Documento Academico Verificable • Codigo de Seguro: ${docCode}`, width / 2, 287, { align: 'center' });

  const safeName = data.studentName.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`Kardex_Academico_${safeName}.pdf`);
}
