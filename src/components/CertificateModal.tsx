import React, { useEffect } from 'react';
import { Award, Download, X, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CertificateData } from '../types';
import { downloadCertificatePDF } from '../utils/pdfGenerator';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CertificateData;
  onOpenReport?: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  data,
  onOpenReport,
}) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.warn('Confetti error:', e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-amber-500/30 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl shadow-amber-500/10">
        
        {/* Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            <h2 className="text-lg font-bold text-slate-100">
              Certificado Oficial de Finalización
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Card Diploma View */}
        <div className="p-6 sm:p-10">
          <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-4 border-amber-500/40 rounded-2xl p-6 sm:p-10 text-center shadow-inner overflow-hidden">
            
            {/* Corner Decorative Accents */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-400" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-400" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-400" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-400" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-4">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>LOGRO ACADÉMICO VERIFICADO</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-wider mb-2">
              CERTIFICADO DE GRADUACIÓN
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 uppercase tracking-widest mb-6">
              CodeMaster Academy • Programa de Formación Profesional
            </p>

            <div className="text-xs sm:text-sm text-slate-300 mb-2">
              Se otorga el presente diploma a:
            </div>

            <div className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent my-3 py-1 border-b-2 border-amber-500/30 inline-block px-8">
              {data.studentName}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto my-4 leading-relaxed">
              Por haber completado satisfactoriamente el curso intensivo de{' '}
              <span className="text-blue-400 font-bold">{data.courseTitle}</span>, dominando los temas teóricos y prácticos desde el nivel básico hasta experto.
            </p>

            <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 my-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Calificación Promedio: <strong className="text-amber-300">{data.grade}/100</strong></span>
              <span className="mx-1">•</span>
              <span>Emisión: {data.issueDate}</span>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-500 font-mono">
              <span>Código: {data.certificateCode}</span>
              <span className="text-amber-400 font-sans font-bold">Firma Digital Verificada ✓</span>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {onOpenReport && (
              <button
                id="view-report-btn"
                onClick={onOpenReport}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <span>Ver Reporte de Notas y Aprendizaje</span>
              </button>
            )}

            <button
              id="download-cert-btn"
              onClick={() => downloadCertificatePDF(data)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Certificado (PDF)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
