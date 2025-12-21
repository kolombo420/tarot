
import React, { useState, useRef, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { ReadingState, AppStyle, ReadingHistoryItem, UserProfile } from './types';
import { FULL_DECK, CATEGORY_READINGS } from './constants';
import { generateTarotCardImage, generateReadingInterpretation } from './services/geminiService';
import { translations } from './translations';
import RitualCategorySelector from './components/RitualCategorySelector';
import DeckSelector from './components/DeckSelector';
import LoadingScreen from './components/LoadingScreen';
import TarotCardItem from './components/TarotCardItem';
import RitualItemPicker from './components/CardPicker';
import RitualTuning from './components/RitualTuning';
import OracleChat from './components/OracleChat';
import { Eye, Clock, Palette, User, Home, ArrowLeft, ShieldCheck, Sparkles, AlertCircle, RefreshCcw } from 'lucide-react';

const STORAGE_KEY = 'oracle_user_data_v24';
const COOLDOWN_MS = 60 * 60 * 1000;

const INITIAL_USER: UserProfile = {
  xp: 0,
  level: 1,
  rank: "Неофит",
  lastDailyUpdate: null,
  lastReadingTimestamp: null,
  readingsCount: 0,
  energy: 1,
  maxEnergy: 1,
  isPro: false,
  firstReadingDone: false,
  preferredStyle: 'CELESTIAL',
  history: []
};

const MysticalHeader: React.FC<{ lang: string }> = ({ lang }) => {
  const t = translations[lang as 'ru' | 'en'];
  return (
    <header className="flex flex-col items-center justify-center mb-12 mt-0 select-none animate-fadeIn">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[var(--accent)] blur-3xl opacity-10 animate-pulse"></div>
        <Eye size={56} className="text-[var(--accent)] drop-shadow-[0_0_15px_var(--accent-glow)] animate-float-slow" strokeWidth={0.5} />
      </div>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl md:text-3xl font-cinzel font-black gold-gradient-text uppercase tracking-[0.3em] italic leading-tight mb-2">
          {t.title}
        </h1>
        <div className="flex items-center gap-4 w-full opacity-20">
          <div className="h-[1px] flex-grow bg-current"></div>
          <p className="text-[8px] tracking-[0.6em] uppercase font-bold whitespace-nowrap">
            {t.subtitle}
          </p>
          <div className="h-[1px] flex-grow bg-current"></div>
        </div>
      </div>
    </header>
  );
};

const App: React.FC = () => {
  const [state, setState] = useState<ReadingState>({
    lang: 'ru', appStyle: 'CELESTIAL', category: null, cards: [], readingOutcome: null, deck: null,
    readingType: null, targetPhoto: null, targetPhoto2: null, spellQuery: null,
    selectedIndices: [], loading: false, error: null,
    phase: 'CATEGORY', showLevelUp: false, soundEnabled: false, user: INITIAL_USER
  });

  const [charge, setCharge] = useState(0);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [scrollThumb, setScrollThumb] = useState({ top: 0, height: 0 });
  
  const chargeInterval = useRef<number | null>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  const revealedCount = state.cards.filter(c => c.revealed).length;
  const allCardsRevealed = state.cards.length > 0 && revealedCount === state.cards.length;

  useEffect(() => {
    const init = async () => {
      let savedUser = INITIAL_USER;
      try {
        const vkRes = await bridge.send("VKWebAppStorageGet", { keys: [STORAGE_KEY] });
        if (vkRes.keys?.[0]?.value) {
          savedUser = { ...INITIAL_USER, ...JSON.parse(vkRes.keys[0].value) };
        }
      } catch (e) {}
      setState(prev => ({ ...prev, user: savedUser, appStyle: savedUser.preferredStyle || 'CELESTIAL' }));
    };
    init();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (state.user.lastReadingTimestamp) {
        const diff = Date.now() - state.user.lastReadingTimestamp;
        setCooldownRemaining(Math.max(0, COOLDOWN_MS - diff));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [state.user.lastReadingTimestamp]);

  useEffect(() => {
    document.body.setAttribute('data-theme', state.appStyle);
  }, [state.appStyle]);

  const updateScrollInfo = () => {
    if (portalRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = portalRef.current;
      if (scrollHeight > clientHeight) {
        const hRatio = clientHeight / scrollHeight;
        const height = hRatio * clientHeight;
        const top = (scrollTop / scrollHeight) * clientHeight;
        setScrollThumb({ top, height });
      } else {
        setScrollThumb({ top: 0, height: 0 });
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(updateScrollInfo, 150);
    return () => clearTimeout(timer);
  }, [state.phase, state.cards, state.error]);

  const saveUser = (user: UserProfile) => {
    bridge.send("VKWebAppStorageSet", { key: STORAGE_KEY, value: JSON.stringify(user) }).catch(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    });
  };

  const startReading = async (pickedIndices: number[]) => {
    if (pickedIndices.length === 0) return;
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const shuffled = [...FULL_DECK].sort(() => 0.5 - Math.random());
      const count = state.readingType?.count || pickedIndices.length;
      const selectedArcana = shuffled.slice(0, count);

      const interpretation = await generateReadingInterpretation(
        state.lang, state.category || 'TAROT', state.readingType?.title || 'Unknown',
        selectedArcana.map(c => state.lang === 'ru' ? c.nameRu : c.name),
        { spell: state.spellQuery },
        state.appStyle
      );

      const images = await Promise.all(selectedArcana.map(card => 
        generateTarotCardImage(card.name, card.visualElements, state.deck?.aiPromptStyle || '', state.appStyle)
      ));

      const finalCards = selectedArcana.map((card, idx) => ({
        ...card, imageUrl: images[idx],
        interpretation: interpretation.cardInterpretations[idx] || (state.lang === 'ru' ? 'Тайна...' : 'Mystery...'),
        revealed: false
      }));

      const hItem: ReadingHistoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        category: state.category || 'TAROT',
        typeTitle: state.lang === 'ru' ? (state.readingType?.title || 'Ритуал') : (state.readingType?.titleEn || 'Ritual'),
        outcome: interpretation.outcome,
        cards: finalCards.map(c => ({ name: c.nameRu, imageUrl: c.imageUrl! })),
        style: state.appStyle
      };

      const xpGained = (state.readingType?.count || 1) * 200;
      const newUser = {
        ...state.user,
        xp: state.user.xp + xpGained,
        level: Math.floor((state.user.xp + xpGained) / 1000) + 1,
        readingsCount: state.user.readingsCount + 1,
        history: [hItem, ...state.user.history].slice(0, 30),
        lastReadingTimestamp: Date.now()
      };
      
      const rankIdx = Math.min(Math.floor(newUser.level / 5), translations[state.lang].ranks.length - 1);
      newUser.rank = translations[state.lang].ranks[rankIdx];

      saveUser(newUser);
      setState(prev => ({ ...prev, cards: finalCards, readingOutcome: interpretation.outcome, loading: false, phase: 'RESULT', user: newUser, error: null }));
    } catch (e) {
      console.error("Reading Error:", e);
      setState(prev => ({ ...prev, loading: false, error: state.lang === 'ru' ? "Эфир нестабилен. Попробуйте снова." : "Ether unstable. Please retry." }));
    }
  };

  const formatCooldown = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    return `${m}:${(s % 60).toString().padStart(2, '0')}`;
  };

  const t = translations[state.lang];
  const progress = (state.user.xp % 1000) / 10;

  return (
    <div className="h-full w-full flex flex-col relative overflow-hidden safe-area-inset bg-transparent">
      <div className="nebula"></div>
      
      {state.loading && <LoadingScreen />}
      
      {/* Top Navigation */}
      <div className="fixed top-2 left-0 right-0 z-[70] px-6 flex justify-center pointer-events-none">
        <div className="w-full max-w-[900px] flex justify-between items-center pointer-events-auto">
          <div className="flex gap-2">
            {state.phase !== 'CATEGORY' && (
              <button 
                onClick={() => {
                  const prevPhases: Record<string, any> = { 'DECK': 'CATEGORY', 'TARGET': state.category === 'TAROT' ? 'DECK' : 'CATEGORY', 'CONCENTRATE': 'TARGET', 'PICK': 'CONCENTRATE', 'RESULT': 'CATEGORY' };
                  setState(prev => ({ ...prev, phase: prevPhases[prev.phase] || 'CATEGORY', error: null }));
                }}
                className="w-10 h-10 magical-gold-frame rounded-lg flex items-center justify-center text-[var(--accent)] hover:text-[var(--accent-bright)]"
              >
                <ArrowLeft size={16} />
              </button>
            )}
            {state.phase !== 'CATEGORY' && (
              <button onClick={() => setState(prev => ({ ...prev, phase: 'CATEGORY', cards: [], selectedIndices: [], readingOutcome: null, error: null }))} className="w-10 h-10 magical-gold-frame rounded-lg flex items-center justify-center text-[var(--accent)] hover:text-[var(--accent-bright)]">
                <Home size={16} />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setState(prev => ({ ...prev, lang: prev.lang === 'ru' ? 'en' : 'ru' }))}
              className="w-10 h-10 magical-gold-frame rounded-lg flex items-center justify-center text-[var(--accent)] hover:text-[var(--accent-bright)]"
            >
              <span className="text-[10px] font-black font-cinzel tracking-wider uppercase">{state.lang}</span>
            </button>
            <button onClick={() => setState(prev => ({ ...prev, phase: 'HISTORY', error: null }))} className="w-10 h-10 magical-gold-frame rounded-lg flex items-center justify-center text-[var(--accent)] hover:text-[var(--accent-bright)]">
              <Clock size={16} />
            </button>
            <button onClick={() => {
                const styles: AppStyle[] = ['CELESTIAL', 'VOID', 'CHTHONIC'];
                const next = styles[(styles.indexOf(state.appStyle) + 1) % 3];
                setState(prev => ({ ...prev, appStyle: next }));
            }} className="w-10 h-10 magical-gold-frame rounded-lg flex items-center justify-center text-[var(--accent)] hover:text-[var(--accent-bright)]">
              <Palette size={16} />
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col items-center relative z-10 overflow-hidden pt-4">
        <div className="relative w-full max-w-[900px] mx-auto h-full overflow-hidden">
          
          <div className="left-scroll-indicator">
            <div 
              className="left-scroll-thumb"
              style={{ 
                top: `${scrollThumb.top}px`, 
                height: `${scrollThumb.height}px`,
                opacity: (scrollThumb.height > 0) ? 1 : 0
              }}
            ></div>
          </div>

          <div 
            ref={portalRef}
            onScroll={updateScrollInfo}
            className="square-portal overflow-y-auto custom-scrollbar md:px-0 pb-48"
          >
            {state.error && (
              <div className="animate-fadeIn p-8 mt-16 mx-6 magical-gold-frame rounded-[1.5rem] border-red-500/30 bg-red-950/20 flex flex-col items-center text-center gap-4">
                <AlertCircle className="text-red-500" size={32} />
                <p className="text-[14px] font-cinzel text-red-200 uppercase tracking-widest">{state.error}</p>
                <button 
                  onClick={() => setState(prev => ({ ...prev, phase: 'CATEGORY', error: null, cards: [], selectedIndices: [] }))}
                  className="px-8 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-full text-[10px] font-black tracking-widest text-red-200 transition-all flex items-center gap-2"
                >
                  <RefreshCcw size={14} />
                  {state.lang === 'ru' ? 'ВЕРНУТЬСЯ' : 'GO BACK'}
                </button>
              </div>
            )}

            {!state.error && state.phase === 'CATEGORY' && (
              <div className="animate-fadeIn flex flex-col gap-10 pt-12 px-6 md:px-0">
                <MysticalHeader lang={state.lang} />
                <RitualCategorySelector onSelect={(cat) => setState(prev => ({ ...prev, category: cat.id, phase: cat.id === 'TAROT' ? 'DECK' : 'TARGET' }))} lang={state.lang} />
                <OracleChat lang={state.lang} appStyle={state.appStyle} />
              </div>
            )}

            {!state.error && state.phase === 'HISTORY' && (
              <div className="animate-fadeIn space-y-6 pt-16 px-6">
                 <h2 className="text-3xl font-cinzel font-black gold-gradient-text text-center uppercase tracking-widest italic mb-8">Хроники Эфира</h2>
                 {state.user.history.length === 0 ? (
                   <div className="h-64 flex flex-col items-center justify-center opacity-20 text-center">
                     <ShieldCheck size={80} strokeWidth={0.5} className="mb-4 text-[var(--accent)]" />
                     <p className="font-cinzel text-lg tracking-[0.4em] uppercase text-[var(--accent)]">Архив пуст</p>
                   </div>
                 ) : (
                   state.user.history.map(item => (
                     <div key={item.id} className="magical-gold-frame p-8 rounded-[1.5rem] shadow-xl border-l-[3px] border-l-[var(--accent)] bg-black/40 group hover:border-l-[var(--accent-bright)] transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-[9px] text-[var(--accent)] font-black uppercase tracking-[0.3em] group-hover:text-[var(--accent-bright)]">{new Date(item.date).toLocaleDateString()}</span>
                            <h4 className="text-xl font-cinzel font-bold text-[var(--accent)] group-hover:text-[var(--accent-bright)] uppercase italic tracking-widest">{item.typeTitle}</h4>
                        </div>
                        <div className="text-[13px] leading-relaxed interpretation-render" dangerouslySetInnerHTML={{ __html: item.outcome }}></div>
                     </div>
                   ))
                 )}
              </div>
            )}

            {!state.error && state.phase === 'DECK' && (
              <div className="animate-fadeIn pt-16 px-6">
                 <div className="text-center mb-8 flex flex-col items-center">
                    <h2 className="text-xl md:text-2xl font-cinzel font-black gold-gradient-text uppercase tracking-widest italic leading-tight">{t.selectDeck}</h2>
                    <p className="text-[10px] font-black text-[var(--accent)] opacity-40 uppercase tracking-[0.4em] mt-2 italic">
                      {state.lang === 'ru' ? 'нажмите выбрать' : 'press to select'}
                    </p>
                 </div>
                 <DeckSelector onSelect={(d) => setState(prev => ({ ...prev, deck: d, phase: 'TARGET' }))} selectedDeckId={null} lang={state.lang} />
              </div>
            )}

            {!state.error && state.phase === 'TARGET' && (
              <div className="animate-fadeIn pt-16 px-6">
                 <RitualTuning lang={state.lang} category={state.category!} readingTypes={CATEGORY_READINGS[state.category!] || []} onComplete={(type, p1, p2, spell) => {
                    setState(prev => ({ ...prev, readingType: type, targetPhoto: p1, targetPhoto2: p2, spellQuery: spell, phase: 'CONCENTRATE' }));
                 }} cooldownRemaining={cooldownRemaining} onSkip={() => {}} />
              </div>
            )}

            {!state.error && state.phase === 'CONCENTRATE' && (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn py-16 px-6">
                 <h2 className="text-lg md:text-xl font-cinzel font-black gold-gradient-text uppercase tracking-widest mb-12 text-center max-w-[280px] mx-auto leading-snug animate-fadeIn">
                   {state.lang === 'ru' ? (
                     <>Удерживайте сферу<br/>для настройки энергии</>
                   ) : (
                     <>Hold the sphere<br/>to align energy</>
                   )}
                 </h2>
                 <div className="relative w-72 h-72 active:scale-95 transition-all duration-700 cursor-pointer flex items-center justify-center"
                      onMouseDown={() => chargeInterval.current = window.setInterval(() => setCharge(c => Math.min(100, c + 1.2)), 25)}
                      onMouseUp={() => { clearInterval(chargeInterval.current!); chargeInterval.current = null; }}
                      onTouchStart={() => chargeInterval.current = window.setInterval(() => setCharge(c => Math.min(100, c + 1.2)), 25)}
                      onTouchEnd={() => { clearInterval(chargeInterval.current!); chargeInterval.current = null; }}>
                    <div className="absolute inset-0 rounded-full border border-[var(--accent-glow)] animate-[spin_15s_linear_infinite]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-soft)] transition-all shadow-[0_0_100px_var(--accent)]" style={{ width: `${15 + charge*0.75}%`, height: `${15 + charge*0.75}%`, opacity: 0.15 + (charge/100)*0.85 }}></div>
                    </div>
                    {charge >= 100 ? (
                       <button 
                        onClick={() => {
                          setCharge(0); 
                          setState(prev => ({ ...prev, phase: 'PICK', selectedIndices: [] })); 
                        }} 
                        className="absolute z-20 px-12 py-6 bg-[var(--accent)] text-black font-black uppercase tracking-[0.4em] rounded-full animate-bounce text-xs shadow-[0_0_40px_var(--accent)]"
                       >
                         {state.lang === 'ru' ? 'ВОЙТИ В ЭФИР' : 'ENTER ETHER'}
                       </button>
                    ) : (
                      <div className="relative z-10 text-xl font-black text-[var(--accent)] uppercase tracking-[0.7em] animate-pulse">{Math.floor(charge)}%</div>
                    )}
                 </div>
              </div>
            )}

            {!state.error && state.phase === 'PICK' && (
              <div className="animate-fadeIn pt-8 flex flex-col h-full px-6">
                 <RitualItemPicker lang={state.lang} countNeeded={state.readingType?.count || 1} countSelected={state.selectedIndices.length} onPick={(idx) => {
                    const next = [...state.selectedIndices, idx];
                    setState(prev => ({ ...prev, selectedIndices: next }));
                    if (next.length === (state.readingType?.count || 0)) startReading(next);
                 }} selectedIndices={state.selectedIndices} />
              </div>
            )}

            {!state.error && state.phase === 'RESULT' && (
              <div className="animate-fadeIn pt-6 max-w-5xl mx-auto flex flex-col items-center px-6">
                 
                 <div className="text-center mb-12 w-full">
                    <div className="flex flex-col items-center mb-6">
                       <Sparkles size={20} className="text-[var(--accent)] mb-2 animate-pulse" />
                       <h3 className="text-[10px] font-black tracking-[0.6em] text-[var(--accent)] uppercase opacity-40">
                          {allCardsRevealed ? (state.lang === 'ru' ? 'РИТУАЛ ЗАВЕРШЕН' : 'RITUAL COMPLETE') : (state.lang === 'ru' ? 'ТАИНСТВО РАСКЛАДА' : 'SACRED SPREAD')}
                       </h3>
                    </div>

                    <div className={`flex flex-wrap justify-center gap-10 md:gap-16 w-full ${state.cards.length >= 3 ? 'grid grid-cols-1 sm:grid-cols-3' : 'flex'}`}>
                      {state.cards.map((c, i) => (
                        <div key={i} className="flex flex-col items-center gap-4 group">
                          <TarotCardItem 
                             card={c} 
                             index={i} 
                             onReveal={() => setState(prev => ({ ...prev, cards: prev.cards.map((card, idx) => idx === i ? { ...card, revealed: true } : card) }))} 
                             lang={state.lang} 
                          />
                          <div className={`transition-all duration-1000 transform ${c.revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}`}>
                            <div className="magical-gold-frame p-5 rounded-[1.5rem] text-[11px] leading-relaxed text-center italic text-[var(--accent)] group-hover:text-[var(--accent-bright)] w-full shadow-lg max-w-[240px] bg-black/60 transition-colors">
                              <div className="mb-2 text-[12px] font-cinzel font-black uppercase tracking-widest italic">{state.lang === 'ru' ? c.nameRu : c.name}</div>
                              <p className="opacity-70 line-clamp-3 group-hover:line-clamp-none transition-all duration-500">{c.interpretation}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                 </div>

                 <div className={`w-full transition-all duration-[1500ms] cubic-bezier(0.23, 1, 0.32, 1) ${allCardsRevealed ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-16 pointer-events-none'}`}>
                    <div className="magical-gold-frame p-10 md:p-14 rounded-[2.5rem] mb-20 shadow-2xl relative bg-black/80 backdrop-blur-3xl border-white/5 group">
                       <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-20 group-hover:opacity-40 transition-opacity">
                         <div className="w-16 h-[1px] bg-[var(--accent)]"></div>
                         <Eye size={24} className="text-[var(--accent)]" />
                         <div className="w-16 h-[1px] bg-[var(--accent)]"></div>
                       </div>
                       
                       <h2 className="text-2xl md:text-4xl font-cinzel font-black gold-gradient-text uppercase tracking-[0.2em] mb-10 text-center italic drop-shadow-xl">{t.oracleTitle}</h2>
                       
                       <div className="text-left interpretation-render max-w-[700px] mx-auto" dangerouslySetInnerHTML={{ __html: state.readingOutcome || '' }}></div>
                       
                       <div className="mt-14 flex flex-col items-center gap-8">
                         <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-glow)] to-transparent opacity-40"></div>
                         <button 
                           onClick={() => setState(prev => ({ ...prev, phase: 'CATEGORY', cards: [], selectedIndices: [], readingOutcome: null, error: null }))} 
                           className="w-full h-16 magical-gold-frame text-[var(--accent)] hover:text-black font-black uppercase tracking-[0.4em] rounded-full text-xs shadow-[0_0_20px_var(--accent-glow)] hover:bg-[var(--accent)] transition-all active:scale-95 flex items-center justify-center gap-3"
                         >
                             <Sparkles size={16} />
                             {t.reset}
                         </button>
                       </div>
                    </div>
                 </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Persistence Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-5 z-50 pointer-events-none flex justify-center">
        <div className="w-full max-w-[900px] flex flex-col gap-3 pointer-events-auto">
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
             <div className="h-full bg-gradient-to-r from-[var(--accent)] via-[var(--accent-soft)] to-[var(--accent)] transition-all duration-1000 shadow-[0_0_10px_var(--accent)]" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex justify-between items-center magical-gold-frame px-10 py-4 rounded-full shadow-2xl bg-black/90 group">
             <div className="flex items-center gap-5">
                <div className="w-10 h-10 bg-[var(--accent-glow)] rounded-lg flex items-center justify-center text-[var(--accent)] group-hover:text-[var(--accent-bright)] transition-colors"><User size={20} /></div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-[var(--accent)] opacity-40 uppercase tracking-[0.4em]">LVL {state.user.level}</span>
                  <span className="text-[12px] font-cinzel font-black gold-gradient-text uppercase tracking-[0.15em] italic leading-none">{state.user.rank}</span>
                </div>
             </div>
             <div className="flex flex-col items-end">
                <span className="text-[9px] font-black text-[var(--accent)] opacity-40 uppercase tracking-[0.4em] mb-0.5">{cooldownRemaining > 0 ? t.cooldown : t.ready}</span>
                <div className="flex items-center gap-2">
                   <Clock size={16} className={cooldownRemaining > 0 ? "text-[var(--accent)] animate-pulse" : "text-green-500"} />
                   <span className={`text-[12px] font-black font-cinzel tracking-wider ${cooldownRemaining > 0 ? 'text-[var(--accent)] group-hover:text-[var(--accent-bright)]' : 'text-green-500'}`}>
                     {cooldownRemaining > 0 ? formatCooldown(cooldownRemaining) : 'READY'}
                   </span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
