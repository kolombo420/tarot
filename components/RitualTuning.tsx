
import React, { useRef, useState } from 'react';
import { Camera, Sparkles, ScrollText, Zap, Heart } from 'lucide-react';
import { translations } from '../translations';
import { RitualCategory } from '../types';

interface Props {
  onComplete: (photo: string | null, photo2: string | null, spell: string | null, positive: string | null) => void;
  onSkip: () => void;
  lang: 'ru' | 'en';
  category: RitualCategory;
}

const RitualTuning: React.FC<Props> = ({ onComplete, onSkip, lang, category }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
  const [spell, setSpell] = useState('');
  const [positive, setPositive] = useState('');
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const t = translations[lang];

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>, slot: 1 | 2) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (slot === 1) setPreview(reader.result as string);
        else setPreview2(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinalize = () => {
    onComplete(preview, preview2, spell.trim() || null, positive.trim() || null);
  };

  const isLove = category === 'LOVE';

  return (
    <div className="max-w-5xl mx-auto animate-fadeIn pb-24 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-cinzel font-bold gold-gradient-text mb-6 uppercase tracking-[0.2em]">{t.ritualTuning}</h2>
        <p className="text-[#d4af3766] font-playfair italic text-lg leading-relaxed max-w-2xl mx-auto">{t.ritualSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        <div className="relative group">
          <div className="absolute -top-4 left-8 px-5 bg-[#0a0a12] text-[#d4af37aa] font-cinzel text-[10px] uppercase tracking-widest z-10 flex items-center gap-2">
            <ScrollText size={14} /> {t.spellText}
          </div>
          <textarea
            value={spell}
            onChange={(e) => setSpell(e.target.value)}
            placeholder={t.spellPlaceholder}
            className="w-full h-56 bg-white/[0.02] border border-[#d4af3711] rounded-[2.5rem] p-10 text-[#f9e29c] font-playfair italic text-xl focus:outline-none focus:border-[#d4af3744] transition-all resize-none placeholder:text-[#d4af3711]"
          />
        </div>

        <div className="relative group">
          <div className="absolute -top-4 left-8 px-5 bg-[#0a0a12] text-[#d4af37aa] font-cinzel text-[10px] uppercase tracking-widest z-10 flex items-center gap-2">
            <Zap size={14} /> {t.outcomeText}
          </div>
          <textarea
            value={positive}
            onChange={(e) => setPositive(e.target.value)}
            placeholder={t.outcomePlaceholder}
            className="w-full h-56 bg-white/[0.02] border border-[#d4af3711] rounded-[2.5rem] p-10 text-[#f9e29c] font-playfair italic text-xl focus:outline-none focus:border-[#d4af3744] transition-all resize-none placeholder:text-[#d4af3711]"
          />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#d4af3711] to-transparent mb-16"></div>
        
        <div className="text-center mb-12">
          <h3 className="font-cinzel text-[10px] uppercase tracking-[0.5em] text-[#d4af3766] mb-6">{t.identification}</h3>
          <p className="text-sm text-gray-500 font-playfair italic px-4">{t.idSubtitle}</p>
        </div>

        <div className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 mb-16 relative`}>
          {isLove && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
              <Heart size={48} className="text-[#ff007f33] animate-pulse" />
            </div>
          )}
          
          {/* Photo Slot 1 */}
          <div className="flex flex-col items-center gap-4">
            <div 
              onClick={() => fileInputRef1.current?.click()}
              className="relative w-48 h-48 rounded-full border border-[#d4af3722] hover:border-[#d4af37] transition-all duration-700 cursor-pointer overflow-hidden flex items-center justify-center bg-black/40 backdrop-blur-md group shadow-2xl"
            >
              {preview ? (
                <img src={preview} alt="Target 1" className="w-full h-full object-cover animate-fadeIn grayscale brightness-75" />
              ) : (
                <div className="text-center text-[#d4af3733] group-hover:text-[#d4af37] transition-colors">
                  <Camera size={32} strokeWidth={1} />
                  <div className="text-[8px] font-cinzel uppercase mt-2 tracking-widest">{isLove ? t.visage1 : (lang === 'ru' ? 'Лик' : 'Visage')}</div>
                </div>
              )}
              <div className="absolute inset-2 border border-[#d4af3708] rounded-full pointer-events-none"></div>
            </div>
            {isLove && <span className="text-[9px] font-cinzel text-[#d4af3733] uppercase tracking-widest">{t.visage1}</span>}
          </div>

          {/* Photo Slot 2 (Only for Love Spells) */}
          {isLove && (
            <div className="flex flex-col items-center gap-4">
              <div 
                onClick={() => fileInputRef2.current?.click()}
                className="relative w-48 h-48 rounded-full border border-[#d4af3722] hover:border-[#d4af37] transition-all duration-700 cursor-pointer overflow-hidden flex items-center justify-center bg-black/40 backdrop-blur-md group shadow-2xl"
              >
                {preview2 ? (
                  <img src={preview2} alt="Target 2" className="w-full h-full object-cover animate-fadeIn grayscale brightness-75" />
                ) : (
                  <div className="text-center text-[#d4af3733] group-hover:text-[#d4af37] transition-colors">
                    <Camera size={32} strokeWidth={1} />
                    <div className="text-[8px] font-cinzel uppercase mt-2 tracking-widest">{t.visage2}</div>
                  </div>
                )}
                <div className="absolute inset-2 border border-[#d4af3708] rounded-full pointer-events-none"></div>
              </div>
              <span className="text-[9px] font-cinzel text-[#d4af3733] uppercase tracking-widest">{t.visage2}</span>
            </div>
          )}
        </div>

        <input type="file" ref={fileInputRef1} onChange={(e) => handleFile(e, 1)} accept="image/*" className="hidden" />
        <input type="file" ref={fileInputRef2} onChange={(e) => handleFile(e, 2)} accept="image/*" className="hidden" />

        <div className="flex flex-col items-center gap-10">
          <button
            onClick={handleFinalize}
            className="px-24 py-7 bg-[#d4af37] text-[#0a0a12] rounded-full font-cinzel font-black text-xs tracking-[0.5em] uppercase hover:bg-[#f9e29c] transition-all shadow-xl active:scale-95 flex items-center gap-4"
          >
            <Sparkles size={18} />
            {t.startRitual}
          </button>
          
          <button
            onClick={onSkip}
            className="text-[#d4af3722] hover:text-[#d4af3766] font-cinzel text-[9px] tracking-[0.4em] uppercase transition-colors"
          >
            {t.skipId}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RitualTuning;
