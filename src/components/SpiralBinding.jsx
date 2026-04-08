import React from 'react';

const SpiralBinding = () => {
  // Create rings for the binder
  const rings = Array.from({ length: 24 });

  return (
    <div className="absolute top-0 w-full left-0 right-0 -mt-2.5 flex justify-center z-20 pointer-events-none drop-shadow-sm">
      {/* Central hanging mechanism / Nail Hole cutout */}
      <div className="absolute -top-6 left-1/2 -content-[''] transform -translate-x-1/2 w-4 h-6 border-2 border-[#b09e86] rounded-t-full border-b-0" />
      <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-earth rounded-full shadow-inner" />
      
      <div className="flex w-full justify-between px-6 md:px-12">
        {rings.map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* The warm bronze/silver wire curve */}
            <div className="w-1.5 h-6 bg-gradient-to-b from-[#e3dcd1] via-[#b8b0a3] to-[#999083] rounded-full shadow-sm z-10 border border-[#8a8174]" 
                 style={{ boxShadow: "inset 1px 0px 1px rgba(255,255,255,0.6), inset -1px 0px 1px rgba(0,0,0,0.2), 0 3px 3px rgba(0,0,0,0.3)" }} />
            {/* The punch holes on the paper container */}
            <div className="w-2.5 h-2.5 bg-earth rounded-full -mt-2 shadow-inner border border-[#422300]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpiralBinding;
