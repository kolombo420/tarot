
import React from 'react';
import { DeckInfo } from '../types';
import { DECKS } from '../constants';
import { Crown, Sun, Eye } from 'lucide-react';

interface Props {
  onSelect: (deck: DeckInfo) => void;
  selectedDeckId: string | null;
  lang: 'ru' | 'en';
}

const DeckSelector: React.FC<Props> = ({ onSelect, selectedDeckId, lang }) => {
  const getDeckStyle = (id: string) => {
    switch (id) {
      case 'VISCONTI':
        return {
          container: 'border-yellow-600/40 bg-gradient-to-b from-[#1a140a] to-[#0a0a12]',
          accent: 'text-yellow-500',
          Icon: Crown,
          border: 'border-t-2 border-yellow-600/30'
        };
      case 'MARSEILLE':
        return {
          container: 'border-red-900/40 bg-gradient-to-b from-[#1a0a0a] to-[#0a0a12]',
          accent: 'text-red-500',
          Icon: Sun,
          border: 'border-t-2 border-red-800/20'
        };
      case 'PAPUS':
        return {
          container: 'border-blue-900/40 bg-gradient-to-b from-[#0a0e1a] to-[#0a0a12]',
          accent: 'text-blue-400',
          Icon: Eye,
          border: 'border-t-2 border-blue-400/20'
        };
      default:
        return { container: '', accent: '', Icon: Sun, border: '' };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto p-4">
      {DECKS.map((deck) => {
        const styles = getDeckStyle(deck.id);
        const IconComponent = styles.Icon;
        return (
          <button
            key={deck.id}
            onClick={() => onSelect(deck)}
            className={`relative group h-[500px] rounded-[3rem] transition-all duration-700 text-center overflow-hidden flex flex-col items-center p-10 ornate-card ${styles.container} ${
              selectedDeckId === deck.id ? 'ring-2 ring-yellow-400 scale-105 z-10' : 'hover:translate-y-[-10px]'
            }`}
          >
            {/* Header Area */}
            <div className="w-full mb-8">
              <div className="text-[10px] font-cinzel text-[#d4af3766] tracking-[0.4em] uppercase mb-3">{lang === 'ru' ? 'Канон' : 'Canon'}</div>
              <h3 className={`text-2xl font-cinzel font-bold tracking-widest leading-tight ${deck.id === 'VISCONTI' ? 'gold-gradient-text' : 'text-[#f9e29c]'}`}>
                {lang === 'ru' ? deck.title : deck.titleEn}
              </h3>
              <div className="h-[1px] w-12 bg-[#d4af3722] mx-auto mt-6"></div>
            </div>

            {/* Centered Icon */}
            <div className="flex-grow flex items-center justify-center">
              <div className={`p-6 rounded-full border border-current bg-black/40 backdrop-blur-sm transition-transform duration-700 group-hover:scale-110 ${styles.accent} opacity-80`}>
                <IconComponent size={32} strokeWidth={1} />
              </div>
            </div>

            {/* Description Area */}
            <div className="mt-auto w-full">
              <p className="text-sm text-gray-400 font-playfair italic leading-relaxed mb-10 px-6 opacity-80 group-hover:opacity-100">
                {lang === 'ru' ? deck.description : deck.descriptionEn}
              </p>
              <div className={`py-5 w-full rounded-2xl border border-[#d4af3722] font-cinzel text-[10px] tracking-[0.5em] uppercase transition-all group-hover:bg-[#d4af3722] group-hover:text-white ${styles.accent}`}>
                {lang === 'ru' ? 'Активировать' : 'Activate'}
              </div>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-6 left-6 text-[#d4af3711] group-hover:text-[#d4af3744] transition-colors">❈</div>
            <div className="absolute top-6 right-6 text-[#d4af3711] group-hover:text-[#d4af3744] transition-colors">❈</div>
            <div className="absolute bottom-6 left-6 text-[#d4af3711] group-hover:text-[#d4af3744] transition-colors">❈</div>
            <div className="absolute bottom-6 right-6 text-[#d4af3711] group-hover:text-[#d4af3744] transition-colors">❈</div>
          </button>
        );
      })}
    </div>
  );
};

export default DeckSelector;
