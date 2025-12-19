
import React from 'react';
import { TarotCard } from '../types';

interface Props {
  card: TarotCard;
  index: number;
  onReveal?: () => void;
}

const TarotCardItem: React.FC<Props> = ({ card, onReveal }) => {
  const isRevealed = card.revealed || false;

  return (
    <div 
      className={`relative w-full aspect-[9/16] perspective-1000 cursor-pointer group`}
      onClick={!isRevealed ? onReveal : undefined}
    >
      <div className={`relative w-full h-full transition-all duration-1000 transform-style-3d ${isRevealed ? 'rotate-y-180' : ''}`}>
        
        {/* Front side (Image) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden border-2 border-[#d4af37] shadow-[0_15px_45px_rgba(0,0,0,0.8)] bg-[#0a0a0f]">
          {card.imageUrl && (
            <img src={card.imageUrl} alt={card.nameRu} className="w-full h-full object-cover" />
          )}
          {/* Ornate inner frame for front */}
          <div className="absolute inset-2 border border-[#d4af3733] rounded-xl pointer-events-none"></div>
          <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
            <h4 className="text-[#f9e29c] font-cinzel font-bold text-xl text-center tracking-[0.1em] uppercase drop-shadow-lg">{card.nameRu}</h4>
          </div>
        </div>

        {/* Back side (Shirt) */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden border-2 border-[#d4af3766] bg-[#0d0d1a] flex flex-col items-center justify-center p-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
           {/* Detailed Geometric Pattern */}
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
             backgroundImage: `radial-gradient(circle at center, #d4af37 1px, transparent 1px)`,
             backgroundSize: '20px 20px'
           }}></div>
           
           <div className="w-full h-full border-2 border-double border-[#d4af3744] rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
             {/* Sacred Geometry (Pseudo-SVG) */}
             <div className="absolute w-40 h-40 border border-[#d4af3722] rounded-full animate-[spin_20s_linear_infinite]"></div>
             <div className="absolute w-32 h-32 border border-[#d4af3722] rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
             
             <div className="relative z-10 flex flex-col items-center">
               <div className="text-5xl mb-2 opacity-80 group-hover:scale-125 transition-transform duration-700">🌙</div>
               <div className="w-12 h-[1px] bg-[#d4af3766] mb-2"></div>
               <div className="text-[10px] font-cinzel text-[#d4af37aa] tracking-[0.4em] uppercase">Тайна</div>
             </div>
             
             {/* Corner Flourishes */}
             <div className="absolute top-2 left-2 text-[#d4af3766] text-xs">❈</div>
             <div className="absolute top-2 right-2 text-[#d4af3766] text-xs">❈</div>
             <div className="absolute bottom-2 left-2 text-[#d4af3766] text-xs">❈</div>
             <div className="absolute bottom-2 right-2 text-[#d4af3766] text-xs">❈</div>
           </div>
        </div>
      </div>
      
      <style>{`
        .perspective-1000 { perspective: 1500px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default TarotCardItem;
