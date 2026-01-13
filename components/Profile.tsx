
import React from 'react';
import { 
  LogOut, 
  ShieldCheck, 
  Bell, 
  Car, 
  HelpCircle,
  CreditCard,
  ChevronRight
} from 'lucide-react';
import { supabase } from '../lib/supabase';

const Profile: React.FC<{ user: any }> = ({ user }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const menu = [
    { label: 'Meu Veículo', icon: Car, info: 'Configurar' },
    { label: 'Pagamentos', icon: CreditCard, info: 'Gerenciar' },
    { label: 'Segurança', icon: ShieldCheck, info: 'Ativa' },
    { label: 'Notificações', icon: Bell, info: 'Configurar' },
  ];

  return (
    <div className="p-6 animate-in slide-in-from-left duration-500">
      <div className="flex flex-col items-center mb-10 pt-4">
        <div className="relative mb-6 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-green to-neon-purple rounded-[3.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
            className="relative w-32 h-32 rounded-[3rem] border-4 border-slate-900 shadow-2xl bg-slate-800" 
            alt="Profile" 
          />
          <div className="absolute -bottom-2 -right-2 bg-neon-green w-10 h-10 rounded-2xl border-4 border-slate-900 flex items-center justify-center text-dark-bg font-black shadow-lg">
            PRO
          </div>
        </div>
        <h2 className="text-2xl font-black text-white">{user.email?.split('@')[0]}</h2>
        <p className="text-slate-500 font-bold mt-1 text-sm">{user.email}</p>
      </div>

      <div className="bg-slate-900/50 border border-slate-800/50 rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl">
        {menu.map((item, idx) => (
          <button 
            key={idx}
            className={`w-full flex items-center gap-5 p-6 text-left active:bg-slate-800/50 transition-colors ${idx !== menu.length - 1 ? 'border-b border-slate-800/50' : ''}`}
          >
            <div className="w-12 h-12 bg-slate-800/80 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-700/50">
              <item.icon size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-white text-sm">{item.label}</h4>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{item.info}</p>
            </div>
            <ChevronRight size={16} className="text-slate-700" />
          </button>
        ))}
      </div>

      <button 
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-3 py-6 rounded-[2rem] bg-slate-900/50 border border-rose-900/30 text-rose-500 font-black text-sm active:bg-rose-900/20 transition-all mb-10 shadow-lg"
      >
        <LogOut size={20} />
        Encerrar Sessão
      </button>

      <div className="text-center space-y-2 opacity-20 mb-20">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-500">DriverFlow v1.0.0 Stable</p>
        <p className="text-[9px] font-bold text-slate-600 italic">Cloud Sync Enabled</p>
      </div>
    </div>
  );
};

export default Profile;
