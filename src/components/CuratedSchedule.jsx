import React, { useState, useEffect } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isWithinInterval,
  isBefore,
  isToday,
  format,
} from 'date-fns';
import { Plus } from 'lucide-react';

const CuratedSchedule = ({ currentMonth }) => {
  const [selection, setSelection] = useState({ start: null, end: null });
  const monthKey = format(currentMonth, 'yyyy-MM');

  // Load from local storage dynamically
  useEffect(() => {
    const saved = localStorage.getItem(`dates_${monthKey}`);
    if (saved) {
      try {
        const { start, end } = JSON.parse(saved);
        setSelection({
          start: start ? new Date(start) : null,
          end: end ? new Date(end) : null,
        });
      } catch (e) { console.error(e); }
    } else {
      setSelection({ start: null, end: null });
    }
  }, [monthKey]);

  // Save changes
  useEffect(() => {
    if (selection.start || selection.end) {
      localStorage.setItem(`dates_${monthKey}`, JSON.stringify({
        start: selection.start?.toISOString(),
        end: selection.end?.toISOString()
      }));
    } else {
      localStorage.removeItem(`dates_${monthKey}`);
    }
  }, [selection, monthKey]);

  const handleDateClick = (day) => {
    if (!isSameMonth(day, currentMonth)) return; // Only allow current month selections

    setSelection(prev => {
      if (prev.start && prev.end) return { start: day, end: null };
      if (prev.start && !prev.end) {
        if (isSameDay(day, prev.start)) return { start: null, end: null };
        if (isBefore(day, prev.start)) return { start: day, end: prev.start };
        return { ...prev, end: day };
      }
      return { start: day, end: null };
    });
  };

  const monthStart = startOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(endOfMonth(monthStart));
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="rounded-2xl p-6 md:p-8 bg-[#1f2833] border border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.4)] relative flex flex-col h-full w-full">
      {/* Header */}
      <h2 className="text-xl font-bold text-white mb-6">Curated Schedule</h2>

      {/* Grid */}
      <div className="flex-1 w-full mx-auto relative group">
        <div className="grid grid-cols-7 mb-4 gap-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-[10px] md:text-xs font-semibold text-slate-500 tracking-widest">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-y-3 gap-x-2 relative w-full h-[80%] place-content-start place-items-stretch">
          {days.map((day) => {
            const isOutside = !isSameMonth(day, monthStart);
            const { start, end } = selection;
            const isStart = start && isSameDay(day, start);
            const isEnd = end && isSameDay(day, end);
            const isBetween = start && end && isWithinInterval(day, { start, end }) && !isStart && !isEnd && !isOutside;
            const today = isToday(day);
            const dayNum = parseInt(format(day, 'd'), 10);
            
            // Visual mockup logic: Dot on the 15th and 22nd of the *active month* (and not outside days)
            const hasEventDot = !isOutside && (dayNum === 15 || dayNum === 22);

            let dayClasses = "relative aspect-square w-full min-h-[48px] max-w-[60px] md:max-w-[70px] mx-auto rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200 cursor-pointer ";
            
            if (isOutside) {
              dayClasses += "text-slate-700 opacity-50 cursor-default ";
            } else if (isStart || isEnd) {
              dayClasses += "bg-coral text-white font-bold shadow-[0_0_15px_rgba(255,107,107,0.6)] scale-105 z-10 ";
            } else if (isBetween) {
              dayClasses += "bg-coral/10 text-coral border border-coral/20 ";
            } else {
              dayClasses += "text-slate-300 hover:bg-white/5 hover:text-white ";
              if (today) dayClasses += "border border-coral/50 animate-pulse-slow ";
            }

            return (
              <div 
                key={day.toISOString()} 
                className="flex items-center justify-center relative"
                onClick={() => handleDateClick(day)}
              >
                {/* Bridge highlight for 'in-between' */}
                {((isBetween || isStart || isEnd) && start && end && !isOutside) && (
                  <div 
                    className={`absolute h-[60%] top-1/2 -translate-y-1/2 bg-coral/10 z-0
                      ${isStart && !isSameDay(start, end) ? 'w-1/2 right-0' : ''}
                      ${isEnd && !isSameDay(start, end) ? 'w-1/2 left-0' : ''}
                      ${isBetween ? 'w-full' : ''}
                      ${isSameDay(start, end) ? 'hidden' : ''}
                    `}
                  />
                )}
                
                <div className={dayClasses}>
                  {format(day, 'd')}
                  
                  {/* Event Dots */}
                  {hasEventDot && (
                    <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-coral transition-colors" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Action Button */}
        <button className="absolute -bottom-2 md:-bottom-4 -right-2 md:-right-4 w-14 h-14 bg-coral text-white rounded-full flex items-center justify-center shadow-[0_5px_20px_rgba(255,107,107,0.5)] hover:bg-[#ff5252] hover:scale-105 transition-all outline-none z-20" aria-label="New Curated Entry">
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
};

export default CuratedSchedule;
