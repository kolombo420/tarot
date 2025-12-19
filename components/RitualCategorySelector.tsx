
import React from 'react';
import { RitualCategoryInfo } from '../types';
import { RITUAL_CATEGORIES } from '../constants';
import { Skull, Heart, Sparkles, Layers } from 'lucide-react';

interface Props {
  onSelect: (category: RitualCategoryInfo) => void;
  lang: 'ru' | 'en';
}

const RitualCategorySelector: React.FC<Props> = ({ onSelect, lang }) => {
  const getIcon = (id: string, className: string) => {
    // Увеличено в 2 раза (было 32, стало 64)
    const size = 64; 
    const strokeWidth = 1;
    switch(id) {
      case 'TAROT': return <Layers size={size} strokeWidth={strokeWidth} className={className} />;
      case 'HEX': return <Skull size={size} strokeWidth={strokeWidth} className={className} />;
      case 'LOVE': return <Heart size={size} strokeWidth={strokeWidth} className={className} />;
      case 'DIVINATION': return <Sparkles size={size} strokeWidth={strokeWidth} className={className} />;
      default: return <Sparkles size={size} strokeWidth={strokeWidth} className={className} />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {RITUAL_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat)}
            className="group relative min-h-[180px] md:min-h-[220px] bg-black/40 backdrop-blur-3xl rounded-[2.5rem] border border-[#d4af3711] hover:border-[#d4af3766] transition-all duration-700 text-left overflow-hidden shadow-2xl hover:scale-[1.02] active:scale-95 flex flex-col"
          >
            {/* Background Glow */}
            <div 
              className="absolute top-0 left-0 w-48 h-48 -ml-12 -mt-12 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-1000 blur-[60px] pointer-events-none" 
              style={{ backgroundColor: cat.color }}
            ></div>
            
            <div className="relative z-10 p-6 md:p-8 flex flex-col h-full flex-grow">
              <div className="flex flex-row items-center gap-6 mb-4">
                {/* Animated Icon - Doubled in size */}
                <div className="shrink-0 relative group-hover:scale-110 transition-transform duration-700">
                  <div className="absolute inset-0 bg-[#f9e29c] blur-xl opacity-0 group-hover:opacity-20 transition-opacity animate-pulse"></div>
                  <div className="text-[#f9e29c] drop-shadow-[0_0_15px_rgba(249,226,156,0.4)]">
                    {getIcon(cat.id, "")}
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="text-[10px] md:text-xs font-montserrat font-black text-[#d4af3744] tracking-[0.4em] uppercase mb-1">ВЕРШИНА МАГИИ</div>
                  <h3 className="text-lg md:text-2xl font-cinzel font-black gold-gradient-text tracking-wider uppercase leading-tight">
                    {lang === 'ru' ? cat.title : cat.titleEn}
                  </h3>
                </div>
              </div>
              
              <div className="flex-grow flex flex-col justify-between">
                <p className="text-xs md:text-sm text-gray-300 font-montserrat leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity mb-6">
                  {lang === 'ru' ? cat.description : cat.descriptionEn}
                </p>
                <div className="flex items-center gap-3 text-[10px] md:text-xs font-montserrat font-black tracking-[0.4em] gold-gradient-text group-hover:text-white transition-all duration-500 uppercase">
                  <span className="w-8 h-[1px] bg-current opacity-20 group-hover:w-14 transition-all duration-700"></span>
                  {lang === 'ru' ? 'ВЫБРАТЬ ПУТЬ' : 'CHOOSE PATH'}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RitualCategorySelector;
