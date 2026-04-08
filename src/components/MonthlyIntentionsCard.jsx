import React from 'react';
import { format } from 'date-fns';

const MonthlyIntentionsCard = ({ currentMonth, intentions, onChangeIntentions }) => {
  return (
    <div className="rounded-2xl p-6 md:p-8 flex flex-col items-start bg-[#1f2833] border border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.4)] h-64 md:h-full relative overflow-hidden">
      {/* Decorative Gradient Blob */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-coral/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0" />

      <h3 className="text-lg font-semibold text-white mb-1 tracking-wider z-10">Monthly Intentions</h3>
      <p className="text-sm font-medium text-coral mb-4 z-10">Focus areas for {format(currentMonth, 'MMMM')}</p>
      
      <div className="w-full flex-1 relative z-10 mt-2">
        {/* Repeating lines background for paper texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, #c5c6c7 31px, #c5c6c7 32px)",
            backgroundPosition: "0 0px"
          }}
        />
        <textarea
          value={intentions}
          onChange={(e) => onChangeIntentions(e.target.value)}
          className="w-full h-full bg-transparent border-none resize-none focus:outline-none text-slate-300 placeholder-slate-600/50 leading-[32px] pt-[2px]"
          placeholder="Jot down your main themes or goals for the month..."
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default MonthlyIntentionsCard;
