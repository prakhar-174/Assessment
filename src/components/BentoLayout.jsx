import React, { useState } from 'react';
import { addMonths, subMonths, format } from 'date-fns';
import { Mountain, Activity, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import HeroCard from './HeroCard';
import MonthlyIntentionsCard from './MonthlyIntentionsCard';
import CuratedSchedule from './CuratedSchedule';
import StatCard from './StatCard';
import SpiralBinding from './SpiralBinding';

const BentoLayout = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
      
      {/* Top Application Navigation (Floating UI above the physical calendar) */}
      <nav className="w-full flex items-center justify-between mb-8 px-2 md:px-0">
        <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <div className="w-6 h-6 rounded-md border-2 border-coral flex items-center justify-center">
            <div className="w-2 h-2 bg-coral rounded-sm" />
          </div>
          Obsidian<span className="font-light text-slate-400">HQ</span>
        </div>
        <div className="hidden md:flex flex-1 items-center justify-center space-x-12">
          <button className="text-sm font-medium text-white tracking-widest uppercase hover:text-coral transition-colors">Timeline</button>
          <button className="text-sm font-medium text-slate-400 tracking-widest uppercase hover:text-white transition-colors">Curations</button>
          <button className="text-sm font-medium text-slate-400 tracking-widest uppercase hover:text-white transition-colors">Archives</button>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600"></div>
      </nav>

      {/* The Physical Wall Calendar Page Element */}
      <div className="relative w-full shadow-[0_25px_60px_-12px_rgba(0,0,0,0.8)] rounded-b-xl 
                      bg-[#151c24] border border-white/5 pb-10
                      before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPgo8cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDE1Ii8+Cjwvc3ZnPg==')] 
                      before:pointer-events-none before:z-0
                      mt-4">
        
        {/* Physical Wire-O Spiral Binding */}
        <SpiralBinding />
        
        {/* Physical Page Edge / Navigation Bar */}
        <div className="pt-10 pb-6 px-6 md:px-10 flex justify-between items-center border-b border-white/5 relative z-10">
           <span className="text-slate-400 font-mono text-sm tracking-widest uppercase">{format(currentMonth, 'yyyy')} Edition</span>
           
           <div className="flex space-x-2">
              <button
                onClick={handlePrevMonth}
                className="p-2 bg-obsidian rounded-full hover:bg-slate-700 transition-all text-white border border-white/10 shadow-inner group"
                aria-label="Previous month"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2 bg-obsidian rounded-full hover:bg-slate-700 transition-all text-white border border-white/10 shadow-inner group"
                aria-label="Next month"
              >
                <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
        </div>

        {/* Modern Bento Grid Structure nested inside the page */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full p-6 md:p-10 relative z-10">
          
          {/* Top Row */}
          <div className="md:col-span-8 h-64 md:h-80">
            <HeroCard currentMonth={currentMonth} />
          </div>
          <div className="md:col-span-4 h-64 md:h-80">
            <MonthlyIntentionsCard currentMonth={currentMonth} />
          </div>

          {/* Middle Row */}
          <div className="md:col-span-12 min-h-[400px] md:min-h-[500px]">
            <CuratedSchedule currentMonth={currentMonth} />
          </div>

          {/* Bottom Row - Stats */}
          <div className="md:col-span-4">
            <StatCard 
              title="Vertical Gain" 
              value="14.2" 
              unit="k" 
              icon={Mountain} 
              colorClass="text-emerald-400" 
            />
          </div>
          <div className="md:col-span-4">
            <StatCard 
              title="Avg Heart Rate" 
              value="138" 
              inner={true}
              unit="bpm" 
              icon={Activity} 
              colorClass="text-coral" 
            />
          </div>
          <div className="md:col-span-4">
            <StatCard 
              title="Time Active" 
              value="42" 
              unit="hr" 
              icon={Clock} 
              colorClass="text-blue-400" 
            />
          </div>

        </div>
        
        {/* Deep drop shadow underlay for that physical thickness look */}
        <div className="absolute top-2 left-2 right-2 bottom-0 bg-[#0f141a] border border-white/5 rounded-b-xl -z-10 shadow-lg translate-y-1"></div>
      </div>
    </div>
  );
};

export default BentoLayout;
