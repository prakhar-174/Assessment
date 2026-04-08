import React, { useState } from 'react';
import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  eachDayOfInterval, isSameMonth, isSameDay, isWithinInterval,
  isBefore, isToday, format
} from 'date-fns';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CuratedSchedule = ({ currentMonth, selection, onSelectionChange, onAppendNote, successGlowDates }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInput, setModalInput] = useState('');

  const handleDateClick = (day) => {
    if (!isSameMonth(day, currentMonth)) return; 

    const newSelection = (() => {
      const { start, end } = selection;
      if (start && end) return { start: day, end: null };
      if (start && !end) {
        if (isSameDay(day, start)) return { start: null, end: null };
        if (isBefore(day, start)) return { start: day, end: start };
        return { start, end: day };
      }
      return { start: day, end: null };
    })();
    onSelectionChange(newSelection);
  };

  const handleFabClick = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    if (!modalInput.trim()) return;

    // Determine the string representation of dates
    const { start, end } = selection;
    let dateStr = '';
    let involvedDates = [];

    if (start && end) {
      if (isSameMonth(start, end)) {
        dateStr = `${format(start, 'MMM d')}-${format(end, 'd')}`;
      } else {
        dateStr = `${format(start, 'MMM d')} - ${format(end, 'MMM d')}`;
      }
      involvedDates = eachDayOfInterval({ start, end });
    } else if (start && !end) {
      dateStr = format(start, 'MMM d');
      involvedDates = [start];
    } else {
      dateStr = format(new Date(), 'MMM d'); // default today
      involvedDates = [new Date()];
    }

    onAppendNote(dateStr, modalInput, involvedDates);
    setModalInput('');
    setIsModalOpen(false);
  };

  const monthStart = startOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(endOfMonth(monthStart));
  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="rounded-2xl p-6 md:p-8 bg-[#1f2833] border border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.4)] relative flex flex-col h-full w-full overflow-hidden">
      <h2 className="text-xl font-bold text-white mb-6 z-10 relative">Curated Schedule</h2>

      <div className="flex-1 w-full mx-auto relative group z-10">
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
            const hasEventDot = !isOutside && (dayNum === 15 || dayNum === 22);

            // Determine if this exact day is in the "success glow" array
            const isGlowing = successGlowDates.some(gDate => isSameDay(gDate, day));

            let dayClasses = "relative aspect-square w-full min-h-[48px] max-w-[60px] md:max-w-[70px] mx-auto rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-300 cursor-pointer ";
            
            if (isOutside) {
              dayClasses += "text-slate-700 opacity-50 cursor-default ";
            } else if (isGlowing) {
              dayClasses += "bg-emerald-500 text-white font-bold shadow-[0_0_20px_rgba(16,185,129,0.8)] scale-110 z-20 ";
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
                    className={`absolute h-[60%] top-1/2 -translate-y-1/2 ${isGlowing ? 'bg-emerald-500/20' : 'bg-coral/10'} z-0 transition-colors duration-300
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
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9, rotate: 90 }}
          onClick={handleFabClick}
          className="absolute -bottom-2 md:-bottom-4 -right-2 md:-right-4 w-14 h-14 bg-coral text-white rounded-full flex items-center justify-center shadow-[0_5px_20px_rgba(255,107,107,0.5)] z-20 outline-none" 
          aria-label="New Curated Entry"
        >
          <Plus size={24} />
        </motion.button>
      </div>

      {/* Inline Modal (Glassmorphism layer via AnimatePresence) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-30 bg-obsidian/60 backdrop-blur-md rounded-2xl flex items-center justify-center p-6"
          >
            <div className="bg-[#1f2833] border border-white/10 shadow-2xl rounded-xl p-6 w-full max-w-sm relative">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-lg font-bold text-white mb-2 tracking-wide">Smart Entry</h3>
              
              {/* Context indicator for Dates being logged */}
              <p className="text-sm text-coral mb-4 font-medium">
                Logging: {
                  selection.start && selection.end 
                    ? `${format(selection.start, 'MMM d')} - ${format(selection.end, 'MMM d')}` 
                    : selection.start 
                      ? format(selection.start, 'MMM d') 
                      : format(new Date(), 'MMM d')
                }
              </p>
              
              <form onSubmit={handleModalSubmit}>
                <input
                  autoFocus
                  type="text"
                  value={modalInput}
                  onChange={(e) => setModalInput(e.target.value)}
                  placeholder="Schedule entry or memo..."
                  className="w-full bg-[#0b0c10] border border-white/10 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-coral transition-colors mb-4"
                />
                <button 
                  type="submit"
                  className="w-full bg-coral hover:bg-[#ff5252] text-white font-bold py-3 rounded-lg shadow-lg transition-colors flex items-center justify-center"
                >
                  Save Entry
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CuratedSchedule;
