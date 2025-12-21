
import React from 'react';
import { TarotCard } from '../types';
import { translations } from '../translations';

interface Props {
  card: TarotCard;
  index: number;
  onReveal?: () => void;
  lang: 'ru' | 'en';
}

const TarotCardItem: React.FC<Props> = ({ card, onReveal, lang }) => {
  const isRevealed = card.revealed || false;
  const t = translations[lang];

  return (
    <div 
      className={`relative w-full max-w-[280px] mx-auto aspect-[2/3.5] perspective-2000 cursor-pointer group mb-4`}
      onClick={!isRevealed ? onReveal : undefined}
    >
      <div className={`absolute -inset-6 bg-[var(--accent)] rounded-full opacity-0 blur-[80px] transition-opacity duration-1000 ${isRevealed ? 'opacity-10' : 'group-hover:opacity-10'}`}></div>

      <div className={`relative w-full h-full transition-transform duration-[1400ms] cubic-bezier(0.34, 1.56, 0.64, 1) transform-style-3d ${isRevealed ? 'rotate-y-180' : ''}`}>
        
        {/* Face */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden border border-[var(--accent-glow)] shadow-[0_15px_45px_rgba(0,0,0,0.8)] bg-[#0a0a0f]">
          {card.imageUrl && (
            <img src={card.imageUrl} alt={lang === 'ru' ? card.nameRu : card.name} className="w-full h-full object-cover brightness-75 contrast-125" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
          <div className="absolute inset-2 border border-[var(--accent-glow)] rounded-xl pointer-events-none opacity-20"></div>
          
          <div className="absolute bottom-0 inset-x-0 p-5 text-center">
            <div className="text-[9px] font-cinzel text-[var(--accent)] tracking-[0.4em] uppercase mb-1 opacity-50">ARCANA</div>
            <h4 className="text-[var(--accent-bright)] font-cinzel font-black text-sm md:text-base tracking-[0.2em] uppercase drop-shadow-lg italic">
              {lang === 'ru' ? card.nameRu : card.name}
            </h4>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden border border-[var(--accent-glow)] bg-[var(--bg-base)] flex flex-col items-center justify-center p-4 shadow-2xl transition-all group-hover:border-[var(--accent-bright)]">
           <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
             backgroundImage: `radial-gradient(circle at center, var(--accent) 1px, transparent 1px)`,
             backgroundSize: '20px 20px'
           }}></div>
           
           <div className="w-full h-full border border-double border-[var(--accent-glow)] rounded-xl flex flex-col items-center justify-center relative overflow-hidden group-hover:border-[var(--accent-bright)] transition-colors">
             <div className="absolute w-32 h-32 border border-[var(--accent-glow)] rounded-full animate-[spin_25s_linear_infinite] opacity-10 group-hover:opacity-30 transition-opacity"></div>
             
             <div className="relative z-10 flex flex-col items-center transform transition-all duration-700 group-hover:scale-110">
               <div className="text-4xl mb-4 filter opacity-40 group-hover:opacity-100 group-hover:drop-shadow-[0_0_15px_var(--accent-glow)] transition-all">🌙</div>
               <div className="w-12 h-[1px] bg-[var(--accent-glow)] mb-4 group-hover:bg-[var(--accent-bright)] transition-colors"></div>
               <div className="text-[10px] font-cinzel text-[var(--accent)] group-hover:text-[var(--accent-bright)] tracking-[0.5em] uppercase font-bold opacity-40 group-hover:opacity-100 transition-all">{t.reveal}</div>
             </div>
           </div>
        </div>
      </div>
      
      <style>{`
        .rotate-y-180 { transform: rotateY(180deg); }
        .perspective-2000 { perspective: 2000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </div>
  );
};

export default TarotCardItem;
