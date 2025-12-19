
import React, { useState, useRef } from 'react';
import { TarotCard, DeckInfo, ReadingState, ReadingType } from './types';
import { MAJOR_ARCANA, READING_TYPES } from './constants';
import { generateTarotCardImage } from './services/geminiService';
import DeckSelector from './components/DeckSelector';
import LoadingScreen from './components/LoadingScreen';
import TarotCardItem from './components/TarotCardItem';
import CardPicker from './components/CardPicker';
import { Sparkles, Moon, Download, RefreshCw, ArrowLeft, Sun, Compass, Ghost, Gem } from 'lucide-react';

const OrnateDivider = () => (
  <div className="flex items-center justify-center gap-6 my-8 opacity-40">
    <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
    <div className="text-[#d4af37] scale-150 transform rotate-45">✧</div>
    <div className="h-[1px] w-32 bg-gradient-to-l from-transparent via-[#d4af37] to-transparent"></div>
  </div>
);

const AlchemyDecor = () => (
  <>
    <div className="alchemy-symbol top-[15%] left-[5%] text-7xl rotate-12">🜍</div>
    <div className="alchemy-symbol top-[25%] right-[8%] text-8xl -rotate-12">🜔</div>
    <div className="alchemy-symbol bottom-[20%] left-[10%] text-6xl rotate-45">☿</div>
    <div className="alchemy-symbol bottom-[15%] right-[5%] text-9xl -rotate-45">🜂</div>
    <div className="alchemy-symbol top-[50%] left-[2%] text-5xl">♈</div>
    <div className="alchemy-symbol top-[60%] right-[3%] text-5xl">♎</div>
  </>
);

const App: React.FC = () => {
  const [state, setState] = useState<ReadingState>({
    cards: [],
    deck: null,
    readingType: null,
    selectedIndices: [],
    loading: false,
    error: null,
    phase: 'DECK'
  });
  
  const spreadRef = useRef<HTMLDivElement>(null);

  const setPhase = (phase: ReadingState['phase']) => setState(prev => ({ ...prev, phase }));

  const handleSelectDeck = (deck: DeckInfo) => {
    setState(prev => ({ ...prev, deck, phase: 'TYPE' }));
  };

  const handleSelectType = (readingType: ReadingType) => {
    setState(prev => ({ ...prev, readingType, phase: 'PICK', selectedIndices: [] }));
  };

  const handlePickCard = (index: number) => {
    setState(prev => {
      const newIndices = [...prev.selectedIndices, index];
      const isComplete = newIndices.length === prev.readingType?.count;
      if (isComplete) {
        setTimeout(() => triggerGeneration(newIndices), 500);
      }
      return { ...prev, selectedIndices: newIndices };
    });
  };

  const triggerGeneration = async (indices: number[]) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const shuffled = [...MAJOR_ARCANA].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, indices.length);
      const cardsWithImages = await Promise.all(
        selected.map(async (card) => {
          const imageUrl = await generateTarotCardImage(card.name, state.deck!.aiPromptStyle);
          return { ...card, imageUrl, revealed: false };
        })
      );
      setState(prev => ({ ...prev, cards: cardsWithImages, loading: false, phase: 'RESULT' }));
    } catch (err) {
      setState(prev => ({ ...prev, loading: false, error: "Космос временно недоступен..." }));
    }
  };

  const handleRevealCard = (index: number) => {
    setState(prev => ({
      ...prev,
      cards: prev.cards.map((c, i) => i === index ? { ...c, revealed: true } : c)
    }));
  };

  const handleDownload = async () => {
    if (!spreadRef.current) return;
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(spreadRef.current, { backgroundColor: '#0a0a12', scale: 2 });
    const link = document.createElement('a');
    link.download = `tarot-reading.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const reset = () => {
    setState({
      cards: [],
      deck: null,
      readingType: null,
      selectedIndices: [],
      loading: false,
      error: null,
      phase: 'DECK'
    });
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 relative">
      <AlchemyDecor />
      {state.loading && <LoadingScreen />}

      {/* Main Header */}
      <header className="relative py-12 mb-8 text-center animate-fadeIn">
        <div className="inline-block relative">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-yellow-500 animate-mystic scale-150">
            <Compass size={48} strokeWidth={1} />
          </div>
          <h1 className="text-6xl md:text-8xl font-cinzel font-bold tracking-[0.1em] gold-gradient-text uppercase py-4 relative z-10">
            СКАМ ТАРО
          </h1>
          <div className="text-xl md:text-3xl font-playfair italic text-[#d4af37aa] tracking-[0.2em] mt-[-1rem] drop-shadow-lg">
            для профессионального эскорта
          </div>
        </div>
        <OrnateDivider />
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full relative z-10">
        {state.phase === 'DECK' && (
          <div className="animate-fadeIn">
            <h2 className="text-center text-4xl font-playfair italic text-[#f9e29c] mb-16 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
               Призовите голос предков...
            </h2>
            <DeckSelector onSelect={handleSelectDeck} selectedDeckId={null} />
          </div>
        )}

        {state.phase === 'TYPE' && (
          <div className="animate-fadeIn max-w-4xl mx-auto">
             <button onClick={() => setPhase('DECK')} className="flex items-center gap-3 text-[#d4af37] hover:text-[#f9e29c] mb-12 transition-all group font-cinzel text-sm tracking-[0.3em]">
               <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" /> НАЗАД К ИСТОКАМ
             </button>
             <h2 className="text-center text-5xl font-playfair italic gold-gradient-text mb-16 drop-shadow-xl">Какой путь вы ищете?</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {READING_TYPES.map(type => (
                  <button 
                    key={type.id}
                    onClick={() => handleSelectType(type)}
                    className="p-12 ornate-card rounded-[3rem] border-2 border-[#d4af3722] hover:border-[#d4af37] transition-all duration-700 text-center group flex flex-col items-center relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-[#d4af3705] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="text-6xl mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 text-[#f9e29c]">
                      {type.count === 1 ? <Sun size={54} strokeWidth={1} /> : type.count === 3 ? <Compass size={54} strokeWidth={1} /> : <Ghost size={54} strokeWidth={1} />}
                    </div>
                    <h3 className="text-2xl font-cinzel font-bold text-[#f9e29c] mb-6 tracking-widest">{type.title}</h3>
                    <p className="text-sm text-gray-400 font-medium italic mb-8 leading-relaxed px-2">{type.description}</p>
                    <div className="mt-auto px-8 py-3 bg-[#d4af3711] rounded-full border border-[#d4af3733] text-[10px] text-[#d4af37] font-bold uppercase tracking-[0.4em] shadow-lg group-hover:bg-[#d4af3722] transition-colors">
                      {type.count} АРКАНА
                    </div>
                  </button>
                ))}
             </div>
          </div>
        )}

        {state.phase === 'PICK' && state.readingType && (
          <div className="animate-fadeIn">
            <button onClick={() => setPhase('TYPE')} className="flex items-center gap-3 text-[#d4af37] hover:text-[#f9e29c] mb-12 transition-all group font-cinzel text-sm tracking-[0.3em] uppercase">
               <ArrowLeft size={18} /> К ВЫБОРУ ПУТИ
             </button>
             <CardPicker 
               countNeeded={state.readingType.count} 
               countSelected={state.selectedIndices.length} 
               onPick={handlePickCard}
               selectedIndices={state.selectedIndices}
             />
          </div>
        )}

        {state.phase === 'RESULT' && (
          <div className="flex flex-col items-center gap-16 animate-fadeIn pb-32">
            <div ref={spreadRef} className="p-12 md:p-24 rounded-[5rem] bg-[#0a0a12] border-2 border-[#d4af3722] w-full shadow-[0_40px_100px_rgba(0,0,0,0.9)] relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#d4af3766] to-transparent"></div>
              
              <div className="absolute top-12 left-12 text-[#d4af3711] animate-pulse"><Compass size={80} strokeWidth={0.5} /></div>
              <div className="absolute bottom-12 right-12 text-[#d4af3711] animate-pulse"><Gem size={80} strokeWidth={0.5} /></div>
              
              <div className="text-center mb-24 relative z-10">
                <span className="text-[#d4af37] font-cinzel font-bold uppercase tracking-[0.8em] text-xs block mb-6 animate-mystic">Прорицание</span>
                <h2 className="text-6xl md:text-8xl font-cinzel font-bold gold-gradient-text uppercase tracking-tighter">
                  {state.readingType?.title}
                </h2>
                <div className="flex items-center justify-center gap-6 mt-10">
                  <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#d4af3744]"></div>
                  <p className="text-[#d4af37aa] font-playfair italic text-2xl tracking-widest">
                    Канон: {state.deck?.title}
                  </p>
                  <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#d4af3744]"></div>
                </div>
              </div>
              
              <div className={`grid grid-cols-1 md:grid-cols-${Math.min(state.cards.length, 3)} gap-20 max-w-7xl mx-auto items-start relative z-10`}>
                {state.cards.map((card, idx) => (
                  <div key={idx} className="flex flex-col items-center group">
                    <div className="w-full max-w-[340px] mb-14 shadow-[0_30px_70px_rgba(0,0,0,1)] rounded-3xl transform transition-transform duration-500 hover:scale-105">
                      <TarotCardItem 
                        card={card} 
                        index={idx} 
                        onReveal={() => handleRevealCard(idx)}
                      />
                    </div>
                    {card.revealed && (
                      <div className="text-center animate-fadeIn px-8 bg-black/40 py-10 rounded-[3rem] border border-[#d4af3711] backdrop-blur-md shadow-inner">
                        <span className="text-[10px] text-[#d4af37aa] uppercase tracking-[0.5em] font-bold block mb-4">Значение Аркана</span>
                        <h3 className="text-4xl font-cinzel font-bold text-[#f9e29c] mb-6 tracking-widest drop-shadow-lg">{card.nameRu}</h3>
                        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#d4af3766] to-transparent mx-auto mb-8"></div>
                        <p className="text-xl text-[#e2e2d5] leading-relaxed font-medium italic max-w-sm drop-shadow">
                          {card.description}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-10 mt-6 relative z-10">
              <button
                onClick={reset}
                className="flex items-center gap-4 px-12 py-6 bg-white/5 hover:bg-white/10 text-[#d4af37] rounded-full transition-all border border-[#d4af3744] font-cinzel font-bold uppercase tracking-[0.3em] text-sm group"
              >
                <RefreshCw size={22} className="group-hover:rotate-180 transition-transform duration-700" />
                <span>ОЧИСТИТЬ РАЗУМ</span>
              </button>
              
              <button
                onClick={handleDownload}
                className="flex items-center gap-5 px-16 py-6 bg-[#d4af37] hover:bg-[#f9e29c] text-[#0a0a12] font-cinzel font-black rounded-full transition-all shadow-[0_20px_60px_rgba(212,175,55,0.5)] uppercase tracking-[0.4em] text-sm transform hover:scale-105 active:scale-95"
              >
                <Download size={24} />
                <span>ЗАПЕЧАТЛЕТЬ СУДЬБУ</span>
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="py-24 border-t border-[#d4af3711] text-center text-[#d4af3733] text-[11px] tracking-[1em] font-cinzel font-bold uppercase relative z-10">
        <p>✧ ИЗ ЗНАНИЯ • К ЗВЕЗДАМ • ТАЙНА ✧</p>
      </footer>
    </div>
  );
};

export default App;
