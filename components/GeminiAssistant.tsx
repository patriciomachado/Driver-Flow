
import React, { useState, useEffect } from 'react';
import { SparklesIcon, MicrophoneIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { analyzeTasks } from '../services/geminiService';

const GeminiAssistant: React.FC = () => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');

  const runAnalysis = async () => {
    setLoading(true);
    // Mock tasks for demonstration
    const mockTasks = [
      { title: 'Reparo de Fibra Óptica', status: 'pending', priority: 'high' },
      { title: 'Instalação de Roteador', status: 'completed', priority: 'medium' },
      { title: 'Visita Técnica Preventiva', status: 'pending', priority: 'low' },
    ];
    const result = await analyzeTasks(mockTasks);
    setAnalysis(result || "Análise indisponível.");
    setLoading(false);
  };

  useEffect(() => {
    runAnalysis();
  }, []);

  return (
    <div className="p-6 h-full flex flex-col animate-in slide-in-from-bottom duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center">
          <SparklesIcon className="w-6 h-6 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Assistente Gemini</h2>
          <p className="text-xs text-indigo-500 font-bold uppercase tracking-wider">Online & Inteligente</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar mb-4 space-y-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-48 space-y-4">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-slate-400 text-sm animate-pulse">Consultando Inteligência Artificial...</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
            {analysis}
          </div>
        )}

        <div className="bg-indigo-50 p-6 rounded-[2rem] border border-indigo-100">
          <h4 className="font-bold text-indigo-800 mb-2 flex items-center gap-2">
            <MicrophoneIcon className="w-5 h-5" /> Comando de Voz
          </h4>
          <p className="text-sm text-indigo-600/80 leading-snug">
            Diga algo como: "Criar uma tarefa urgente de reparo na Rua Augusta para amanhã as 10h".
          </p>
        </div>
      </div>

      <div className="relative">
        <input 
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Pergunte algo ou crie tarefa..."
          className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-6 pr-14 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-transform">
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default GeminiAssistant;
