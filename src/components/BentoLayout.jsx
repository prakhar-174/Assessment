import React, { useState, useEffect } from 'react';
import { addMonths, subMonths, format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import HeroCard from './HeroCard';
import MonthlyIntentionsCard from './MonthlyIntentionsCard';
import CuratedSchedule from './CuratedSchedule';
import SpiralBinding from './SpiralBinding';

const BentoLayout = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [selection, setSelection] = useState({ start: null, end: null });
  const [intentions, setIntentions] = useState('');
  const [successGlowDates, setSuccessGlowDates] = useState([]);

  const monthKey = format(currentMonth, 'yyyy-MM');

  useEffect(() => {
    const savedIntentions = localStorage.getItem(`intentions_${monthKey}`);
    setIntentions(savedIntentions || '');

    const savedDates = localStorage.getItem(`dates_${monthKey}`);
    if (savedDates) {
      try {
        const { start, end } = JSON.parse(savedDates);
        setSelection({
          start: start ? new Date(start) : null,
          end: end ? new Date(end) : null,
        });
      } catch (e) { console.error(e); }
    } else {
      setSelection({ start: null, end: null });
    }
  }, [monthKey]);

  const handleIntentionsChange = (val) => {
    setIntentions(val);
    localStorage.setItem(`intentions_${monthKey}`, val);
  };

  const handleSelectionChange = (newSelection) => {
    setSelection(newSelection);
    if (newSelection.start || newSelection.end) {
      localStorage.setItem(`dates_${monthKey}`, JSON.stringify({
        start: newSelection.start?.toISOString(),
        end: newSelection.end?.toISOString()
      }));
    } else {
      localStorage.removeItem(`dates_${monthKey}`);
    }
  };

  const handleAppendNote = (dateString, entryText, involvedDates) => {
    const newEntry = `[${dateString}]: ${entryText}`;
    const appended = intentions ? `${intentions}\n${newEntry}` : newEntry;
    handleIntentionsChange(appended);
    setSuccessGlowDates(involvedDates);
    setTimeout(() => setSuccessGlowDates([]), 1500);
  };

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="w-full h-full max-w-5xl mx-auto flex flex-col items-center">
      
      {/* Top Application Header (Minimal) */}
      <nav className="w-full flex items-center justify-between mb-4 md:mb-6 px-2 md:px-0 flex-shrink-0">
        <div className="text-xl font-bold tracking-tight text-panel flex items-center gap-2">
          Apex Calendar
        </div>
      </nav>

      {/* The Physical Wall Calendar Page Element */}
      <div className="relative w-full shadow-[0_15px_40px_rgba(30,16,0,0.5)] rounded-b-xl 
                      bg-panel border border-[#e6decc] flex-1 flex flex-col min-h-0
                      before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyIiBoZWlnaHQ9IjIiPgo8cmVjdCB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBmaWxsPSIjMmIyYjJiIiBmaWxsLW9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')] 
                      before:pointer-events-none before:z-0">
        
        {/* Physical Wire-O Spiral Binding */}
        <SpiralBinding />
        
        {/* Physical Page Edge / Navigation Bar */}
        <div className="pt-8 md:pt-10 pb-4 px-6 md:px-10 flex justify-between items-center border-b border-[#e6decc] relative z-10 flex-shrink-0">
           <span className="text-ink/60 font-medium text-xs md:text-sm tracking-widest uppercase">{format(currentMonth, 'yyyy')} Edition</span>
           
           <div className="flex space-x-2">
              <button
                onClick={handlePrevMonth}
                className="p-1.5 md:p-2 bg-[#f4ebd8] rounded-full hover:bg-[#e8ddc5] transition-all text-ink border border-[#d6ccb8] shadow-sm group"
                aria-label="Previous month"
              >
                <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-1.5 md:p-2 bg-[#f4ebd8] rounded-full hover:bg-[#e8ddc5] transition-all text-ink border border-[#d6ccb8] shadow-sm group"
                aria-label="Next month"
              >
                <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
        </div>

        {/* Modern Bento Grid Structure nested inside the page */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-6 w-full p-4 md:p-8 relative z-10 flex-1 min-h-0">
          
          {/* Top Row - Fixed/Flexible combo */}
          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 flex-shrink-0">
            <div className="md:col-span-8 h-48 md:h-56">
              <HeroCard currentMonth={currentMonth} />
            </div>
            <div className="md:col-span-4 h-48 md:h-56">
              <MonthlyIntentionsCard 
                currentMonth={currentMonth} 
                intentions={intentions}
                onChangeIntentions={handleIntentionsChange}
              />
            </div>
          </div>

          {/* Middle Row - takes remaining space */}
          <div className="md:col-span-12 flex-1 min-h-[300px]">
            <CuratedSchedule 
              currentMonth={currentMonth}
              selection={selection}
              onSelectionChange={handleSelectionChange}
              onAppendNote={handleAppendNote}
              successGlowDates={successGlowDates}
            />
          </div>

        </div>
        
        {/* Soft print drop shadow underlay */}
        <div className="absolute top-2 left-1 right-1 bottom-0 bg-[#3d2000] rounded-b-xl -z-10 shadow-lg translate-y-1"></div>
      </div>
    </div>
  );
};

export default BentoLayout;
