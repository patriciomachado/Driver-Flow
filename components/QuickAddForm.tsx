
import React, { useState } from 'react';
import { X, Check, Map, Fuel, DollarSign, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface QuickAddFormProps {
  user: any;
  onClose: () => void;
}

const QuickAddForm: React.FC<QuickAddFormProps> = ({ user, onClose }) => {
  const [app, setApp] = useState('Uber');
  const [km, setKm] = useState('');
  const [earnings, setEarnings] = useState('');
  const [expenses, setExpenses] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('daily_logs').insert({
        user_id: user.id,
        km_driven: parseFloat(km) || 0,
        earnings: parseFloat(earnings) || 0,
        fuel_cost: parseFloat(expenses) || 0,
        app_name: app,
        logged_at: new Date().toISOString()
      });

      if (error) throw error;
      onClose();
    } catch (err: any) {
      alert("Erro ao salvar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const apps = ['Uber', '99', 'Indriver', 'Outro'];

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg bg-dark-bg rounded-t-[3rem] sm:rounded-[3rem] shadow-2xl p-8 border-t border-slate-800 sm:border animate-in slide-in-from-bottom duration-500 h-[85vh] sm:h-auto overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-white">Novo Registro</h2>
          <button onClick={onClose} className="p-3 bg-slate-800 rounded-2xl text-slate-400">
            <X size={20} />
          </button>
        </div>

        <form className="space-y-8 pb-10" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Aplicativo</label>
            <div className="grid grid-cols-2 gap-3">
              {apps.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setApp(item)}
                  className={`py-4 px-6 rounded-2xl border-2 font-black text-sm transition-all flex items-center justify-center gap-2 ${app === item ? 'bg-neon-green/10 border-neon-green text-neon-green' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                >
                  {app === item && <Check size={16} />}
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative group">
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Ganhos (R$)</label>
              <div className="relative">
                <input 
                  type="number" step="0.01" inputMode="decimal" required
                  value={earnings} onChange={(e) => setEarnings(e.target.value)}
                  className="w-full bg-slate-900 border-2 border-slate-800 rounded-3xl py-5 px-14 text-white font-black text-xl focus:border-neon-green focus:outline-none placeholder:text-slate-700"
                  placeholder="0,00"
                />
                <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-neon-green" size={20} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Combustível (R$)</label>
                <div className="relative">
                  <input 
                    type="number" step="0.01" inputMode="decimal"
                    value={expenses} onChange={(e) => setExpenses(e.target.value)}
                    className="w-full bg-slate-900 border-2 border-slate-800 rounded-3xl py-5 pl-14 pr-6 text-white font-black text-xl focus:border-rose-500 focus:outline-none placeholder:text-slate-700"
                    placeholder="0,00"
                  />
                  <Fuel className="absolute left-6 top-1/2 -translate-y-1/2 text-rose-500" size={20} />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Km Rodados</label>
                <div className="relative">
                  <input 
                    type="number" inputMode="numeric"
                    value={km} onChange={(e) => setKm(e.target.value)}
                    className="w-full bg-slate-900 border-2 border-slate-800 rounded-3xl py-5 pl-14 pr-6 text-white font-black text-xl focus:border-indigo-500 focus:outline-none placeholder:text-slate-700"
                    placeholder="0"
                  />
                  <Map className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-500" size={20} />
                </div>
              </div>
            </div>
          </div>

          <button 
            disabled={loading}
            type="submit"
            className="w-full py-6 rounded-3xl bg-neon-green text-dark-bg font-black text-lg shadow-[0_15px_35px_rgba(34,197,94,0.3)] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : 'Salvar Registro'}
            {!loading && <Check size={24} strokeWidth={3} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuickAddForm;
