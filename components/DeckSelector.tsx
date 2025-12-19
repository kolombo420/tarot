
import React from 'react';
import { DeckInfo } from '../types';
import { DECKS } from '../constants';
import { Crown, Sun, Eye } from 'lucide-react';

interface Props {
  onSelect: (deck: DeckInfo) => void;
  selectedDeckId: string | null;
}

const DeckSelector: React.FC<Props> = ({ onSelect, selectedDeckId }) => {
  const getDeckStyle = (id: string) => {
    switch (id) {
      case 'VISCONTI':
        return {
          container: 'border-yellow-600/40 bg-gradient-to-br from-[#2a1e0a] to-[#0a0a12]',
          accent: 'text-yellow-500',
          Icon: Crown,
          border: 'border-double border-4 border-yellow-600/30'
        };
      case 'MARSEILLE':
        return {
          container: 'border-red-900/40 bg-gradient-to-br from-[#1a0a0a] to-[#0a0a12]',
          accent: 'text-red-500',
          Icon: Sun,
          border: 'border-2 border-red-800/20'
        };
      case 'PAPUS':
        return {
          container: 'border-blue-900/40 bg-gradient-to-br from-[#0a0e1a] to-[#0a0a12]',
          accent: 'text-blue-400',
          Icon: Eye,
          border: 'border-[1px] border-blue-400/20'
        };
      default:
        return { container: '', accent: '', Icon: Sun, border: '' };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl mx-auto p-4">
      {DECKS.map((deck) => {
        const styles = getDeckStyle(deck.id);
        const IconComponent = styles.Icon;
        return (
          <button
            key={deck.id}
            onClick={() => onSelect(deck)}
            className={`relative group p-10 rounded-[2.5rem] transition-all duration-700 text-left overflow-hidden shadow-2xl ${styles.container} ${
              selectedDeckId === deck.id
                ? 'ring-2 ring-yellow-400 scale-105 z-10'
                : 'hover:translate-y-[-8px] hover:shadow-yellow-500/10'
            }`}
          >
            {/* Historical Flourish Overlay */}
            <div className={`absolute inset-3 rounded-[2rem] pointer-events-none ${styles.border}`}></div>
            
            {/* Corner Accents */}
            <div className={`absolute top-6 left-6 opacity-30 ${styles.accent}`}>✦</div>
            <div className={`absolute bottom-6 right-6 opacity-30 ${styles.accent}`}>✦</div>
            
            <div className="relative z-10">
              <div className={`mb-8 transition-transform duration-700 group-hover:scale-110 flex justify-center md:justify-start ${styles.accent}`}>
                <div className="p-6 border-2 border-current rounded-full bg-black/40 backdrop-blur-sm shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] engraving-effect">
                  <IconComponent size={64} strokeWidth={1} />
                </div>
              </div>
              
              <h3 className={`text-2xl font-cinzel font-bold mb-4 tracking-wider ${deck.id === 'VISCONTI' ? 'gold-gradient-text' : 'text-[#f9e29c]'}`}>
                {deck.title}
              </h3>
              
              <p className="text-sm text-gray-400 leading-relaxed font-medium italic mb-6">
                {deck.description}
              </p>
              
              <div className={`flex items-center gap-2 text-[10px] font-cinzel font-bold uppercase tracking-[0.3em] ${styles.accent}`}>
                <span className="w-8 h-[1px] bg-current opacity-30"></span>
                <span>Выбрать канон</span>
                <span className="w-8 h-[1px] bg-current opacity-30"></span>
              </div>
            </div>

            {/* Background Texture Effect */}
            <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity rotate-12 pointer-events-none engraving-effect">
              <IconComponent size={240} strokeWidth={0.5} />
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default DeckSelector;
