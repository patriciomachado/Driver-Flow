
import React, { useState } from 'react';
import { Sparkles, BrainCircuit, Lightbulb, TrendingDown, Target } from 'lucide-react';

const GeminiFinance: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const insights = [
    { title: "Gasto com Combustível", text: "Seu gasto subiu 5% nesta semana. Tente abastecer no posto X que está com promoção no app Shell Box.", icon: TrendingDown, color: "text-rose-400" },
    { title: "Meta de Ganhos", text: "Faltam apenas R$ 450,00 para bater sua meta semanal. O horário das 18h às 21h promete alta demanda hoje.", icon: Target, color: "text-neon-green" },
  ];

  return (
    <div className="p-6 pb-32 animate-in slide-in-from-right duration-500">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-neon-purple/20 border border-neon-purple/30 rounded-3xl flex items-center justify-center text-neon-purple">
          <BrainCircuit size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white">Insights IA</h2>
          <p className="text-xs text-neon-purple font-black uppercase tracking-widest">Powered by Gemini</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[3rem] border border-slate-700/50 shadow-2xl relative overflow-hidden">
          <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
            <Sparkles size={20} className="text-neon-purple" />
            Resumo Estratégico
          </h3>
          <p className="text-slate-400 leading-relaxed text-sm mb-6">
            Com base nos seus últimos 7 dias, você está sendo mais eficiente nas manhãs de terça-feira. 
            <strong> Sugestão:</strong> Concentre suas horas extras no período matutino para maximizar o lucro por km.
          </p>
          <button className="bg-neon-purple text-white px-6 py-3 rounded-2xl font-black text-sm shadow-xl shadow-neon-purple/20">
            Ver Análise Completa
          </button>
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/5 rounded-full blur-3xl"></div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {insights.map((item, idx) => (
            <div key={idx} className="bg-slate-900/40 p-6 rounded-[2.5rem] border border-slate-800/50 flex items-start gap-4">
              <div className={`p-3 rounded-2xl bg-slate-800 ${item.color}`}>
                <item.icon size={22} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-normal">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900/50 p-6 rounded-[2.5rem] border border-dashed border-slate-700 flex flex-col items-center justify-center gap-4 py-12">
           <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
             <Lightbulb size={24} />
           </div>
           <p className="text-slate-500 text-sm font-bold text-center">Quer saber como economizar no IPVA? Pergunte para a IA.</p>
           <button className="text-neon-green font-black uppercase text-xs tracking-widest bg-neon-green/10 px-6 py-3 rounded-full">Iniciar Chat</button>
        </div>
      </div>
    </div>
  );
};

export default GeminiFinance;
