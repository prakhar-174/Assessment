import React from 'react';
import { format } from 'date-fns';

const MonthlyIntentionsCard = ({ currentMonth, intentions, onChangeIntentions }) => {
  return (
    <div className="rounded-xl p-4 md:p-6 flex flex-col items-start bg-panel border-2 border-ink shadow-sm h-full relative overflow-hidden">

      <h3 className="text-base md:text-lg font-bold text-ink mb-1 tracking-wide z-10 uppercase">Monthly Intentions</h3>
      <p className="text-xs md:text-sm font-semibold text-coral mb-3 z-10">Focus areas for {format(currentMonth, 'MMMM')}</p>
      
      <div className="w-full flex-1 relative z-10 mt-1">
        {/* Repeating lines background for analog paper texture */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, var(--color-ink) 27px, var(--color-ink) 28px)",
            backgroundPosition: "0 0px"
          }}
        />
        <textarea
          value={intentions}
          onChange={(e) => onChangeIntentions(e.target.value)}
          className="w-full h-full bg-transparent border-none resize-none focus:outline-none text-ink placeholder-ink/40 leading-[28px] pt-[2px]"
          placeholder="Jot down your main themes or goals..."
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default MonthlyIntentionsCard;
