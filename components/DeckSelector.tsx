
import React from 'react';
import { DeckInfo } from '../types';
import { DECKS } from '../constants';
import { Crown, Sun, Eye, Sparkles, Moon, Star } from 'lucide-react';

interface Props {
  onSelect: (deck: DeckInfo) => void;
  selectedDeckId: string | null;
  lang: 'ru' | 'en';
}

const Constellation: React.FC<{ type: 'crown' | 'sun' | 'eye' }> = ({ type }) => {
  const points = {
    crown: "20,40 40,20 50,45 60,20 80,40 50,80",
    sun: "50,10 90,50 50,90 10,50 30,30 70,30 70,70 30,70",
    eye: "10,50 50,20 90,50 50,80 50,50 30,50 70,50"
  };

  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-1000">
      <polyline
        points={points[type]}
        fill="none"
        stroke="white"
        strokeWidth="0.5"
        strokeDasharray="2,2"
        className="animate-[dash_20s_linear_infinite]"
      />
      {points[type].split(' ').map((p, i) => {
        const [x, y] = p.split(',');
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="1"
            fill="white"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
        );
      })}
    </svg>
  );
};

const DeckSelector: React.FC<Props> = ({ onSelect, selectedDeckId, lang }) => {
  const getDeckStyle = (id: string) => {
    switch (id) {
      case 'VISCONTI':
        return {
          container: 'border-[#d4af3733] bg-gradient-to-br from-[#1a1408] via-[#020205] to-[#1a1408]',
          accent: 'text-[#d4af37]',
          Icon: Crown,
          constellation: 'crown' as const,
          glow: 'rgba(212, 175, 55, 0.15)',
          label: lang === 'ru' ? 'Золотой Век' : 'Golden Age'
        };
      case 'MARSEILLE':
        return {
          container: 'border-[#ff444433] bg-gradient-to-br from-[#1a0808] via-[#020205] to-[#1a0808]',
          accent: 'text-[#ff4444]',
          Icon: Sun,
          constellation: 'sun' as const,
          glow: 'rgba(255, 68, 68, 0.1)',
          label: lang === 'ru' ? 'Старый Порядок' : 'Old Order'
        };
      case 'PAPUS':
        return {
          container: 'border-[#9d00ff33] bg-gradient-to-br from-[#0d081a] via-[#020205] to-[#0d081a]',
          accent: 'text-[#9d00ff]',
          Icon: Eye,
          constellation: 'eye' as const,
          glow: 'rgba(157, 0, 255, 0.1)',
          label: lang === 'ru' ? 'Герметизм' : 'Hermeticism'
        };
      default:
        return { container: '', accent: '', Icon: Sparkles, constellation: 'crown' as const, glow: '', label: '' };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto p-4 perspective-1000">
      {DECKS.map((deck) => {
        const styles = getDeckStyle(deck.id);
        const IconComponent = styles.Icon;
        return (
          <button
            key={deck.id}
            onClick={() => onSelect(deck)}
            className={`relative group h-[450px] rounded-[3rem] transition-all duration-700 text-center overflow-hidden flex flex-col items-center p-8 border backdrop-blur-md transform-gpu ${styles.container} ${
              selectedDeckId === deck.id ? 'scale-105 z-10 border-[#d4af37] shadow-[0_0_60px_rgba(212,175,55,0.2)]' : 'hover:-translate-y-4 hover:shadow-2xl'
            }`}
          >
            {/* Constellation Overlay */}
            <Constellation type={styles.constellation} />

            {/* Dynamic Nebula Effect */}
            <div className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-1000 bg-[radial-gradient(circle_at_50%_50%,var(--glow),transparent_70%)]" style={{ '--glow': styles.glow } as any}></div>

            {/* Content Area */}
            <div className="relative z-10 w-full flex flex-col h-full items-center">
              
              <div className="mb-6">
                <div className="text-[7px] font-montserrat font-black text-[#f9e29c44] tracking-[0.5em] uppercase mb-1">{styles.label}</div>
                <h3 className={`text-xl md:text-2xl font-cinzel font-black tracking-[0.1em] leading-tight ${deck.id === 'VISCONTI' ? 'gold-gradient-text' : 'text-[#f9e29c]'}`}>
                  {lang === 'ru' ? deck.title : deck.titleEn}
                </h3>
                <div className="w-8 h-[1px] bg-[#d4af3744] mx-auto mt-2"></div>
              </div>

              {/* Central Mystic Icon */}
              <div className="flex-grow flex items-center justify-center relative mb-6">
                 {/* Decorative Rings */}
                 <div className="absolute w-32 h-32 border border-white/[0.03] rounded-full animate-[spin_30s_linear_infinite]"></div>
                 <div className="absolute w-40 h-40 border border-white/[0.01] rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
                 
                 <div className={`relative p-8 rounded-full border border-white/5 bg-black/40 backdrop-blur-xl shadow-inner transition-all duration-700 group-hover:border-[#d4af3744] group-hover:scale-110 ${styles.accent}`}>
                    <IconComponent size={36} strokeWidth={1} className="group-hover:animate-pulse" />
                    <Sparkles size={12} className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
                 </div>
              </div>

              {/* Card Example Preview (Animated dots representing cards) */}
              <div className="mb-8 flex gap-2">
                 {[1, 2, 3].map(i => (
                    <div key={i} className={`w-8 h-12 rounded-sm border border-white/10 bg-white/5 transition-all duration-500 group-hover:translate-y-[-${i*2}px] group-hover:rotate-${i*2} group-hover:border-[#d4af3722]`} 
                         style={{ transform: `rotate(${i * 5 - 10}deg)` }}>
                      <div className="w-full h-full opacity-10 bg-gradient-to-t from-white to-transparent"></div>
                    </div>
                 ))}
              </div>

              {/* Info Area */}
              <div className="mt-auto w-full">
                <p className="text-[10px] md:text-[11px] text-gray-400 font-montserrat leading-relaxed mb-6 px-4 opacity-40 group-hover:opacity-80 transition-opacity line-clamp-3 italic">
                  {lang === 'ru' ? deck.description : deck.descriptionEn}
                </p>
                <div className="relative group/btn overflow-hidden rounded-full border border-white/5 bg-white/[0.02] transition-all duration-500 group-hover:border-[#d4af3744]">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af3711] to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-[1500ms]"></div>
                  <div className={`py-3 w-full font-montserrat font-black text-[8px] tracking-[0.4em] uppercase transition-all ${styles.accent} group-hover:text-white`}>
                    {lang === 'ru' ? 'ВЫБРАТЬ КАНОН' : 'SELECT CANON'}
                  </div>
                </div>
              </div>

            </div>
          </button>
        );
      })}

      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 100;
          }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default DeckSelector;
