
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
    <div className="relative w-full max-w-5xl mx-auto py-4 px-4 h-full flex flex-col">
      <div className="text-center mb-8 relative shrink-0">
        <h2 className="text-3xl md:text-5xl font-cinzel font-black gold-gradient-text mb-2 uppercase tracking-widest">{t.pickCards}</h2>
        <div className="h-[1px] w-16 bg-[#d4af3733] mx-auto mb-3"></div>
        <p className="text-[#d4af37aa] font-montserrat font-medium text-[10px] md:text-sm tracking-widest max-w-xl mx-auto leading-relaxed opacity-70 uppercase">
          {t.pickSubtitle}
        </p>
        <div className="mt-4 inline-block px-6 py-2 bg-[#d4af3711] rounded-full border border-[#d4af3733] backdrop-blur-md">
           <span className="text-[8px] font-montserrat text-[#f9e29c] font-black tracking-[0.2em] uppercase">
             {t.selected}: <span className="text-[#d4af37]">{countSelected} / {countNeeded}</span>
           </span>
        </div>
      </div>

      <div className="flex-grow flex flex-wrap justify-center gap-3 md:gap-6 perspective-1000 px-2 overflow-y-auto hide-scrollbar pb-10">
        {Array.from({ length: totalCards }).map((_, i) => {
          const isSelected = selectedIndices.includes(i);
          return (
            <div
              key={i}
              onClick={() => !isSelected && countSelected < countNeeded && onPick(i)}
              className={`
                relative w-16 md:w-24 aspect-[2/3] transition-all duration-700 cursor-pointer
                ${isSelected ? 'opacity-0 scale-50 translate-y-[-100px] pointer-events-none' : 'hover:translate-y-[-10px] hover:z-20 hover:rotate-3'}
              `}
            >
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#1c1c2e] to-[#0a0a0f] border border-[#d4af3733] shadow-lg flex items-center justify-center group overflow-hidden relative">
                <div className="absolute inset-0 bg-[#d4af3708] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-1.5 border border-[#d4af3711] rounded-lg pointer-events-none"></div>
                
                <div className="text-xl md:text-2xl opacity-10 font-cinzel font-black text-[#d4af37] transition-all group-hover:opacity-40 group-hover:scale-110">✦</div>
              </div>
            </div>
          );
        })}
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default CardPicker;
