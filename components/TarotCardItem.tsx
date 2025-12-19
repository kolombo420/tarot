
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
      {/* Glow Effect on Hover/Reveal */}
      <div className={`absolute -inset-4 bg-[#d4af37] rounded-full opacity-0 blur-[60px] transition-opacity duration-1000 ${isRevealed ? 'opacity-10' : 'group-hover:opacity-5'}`}></div>

      <div className={`relative w-full h-full transition-transform duration-[1200ms] cubic-bezier(0.34, 1.56, 0.64, 1) transform-style-3d ${isRevealed ? 'rotate-y-180' : ''}`}>
        
        {/* Front side (Card Image) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden border border-[#d4af3766] shadow-[0_15px_45px_rgba(0,0,0,0.8)] bg-[#0a0a0f]">
          {card.imageUrl && (
            <img src={card.imageUrl} alt={lang === 'ru' ? card.nameRu : card.name} className="w-full h-full object-cover brightness-90 contrast-110" />
          )}
          {/* Decorative Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          <div className="absolute inset-2 border border-[#d4af3722] rounded-xl pointer-events-none"></div>
          
          <div className="absolute bottom-0 inset-x-0 p-4 text-center">
            <div className="text-[8px] font-cinzel text-[#d4af37] tracking-[0.3em] uppercase mb-1 opacity-60">ARCANA</div>
            <h4 className="text-[#f9e29c] font-cinzel font-black text-sm md:text-base tracking-[0.15em] uppercase drop-shadow-lg">
              {lang === 'ru' ? card.nameRu : card.name}
            </h4>
          </div>

          {/* Reveal Flash Animation */}
          {isRevealed && (
            <div className="absolute inset-0 bg-white opacity-0 animate-[flash_0.8s_ease-out_forwards] pointer-events-none"></div>
          )}
        </div>

        {/* Back side (Shirt) */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden border border-[#d4af3744] bg-[#0d0d1a] flex flex-col items-center justify-center p-4 shadow-2xl">
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
             backgroundImage: `radial-gradient(circle at center, #d4af37 1px, transparent 1px)`,
             backgroundSize: '16px 16px'
           }}></div>
           
           <div className="w-full h-full border border-double border-[#d4af3722] rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
             {/* Animated Sacred Geometry */}
             <div className="absolute w-32 h-32 border border-[#d4af3711] rounded-full animate-[spin_20s_linear_infinite]"></div>
             <div className="absolute w-24 h-24 border border-[#d4af3708] rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
             
             <div className="relative z-10 flex flex-col items-center transform transition-transform duration-700 group-hover:scale-110">
               <div className="text-4xl mb-3 filter drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">🌙</div>
               <div className="w-10 h-[1px] bg-[#d4af3733] mb-3"></div>
               <div className="text-[8px] font-cinzel text-[#d4af37] tracking-[0.4em] uppercase font-bold opacity-60">{t.reveal}</div>
             </div>
           </div>
        </div>
      </div>
      
      <style>{`
        .rotate-y-180 { transform: rotateY(180deg); }
        .perspective-2000 { perspective: 2000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        
        @keyframes flash {
          0% { opacity: 0.8; }
          100% { opacity: 0; }
        }

        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default TarotCardItem;
