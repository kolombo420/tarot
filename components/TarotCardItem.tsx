
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
      className={`relative w-full aspect-[9/16] perspective-1000 cursor-pointer group`}
      onClick={!isRevealed ? onReveal : undefined}
    >
      <div className={`relative w-full h-full transition-all duration-1000 transform-style-3d ${isRevealed ? 'rotate-y-180' : ''}`}>
        
        {/* Front side (Image) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl overflow-hidden border-2 border-[#d4af37] shadow-[0_25px_65px_rgba(0,0,0,1)] bg-[#0a0a0f]">
          {card.imageUrl && (
            <img src={card.imageUrl} alt={lang === 'ru' ? card.nameRu : card.name} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-2 border border-[#d4af3733] rounded-2xl pointer-events-none"></div>
          <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black via-black/90 to-transparent">
            <h4 className="text-[#f9e29c] font-cinzel font-bold text-2xl text-center tracking-[0.2em] uppercase drop-shadow-2xl">{lang === 'ru' ? card.nameRu : card.name}</h4>
          </div>
        </div>

        {/* Back side (Shirt) */}
        <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden border-2 border-[#d4af3766] bg-[#0d0d1a] flex flex-col items-center justify-center p-6 shadow-2xl">
           <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
             backgroundImage: `radial-gradient(circle at center, #d4af37 1px, transparent 1px)`,
             backgroundSize: '24px 24px'
           }}></div>
           
           <div className="w-full h-full border-2 border-double border-[#d4af3733] rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
             <div className="absolute w-48 h-48 border border-[#d4af3711] rounded-full animate-[spin_30s_linear_infinite]"></div>
             <div className="absolute w-40 h-40 border border-[#d4af3711] rounded-full animate-[spin_25s_linear_infinite_reverse]"></div>
             
             <div className="relative z-10 flex flex-col items-center">
               <div className="text-6xl mb-4 opacity-70 group-hover:scale-110 transition-transform duration-700">🌙</div>
               <div className="w-16 h-[1px] bg-[#d4af3744] mb-4"></div>
               <div className="text-[10px] font-cinzel text-[#d4af3788] tracking-[0.5em] uppercase">{t.reveal}</div>
             </div>
             
             <div className="absolute top-4 left-4 text-[#d4af3744] text-sm font-serif italic">IX</div>
             <div className="absolute bottom-4 right-4 text-[#d4af3744] text-sm font-serif italic">XV</div>
           </div>
        </div>
      </div>
      
      <style>{`
        .perspective-1000 { perspective: 2000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default TarotCardItem;
