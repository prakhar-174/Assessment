import React from 'react';

const StatCard = ({ title, value, unit, icon: Icon, colorClass }) => {
  return (
    <div className="rounded-2xl p-6 bg-panel border border-white/5 shadow-lg flex flex-col justify-between h-32 md:h-40 group hover:border-white/10 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-400">{title}</span>
        <div className={`p-2 rounded-lg bg-obsidian border border-white/5 ${colorClass}`}>
          <Icon size={18} />
        </div>
      </div>
      <div>
        <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">{value}</span>
        <span className="text-sm font-semibold text-slate-500 ml-1">{unit}</span>
      </div>
    </div>
  );
};

export default StatCard;
