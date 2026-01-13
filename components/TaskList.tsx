
import React, { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, MapPinIcon } from '@heroicons/react/24/outline';

const TaskList: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const tasks = [
    { id: 1, title: 'Troca de fiação central', client: 'Condomínio Solar', status: 'pending', priority: 'high', address: 'Av. Paulista, 1000' },
    { id: 2, title: 'Instalação Kit Solar', client: 'Residência Silva', status: 'in_progress', priority: 'medium', address: 'Rua Bela Cintra, 45' },
    { id: 3, title: 'Manutenção Preditiva', client: 'Hospital Santa Maria', status: 'completed', priority: 'urgent', address: 'Rua Itapeva, 202' },
    { id: 4, title: 'Vistoria Técnica', client: 'Office Tower', status: 'pending', priority: 'low', address: 'Al. Santos, 122' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-600';
      case 'in_progress': return 'bg-indigo-100 text-indigo-600';
      case 'pending': return 'bg-amber-100 text-amber-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-rose-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-amber-600';
      default: return 'text-slate-500';
    }
  };

  return (
    <div className="p-6 animate-in slide-in-from-right duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Tarefas</h2>
        <div className="flex gap-2">
          <button className="p-2 bg-white border border-slate-200 rounded-xl shadow-sm"><MagnifyingGlassIcon className="w-5 h-5 text-slate-500" /></button>
          <button className="p-2 bg-white border border-slate-200 rounded-xl shadow-sm"><FunnelIcon className="w-5 h-5 text-slate-500" /></button>
        </div>
      </div>

      <div className="flex gap-3 mb-6 overflow-x-auto no-scrollbar">
        {['Todas', 'Pendentes', 'Em progresso', 'Concluídas'].map((cat) => (
          <button 
            key={cat}
            onClick={() => setFilter(cat.toLowerCase())}
            className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all border ${filter === cat.toLowerCase() ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-500'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col gap-4 active:scale-[0.98] transition-transform">
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${getPriorityColor(task.priority)}`}>
                  Prioridade {task.priority}
                </span>
                <h3 className="text-lg font-bold text-slate-800 leading-tight mt-0.5">{task.title}</h3>
                <p className="text-sm text-slate-500 font-medium">{task.client}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusColor(task.status)}`}>
                {task.status === 'in_progress' ? 'Em progresso' : task.status}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-400">
              <MapPinIcon className="w-4 h-4" />
              <span className="text-xs font-medium">{task.address}</span>
            </div>

            <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
              <div className="flex -space-x-2">
                <img src="https://picsum.photos/32/32?random=1" className="w-8 h-8 rounded-full border-2 border-white" alt="avatar" />
                <img src="https://picsum.photos/32/32?random=2" className="w-8 h-8 rounded-full border-2 border-white" alt="avatar" />
              </div>
              <button className="text-indigo-600 font-bold text-sm bg-indigo-50 px-4 py-2 rounded-xl">Detalhes</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
