
import React, { useState, useEffect } from 'react';
import { Orbit, Sparkles, Eye, Zap } from 'lucide-react';

const MESSAGES = [
  "Плетем узор судьбы...",
  "Синхронизация с эфиром...",
  "Открываем Око Бездны...",
  "Читаем линии грядущего...",
  "Арканы пробуждаются...",
  "Эфир принимает форму...",
  "Манифестация воли..."
];

const LoadingScreen: React.FC = () => {
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => setMsgIdx(p => (p + 1) % MESSAGES.length), 1500);
    const progInterval = setInterval(() => setProgress(p => p < 98 ? p + (Math.random() * 8) : 98), 120);
    return () => { clearInterval(msgInterval); clearInterval(progInterval); };
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#020205] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)]"></div>
      
      <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
        {/* Внешние кольца - ускорены */}
        <div className="absolute inset-0 border-[0.5px] border-[#d4af3722] rounded-full animate-[spin_5s_linear_infinite]"></div>
        <div className="absolute inset-6 border border-dashed border-[#d4af3733] rounded-full animate-[spin_7s_linear_infinite_reverse]"></div>
        <div className="absolute inset-12 border-[0.5px] border-[#d4af3711] rounded-full animate-[spin_12s_linear_infinite]"></div>
        
        {/* Эфирный Глаз */}
        <div className="relative z-10 w-44 h-44 md:w-56 md:h-56 bg-black rounded-full flex items-center justify-center border border-[#d4af3744] shadow-[0_0_100px_rgba(212,175,55,0.3)]">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f9e29c15_0%,transparent_75%)] rounded-full"></div>
           <div className="relative flex flex-col items-center">
              <Eye size={56} className="text-[#f9e29c] animate-pulse drop-shadow-[0_0_25px_#f9e29c]" strokeWidth={1} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24">
                 <Orbit size={96} className="text-[#d4af3755] animate-[spin_2s_linear_infinite]" strokeWidth={0.5} />
              </div>
           </div>
           
           {/* Эффект сканирования */}
           <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#d4af37] opacity-40 shadow-[0_0_15px_#d4af37] animate-[scan_2s_linear_infinite]"></div>
        </div>
        
        {/* Искры */}
        <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
            {Array.from({ length: 16 }).map((_, i) => (
                <Sparkles key={i} size={10} className="absolute text-[#d4af3744]" style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${i * 22.5}deg) translateX(140px)`,
                }} />
            ))}
        </div>
      </div>

      <div className="mt-20 text-center max-w-sm px-8">
        <p className="text-2xl md:text-3xl font-playfair italic gold-gradient-text mb-10 min-h-[3.5rem] animate-fadeIn transition-opacity duration-300 drop-shadow-lg">
          "{MESSAGES[msgIdx]}"
        </p>
        
        <div className="relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-3 border border-white/5">
            <div className="h-full bg-gradient-to-r from-[#d4af37] via-[#f9e29c] to-[#d4af37] transition-all duration-300 shadow-[0_0_10px_#d4af37]" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex items-center justify-center gap-2">
            <Zap size={10} className="text-[#d4af37] animate-pulse" />
            <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.5em]">Глубинная Синхронизация</div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
            0% { top: 10%; opacity: 0; }
            50% { opacity: 0.6; }
            100% { top: 90%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
