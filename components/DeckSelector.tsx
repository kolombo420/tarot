
import React from 'react';
import { DeckInfo } from '../types';
import { DECKS } from '../constants';
import { Crown, Sun, Eye, Sparkles } from 'lucide-react';

interface Props {
  onSelect: (deck: DeckInfo) => void;
  selectedDeckId: string | null;
  lang: 'ru' | 'en';
}

const DeckSelector: React.FC<Props> = ({ onSelect, selectedDeckId, lang }) => {
  const getDeckStyle = (id: string) => {
    switch (id) {
      case 'VISCONTI':
        return { accent: 'text-[#d4af37]', Icon: Crown, label: lang === 'ru' ? 'Золотой Век' : 'Golden Age' };
      case 'MARSEILLE':
        return { accent: 'text-[#ff4444]', Icon: Sun, label: lang === 'ru' ? 'Старый Порядок' : 'Old Order' };
      case 'PAPUS':
        return { accent: 'text-[#9d00ff]', Icon: Eye, label: lang === 'ru' ? 'Герметизм' : 'Hermeticism' };
      default:
        return { accent: '', Icon: Sparkles, label: '' };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full overflow-hidden">
      {DECKS.map((deck) => {
        const styles = getDeckStyle(deck.id);
        const IconComponent = styles.Icon;
        return (
          <div key={deck.id} className="flex justify-center items-center">
            <button
              onClick={() => onSelect(deck)}
              className={`relative group magical-gold-frame min-h-[320px] w-full max-w-[240px] rounded-[2.5rem] transition-all duration-700 text-center flex flex-col items-center justify-between p-6 border-2 transform-gpu active:scale-[0.85] active:opacity-60 active:duration-150 ${
                selectedDeckId === deck.id 
                  ? 'scale-[0.95] border-[var(--accent-bright)] shadow-[0_10px_40px_rgba(212,175,55,0.2)]' 
                  : 'scale-100 hover:scale-[0.93] hover:opacity-90'
              }`}
            >
              {/* Header */}
              <div className="relative z-10 w-full flex flex-col items-center">
                <div className="text-[10px] font-montserrat font-black text-[var(--accent)] opacity-40 tracking-[0.4em] uppercase mb-1 group-hover:text-[var(--accent-bright)] group-hover:opacity-100 transition-all">
                  {styles.label}
                </div>
                <h3 className={`text-xl font-cinzel font-black tracking-[0.15em] leading-tight italic transition-all ${deck.id === 'VISCONTI' ? 'gold-gradient-text' : 'text-[var(--accent)] group-hover:text-[var(--accent-bright)]'}`}>
                  {lang === 'ru' ? deck.title : deck.titleEn}
                </h3>
                <div className="w-10 h-[1px] bg-[var(--accent-glow)] mx-auto mt-2 group-hover:bg-[var(--accent-bright)] transition-colors"></div>
              </div>

              {/* Central Pictogram Area - Perfectly centered vertically */}
              <div className="flex-grow flex items-center justify-center relative w-full py-4">
                 <div className="absolute w-20 h-20 border border-[var(--accent-glow)] rounded-full animate-[spin_30s_linear_infinite] opacity-10 group-hover:opacity-30 group-hover:border-[var(--accent-bright)]"></div>
                 <div className={`relative p-5 rounded-full border border-[var(--accent-glow)] bg-black/50 shadow-xl transition-all duration-1000 group-hover:scale-[1.15] group-hover:border-[var(--accent-bright)] ${styles.accent}`}>
                    <IconComponent size={28} strokeWidth={1} />
                 </div>
              </div>

              {/* Footer */}
              <div className="w-full flex flex-col items-center">
                <p className="text-[12px] text-[var(--accent)] font-montserrat leading-tight mb-4 italic opacity-40 group-hover:opacity-80 group-hover:text-[var(--accent-bright)] transition-all line-clamp-2">
                  {lang === 'ru' ? deck.description : deck.descriptionEn}
                </p>
                <div className="h-9 w-full magical-gold-frame rounded-full flex items-center justify-center text-[10px] font-black tracking-[0.4em] uppercase text-[var(--accent)] group-hover:text-black group-hover:bg-[var(--accent-bright)] transition-all">
                  {lang === 'ru' ? 'ВЫБРАТЬ' : 'SELECT'}
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default DeckSelector;
