
import React from 'react';
import { XMarkIcon, CalendarIcon, MapPinIcon, FlagIcon } from '@heroicons/react/24/outline';

interface CreateTaskModalProps {
  onClose: () => void;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl p-8 animate-in slide-in-from-bottom duration-500">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Nova Tarefa</h2>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full text-slate-500 active:scale-90 transition-transform">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <div>
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Título do Job</label>
            <input 
              type="text" 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-800 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              placeholder="Ex: Reparo de Infraestrutura"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Prioridade</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 appearance-none focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                <option>Normal</option>
                <option>Alta</option>
                <option>Urgente</option>
              </select>
              <FlagIcon className="w-5 h-5 text-slate-400 absolute right-4 bottom-4 pointer-events-none" />
            </div>
            <div className="relative">
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Data</label>
              <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Localização</label>
            <div className="relative">
              <input 
                type="text" 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 pl-14"
                placeholder="Buscar endereço..."
              />
              <MapPinIcon className="w-6 h-6 text-indigo-500 absolute left-5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 px-6 rounded-2xl bg-slate-100 text-slate-600 font-bold active:scale-95 transition-all"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="flex-[2] py-4 px-6 rounded-2xl bg-indigo-600 text-white font-bold shadow-xl shadow-indigo-200 active:scale-95 transition-all"
            >
              Salvar Tarefa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
