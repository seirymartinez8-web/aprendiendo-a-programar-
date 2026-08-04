import React, { useState } from 'react';
import { Bot, X, Sparkles, Send, Loader2, Lightbulb, Code, RefreshCw } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  lessonTitle: string;
  currentCode: string;
  lastError?: string;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  courseTitle,
  lessonTitle,
  currentCode,
  lastError,
}) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: `¡Hola! Soy tu **Tutor IA de Programación**. Estoy aquí para ayudarte con el curso de **${courseTitle}** (${lessonTitle}). ¿Tienes dudas sobre la teoría, quieres que te explique el código o analizamos algún error?`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = async (userPrompt?: string) => {
    const promptToSend = userPrompt || inputText;
    if (!promptToSend.trim() || isLoading) return;

    const newMessages = [...messages, { role: 'user' as const, text: promptToSend }];
    setMessages(newMessages);
    if (!userPrompt) setInputText('');
    setIsLoading(true);

    try {
      // Check if process.env.GEMINI_API_KEY is available or call local helper
      const ai = new GoogleGenAI({});
      const systemInstruction = `Eres un tutor experto en programación en español para el curso de ${courseTitle}. 
Tu objetivo es explicar conceptos de forma muy clara, alentadora y pedagógica para principiantes que aprenden desde cero.
Código actual del alumno:
\`\`\`
${currentCode}
\`\`\`
${lastError ? `Último error reportado: ${lastError}` : ''}
Responde de forma concisa, breve y clara.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: promptToSend,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const responseText = response.text || 'Entendido. ¿En qué más puedo ayudarte con tu código?';
      setMessages([...newMessages, { role: 'assistant', text: responseText }]);
    } catch (err) {
      console.warn('Gemini client call fallback:', err);
      // Fallback explanation if API key is not configured client-side
      let fallbackText = `Para el código actual de **${courseTitle}**:\n\n`;
      if (lastError) {
        fallbackText += `💡 **Diagnóstico de Error:**\n\`${lastError}\`\n\nRevisa las comillas, la sintaxis del lenguaje o las variables definidas en la lección.`;
      } else {
        fallbackText += `💡 **Consejo de Tutor:** Recuerda verificar que la salida por consola coincida exactamente con lo solicitado en el ejercicio para aprobar la lección.`;
      }
      setMessages([...newMessages, { role: 'assistant', text: fallbackText }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl h-[550px] flex flex-col shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100 transition-colors">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-100 dark:shadow-none">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                Tutor Inteligente de Código
                <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-bold px-2.5 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                  Gemini AI
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                {courseTitle} • {lessonTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-2 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Quick Actions */}
        <div className="px-6 py-3 bg-slate-50/50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => handleSendMessage('¿Puedes explicarme paso a paso qué hace mi código actual?')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold transition-colors whitespace-nowrap shadow-xs"
          >
            <Code className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Explicar mi código</span>
          </button>
          {lastError && (
            <button
              onClick={() => handleSendMessage(`¿Por qué ocurre este error: "${lastError}" y cómo lo soluciono?`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-bold transition-colors whitespace-nowrap shadow-xs"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Diagnosticar mi error</span>
            </button>
          )}
          <button
            onClick={() => handleSendMessage('Dame una pista sobre cómo resolver la consigna sin darme la solución directamente.')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold transition-colors whitespace-nowrap shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Dame una pista</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 font-sans text-xs sm:text-sm bg-white dark:bg-slate-900">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white font-medium rounded-br-xs shadow-md shadow-indigo-100 dark:shadow-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-bl-xs font-medium'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs py-2 font-semibold">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-600 dark:text-indigo-400" />
              <span>El Tutor IA está analizando tu consulta...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Haz una pregunta a tu tutor sobre este ejercicio..."
              className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium shadow-xs"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl transition-colors shadow-md shadow-indigo-100 dark:shadow-none"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );

};
