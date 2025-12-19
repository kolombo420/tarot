
import React, { useState, useEffect } from 'react';

const MESSAGES = [
  "Перемешиваем нити судьбы...",
  "Настраиваемся на частоту космоса...",
  "Звезды выстраиваются в ряд...",
  "Считываем древние символы...",
  "Магия воплощается в образы..."
];

const LoadingScreen: React.FC = () => {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((prev) => (prev + 1) % MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a12] bg-opacity-95 backdrop-blur-xl">
      <div className="relative w-48 h-48 mb-12">
        {/* Animated Rings */}
        <div className="absolute inset-0 border-[1px] border-[#d4af3722] rounded-full animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute inset-4 border-[1px] border-double border-[#d4af3744] rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="text-6xl animate-pulse filter drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">🔮</div>
        </div>
        
        {/* Orbiting element */}
        <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 animate-[spin_6s_linear_infinite]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#d4af37] rounded-full blur-[2px]"></div>
        </div>
      </div>
      
      <div className="text-center px-6">
        <div className="text-[#d4af37] text-[10px] uppercase tracking-[0.5em] mb-4 font-cinzel font-bold opacity-60">Воплощение...</div>
        <p className="text-2xl font-playfair italic text-[#f9e29c] animate-pulse transition-all duration-1000">
          "{MESSAGES[msgIdx]}"
        </p>
      </div>
      
      {/* Decorative Ornaments */}
      <div className="absolute top-12 left-12 opacity-20 text-[#d4af37] font-cinzel tracking-widest uppercase">✦ Таинство</div>
      <div className="absolute bottom-12 right-12 opacity-20 text-[#d4af37] font-cinzel tracking-widest uppercase">Прорицание ✧</div>
    </div>
  );
};

export default LoadingScreen;
