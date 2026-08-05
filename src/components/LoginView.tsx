import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Code2, ShieldCheck, UserCheck, Lock, Mail, Key, ArrowRight, Sparkles, 
  CheckCircle2, BookOpen, GraduationCap, Users, ShieldAlert, Terminal, Award
} from 'lucide-react';
import { UserRole, AuthUser } from '../types';

interface LoginViewProps {
  onLogin: (user: AuthUser) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleDemoStudent = () => {
    onLogin({
      id: 'EST-1042-2026',
      name: 'Carlos Mendoza',
      email: 'estudiante@codemaster.edu',
      role: 'student',
    });
  };

  const handleDemoAdmin = () => {
    onLogin({
      id: 'ADM-0001-2026',
      name: 'Dra. Elena Ramos',
      email: 'admin@codemaster.edu',
      role: 'admin',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Por favor ingresa tu correo y contraseña.');
      return;
    }

    if (selectedRole === 'admin') {
      onLogin({
        id: 'ADM-0001-2026',
        name: email.split('@')[0] || 'Administrador',
        email,
        role: 'admin',
      });
    } else {
      onLogin({
        id: 'EST-' + Math.floor(1000 + Math.random() * 9000) + '-2026',
        name: email.split('@')[0] || 'Estudiante',
        email,
        role: 'student',
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Bar */}
      <header className="px-6 py-6 max-w-7xl mx-auto w-full flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white font-black">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-tight text-white">
              Code<span className="text-indigo-400">Master</span>
            </span>
            <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-widest -mt-1">
              Portal Institucional de Programación
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full text-xs text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Plataforma Académica v2.5</span>
        </div>
      </header>

      {/* Main Login Body */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10">
        <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          
          {/* Left Panel: Portal Presentation */}
          <div className="lg:col-span-5 p-6 sm:p-8 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 border-b lg:border-b-0 lg:border-r border-slate-800/80 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider mb-6">
                <ShieldCheck className="w-4 h-4" />
                <span>Autenticación Segura</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Bienvenido a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-purple-400">
                  CodeMaster Academy
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
                Selecciona tu perfil de acceso para ingresar a las herramientas de estudio o al centro de administración institucional.
              </p>

              <div className="mt-6 space-y-3.5">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/40 border border-slate-700/40">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Estudiante</h4>
                    <p className="text-[11px] text-slate-400">Acceso a cursos, compilador interactivo, kárdex y certificados.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-800/40 border border-slate-700/40">
                  <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 shrink-0">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Administrador</h4>
                    <p className="text-[11px] text-slate-400">Gestión de alumnos, temarios, auditoría de diplomas y métricas.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/60 text-[11px] text-slate-500 flex items-center justify-between">
              <span>© 2026 CodeMaster</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Servidor Activo
              </span>
            </div>
          </div>

          {/* Right Panel: Login Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-6">
            
            {/* Role Switcher Tabs */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                Selecciona Tipo de Perfil:
              </label>
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('student');
                    setEmail('estudiante@codemaster.edu');
                  }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    selectedRole === 'student'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Estudiante</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('admin');
                    setEmail('admin@codemaster.edu');
                  }}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    selectedRole === 'admin'
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Administrador</span>
                </button>
              </div>
            </div>

            {/* Quick Demo Access Bar */}
            <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs text-indigo-200 font-semibold">
                  Acceso Rápido Demo:
                </span>
              </div>

              {selectedRole === 'student' ? (
                <button
                  type="button"
                  onClick={handleDemoStudent}
                  className="w-full sm:w-auto px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Entrar como Estudiante</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleDemoAdmin}
                  className="w-full sm:w-auto px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Entrar como Admin</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-800 w-full" />
              <span className="bg-slate-900 px-3 text-[11px] font-bold text-slate-500 uppercase">
                O ingresa tus credenciales
              </span>
            </div>

            {/* Standard Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs font-bold">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Correo Electrónico Institucional
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={selectedRole === 'admin' ? 'admin@codemaster.edu' : 'estudiante@codemaster.edu'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 text-xs font-bold cursor-pointer"
                  >
                    {showPassword ? 'Ocultar' : 'Ver'}
                  </button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`w-full py-3 rounded-xl font-black text-xs text-white shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  selectedRole === 'admin'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-600/30'
                    : 'bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 shadow-indigo-600/30'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Ingresar como {selectedRole === 'admin' ? 'Administrador' : 'Estudiante'}</span>
              </motion.button>
            </form>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-600 border-t border-slate-900">
        CodeMaster Academy • Sistema Integral de Enseñanza de Programación
      </footer>

    </div>
  );
};
