
import React from 'react';
import { translations } from '../translations';

interface Props {
  countNeeded: number;
  countSelected: number;
  onPick: (index: number) => void;
  selectedIndices: number[];
  lang: 'ru' | 'en';
}

const CardPicker: React.FC<Props> = ({ countNeeded, countSelected, onPick, selectedIndices, lang }) => {
  const totalCards = 22;
  const t = translations[lang];

  return (
    <div className="relative w-full max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-20 relative">
        <h2 className="text-5xl md:text-6xl font-cinzel font-bold gold-gradient-text mb-8 uppercase tracking-widest">{t.pickCards}</h2>
        <div className="h-[1px] w-24 bg-[#d4af3733] mx-auto mb-8"></div>
        <p className="text-[#d4af37aa] font-playfair italic text-xl tracking-wide max-w-2xl mx-auto leading-relaxed opacity-80">
          {t.pickSubtitle}
        </p>
        <div className="mt-12 inline-block px-10 py-4 bg-[#d4af3711] rounded-full border border-[#d4af3733] backdrop-blur-md">
           <span className="text-xs font-cinzel text-[#f9e29c] font-bold tracking-[0.3em] uppercase">
             {t.selected}: <span className="text-[#d4af37]">{countSelected} / {countNeeded}</span>
           </span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-6 md:gap-10 perspective-1000 px-4">
        {Array.from({ length: totalCards }).map((_, i) => {
          const isSelected = selectedIndices.includes(i);
          return (
            <div
              key={i}
              onClick={() => !isSelected && countSelected < countNeeded && onPick(i)}
              className={`
                relative w-28 md:w-36 aspect-[2/3] transition-all duration-700 cursor-pointer
                ${isSelected ? 'opacity-0 scale-50 translate-y-[-200px] pointer-events-none' : 'hover:translate-y-[-50px] hover:z-20 hover:rotate-6'}
              `}
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#1c1c2e] to-[#0a0a0f] border-2 border-[#d4af3733] shadow-[0_20px_45px_rgba(0,0,0,0.7)] flex items-center justify-center group overflow-hidden relative">
                <div className="absolute inset-0 bg-[#d4af3708] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-3 border border-[#d4af3711] rounded-xl pointer-events-none"></div>
                
                <div className="text-4xl md:text-5xl opacity-10 font-cinzel font-black text-[#d4af37] transition-all group-hover:opacity-40 group-hover:scale-125">✦</div>
                
                <div className="absolute top-4 left-4 text-[#d4af3711] text-xs">❈</div>
                <div className="absolute bottom-4 right-4 text-[#d4af3711] text-xs">❈</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardPicker;
