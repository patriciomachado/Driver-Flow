
import React, { useState, useEffect } from 'react';
import { Calendar, Filter, Fuel, Coins, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const LogsHistory: React.FC<{ user: any }> = ({ user }) => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const { data, error } = await supabase
      .from('daily_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('logged_at', { ascending: false });

    if (!error && data) setLogs(data);
    setLoading(false);
  };

  if (loading) return (
    <div className="h-full flex flex-col items-center justify-center text-slate-500">
      <Loader2 className="animate-spin mb-4" size={32} />
      <span>Sincronizando registros...</span>
    </div>
  );

  return (
    <div className="p-6 pb-32 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-white">Histórico</h2>
        <button className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-400">
          <Filter size={20} />
        </button>
      </div>

      <div className="space-y-6">
        {logs.length === 0 ? (
          <div className="text-center py-12 text-slate-600 font-bold">
            Nenhum registro encontrado no Supabase.
          </div>
        ) : logs.map((log) => (
          <div key={log.id} className="group">
            <div className="flex items-center gap-3 mb-3">
              <Calendar size={14} className="text-neon-green" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                {new Date(log.logged_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', weekday: 'long' })}
              </span>
            </div>
            
            <div className="bg-slate-900/50 p-6 rounded-[2.5rem] border border-slate-800/50 hover:border-slate-700 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-black text-white">R$ {(log.earnings - log.fuel_cost).toFixed(2)}</h3>
                  <p className="text-[10px] font-black text-neon-green uppercase tracking-tighter">Lucro Líquido</p>
                </div>
                <div className="px-3 py-1 bg-slate-800 rounded-full">
                   <span className="text-[10px] font-bold text-slate-400">{log.app_name}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/50">
                <div className="flex items-center gap-2">
                  <Coins size={14} className="text-slate-500" />
                  <span className="text-xs font-bold text-slate-300">R$ {log.earnings.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Fuel size={14} className="text-slate-500" />
                  <span className="text-xs font-bold text-slate-300">R$ {log.fuel_cost.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogsHistory;
