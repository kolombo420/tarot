
import React, { useState, useRef } from 'react';
import { TarotCard, DeckInfo, ReadingState, ReadingType, RitualCategoryInfo } from './types';
import { MAJOR_ARCANA, CATEGORY_READINGS } from './constants';
import { generateTarotCardImage, generateReadingInterpretation } from './services/geminiService';
import { translations, Language } from './translations';
import RitualCategorySelector from './components/RitualCategorySelector';
import DeckSelector from './components/DeckSelector';
import LoadingScreen from './components/LoadingScreen';
import TarotCardItem from './components/TarotCardItem';
import RitualItemPicker from './components/CardPicker';
import RitualTuning from './components/RitualTuning';
import { RefreshCw, ArrowLeft, Languages, Info } from 'lucide-react';

const UnifiedMysticHeader = ({ lang }: { lang: Language }) => {
  const t = translations[lang];
  return (
    <div className="relative flex flex-col items-center justify-center py-2 group cursor-default z-20 shrink-0">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-12 h-12 mb-2 transition-transform duration-1000 group-hover:scale-110">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            <path 
              d="M50,10 A40,40 0 1,1 50,90 A30,30 0 1,0 50,10" 
              fill="none" 
              stroke="url(#goldGradientApp)" 
              strokeWidth="1.5"
              className="animate-[spin_40s_linear_infinite]"
            />
            <defs>
              <linearGradient id="goldGradientApp" x1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f9e29c" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#a67c00" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="8" fill="#d4af37" className="animate-pulse" />
          </svg>
        </div>
        <h1 className="text-xl md:text-3xl font-cinzel font-black tracking-[0.4em] gold-gradient-text uppercase leading-none drop-shadow-2xl">
          {t.title}
        </h1>
        <p className="text-[6px] md:text-[8px] font-montserrat font-bold text-[#f9e29c] tracking-[0.5em] uppercase opacity-40 mt-1">
          {t.subtitle}
        </p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [state, setState] = useState<ReadingState>({
    lang: 'ru',
    category: null,
    cards: [],
    readingOutcome: null,
    deck: null,
    readingType: null,
    targetPhoto: null,
    targetPhoto2: null,
    spellQuery: null,
    positiveQuery: null,
    selectedIndices: [],
    loading: false,
    error: null,
    phase: 'CATEGORY',
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const t = translations[state.lang];

  const toggleLang = () => setState(prev => ({ ...prev, lang: prev.lang === 'ru' ? 'en' : 'ru' }));

  const handleCategorySelect = (category: RitualCategoryInfo) => {
    setState(prev => ({ ...prev, category: category.id, phase: category.id === 'TAROT' ? 'DECK' : 'TARGET' }));
  };

  const handleDeckSelect = (deck: DeckInfo) => {
    setState(prev => ({ ...prev, deck, phase: 'TARGET' }));
  };

  const handleTuningComplete = (type: ReadingType, p1: string | null, p2: string | null, spell: string | null, positive: string | null) => {
    setState(prev => ({
      ...prev,
      readingType: type,
      targetPhoto: p1,
      targetPhoto2: p2,
      spellQuery: spell,
      positiveQuery: positive,
      phase: 'PICK'
    }));
  };

  const handleCardPick = async (index: number) => {
    if (state.selectedIndices.length >= (state.readingType?.count || 0)) return;
    
    const newIndices = [...state.selectedIndices, index];
    setState(prev => ({ ...prev, selectedIndices: newIndices }));

    if (newIndices.length === (state.readingType?.count || 0)) {
      await startReading(newIndices);
    }
  };

  const startReading = async (pickedIndices: number[]) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const shuffled = [...MAJOR_ARCANA].sort(() => 0.5 - Math.random());
      const selectedArcana = shuffled.slice(0, pickedIndices.length);

      const interpretationPromise = generateReadingInterpretation(
        state.lang,
        state.category!,
        state.readingType!.title,
        selectedArcana.map(c => state.lang === 'ru' ? c.nameRu : c.name),
        { spell: state.spellQuery, outcome: state.positiveQuery }
      );

      const imagePromises = selectedArcana.map(card => 
        generateTarotCardImage(state.lang === 'ru' ? card.nameRu : card.name, state.deck?.aiPromptStyle || 'Classic mystical')
      );

      const [interpResult, imageUrls] = await Promise.all([
        interpretationPromise,
        Promise.all(imagePromises)
      ]);

      const finalCards = selectedArcana.map((card, idx) => ({
        ...card,
        imageUrl: imageUrls[idx],
        interpretation: interpResult.cardInterpretations[idx] || card.description,
        revealed: false
      }));

      setState(prev => ({
        ...prev,
        cards: finalCards,
        readingOutcome: interpResult.outcome,
        loading: false,
        phase: 'RESULT'
      }));

    } catch (err) {
      console.error(err);
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: state.lang === 'ru' ? "Связь с астралом прервана..." : "Astral link severed..." 
      }));
    }
  };

  const handleRevealCard = (idx: number) => {
    setState(prev => ({
      ...prev,
      cards: prev.cards.map((c, i) => i === idx ? { ...c, revealed: true } : c)
    }));
  };

  const reset = () => {
    setState(prev => ({
      ...prev,
      cards: [],
      readingOutcome: null,
      deck: null,
      readingType: null,
      targetPhoto: null,
      targetPhoto2: null,
      spellQuery: null,
      positiveQuery: null,
      selectedIndices: [],
      loading: false,
      error: null,
      phase: 'CATEGORY'
    }));
  };

  return (
    <div className="h-screen flex flex-col p-2 relative overflow-hidden">
      {state.loading && <LoadingScreen />}

      <button 
        onClick={toggleLang}
        className="fixed top-3 right-3 z-50 px-3 py-1.5 bg-black/60 border border-[#d4af3744] text-[#f9e29c] rounded-full hover:bg-[#d4af3722] hover:border-[#d4af37] transition-all flex items-center gap-2 backdrop-blur-md font-montserrat text-[9px] tracking-widest uppercase font-bold shadow-2xl"
      >
        <Languages size={12} className="text-[#d4af37]" />
        {state.lang === 'ru' ? 'РУ' : 'EN'}
      </button>

      <header className="relative z-10 shrink-0 mb-2">
        <UnifiedMysticHeader lang={state.lang} />
      </header>

      <main className="flex-grow max-w-5xl mx-auto w-full relative z-10 px-2 flex flex-col overflow-hidden">
        {state.phase === 'CATEGORY' && (
          <div className="animate-fadeIn flex flex-col h-full gap-4 overflow-y-auto hide-scrollbar py-2">
            <div className="w-full">
              <RitualCategorySelector onSelect={handleCategorySelect} lang={state.lang} />
            </div>
          </div>
        )}

        {state.phase === 'DECK' && (
          <div className="animate-fadeIn flex flex-col items-center h-full overflow-y-auto hide-scrollbar py-2">
             <button onClick={() => setState(prev => ({ ...prev, phase: 'CATEGORY' }))} className="self-start flex items-center gap-2 text-[#d4af3766] hover:text-[#f9e29c] mb-4 transition-all font-montserrat text-[10px] tracking-[0.2em] uppercase group">
               <ArrowLeft size={16} /> {t.toCategory}
             </button>
             <h2 className="text-xl font-cinzel font-bold text-[#f9e29c] mb-6 uppercase tracking-[0.2em]">{t.selectDeck}</h2>
             <DeckSelector onSelect={handleDeckSelect} selectedDeckId={null} lang={state.lang} />
          </div>
        )}

        {state.phase === 'TARGET' && (
          <div className="animate-fadeIn h-full flex flex-col py-2">
            <button onClick={() => setState(prev => ({ ...prev, phase: state.category === 'TAROT' ? 'DECK' : 'CATEGORY' }))} className="self-start flex items-center gap-2 text-[#d4af3766] hover:text-[#f9e29c] mb-2 transition-all font-montserrat text-[10px] tracking-[0.2em] uppercase group">
               <ArrowLeft size={16} /> {t.back}
             </button>
            <RitualTuning 
              lang={state.lang}
              category={state.category!}
              readingTypes={CATEGORY_READINGS[state.category!] || []}
              onComplete={handleTuningComplete} 
              onSkip={() => setState(prev => ({ ...prev, phase: 'PICK' }))} 
            />
          </div>
        )}

        {state.phase === 'PICK' && (
          <div className="animate-fadeIn h-full overflow-hidden">
             <RitualItemPicker 
               lang={state.lang}
               countNeeded={state.readingType?.count || 1} 
               countSelected={state.selectedIndices.length} 
               onPick={handleCardPick}
               selectedIndices={state.selectedIndices}
             />
          </div>
        )}

        {state.phase === 'RESULT' && (
          <div ref={scrollRef} className="flex flex-col items-center gap-6 animate-fadeIn pb-12 h-full overflow-y-auto hide-scrollbar pt-2 scroll-smooth">
             <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
                <div className="text-center mb-10 w-full animate-fadeInUp">
                   <div className="text-[10px] font-cinzel font-bold text-[#d4af3766] tracking-[0.5em] uppercase mb-2">ПОСЛАНИЕ ЭФИРА</div>
                   <h2 className="text-xl md:text-3xl font-cinzel font-black gold-gradient-text uppercase tracking-widest leading-tight mb-4">
                     {state.lang === 'ru' ? state.readingType?.title : state.readingType?.titleEn}
                   </h2>
                   {state.readingOutcome && (
                     <div className="relative inline-block max-w-2xl px-6 py-4 bg-black/40 backdrop-blur-xl border border-[#d4af3722] rounded-3xl shadow-inner">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#d4af37] text-black rounded-full text-[8px] font-black tracking-widest uppercase">Prophecy</div>
                        <p className="text-xs md:text-sm text-[#f9e29c] italic font-playfair opacity-90 leading-relaxed">
                          "{state.readingOutcome}"
                        </p>
                     </div>
                   )}
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-${Math.min(state.cards.length, 3)} gap-8 w-full items-start px-2`}>
                  {state.cards.map((card, idx) => (
                    <div key={idx} className="flex flex-col gap-6 items-center">
                      <TarotCardItem card={card} index={idx} onReveal={() => handleRevealCard(idx)} lang={state.lang} />
                      
                      {card.revealed && (
                        <div className="animate-fadeIn w-full">
                           <div className="bg-black/60 backdrop-blur-2xl p-5 rounded-[1.5rem] border border-[#d4af3715] shadow-2xl relative overflow-hidden group hover:border-[#d4af3744] transition-all duration-500">
                             {/* Mini decorative sigil */}
                             <div className="absolute top-2 right-3 opacity-20 group-hover:opacity-40 transition-opacity">
                               <Info size={12} className="text-[#d4af37]" />
                             </div>

                             <h5 className="text-[9px] font-cinzel font-black text-[#d4af37] tracking-[0.2em] uppercase mb-3 border-b border-[#d4af3711] pb-2">Трактовка Аркана</h5>
                             
                             <div className="space-y-3">
                               <p className="text-[10px] md:text-[11px] text-gray-400 font-montserrat leading-relaxed opacity-60">
                                 <span className="text-[#f9e29c] font-bold uppercase mr-1">Базис:</span> 
                                 {card.description}
                               </p>
                               <p className="text-[11px] md:text-[13px] text-[#f9e29c] font-playfair italic leading-relaxed border-l-2 border-[#d4af3733] pl-3 py-1">
                                 {card.interpretation}
                               </p>
                             </div>
                           </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
             </div>

             <div className="flex gap-4 mt-8 pb-10">
                <button onClick={reset} className="px-8 py-2.5 bg-black/40 hover:bg-[#d4af3722] text-[#f9e29c] rounded-full border border-[#d4af3733] font-montserrat font-bold uppercase tracking-[0.3em] text-[10px] flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-xl">
                   <RefreshCw size={12} /> {t.reset}
                </button>
             </div>
          </div>
        )}
      </main>

      <footer className="py-2 border-t border-[#d4af3708] text-center text-[#d4af3711] text-[6px] md:text-[8px] tracking-[1em] font-cinzel font-bold uppercase relative z-0 mt-auto shrink-0">
        <p>✧ PRECESSIO • SYZYGIA • ASCENDANT ✧</p>
      </footer>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default App;
