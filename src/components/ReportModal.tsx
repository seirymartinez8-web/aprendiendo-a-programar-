import React from 'react';
import { FileText, Download, X, CheckCircle2, BarChart2, BookOpen, Award } from 'lucide-react';
import { GradeReportData } from '../types';
import { downloadGradeReportPDF } from '../utils/pdfGenerator';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: GradeReportData;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-slate-100">
              Reporte de Notas y Aprendizaje
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Report Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Summary Box */}
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 font-medium">Estudiante: {data.studentName}</span>
              <h3 className="text-xl font-bold text-slate-100 my-0.5">
                Curso de {data.courseTitle}
              </h3>
              <p className="text-xs text-slate-400">
                Fecha de Emisión: {data.issueDate} • {data.completedLessonsCount} / {data.totalLessonsCount} Lecciones
              </p>
            </div>
            <div className="text-right sm:border-l sm:border-slate-700 sm:pl-6">
              <span className="text-xs text-slate-400 font-medium block">Nota Final Promedio</span>
              <span className="text-3xl font-extrabold text-blue-400">{data.overallGrade}/100</span>
            </div>
          </div>

          {/* Performance breakdown by level */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-indigo-400" />
              <span>Desglose por Nivel de Dificultad</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4">
                <span className="text-xs font-semibold text-slate-400 block mb-1">Nivel Básico</span>
                <span className="text-2xl font-bold text-emerald-400">{data.basicLevelGrade}%</span>
                <span className="text-[11px] text-slate-400 block mt-1">Fundamentos & Sintaxis</span>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4">
                <span className="text-xs font-semibold text-slate-400 block mb-1">Nivel Medio</span>
                <span className="text-2xl font-bold text-blue-400">{data.mediumLevelGrade}%</span>
                <span className="text-[11px] text-slate-400 block mt-1">Estructuras & POO</span>
              </div>
              <div className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-4">
                <span className="text-xs font-semibold text-slate-400 block mb-1">Nivel Avanzado</span>
                <span className="text-2xl font-bold text-amber-400">{data.advancedLevelGrade}%</span>
                <span className="text-[11px] text-slate-400 block mt-1">Optimizaciones & Proyectos</span>
              </div>
            </div>
          </div>

          {/* Mastered Skills */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Competencias Adquiridas</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.skillsMastered.map((skill, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Download Action */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              id="download-report-btn"
              onClick={() => downloadGradeReportPDF(data)}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Reporte PDF</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
