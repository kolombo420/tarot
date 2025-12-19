
import React, { useState, useRef } from 'react';
import { TarotCard, DeckInfo, ReadingState, ReadingType, RitualCategoryInfo } from './types';
import { MAJOR_ARCANA, CATEGORY_READINGS, DECKS } from './constants';
import { generateTarotCardImage } from './services/geminiService';
import { translations, Language } from './translations';
import RitualCategorySelector from './components/RitualCategorySelector';
import DeckSelector from './components/DeckSelector';
import LoadingScreen from './components/LoadingScreen';
import TarotCardItem from './components/TarotCardItem';
import RitualItemPicker from './components/CardPicker';
import RitualTuning from './components/RitualTuning';
import { Download, RefreshCw, ArrowLeft, Sun, Compass, Ghost, Gem, Telescope, Skull, Heart, Sparkles, Languages, Eye } from 'lucide-react';

const MysticLogo = () => (
  <div className="relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-6 group cursor-pointer">
    {/* Crescent Moon Path */}
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
      <path 
        d="M50,10 A40,40 0 1,1 50,90 A30,30 0 1,0 50,10" 
        fill="none" 
        stroke="url(#goldGradient)" 
        strokeWidth="1.5"
        className="animate-[spin_20s_linear_infinite]"
      />
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f9e29c" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#a67c00" />
        </linearGradient>
      </defs>
      {/* Eye shape in center */}
      <g className="translate-x-[25] translate-y-[35] scale-[0.5]">
        <path d="M10,50 Q50,10 90,50 Q50,90 10,50 Z" fill="none" stroke="#d4af37" strokeWidth="2" />
        <circle cx="50" cy="50" r="12" fill="#d4af37" className="animate-pulse" />
        <circle cx="50" cy="50" r="4" fill="black" />
      </g>
    </svg>
    <div className="absolute inset-0 border border-[#d4af3711] rounded-full scale-125 animate-ping opacity-20"></div>
  </div>
);

const App: React.FC = () => {
  const [state, setState] = useState<ReadingState>({
    lang: 'ru',
    category: null,
    cards: [],
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
  });
  
  const spreadRef = useRef<HTMLDivElement>(null);
  const t = translations[state.lang];

  const setPhase = (phase: ReadingState['phase']) => setState(prev => ({ ...prev, phase }));
  const toggleLang = () => setState(prev => ({ ...prev, lang: prev.lang === 'ru' ? 'en' : 'ru' }));

  const handleSelectCategory = (cat: RitualCategoryInfo) => {
    setState(prev => ({ ...prev, category: cat.id, phase: cat.id === 'TAROT' ? 'DECK' : 'TYPE' }));
  };

  const handleSelectDeck = (deck: DeckInfo) => {
    setState(prev => ({ ...prev, deck, phase: 'TYPE' }));
  };

  const handleSelectType = (readingType: ReadingType) => {
    setState(prev => ({ ...prev, readingType, phase: 'TARGET' }));
  };

  const handleRitualComplete = (photo: string | null, photo2: string | null, spell: string | null, positive: string | null) => {
    setState(prev => ({ ...prev, targetPhoto: photo, targetPhoto2: photo2, spellQuery: spell, positiveQuery: positive, phase: 'PICK' }));
  };

  const handlePickItem = (index: number) => {
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
          let categoryPrompt = "";
          switch(state.category) {
            case 'HEX': 
              categoryPrompt = "Dark occult aesthetics, cursed objects, black and red colors, horror, necrotic symbols.";
              break;
            case 'LOVE':
              categoryPrompt = "Passionate baroque art, red and gold, romantic spells, heart symbols, intense obsession.";
              break;
            case 'DIVINATION':
              categoryPrompt = "Ethereal purple and silver, cosmic nebulae, rune stones, celestial light, mystical clarity.";
              break;
            default:
              categoryPrompt = state.deck?.aiPromptStyle || "";
          }

          let contextualPrompt = `${categoryPrompt}. Language: ${state.lang}. Theme: ${state.spellQuery || "General"}. Outcome: ${state.positiveQuery || "Success"}.`;
          if (state.targetPhoto && state.targetPhoto2) {
             contextualPrompt += " Relationship ritual between two individuals.";
          }
          const imageUrl = await generateTarotCardImage(state.lang === 'ru' ? card.nameRu : card.name, contextualPrompt);
          return { ...card, imageUrl, revealed: false };
        })
      );
      setState(prev => ({ ...prev, cards: cardsWithImages, loading: false, phase: 'RESULT' }));
    } catch (err) {
      setState(prev => ({ ...prev, loading: false, error: state.lang === 'ru' ? "Космос временно недоступен..." : "The cosmos is temporarily unavailable..." }));
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
    link.download = `ritual-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const reset = () => {
    setState(prev => ({
      ...prev,
      cards: [],
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
    <div className="min-h-screen flex flex-col p-4 md:p-8 relative overflow-x-hidden bg-[#0a0a12]">
      {state.loading && <LoadingScreen />}

      <button 
        onClick={toggleLang}
        className="fixed top-8 right-8 z-50 p-3 bg-black/40 border border-[#d4af3733] text-[#f9e29c] rounded-full hover:bg-[#d4af3722] transition-all flex items-center gap-2 backdrop-blur-md font-cinzel text-[10px] tracking-widest"
      >
        <Languages size={14} /> {state.lang === 'ru' ? 'EN' : 'RU'}
      </button>

      <header className="relative pt-8 pb-12 text-center animate-fadeIn z-10">
        <MysticLogo />
        <h1 className="text-4xl md:text-6xl font-cinzel font-bold tracking-[0.2em] gold-gradient-text uppercase py-2">
          {t.title}
        </h1>
        <p className="text-xs md:text-sm font-playfair italic text-[#d4af3766] tracking-[0.4em] uppercase mt-2">
          {t.subtitle}
        </p>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full relative z-10 px-4">
        {state.phase === 'CATEGORY' && (
          <div className="animate-fadeIn py-12">
            <h2 className="text-center text-3xl font-playfair italic text-[#f9e29c] mb-16 tracking-widest uppercase opacity-80">
               {t.selectPath}
            </h2>
            <RitualCategorySelector onSelect={handleSelectCategory} lang={state.lang} />
          </div>
        )}

        {state.phase === 'DECK' && (
          <div className="animate-fadeIn">
             <button onClick={() => setPhase('CATEGORY')} className="flex items-center gap-3 text-[#d4af3766] hover:text-[#f9e29c] mb-12 transition-all font-cinzel text-[10px] tracking-[0.3em] uppercase">
               <ArrowLeft size={14} /> {t.toCategory}
             </button>
             <h2 className="text-center text-3xl font-playfair italic text-[#f9e29c] mb-16 uppercase tracking-widest">{t.selectDeck}</h2>
             <DeckSelector onSelect={handleSelectDeck} selectedDeckId={null} lang={state.lang} />
          </div>
        )}

        {state.phase === 'TYPE' && (
          <div className="animate-fadeIn max-w-5xl mx-auto">
             <button onClick={() => setPhase(state.category === 'TAROT' ? 'DECK' : 'CATEGORY')} className="flex items-center gap-3 text-[#d4af3766] hover:text-[#f9e29c] mb-12 transition-all font-cinzel text-[10px] tracking-[0.3em] uppercase">
               <ArrowLeft size={14} /> {t.back}
             </button>
             <h2 className="text-center text-4xl font-cinzel gold-gradient-text mb-20 uppercase tracking-[0.2em]">{t.selectType}</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                {(CATEGORY_READINGS[state.category!] || []).map(type => (
                  <button 
                    key={type.id}
                    onClick={() => handleSelectType(type)}
                    className="p-12 ornate-card rounded-[3rem] border border-[#d4af3711] hover:border-[#d4af37] transition-all duration-700 text-center flex flex-col items-center group relative overflow-hidden h-96 justify-center"
                  >
                    <div className="text-5xl mb-8 text-[#f9e29c] group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100">
                      {state.category === 'HEX' ? <Skull size={56} strokeWidth={1} /> : state.category === 'LOVE' ? <Heart size={56} strokeWidth={1} /> : state.category === 'DIVINATION' ? <Sparkles size={56} strokeWidth={1} /> : <Sun size={56} strokeWidth={1} />}
                    </div>
                    <h3 className="text-2xl font-cinzel font-bold text-[#f9e29c] mb-4 tracking-widest">{state.lang === 'ru' ? type.title : type.titleEn}</h3>
                    <p className="text-[11px] text-gray-500 font-medium italic mb-8 leading-relaxed opacity-80 uppercase tracking-tighter">{state.lang === 'ru' ? type.description : type.descriptionEn}</p>
                    <div className="mt-4 px-6 py-2 border border-[#d4af3722] rounded-full text-[9px] text-[#d4af37] font-bold uppercase tracking-[0.3em] group-hover:bg-[#d4af3711]">
                      {type.count} {t.items}
                    </div>
                  </button>
                ))}
             </div>
          </div>
        )}

        {state.phase === 'TARGET' && (
          <div className="animate-fadeIn">
            <button onClick={() => setPhase('TYPE')} className="flex items-center gap-3 text-[#d4af3766] hover:text-[#f9e29c] mb-12 transition-all font-cinzel text-[10px] tracking-[0.3em] uppercase">
               <ArrowLeft size={14} /> {t.back}
             </button>
            <RitualTuning 
              lang={state.lang}
              category={state.category!}
              onComplete={handleRitualComplete} 
              onSkip={() => setState(prev => ({ ...prev, phase: 'PICK' }))} 
            />
          </div>
        )}

        {state.phase === 'PICK' && state.readingType && (
          <div className="animate-fadeIn">
             <button onClick={() => setPhase('TARGET')} className="flex items-center gap-3 text-[#d4af3766] hover:text-[#f9e29c] mb-12 transition-all font-cinzel text-[10px] tracking-[0.3em] uppercase">
               <ArrowLeft size={14} /> {t.back}
             </button>
             <RitualItemPicker 
               lang={state.lang}
               countNeeded={state.readingType.count} 
               countSelected={state.selectedIndices.length} 
               onPick={handlePickItem}
               selectedIndices={state.selectedIndices}
             />
          </div>
        )}

        {state.phase === 'RESULT' && (
          <div className="flex flex-col items-center gap-16 animate-fadeIn pb-32">
            <div ref={spreadRef} className="p-12 md:p-24 rounded-[5rem] bg-[#0a0a12] border-2 border-[#d4af3722] w-full shadow-2xl relative overflow-hidden">
              <div className="text-center mb-20 relative z-10 flex flex-col items-center">
                <div className="flex flex-col md:flex-row gap-12 items-center mb-12">
                  <div className="flex gap-4">
                    {state.targetPhoto && (
                      <div className="w-32 h-32 rounded-full border border-[#d4af3766] overflow-hidden shadow-lg shrink-0">
                        <img src={state.targetPhoto} alt="Subject 1" className="w-full h-full object-cover grayscale sepia brightness-90" />
                      </div>
                    )}
                    {state.targetPhoto2 && (
                      <div className="w-32 h-32 rounded-full border border-[#d4af3766] overflow-hidden shadow-lg shrink-0 -ml-8 bg-black">
                        <img src={state.targetPhoto2} alt="Subject 2" className="w-full h-full object-cover grayscale sepia brightness-90" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-4 max-w-xl text-left border-l border-[#d4af3722] pl-8">
                    {state.spellQuery && (
                      <div className="bg-white/5 p-6 rounded-[2rem] border border-[#d4af3711]">
                        <p className="text-[#f9e29c] font-playfair italic text-lg leading-relaxed">«{state.spellQuery}»</p>
                      </div>
                    )}
                    {state.positiveQuery && (
                      <div className="p-4 rounded-[2rem] text-[#d4af37aa] font-cinzel text-[10px] uppercase tracking-[0.3em]">
                        {state.lang === 'ru' ? 'ВЕКТОР ИСХОДА' : 'OUTCOME VECTOR'}: {state.positiveQuery}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-[#d4af3733] font-cinzel text-[9px] tracking-[1em] uppercase mb-4">{t.protocol}</div>
                <h2 className="text-5xl md:text-7xl font-cinzel font-bold gold-gradient-text uppercase tracking-widest">
                  {state.lang === 'ru' ? state.readingType?.title : state.readingType?.titleEn}
                </h2>
              </div>
              
              <div className={`grid grid-cols-1 md:grid-cols-${Math.min(state.cards.length, 3)} gap-16 max-w-7xl mx-auto items-start relative z-10`}>
                {state.cards.map((card, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-full max-w-[320px] mb-12 shadow-2xl rounded-3xl overflow-hidden border border-[#d4af3722]">
                      <TarotCardItem card={card} index={idx} onReveal={() => handleRevealCard(idx)} lang={state.lang} />
                    </div>
                    {card.revealed && (
                      <div className="text-center animate-fadeIn px-8 py-10 rounded-[3rem] border border-[#d4af3711] w-full backdrop-blur-md bg-white/[0.02]">
                        <h3 className="text-2xl font-cinzel font-bold text-[#f9e29c] mb-6 uppercase tracking-widest">{state.lang === 'ru' ? card.nameRu : card.name}</h3>
                        <p className="text-sm text-[#e2e2d5aa] leading-relaxed font-medium italic">
                          {card.description}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              <button onClick={reset} className="px-10 py-5 bg-white/5 hover:bg-white/10 text-[#d4af3766] rounded-full border border-[#d4af3722] font-cinzel font-bold uppercase tracking-[0.3em] text-[10px] flex items-center gap-4 transition-all">
                <RefreshCw size={16} /> {t.reset}
              </button>
              <button onClick={handleDownload} className="px-14 py-5 bg-[#d4af37] hover:bg-[#f9e29c] text-[#0a0a12] font-cinzel font-black rounded-full transition-all shadow-xl uppercase tracking-[0.4em] text-[10px] flex items-center gap-4">
                <Download size={16} /> {t.archive}
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="py-24 border-t border-[#d4af3708] text-center text-[#d4af3711] text-[9px] tracking-[1.5em] font-cinzel font-bold uppercase relative z-0">
        <p>✧ PRECESSIO • SYZYGIA • ASCENDANT ✧</p>
      </footer>
    </div>
  );
};

export default App;
