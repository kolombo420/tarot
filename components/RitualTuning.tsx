
import React, { useRef, useState, useMemo } from 'react';
import { 
  Camera, 
  Eye, 
  ScrollText, 
  Loader2, 
  Triangle, 
  Lock, 
  Sparkles, 
  Wand2, 
  Zap, 
  Layers, 
  Pentagon, 
  Wind, 
  HeartPulse, 
  Volume2 
} from 'lucide-react';
import { translations } from '../translations';
import { RitualCategory, ReadingType } from '../types';
import { GoogleGenAI } from '@google/genai';

interface Props {
  onComplete: (type: ReadingType, photo: string | null, photo2: string | null, spell: string | null) => void;
  onSkip: () => void;
  lang: 'ru' | 'en';
  category: RitualCategory;
  readingTypes: ReadingType[];
  cooldownRemaining: number;
}

const RitualTuning: React.FC<Props> = ({ onComplete, lang, category, readingTypes, cooldownRemaining }) => {
  const [selectedType, setSelectedType] = useState<ReadingType | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
  const [spell, setSpell] = useState('');
  const [isGeneratingSpell, setIsGeneratingSpell] = useState(false);
  
  const inputsRef = useRef<HTMLDivElement>(null);
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const t = (translations[lang] as any);

  const handleTypeSelect = (type: ReadingType) => {
    if (cooldownRemaining > 0) return;
    setSelectedType(type);
    setTimeout(() => {
      inputsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  const handleAIInvoke = async () => {
    setIsGeneratingSpell(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Oracle: Generate a unique ritual incantation for ${category}. Lang: ${lang === 'ru' ? 'Russian' : 'English'}. Max 20 words.`;
      const result = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
      setSpell(result.text?.trim() || "...");
    } catch (e) { 
      setSpell("..."); 
    } finally { setIsGeneratingSpell(false); }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, slot: 1 | 2) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { slot === 1 ? setPreview(reader.result as string) : setPreview2(reader.result as string); };
      reader.readAsDataURL(file);
    }
  };

  const getAnimatedIcon = (id: string, isSelected: boolean) => {
    const size = 68;
    const colorClass = isSelected ? 'text-[var(--accent-bright)]' : 'text-white/20';
    const pulseClass = isSelected ? 'animate-mystic-pulse' : '';
    
    switch(id) {
      case 't1': // Flash of Truth
        return <Zap size={size} className={`${colorClass} ${pulseClass} transition-transform duration-1000`} strokeWidth={1} />;
      case 't2': // Triumvirate
        return <Layers size={size} className={`${colorClass} ${pulseClass} transition-transform duration-1000`} strokeWidth={1} />;
      case 't3': // Mage's Cross
        return <Pentagon size={size} className={`${colorClass} ${pulseClass} transition-transform duration-1000`} strokeWidth={1} />;
      case 'h1': // Ether Cleansing
        return <Wind size={size} className={`${colorClass} ${pulseClass} transition-transform duration-1000`} strokeWidth={1} />;
      case 'l1': // Heart Resonance
        return <HeartPulse size={size} className={`${colorClass} ${pulseClass} transition-transform duration-1000`} strokeWidth={1} />;
      case 'd1': // Oracle Voice
        return <Volume2 size={size} className={`${colorClass} ${pulseClass} transition-transform duration-1000`} strokeWidth={1} />;
      default:
        return <Triangle size={size} className={`${colorClass} ${pulseClass}`} strokeWidth={1} />;
    }
  };

  return (
    <div className="flex flex-col w-full space-y-12 pb-20">
      
      <div className="text-center">
        <h2 className="text-lg md:text-xl font-cinzel font-black gold-gradient-text uppercase tracking-widest mb-3 italic">
          {t.selectType}
        </h2>
        <div className="flex items-center justify-center gap-4">
          <Wand2 size={28} className="text-[var(--accent)] animate-pulse" />
          <p className="text-[16px] md:text-[18px] font-black uppercase tracking-[0.5em] text-[var(--accent-bright)] drop-shadow-md">{t.chooseBelow}</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-10 md:gap-20">
        {readingTypes.map(type => {
          const isLocked = cooldownRemaining > 0;
          const isSelected = selectedType?.id === type.id;
          return (
            <button
              key={type.id}
              onClick={() => handleTypeSelect(type)}
              className={`group relative w-48 h-48 md:w-64 md:h-64 rounded-full transition-all duration-700 flex flex-col items-center justify-center gap-6 shadow-2xl magical-gold-frame border-[3.5px] overflow-hidden ${
                isSelected 
                ? 'scale-105 border-[var(--accent-bright)] ring-[16px] ring-[var(--accent-glow)]' 
                : isLocked 
                  ? 'opacity-20 grayscale border-white/5 cursor-not-allowed' 
                  : 'opacity-60 hover:opacity-100 hover:scale-[1.05] hover:border-[var(--accent)]'
              }`}
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent-glow)_0%,transparent_70%)] transition-opacity duration-1000 ${isSelected ? 'opacity-40' : 'opacity-0 group-hover:opacity-20'}`}></div>
              
              <div className="relative z-10 transition-all duration-1000">
                {isLocked ? <Lock size={48} className="text-white/20" /> : getAnimatedIcon(type.id, isSelected)}
              </div>
              
              <h4 className={`relative z-10 text-[12px] md:text-[14px] font-cinzel font-black uppercase tracking-[0.3em] text-center px-8 leading-tight transition-all duration-500 ${isSelected ? 'text-[var(--accent-bright)] drop-shadow-lg' : 'text-white/40'}`}>
                {lang === 'ru' ? type.title : type.titleEn}
              </h4>
              
              <div className={`absolute bottom-8 w-10 h-[1.5px] bg-[var(--accent-glow)] transition-all ${isSelected ? 'w-20 bg-[var(--accent-bright)] opacity-100' : 'opacity-0'}`}></div>
            </button>
          );
        })}
      </div>

      {selectedType && (
        <div ref={inputsRef} className="animate-fadeIn space-y-12 pt-12">
          <div className="space-y-4">
               <div className="flex items-center gap-3 px-4">
                  <ScrollText size={20} className="text-[var(--accent)]" />
                  <span className="font-cinzel text-xs uppercase tracking-[0.4em] opacity-60">{t.spellText}</span>
               </div>
               <div className="relative flex magical-gold-frame rounded-[2.5rem] min-h-[140px] shadow-2xl border-white/5 focus-within:border-[var(--accent-glow)] transition-all">
                 <textarea
                   value={spell}
                   onChange={(e) => setSpell(e.target.value)}
                   placeholder={t.spellPlaceholder}
                   className="flex-grow bg-transparent p-8 text-white/90 font-montserrat text-sm focus:outline-none resize-none placeholder:text-white/10"
                 />
                 <button onClick={handleAIInvoke} disabled={isGeneratingSpell} className="w-24 flex items-center justify-center border-l border-white/5 hover:bg-white/5 transition-colors group">
                   {isGeneratingSpell ? <Loader2 size={32} className="animate-spin text-[var(--accent)]" /> : <Sparkles size={32} className="text-white/20 group-hover:text-[var(--accent)] transition-all duration-700" />}
                 </button>
               </div>
          </div>

          <div className="flex justify-center gap-14">
              {[1, 2].map(num => (category === 'LOVE' || category === 'HEX' || num === 1) && (
                <div key={num} className="flex flex-col items-center gap-4 group">
                  <button 
                    onClick={() => num === 1 ? fileInputRef1.current?.click() : fileInputRef2.current?.click()} 
                    className="w-32 h-32 magical-gold-frame rounded-full flex items-center justify-center active:scale-90 transition-all shadow-2xl border-white/5 group-hover:border-[var(--accent-glow)]"
                  >
                    {(num === 1 ? preview : preview2) ? (
                      <img src={num === 1 ? preview! : preview2!} className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 transition-all rounded-full" />
                    ) : (
                      <Camera className="text-white/10 group-hover:text-[var(--accent)] transition-colors" size={32} />
                    )}
                  </button>
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] group-hover:text-[var(--accent)] transition-colors">{num === 1 ? t.visage1 : t.visage2}</span>
                </div>
              ))}
          </div>

          <button
            onClick={() => onComplete(selectedType, preview, preview2, spell.trim() || null)}
            className="w-full h-24 magical-gold-frame rounded-full text-white font-black text-xs tracking-[0.6em] uppercase shadow-[0_20px_60px_rgba(0,0,0,0.9)] transition-all hover:bg-[var(--accent)] hover:text-black active:scale-95 flex items-center justify-center gap-4 group"
          >
            <Sparkles className="animate-pulse" size={20} />
            {lang === 'ru' ? 'ПОДТВЕРДИТЬ РИТУАЛ' : 'CONFIRM RITUAL'}
          </button>
        </div>
      )}

      <input type="file" ref={fileInputRef1} onChange={(e) => handleFile(e, 1)} className="hidden" accept="image/*" />
      <input type="file" ref={fileInputRef2} onChange={(e) => handleFile(e, 2)} className="hidden" accept="image/*" />
    </div>
  );
};

export default RitualTuning;
