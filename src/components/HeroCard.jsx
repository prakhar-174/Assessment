import React from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

const MONTH_IMAGES = [
  'January.jpg', // Jan: Snowy mountain
  'moto.jpg', // Feb: Winter forest
  'March.jpg', // Mar: Spring buds
  'April.jpg', // Apr: Mountain climber
  'May.jpg', // May: Green valley
  'June.jpg', // Jun: Summer lake
  'July.jpg', // Jul: Sun-drenched peak
  'August.jpg', // Aug: Desert dunes
  'sept.jpg', // Sep: Autumn leaves
  'October.jpg', // Oct: Misty ridge
  'November.jpg', // Nov: First frost
  'December.jpg', // Dec: Northern lights
];

const HeroCard = ({ currentMonth }) => {
  const monthKey = currentMonth.toISOString().slice(0, 7);
  const monthIndex = currentMonth.getMonth(); // 0 - 11

  return (
    <div className="relative rounded-xl overflow-hidden bg-panel border-2 border-ink h-full flex flex-col justify-end group shadow-sm bg-[#562F00]">
      {/* Background Image mapped dynamically */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={monthIndex}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0.2 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${MONTH_IMAGES[monthIndex]})` }}
        />
      </AnimatePresence>

      {/* Warmer transparent gradient instead of dark obsidian */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2c1a0c]/90 via-[#2c1a0c]/30 to-transparent" />

      {/* Oversized Month Text Overlay with Micro-Animation */}
      <div className="relative z-10 p-3 md:p-6 pb-2 md:pb-4">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.h1 
            key={monthKey}
            initial={{ opacity: 0, y: 10, skewX: 5 }}
            animate={{ opacity: 1, y: 0, skewX: 0 }}
            exit={{ opacity: 0, y: -10, skewX: -5 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
            className="text-3xl md:text-6xl font-extrabold text-panel tracking-tight origin-left drop-shadow-md"
          >
            {format(currentMonth, 'MMMM').toUpperCase()} <br className="hidden md:block" />
            <span className="font-light text-peach">{format(currentMonth, 'yyyy')}</span>
          </motion.h1>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroCard;
