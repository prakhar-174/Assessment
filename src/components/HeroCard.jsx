import React from 'react';
import { format } from 'date-fns';

const HeroCard = ({ currentMonth }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden bg-panel border w-full border-white/10 h-64 md:h-full flex flex-col justify-end group shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522210515152-4fc461eed79f?w=800&q=80)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/40 to-transparent" />

      {/* Oversized Month Text Overlay */}
      <div className="relative z-10 p-6 md:p-8">
        <div className="text-coral text-sm font-semibold tracking-widest uppercase mb-1 drop-shadow-md">Curated Schedule</div>
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter drop-shadow-lg">
          {format(currentMonth, 'MMMM').toUpperCase()} <br className="hidden md:block"/>
          <span className="font-light text-slate-300">{format(currentMonth, 'yyyy')}</span>
        </h1>
      </div>
    </div>
  );
};

export default HeroCard;
