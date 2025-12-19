
import React from 'react';
import { RitualCategoryInfo } from '../types';
import { RITUAL_CATEGORIES } from '../constants';
import { Eye, Skull, Heart, Sparkles } from 'lucide-react';

interface Props {
  onSelect: (category: RitualCategoryInfo) => void;
  lang: 'ru' | 'en';
}

const RitualCategorySelector: React.FC<Props> = ({ onSelect, lang }) => {
  const getIcon = (id: string) => {
    const size = 64;
    const strokeWidth = 0.75;
    switch(id) {
      case 'TAROT': return <Eye size={size} strokeWidth={strokeWidth} />;
      case 'HEX': return <Skull size={size} strokeWidth={strokeWidth} />;
      case 'LOVE': return <Heart size={size} strokeWidth={strokeWidth} />;
      case 'DIVINATION': return <Sparkles size={size} strokeWidth={strokeWidth} />;
      default: return <Sparkles size={size} strokeWidth={strokeWidth} />;
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Decorative background geometry */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none scale-150 overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-[800px] h-[800px] text-[#d4af37] animate-[spin_60s_linear_infinite]">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.2" />
          <path d="M50,2 L50,98 M2,50 L98,50 M15,15 L85,85 M85,15 L15,85" stroke="currentColor" strokeWidth="0.1" />
          <polygon points="50,5 95,50 50,95 5,50" fill="none" stroke="currentColor" strokeWidth="0.2" />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 px-6 relative z-10">
        {RITUAL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat)}
            className="group relative p-12 bg-black/40 backdrop-blur-md rounded-[4rem] border border-[#d4af3711] hover:border-[#d4af3766] transition-all duration-1000 text-left overflow-hidden h-[340px] flex flex-col justify-between shadow-2xl hover:shadow-[0_0_80px_rgba(212,175,55,0.05)]"
          >
            {/* Hover Accent */}
            <div 
              className="absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-1000 blur-3xl pointer-events-none" 
              style={{ backgroundColor: cat.color }}
            ></div>
            
            <div className="flex justify-between items-start">
              <div className="text-[#f9e29c] opacity-40 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700">
                {getIcon(cat.id)}
              </div>
              <div className="font-cinzel text-[10px] tracking-[0.5em] text-[#d4af3733] uppercase">
                {cat.id}
              </div>
            </div>
            
            <div>
              <h3 className="text-3xl font-cinzel font-bold text-[#f9e29c] mb-4 tracking-[0.1em] uppercase group-hover:gold-gradient-text transition-all">
                {lang === 'ru' ? cat.title : cat.titleEn}
              </h3>
              <p className="text-[12px] text-gray-500 font-playfair italic leading-relaxed max-w-xs opacity-70 group-hover:opacity-100 transition-opacity">
                {lang === 'ru' ? cat.description : cat.descriptionEn}
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-[9px] font-cinzel tracking-[0.4em] text-[#d4af3766] group-hover:text-[#d4af37] transition-colors uppercase">
              <div className="h-[1px] w-12 bg-current opacity-20"></div>
              {lang === 'ru' ? 'Инициация' : 'Initiation'}
            </div>

            {/* Corner details */}
            <div className="absolute top-8 left-8 text-[#d4af3708] text-xs">☿</div>
            <div className="absolute bottom-8 right-8 text-[#d4af3708] text-xs">🜂</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RitualCategorySelector;
