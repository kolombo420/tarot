
import React from 'react';
import { RitualCategoryInfo } from '../types';
import { RITUAL_CATEGORIES } from '../constants';
import { Skull, Heart, Eye, Moon } from 'lucide-react';

interface Props {
  onSelect: (category: RitualCategoryInfo) => void;
  lang: 'ru' | 'en';
}

/**
 * Geometric Layout (Refined):
 * Portal Width W = 900px
 * Button Width B = 180px
 * Inter-button Gap G = 60px
 * Side Padding P = 240px
 * 
 * Result:
 * Distance between centers D = B + G = 180 + 60 = 240px
 * Distance to side P = 240px
 * P = D logic satisfied.
 * Total: 2*240 (sides) + 2*180 (buttons) + 60 (gap) = 480 + 360 + 60 = 900px.
 */
const RitualCategorySelector: React.FC<Props> = ({ onSelect, lang }) => {
  const getIcon = (id: string, className: string) => {
    const size = 26;
    
    switch(id) {
      case 'TAROT': 
        return <Moon size={size} className={`${className} animate-spin-slow`} />;
      case 'HEX': 
        return <Skull size={size} className={`${className} animate-float-slow`} />;
      case 'LOVE': 
        return <Heart size={size} className={`${className} animate-heartbeat`} />;
      case 'DIVINATION': 
        return <Eye size={size} className={`${className} animate-pulse opacity-60`} />;
      default: 
        return <Eye size={size} className={className} />;
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-[60px] w-full px-[20px] md:px-[240px]"
      >
        {RITUAL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat)}
            className="group relative flex flex-col items-center magical-gold-frame rounded-[2rem] p-6 text-center transition-all duration-700 active:scale-[0.97] overflow-hidden shadow-2xl h-full bg-black/50 min-w-[160px] md:w-[180px]"
          >
            <div 
              className="absolute top-0 left-0 w-32 h-32 -ml-16 -mt-16 rounded-full opacity-5 blur-[60px] pointer-events-none transition-all group-hover:opacity-15" 
              style={{ backgroundColor: cat.color }}
            ></div>
            
            <div className="relative z-10 flex flex-col items-center gap-4 mb-4 w-full">
              <div className="shrink-0 text-[var(--accent)] group-hover:text-[var(--accent-bright)] group-hover:scale-110 transition-all duration-700 opacity-50 group-hover:opacity-100">
                {getIcon(cat.id, "")}
              </div>
              <h3 className="text-lg md:text-xl font-cinzel font-bold text-[var(--accent)] group-hover:text-[var(--accent-bright)] tracking-[0.1em] uppercase italic transition-colors leading-tight">
                {lang === 'ru' ? cat.title : cat.titleEn}
              </h3>
            </div>
            
            <p className="text-[11px] md:text-[12px] text-[var(--accent)] opacity-40 group-hover:opacity-80 font-montserrat leading-relaxed group-hover:text-[var(--accent-bright)] transition-all duration-700 italic mb-6 line-clamp-2">
              {lang === 'ru' ? cat.description : cat.descriptionEn}
            </p>
            
            <div className="flex items-center justify-center w-full gap-2 text-[9px] font-black tracking-[0.4em] text-[var(--accent)] group-hover:text-[var(--accent-bright)] uppercase mt-auto opacity-30 group-hover:opacity-100 transition-opacity">
              {lang === 'ru' ? 'ВЫБРАТЬ' : 'CHOOSE'}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RitualCategorySelector;
