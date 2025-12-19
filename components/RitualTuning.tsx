
import React, { useRef, useState, useEffect } from 'react';
import { Camera, Eye, ScrollText, Zap, Loader2, Sparkles, Triangle, Star, Orbit } from 'lucide-react';
import { translations } from '../translations';
import { RitualCategory, ReadingType } from '../types';
import { GoogleGenAI } from '@google/genai';

interface Props {
  onComplete: (type: ReadingType, photo: string | null, photo2: string | null, spell: string | null, positive: string | null) => void;
  onSkip: () => void;
  lang: 'ru' | 'en';
  category: RitualCategory;
  readingTypes: ReadingType[];
}

const RitualTuning: React.FC<Props> = ({ onComplete, lang, category, readingTypes }) => {
  const [selectedType, setSelectedType] = useState<ReadingType | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
  const [spell, setSpell] = useState('');
  const [positive, setPositive] = useState('');
  const [isGeneratingSpell, setIsGeneratingSpell] = useState(false);
  const [isGeneratingOutcome, setIsGeneratingOutcome] = useState(false);
  
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const t = translations[lang];

  const typeText = async (text: string, setter: (val: string) => void) => {
    setter("");
    let current = "";
    for (let i = 0; i < text.length; i++) {
      current += text[i];
      setter(current);
      await new Promise(r => setTimeout(r, 20));
    }
  };

  const handleAIInvoke = async (type: 'spell' | 'outcome') => {
    const setterState = type === 'spell' ? setIsGeneratingSpell : setIsGeneratingOutcome;
    const valueSetter = type === 'spell' ? setSpell : setPositive;
    
    setterState(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Оракул Шепотов: Сгенерируй ${type === 'spell' ? 'ритуальный заговор' : 'образ успеха'} для ритуала категории ${category}. Стиль: Древний, эзотерический, могущественный. Отвечай на языке: ${lang === 'ru' ? 'Русский' : 'English'}. Максимум 2 предложения. Без кавычек.`;
      const result = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
      const text = result.text?.trim() || "Эфирный шепот доносится из пустоты...";
      await typeText(text, valueSetter);
    } catch (e) { valueSetter(lang === 'ru' ? "Звезды сегодня безмолвны." : "The stars are silent today."); } finally { setterState(false); }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, slot: 1 | 2) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { slot === 1 ? setPreview(reader.result as string) : setPreview2(reader.result as string); };
      reader.readAsDataURL(file);
    }
  };

  const getTypeIcon = (count: number) => {
    const iconSize = 48; // Увеличено в 4 раза по сравнению с базовыми 12-16px
    const strokeWidth = 1;
    if (count <= 1) return <Orbit size={iconSize} strokeWidth={strokeWidth} className="animate-[spin_10s_linear_infinite]" />;
    if (count <= 3) return <Triangle size={iconSize} strokeWidth={strokeWidth} className="animate-pulse" />;
    return <Star size={iconSize} strokeWidth={strokeWidth} className="animate-[pulse_3s_ease-in-out_infinite]" />;
  };

  const neonStyle = category === 'LOVE' ? 'text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]' : 'text-[#f9e29c] drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]';

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn pb-10 px-4 flex flex-col h-full overflow-y-auto hide-scrollbar">
      {/* 1. ГИГАНТСКИЙ СЕЛЕКТОР РАСКЛАДА (Акцент №1) */}
      <div className="mb-8 shrink-0">
        <div className="text-center mb-6">
          <div className="text-[10px] font-cinzel font-bold text-[#d4af3766] tracking-[0.5em] uppercase mb-1">{t.selectType}</div>
          <div className="h-[1px] w-12 bg-[#d4af3722] mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {readingTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type)}
              className={`relative p-6 rounded-[2.5rem] border transition-all duration-500 flex flex-col items-center justify-center gap-4 group overflow-hidden ${
                selectedType?.id === type.id 
                ? 'bg-[#d4af3711] border-[#d4af37cc] shadow-[0_0_40px_rgba(212,175,55,0.15)] scale-105 z-10' 
                : 'bg-black/40 border-white/5 hover:border-[#d4af3733]'
              }`}
            >
              {/* Background Glow for selected */}
              <div className={`absolute inset-0 bg-gradient-to-b from-[#d4af3708] to-transparent opacity-0 transition-opacity duration-700 ${selectedType?.id === type.id ? 'opacity-100' : 'group-hover:opacity-40'}`}></div>
              
              <div className={`transition-all duration-700 ${selectedType?.id === type.id ? 'text-[#f9e29c] scale-110 drop-shadow-[0_0_15px_rgba(249,226,156,0.4)]' : 'text-[#d4af3744] group-hover:text-[#d4af3788]'}`}>
                {getTypeIcon(type.count)}
              </div>

              <div className="text-center relative z-10">
                <h4 className={`text-sm md:text-base font-cinzel font-black tracking-widest uppercase mb-1 ${selectedType?.id === type.id ? 'gold-gradient-text' : 'text-gray-500 group-hover:text-gray-300'}`}>
                  {lang === 'ru' ? type.title : type.titleEn}
                </h4>
                <div className="flex items-center justify-center gap-2">
                  <div className={`h-[1px] w-4 bg-current opacity-20`}></div>
                  <span className={`text-[10px] font-montserrat font-black tracking-[0.2em] uppercase ${selectedType?.id === type.id ? 'text-[#d4af37]' : 'text-gray-600'}`}>
                    {type.count} {t.items}
                  </span>
                  <div className={`h-[1px] w-4 bg-current opacity-20`}></div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className={`absolute bottom-4 right-4 transition-opacity duration-500 ${selectedType?.id === type.id ? 'opacity-40' : 'opacity-0'}`}>
                <Sparkles size={12} className="text-[#d4af37]" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. ПОЛЯ ВВОДА - под селектором */}
      <div className={`transition-all duration-700 flex flex-col gap-6 ${selectedType ? 'opacity-100 translate-y-0' : 'opacity-20 pointer-events-none translate-y-4'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
             <div className="flex items-center gap-3 px-1">
                <ScrollText size={14} className={neonStyle} />
                <span className="font-montserrat font-black text-[10px] uppercase tracking-[0.3em] gold-gradient-text border-b border-[#d4af3722]">{t.spellText}</span>
             </div>
             <div className="flex items-stretch group relative h-28 md:h-32">
               <textarea
                 value={spell}
                 onChange={(e) => setSpell(e.target.value)}
                 placeholder={t.spellPlaceholder}
                 className="flex-grow bg-black/40 border border-[#d4af3715] rounded-l-[1.5rem] p-4 text-[#f9e29c] font-montserrat text-xs focus:outline-none focus:border-[#d4af3744] transition-all resize-none placeholder:text-[#d4af3711] backdrop-blur-md"
               />
               <button
                 onClick={() => handleAIInvoke('spell')}
                 disabled={isGeneratingSpell}
                 className="w-12 rounded-r-[1.5rem] bg-[#d4af3708] border-y border-r border-[#d4af3715] hover:bg-[#d4af3711] flex items-center justify-center transition-all group overflow-hidden"
               >
                 <div className={`${isGeneratingSpell ? 'animate-spin' : 'animate-eye-pulse'} text-[#d4af37aa]`}>
                   {isGeneratingSpell ? <Loader2 size={16} /> : <Eye size={20} strokeWidth={1.5} />}
                 </div>
               </button>
             </div>
          </div>

          <div className="flex flex-col gap-2">
             <div className="flex items-center gap-3 px-1">
                <Zap size={14} className={neonStyle} />
                <span className="font-montserrat font-black text-[10px] uppercase tracking-[0.3em] gold-gradient-text border-b border-[#d4af3722]">{t.outcomeText}</span>
             </div>
             <div className="flex items-stretch group relative h-28 md:h-32">
               <textarea
                 value={positive}
                 onChange={(e) => setPositive(e.target.value)}
                 placeholder={t.outcomePlaceholder}
                 className="flex-grow bg-black/40 border border-[#d4af3715] rounded-l-[1.5rem] p-4 text-[#f9e29c] font-montserrat text-xs focus:outline-none focus:border-[#d4af3744] transition-all resize-none placeholder:text-[#d4af3711] backdrop-blur-md"
               />
               <button
                 onClick={() => handleAIInvoke('outcome')}
                 disabled={isGeneratingOutcome}
                 className="w-12 rounded-r-[1.5rem] bg-[#d4af3708] border-y border-r border-[#d4af3715] hover:bg-[#d4af3711] flex items-center justify-center transition-all group overflow-hidden"
               >
                 <div className={`${isGeneratingOutcome ? 'animate-spin' : 'animate-eye-pulse'} text-[#d4af37aa]`}>
                   {isGeneratingOutcome ? <Loader2 size={16} /> : <Eye size={20} strokeWidth={1.5} />}
                 </div>
               </button>
             </div>
          </div>
        </div>

        {/* 3. ФОТО ИДЕНТИФИКАЦИИ */}
        <div className="flex flex-col items-center gap-6 mt-4">
          <div className="flex gap-8 items-center">
            <div className="flex flex-col items-center gap-2">
              <button onClick={() => fileInputRef1.current?.click()} className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-[#d4af3711] hover:border-[#d4af3788] transition-all overflow-hidden flex items-center justify-center bg-black/60 backdrop-blur-md group shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                {preview ? <img src={preview} className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700" /> : <Camera size={24} className="text-[#d4af3722] group-hover:text-[#d4af3744] transition-colors" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              <span className="text-[8px] font-montserrat font-black text-[#d4af3744] tracking-[0.3em] uppercase">{t.visage1}</span>
            </div>
            {category === 'LOVE' && (
              <div className="flex flex-col items-center gap-2">
                <button onClick={() => fileInputRef2.current?.click()} className="relative w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-[#d4af3711] hover:border-[#d4af3788] transition-all overflow-hidden flex items-center justify-center bg-black/60 backdrop-blur-md group shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  {preview2 ? <img src={preview2} className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-700" /> : <Camera size={24} className="text-[#d4af3722] group-hover:text-[#d4af3744] transition-colors" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                <span className="text-[8px] font-montserrat font-black text-[#d4af3744] tracking-[0.3em] uppercase">{t.visage2}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => selectedType && onComplete(selectedType, preview, preview2, spell.trim() || null, positive.trim() || null)}
            disabled={!selectedType}
            className={`px-12 py-4 rounded-full font-montserrat font-black text-[11px] tracking-[0.4em] uppercase transition-all shadow-2xl flex items-center gap-4 ${
              selectedType ? 'bg-[#d4af37] text-black hover:bg-[#f9e29c] hover:scale-105 active:scale-95' : 'bg-white/5 text-white/10 cursor-not-allowed border border-white/5'
            }`}
          >
            {t.startRitual}
          </button>
        </div>
      </div>

      <input type="file" ref={fileInputRef1} onChange={(e) => handleFile(e, 1)} className="hidden" />
      <input type="file" ref={fileInputRef2} onChange={(e) => handleFile(e, 2)} className="hidden" />

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default RitualTuning;
