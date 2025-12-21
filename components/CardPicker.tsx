
import React, { useState, useMemo } from 'react';
import { translations } from '../translations';
import { FULL_DECK } from '../constants';
import { Sparkles } from 'lucide-react';

interface Props {
  countNeeded: number;
  countSelected: number;
  onPick: (index: number) => void;
  selectedIndices: number[];
  lang: 'ru' | 'en';
}

const CardPicker: React.FC<Props> = ({ countNeeded, countSelected, onPick, selectedIndices, lang }) => {
  const t = translations[lang];
  const [filter, setFilter] = useState<'ALL' | 'MAJOR' | 'WANDS' | 'CUPS' | 'SWORDS' | 'PENTACLES'>('ALL');

  const filteredIndices = useMemo(() => {
    return FULL_DECK.map((_, i) => i).filter(i => {
      if (filter === 'ALL') return true;
      return FULL_DECK[i].suit === filter;
    });
  }, [filter]);

  const suits = [
    { id: 'ALL', label: lang === 'ru' ? 'ВСЕ' : 'ALL' },
    { id: 'MAJOR', label: lang === 'ru' ? 'АРКАНЫ' : 'MAJOR' },
    { id: 'WANDS', label: lang === 'ru' ? 'ЖЕЗЛЫ' : 'WANDS' },
    { id: 'CUPS', label: lang === 'ru' ? 'КУБКИ' : 'CUPS' },
    { id: 'SWORDS', label: lang === 'ru' ? 'МЕЧИ' : 'SWORDS' },
    { id: 'PENTACLES', label: lang === 'ru' ? 'МОНЕТЫ' : 'COINS' }
  ];

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="text-center mb-10 shrink-0 px-4">
        <h2 className="text-3xl md:text-5xl font-cinzel font-black gold-gradient-text uppercase tracking-[0.2em] mb-4 italic">{t.pickCards}</h2>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
            {suits.map(s => (
                <button 
                    key={s.id} 
                    onClick={() => setFilter(s.id as any)}
                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border-2 transition-all duration-500 ${
                        filter === s.id 
                        ? 'bg-[var(--accent)] text-black border-[var(--accent)] shadow-[0_0_20px_var(--accent-glow)]' 
                        : 'bg-black/40 text-white/40 border-white/5 hover:border-[var(--accent-glow)]'
                    }`}
                >
                    {s.label}
                </button>
            ))}
        </div>
      </div>

      <div className="flex-grow grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-4 md:gap-6 content-start justify-items-center overflow-y-auto hide-scrollbar pb-60 pt-6 px-4">
        {filteredIndices.map((i) => {
          const isSelected = selectedIndices.includes(i);
          return (
            <div
              key={i}
              onClick={() => !isSelected && countSelected < countNeeded && onPick(i)}
              className={`
                relative w-full aspect-[2/3.5] transition-all duration-700 cursor-pointer transform-gpu
                ${isSelected ? 'opacity-0 scale-50 -translate-y-20 pointer-events-none rotate-12' : 'active:scale-95 hover:scale-110 hover:-translate-y-2 animate-float'}
              `}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#1c1c2e] to-[#0a0a0f] border-2 border-[var(--accent-glow)] shadow-2xl flex items-center justify-center group overflow-hidden magical-gold-frame">
                <div className="absolute inset-2 border border-white/[0.05] rounded-xl pointer-events-none"></div>
                <div className="relative z-10 text-[var(--accent)] opacity-20 group-hover:opacity-100 transition-all duration-700 group-hover:scale-150">
                  <Sparkles size={24} strokeWidth={1} />
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent-glow)_0%,transparent_70%)] opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-36 left-1/2 -translate-x-1/2 z-[80] pointer-events-none">
          <div className="px-10 py-5 bg-black/90 backdrop-blur-3xl rounded-full border-2 border-[var(--accent-glow)] shadow-[0_20px_80px_rgba(0,0,0,1)] pointer-events-auto flex items-center gap-6 animate-bounce">
             <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">{t.selected}:</span>
             <span className="text-xl font-cinzel font-black text-[var(--accent)] tracking-[0.2em]">{countSelected} / {countNeeded}</span>
          </div>
      </div>
    </div>
  );
};

export default CardPicker;
