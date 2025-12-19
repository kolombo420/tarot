
import React from 'react';

interface Props {
  countNeeded: number;
  countSelected: number;
  onPick: (index: number) => void;
  selectedIndices: number[];
}

const CardPicker: React.FC<Props> = ({ countNeeded, countSelected, onPick, selectedIndices }) => {
  const totalCards = 22;

  return (
    <div className="relative w-full max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-20 relative">
        <h2 className="text-5xl md:text-6xl font-cinzel font-bold gold-gradient-text mb-6 uppercase tracking-widest">Выберите карты</h2>
        <div className="h-[1px] w-24 bg-[#d4af3733] mx-auto mb-6"></div>
        <p className="text-[#d4af37aa] font-playfair italic text-xl tracking-wide max-w-2xl mx-auto">
          Закройте глаза, сделайте глубокий вдох и выберите те, что откликаются вашему сердцу.
        </p>
        <div className="mt-8 inline-block px-8 py-3 bg-[#d4af3711] rounded-full border border-[#d4af3733]">
           <span className="text-sm font-cinzel text-[#f9e29c] font-bold tracking-[0.2em]">
             ВЫБРАНО: <span className="text-[#d4af37]">{countSelected} / {countNeeded}</span>
           </span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-8 perspective-1000 px-4">
        {Array.from({ length: totalCards }).map((_, i) => {
          const isSelected = selectedIndices.includes(i);
          return (
            <div
              key={i}
              onClick={() => !isSelected && countSelected < countNeeded && onPick(i)}
              className={`
                relative w-24 md:w-32 aspect-[2/3] transition-all duration-700 cursor-pointer
                ${isSelected ? 'opacity-0 scale-50 translate-y-[-200px] pointer-events-none' : 'hover:translate-y-[-40px] hover:z-20 hover:rotate-3'}
              `}
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#1c1c2e] to-[#0a0a0f] border-2 border-[#d4af3733] shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex items-center justify-center group overflow-hidden relative">
                <div className="absolute inset-0 bg-[#d4af3708] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-2 border border-[#d4af3711] rounded-xl pointer-events-none"></div>
                
                {/* Decorative Shirt Pattern (Minimalist for performance) */}
                <div className="text-3xl md:text-4xl opacity-10 font-cinzel font-black text-[#d4af37] transition-all group-hover:opacity-60 group-hover:scale-125">✦</div>
                
                <div className="absolute top-2 left-2 text-[#d4af3722] text-[8px]">✧</div>
                <div className="absolute bottom-2 right-2 text-[#d4af3722] text-[8px]">✧</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardPicker;
