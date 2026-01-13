
import React, { useState, useEffect } from 'react';
import { TrendingUp, Fuel, Coins, ChevronRight, Zap, Loader2, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const StatsCard = ({ title, value, icon: Icon, color, subtitle }: any) => (
  <div className="bg-slate-900/50 border border-slate-800/50 p-5 rounded-[2.5rem] flex flex-col gap-3 shadow-xl">
    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
        <Icon className={color.replace('bg-', 'text-')} size={24} />
      </div>
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{title}</span>
    </div>
    <div>
      <h3 className="text-2xl font-black text-white">{value}</h3>
      {subtitle && <p className="text-[10px] font-bold text-slate-500 uppercase mt-1 tracking-tighter">{subtitle}</p>}
    </div>
  </div>
);

const Dashboard: React.FC<{ user: any }> = ({ user }) => {
  const [stats, setStats] = useState({ earnings: 0, gas: 0, km: 0 });
  const [recentLogs, setRecentLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [user.id]);

  const fetchData = async () => {
    setLoading(true);
    const today = new Date().toISOString().split('T')[0];
    
    // Fetch stats for today
    const { data: todayData, error: statsError } = await supabase
      .from('daily_logs')
      .select('*')
      .eq('user_id', user.id)
      .gte('logged_at', today);

    if (!statsError && todayData) {
      const summary = todayData.reduce((acc, curr) => ({
        earnings: acc.earnings + (curr.earnings || 0),
        gas: acc.gas + (curr.fuel_cost || 0),
        km: acc.km + (curr.km_driven || 0)
      }), { earnings: 0, gas: 0, km: 0 });
      setStats(summary);
    }

    // Fetch 3 most recent logs
    const { data: recent, error: recentError } = await supabase
      .from('daily_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('logged_at', { ascending: false })
      .limit(3);

    if (!recentError && recent) {
      setRecentLogs(recent);
    }

    setLoading(false);
  };

  const profit = stats.earnings - stats.gas;
  const costPerKm = stats.km > 0 ? stats.gas / stats.km : 0;

  if (loading) return (
    <div className="p-6 flex flex-col items-center justify-center h-64 text-slate-500 gap-4">
      <Loader2 className="animate-spin" size={32} />
      <span className="font-bold text-sm uppercase tracking-widest">Sincronizando...</span>
    </div>
  );

  return (
    <div className="p-6 pt-2 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <p className="text-slate-500 font-bold text-sm">Painel Financeiro</p>
          <h2 className="text-3xl font-black text-white leading-tight">Olá, Piloto 🏎️</h2>
        </div>
        <div className="bg-neon-green/10 px-3 py-1.5 rounded-full border border-neon-green/20 flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-neon-green rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
          <span className="text-neon-green text-[10px] font-black uppercase tracking-widest">Online</span>
        </div>
      </div>

      {/* Main Profit Card */}
      <div className="bg-gradient-to-br from-neon-green to-emerald-600 p-8 rounded-[3rem] mb-6 shadow-[0_20px_50px_rgba(34,197,94,0.2)] relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-1">
            <span className="text-dark-bg/60 font-black text-[10px] uppercase tracking-[0.2em]">Lucro Líquido Hoje</span>
            <TrendingUp size={20} className="text-dark-bg/40" />
          </div>
          <h1 className="text-5xl font-black text-dark-bg tracking-tighter">
            R$ {profit.toFixed(2)}
          </h1>
          <div className="flex items-center gap-2 mt-4 bg-dark-bg/10 backdrop-blur-md w-fit px-4 py-2 rounded-2xl">
            <Zap size={14} className="text-dark-bg" />
            <span className="text-dark-bg font-bold text-xs">Seu desempenho está estável</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-20 -translate-y-20 blur-3xl transition-transform group-hover:scale-125"></div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <StatsCard 
          title="Ganhos" 
          value={`R$ ${stats.earnings.toFixed(2)}`} 
          icon={Coins} 
          color="bg-neon-purple"
          subtitle="Total Bruto"
        />
        <StatsCard 
          title="Gastos" 
          value={`R$ ${stats.gas.toFixed(2)}`} 
          icon={Fuel} 
          color="bg-rose-500"
          subtitle={`${stats.km}km Rodados`}
        />
      </div>

      <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-[2.5rem] mb-8 flex justify-between items-center">
        <div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.1em] mb-1">Custo Médio / KM</p>
          <h4 className="text-lg font-bold text-white">R$ {costPerKm.toFixed(2)}</h4>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700">
           <MapPin className="text-slate-400" size={20} />
        </div>
      </div>

      <section className="mb-10">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-extrabold text-white">Atividade Recente</h3>
          <button 
            onClick={() => navigate('/history')}
            className="text-neon-green text-xs font-black uppercase flex items-center gap-1"
          >
            Ver Tudo <ChevronRight size={14} />
          </button>
        </div>
        
        <div className="space-y-3">
          {recentLogs.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-slate-800 rounded-[2.5rem]">
               <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">Nenhum registro ainda</p>
               <p className="text-slate-700 text-[10px] mt-1">Toque no + para começar</p>
            </div>
          ) : (
            recentLogs.map((log) => (
              <div key={log.id} className="bg-slate-900/40 p-5 rounded-[2rem] border border-slate-800/30 flex items-center gap-4 active:scale-95 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-slate-800/80 flex items-center justify-center border border-slate-700/50 text-slate-400">
                  <span className="font-black text-xs uppercase">{log.app_name.substring(0,2)}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-100 text-sm">{log.app_name}</h4>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">
                    {new Date(log.logged_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-neon-green">+R$ {log.earnings.toFixed(2)}</p>
                  <p className="text-[10px] text-rose-500 font-bold uppercase">-R$ {log.fuel_cost.toFixed(2)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
