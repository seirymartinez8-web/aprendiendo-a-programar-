import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Copy, Check, Terminal, Sparkles, Loader2, Bot, AlertCircle } from 'lucide-react';
import { ExecutionResult, LanguageId } from '../types';
import { COURSES } from '../data/coursesIndex';
import { runCode } from '../utils/codeRunners';
import { AITutorModal } from './AITutorModal';

const DEFAULT_SNIPPETS: Record<LanguageId, string> = {
  javascript: `// Compilador Libre - JavaScript
const mensaje = "¡Hola desde JavaScript!";
const numeros = [1, 2, 3, 4, 5];
const suma = numeros.reduce((acc, n) => acc + n, 0);

console.log(mensaje);
console.log("Suma del arreglo:", suma);`,

  python: `# Compilador Libre - Python
mensaje = "¡Hola desde Python!"
numeros = [10, 20, 30, 40]
promedio = sum(numeros) / len(numeros)

print(mensaje)
print(f"Promedio de la lista: {promedio}")`,

  cpp: `// Compilador Libre - C++
#include <iostream>
#include <vector>
#include <numeric>

using namespace std;

int main() {
    cout << "¡Hola desde C++!" << endl;
    vector<int> datos = {5, 10, 15};
    int total = 0;
    for(int n : datos) total += n;
    cout << "Suma total: " << total << endl;
    return 0;
}`,

  java: `// Compilador Libre - Java
public class Main {
    public static void main(String[] args) {
        System.out.println("¡Hola desde Java!");
        int a = 15;
        int b = 25;
        System.out.println("Suma: " + (a + b));
    }
}`,

  nodejs: `// Compilador Libre - Node.js
const fs = require('fs');
const os = require('os');

console.log("Proceso Node.js listo.");
console.log("Plataforma OS:", os.platform());`,

  rust: `// Compilador Libre - Rust
fn main() {
    println!("¡Hola desde Rust!");
    let mut contador = 10;
    contador += 5;
    println!("Contador final: {}", contador);
}`,

  sql: `-- Compilador Libre - SQL
SELECT id, nombre, precio 
FROM productos 
WHERE precio > 50 
ORDER BY precio DESC;`,

  html_css: `<!-- Compilador Libre - HTML y CSS -->
<div class="card">
    <h1>Mi Sitio Web</h1>
    <p>Probando estilos modernos con HTML5 y CSS3.</p>
</div>

<style>
.card {
    background: #1e293b;
    color: #f8fafc;
    padding: 24px;
    border-radius: 16px;
    font-family: sans-serif;
}
h1 { color: #38bdf8; margin-top: 0; }
</style>`
};

export const FreePlayground: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<LanguageId>('javascript');
  const [code, setCode] = useState<string>(DEFAULT_SNIPPETS['javascript']);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [copyPasteWarning, setCopyPasteWarning] = useState<string | null>(null);

  const handleCopyPasteBlock = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setCopyPasteWarning('No se puede Copiar Y Pegar :(');
    setTimeout(() => {
      setCopyPasteWarning(null);
    }, 2500);
  };

  const handleLanguageChange = (lang: LanguageId) => {
    setSelectedLang(lang);
    setCode(DEFAULT_SNIPPETS[lang]);
    setResult(null);
  };

  const handleRun = async () => {
    setIsRunning(true);
    const res = await runCode(selectedLang, code);
    setResult(res);
    setIsRunning(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Title Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Terminal className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              Compilador Libre Multilenguaje
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
              Experimenta y escribe código libremente en cualquiera de los 8 lenguajes sin restricciones.
            </p>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold hidden sm:inline">Lenguaje:</span>
            <select
              value={selectedLang}
              onChange={(e) => handleLanguageChange(e.target.value as LanguageId)}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-bold rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-xs cursor-pointer"
            >
              {Object.values(COURSES).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Editor & Output Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Code Editor Panel */}
          <div className="bg-[#1e293b] rounded-3xl flex flex-col h-[520px] overflow-hidden shadow-2xl relative border-4 border-slate-800">
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

            {/* Toolbar */}
            <div className="px-4 py-2.5 bg-slate-800/50 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>

              <span className="text-xs font-mono text-slate-400 px-2 py-0.5 border border-slate-700 rounded">
                main.{selectedLang === 'python' ? 'py' : selectedLang === 'cpp' ? 'cpp' : selectedLang === 'rust' ? 'rs' : selectedLang === 'java' ? 'java' : selectedLang === 'sql' ? 'sql' : selectedLang === 'html_css' ? 'html' : 'js'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCode(DEFAULT_SNIPPETS[selectedLang])}
                  title="Reiniciar plantilla"
                  className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleCopy}
                  title="Copiar código"
                  className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-700 rounded-lg transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => setIsAIOpen(true)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Bot className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Ayuda IA</span>
                </button>
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 active:scale-95 transition-all"
                >
                  {isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                  <span>Ejecutar</span>
                </button>
              </div>
            </div>

            {/* Textarea */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onPaste={handleCopyPasteBlock}
              onCopy={handleCopyPasteBlock}
              onCut={handleCopyPasteBlock}
              className="flex-1 w-full p-4 bg-[#1e293b] font-mono text-xs sm:text-sm text-slate-100 focus:outline-none resize-none leading-relaxed"
              spellCheck={false}
            />
          </div>

          {/* Terminal / Preview Panel */}
          <div className="bg-[#1e293b] rounded-3xl flex flex-col h-[520px] overflow-hidden shadow-2xl relative border-4 border-slate-800">
            <div className="px-4 py-2.5 bg-slate-800/50 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Consola de Salida
                </span>
              </div>
              {result?.executionTimeMs !== undefined && (
                <span className="text-[11px] text-slate-400 font-mono">
                  {result.executionTimeMs}ms
                </span>
              )}
            </div>

            <div className="flex-1 p-4 bg-black/30 border-l border-slate-700 font-mono text-xs sm:text-sm text-slate-200 overflow-y-auto">
              {isRunning ? (
                <div className="flex items-center gap-2 text-slate-400 py-4 font-sans">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                  <span>Compilando y ejecutando...</span>
                </div>
              ) : selectedLang === 'html_css' ? (
                <iframe
                  srcDoc={code}
                  title="HTML Preview"
                  className="w-full h-full border-0 bg-white rounded-xl"
                />
              ) : result ? (
                <div className="space-y-2">
                  {result.error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs font-sans">
                      {result.error}
                    </div>
                  )}
                  <pre className="whitespace-pre-wrap leading-relaxed text-slate-100 font-mono">
                    {result.output || '(Ejecutado sin salida)'}
                  </pre>
                </div>
              ) : (
                <div className="text-slate-400 italic py-4 font-sans">
                  Presiona &quot;Ejecutar&quot; para ver la salida del compilador...
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      <AITutorModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        courseTitle={COURSES[selectedLang].title}
        lessonTitle="Compilador Libre"
        currentCode={code}
        lastError={result?.error}
      />
    </div>
  );
};
