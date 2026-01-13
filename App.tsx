
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  History, 
  User, 
  Plus, 
  Settings
} from 'lucide-react';
import { supabase } from './lib/supabase';

import Dashboard from './components/Dashboard';
import LogsHistory from './components/LogsHistory';
import Profile from './components/Profile';
import QuickAddForm from './components/QuickAddForm';
import Auth from './components/Auth';

const AppContent: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return (
    <div className="h-screen bg-dark-bg flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-neon-green/20 border-t-neon-green rounded-full animate-spin"></div>
    </div>
  );

  if (!session) return <Auth />;

  const navItems = [
    { name: 'Home', path: '/', icon: LayoutDashboard },
    { name: 'Histórico', path: '/history', icon: History },
    { name: 'Perfil', path: '/profile', icon: User },
  ];

  return (
    <div className="flex flex-col h-screen bg-dark-bg overflow-hidden text-slate-100">
      {/* Top Header */}
      <header className="bg-dark-bg/80 backdrop-blur-xl border-b border-slate-800/50 px-6 py-5 flex justify-between items-center sticky top-0 z-20">
        <div onClick={() => navigate('/')} className="cursor-pointer">
          <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <div className="w-2 h-6 bg-neon-green rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
            Driver<span className="text-neon-green">Flow</span>
          </h1>
        </div>
        <button className="p-2.5 bg-slate-800/50 rounded-2xl text-slate-400 border border-slate-700/50 active:scale-90 transition-all">
          <Settings size={20} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-28">
        <div className="page-transition">
          <Routes>
            <Route path="/" element={<Dashboard user={session.user} />} />
            <Route path="/history" element={<LogsHistory user={session.user} />} />
            <Route path="/profile" element={<Profile user={session.user} />} />
          </Routes>
        </div>
      </main>

      {/* FAB - Floating Action Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 w-16 h-16 bg-neon-green text-dark-bg rounded-full shadow-[0_10px_30px_rgba(34,197,94,0.4)] flex items-center justify-center transform active:scale-95 hover:scale-105 transition-all z-30"
      >
        <Plus size={32} strokeWidth={3} />
      </button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-dark-bg/95 backdrop-blur-2xl border-t border-slate-800/50 px-4 py-3 pb-8 flex justify-around items-center z-20 safe-area-bottom">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1.5 transition-all w-24 ${isActive ? 'text-neon-green' : 'text-slate-500'}`}
            >
              <item.icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-60'}`}>{item.name}</span>
              {isActive && <div className="w-1.5 h-1.5 bg-neon-green rounded-full shadow-[0_0_8px_#22c55e]"></div>}
            </button>
          );
        })}
      </nav>

      {/* Modal for adding record */}
      {isModalOpen && <QuickAddForm user={session.user} onClose={() => {
        setIsModalOpen(false);
        // Refresh page data if on dashboard
        if (location.pathname === '/') window.location.reload();
      }} />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
