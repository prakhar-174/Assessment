import React from 'react';

const SpiralBinding = () => {
  // Create rings for the binder
  const rings = Array.from({ length: 24 });

  return (
    <div className="absolute top-0 w-full left-0 right-0 -mt-2.5 flex justify-center z-20 pointer-events-none drop-shadow-md">
      {/* Central hanging mechanism / Nail Hole cutout */}
      <div className="absolute -top-6 left-1/2 -content-[''] transform -translate-x-1/2 w-4 h-6 border-2 border-slate-600 rounded-t-full border-b-0" />
      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#0b0c10] rounded-full shadow-inner" />
      
      <div className="flex w-full justify-between px-6 md:px-12">
        {rings.map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* The wire curve */}
            <div className="w-1.5 h-6 bg-gradient-to-b from-gray-400 via-gray-300 to-gray-500 rounded-full shadow-md z-10 border border-gray-600" 
                 style={{ boxShadow: "inset 1px 0px 1px rgba(255,255,255,0.8), inset -1px 0px 1px rgba(0,0,0,0.4), 0 2px 2px rgba(0,0,0,0.8)" }} />
            {/* The punch holes on the paper container */}
            <div className="w-2.5 h-2.5 bg-[#0b0c10] rounded-full -mt-2 shadow-inner border border-slate-800" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpiralBinding;
