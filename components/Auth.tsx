
import React, { useState } from 'react';
import { Mail, Lock, LogIn, UserPlus, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert("Verifique seu email para confirmar o cadastro!");
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro na autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-8">
      <div className="mb-12 text-center">
        <div className="w-20 h-20 bg-neon-green/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border-2 border-neon-green/20">
          <div className="w-4 h-10 bg-neon-green rounded-full shadow-[0_0_20px_#22c55e]"></div>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tighter">Driver<span className="text-neon-green">Flow</span></h1>
        <p className="text-slate-500 font-bold mt-2">Gestão financeira para motoristas.</p>
      </div>

      <form onSubmit={handleAuth} className="w-full max-w-sm space-y-6">
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-2xl flex items-center gap-3 text-rose-500 text-sm font-bold animate-shake">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <div className="relative group">
            <input 
              type="email" 
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-2xl py-5 px-14 text-white font-bold focus:border-neon-green focus:outline-none transition-all placeholder:text-slate-700"
            />
            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-neon-green transition-colors" size={20} />
          </div>

          <div className="relative group">
            <input 
              type="password" 
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-2xl py-5 px-14 text-white font-bold focus:border-neon-green focus:outline-none transition-all placeholder:text-slate-700"
            />
            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-neon-green transition-colors" size={20} />
          </div>
        </div>

        <button 
          disabled={loading}
          type="submit"
          className="w-full py-5 rounded-[2rem] bg-neon-green text-dark-bg font-black text-lg shadow-[0_15px_30px_rgba(34,197,94,0.2)] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? 'Processando...' : (isLogin ? 'Entrar' : 'Cadastrar')}
          {!loading && (isLogin ? <LogIn size={20} /> : <UserPlus size={20} />)}
        </button>

        <div className="text-center">
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-500 font-bold text-sm hover:text-white transition-colors"
          >
            {isLogin ? 'Não tem conta? Registre-se' : 'Já tem conta? Faça login'}
          </button>
        </div>
      </form>
      
      <div className="mt-20 text-slate-700 text-[10px] font-black uppercase tracking-[0.3em]">
        Supabase Instance: kniqdsfz...
      </div>
    </div>
  );
};

export default Auth;
