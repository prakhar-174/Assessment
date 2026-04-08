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
      dateStr = format(new Date(), 'MMM d'); 
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

  const gridRowClass = days.length > 35 ? 'grid-rows-6' : 'grid-rows-5';

  return (
    <div className="rounded-xl p-2 md:p-6 bg-panel border-2 border-ink shadow-sm relative flex flex-col h-auto md:h-full w-full overflow-hidden">
      <h2 className="text-base md:text-xl font-extrabold text-ink mb-1 md:mb-2 z-10 relative flex-shrink-0 tracking-tight px-1 md:px-0">Curated Schedule</h2>

      {/* Grid container with restricted Max Width and centered layout */}
      <div className="w-full h-auto md:flex-1 max-w-lg md:max-w-2xl mx-auto relative group z-10 flex flex-col justify-center items-center md:min-h-0 pt-1 md:pt-2 pb-8 md:pb-12"> 
        <div className="grid grid-cols-7 mb-2 flex-shrink-0 w-full gap-x-2 md:gap-x-4">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-[10px] md:text-[12px] font-semibold text-ink/60 tracking-widest uppercase">
              {day}
            </div>
          ))}
        </div>
        
        {/* Compressed dense grid with landscape gap layout (wider horizontal, tighter vertical) */}
        <div className={`grid grid-cols-7 gap-x-2 gap-y-1 md:gap-x-4 md:gap-y-2 relative w-full h-auto md:flex-1 md:min-h-0 ${gridRowClass}`}>
          {days.map((day) => {
            const isOutside = !isSameMonth(day, monthStart);
            const { start, end } = selection;
            const isStart = start && isSameDay(day, start);
            const isEnd = end && isSameDay(day, end);
            const isBetween = start && end && isWithinInterval(day, { start, end }) && !isStart && !isEnd && !isOutside;
            const today = isToday(day);
            const dayNum = parseInt(format(day, 'd'), 10);
            const hasEventDot = !isOutside && (dayNum === 15 || dayNum === 22);

            const isGlowing = successGlowDates.some(gDate => isSameDay(gDate, day));

            // Dense typographical focus with perfectly snug, forced circular highlights
            let dayClasses = "relative w-8 h-8 md:w-10 md:h-10 mx-auto rounded-full flex items-center justify-center text-sm md:text-lg transition-colors duration-150 cursor-pointer border-2 z-10 ";
            
            if (isOutside) {
              dayClasses += "border-transparent text-ink/20 font-medium cursor-default ";
            } else if (isGlowing) {
              dayClasses += "bg-[#4ade80] border-[#4ade80] text-[#064e3b] font-extrabold z-20 ";
            } else if (isStart || isEnd) {
              dayClasses += "bg-coral border-coral text-ink font-extrabold z-20 ";
            } else if (isBetween) {
              dayClasses += "bg-peach border-peach text-ink font-extrabold z-10 ";
            } else {
              dayClasses += "border-transparent text-ink font-extrabold hover:bg-ink/5 ";
              if (today) dayClasses += "border-ink "; /* Kept thick border for today */
            }

            return (
              <div 
                key={day.toISOString()} 
                className="flex items-center justify-center relative min-h-0 w-full"
                onClick={() => handleDateClick(day)}
              >
                {/* Bridge highlight for 'in-between' - spans columns completely behind the circles */}
                {((isBetween || isStart || isEnd) && start && end && !isOutside) && (
                  <div 
                    className={`absolute h-6 md:h-8 top-1/2 -translate-y-1/2 ${isGlowing ? 'bg-[#4ade80]' : 'bg-peach'} z-0 transition-colors duration-150
                      ${isStart && !isSameDay(start, end) ? 'w-[calc(50%+4px)] md:w-[calc(50%+8px)] right-[-4px] md:right-[-8px]' : ''}
                      ${isEnd && !isSameDay(start, end) ? 'w-[calc(50%+4px)] md:w-[calc(50%+8px)] left-[-4px] md:left-[-8px]' : ''}
                      ${isBetween ? 'w-[calc(100%+8px)] md:w-[calc(100%+16px)] left-[-4px] md:left-[-8px]' : ''}
                      ${isSameDay(start, end) ? 'hidden' : ''}
                    `}
                  />
                )}
                
                <div className={dayClasses}>
                  {format(day, 'd')}
                </div>

                {/* Event Dots nudged safely down below the circle */}
                {hasEventDot && (
                  <div className="absolute -bottom-2 md:-bottom-3 left-1/2 transform -translate-x-1/2 w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-ink/40 group-hover:bg-ink transition-colors z-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Floating Action Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9, rotate: 90 }}
        onClick={handleFabClick}
        className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-12 h-12 md:w-14 md:h-14 bg-coral text-ink border-2 border-ink rounded-full flex items-center justify-center shadow-sm z-30 outline-none" 
        aria-label="New Curated Entry"
      >
        <Plus size={24} strokeWidth={3} />
      </motion.button>

      {/* Inline Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-40 bg-earth/95 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
          >
            <div className="bg-panel border-2 border-ink shadow-md rounded-xl p-5 w-full max-w-sm relative">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-ink/50 hover:text-ink cursor-pointer"
              >
                <X size={20} />
              </button>
              
              <h3 className="text-lg font-bold text-ink mb-1 tracking-wide uppercase text-center">Smart Entry</h3>
              
              <p className="text-xs text-coral font-bold mb-4 text-center">
                LOGGING // {
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
                  className="w-full bg-[#f4ebd8] border-2 border-ink rounded-lg p-3 text-ink placeholder-ink/40 focus:outline-none focus:bg-white transition-colors mb-4 font-bold"
                />
                <button 
                  type="submit"
                  className="w-full bg-coral border-2 border-ink hover:bg-[#ffad6e] text-ink font-bold tracking-widest uppercase py-3 rounded-lg shadow-sm transition-colors flex items-center justify-center"
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
