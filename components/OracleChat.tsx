
import React, { useState, useRef, useEffect } from 'react';
import { Mail, Orbit, Loader2, Sparkles } from 'lucide-react';
import { translations, Language } from '../translations';
import { GoogleGenAI } from '@google/genai';
import { AppStyle } from '../types';

interface Message {
  role: 'user' | 'oracle';
  text: string;
}

const OracleChat: React.FC<{ lang: Language, appStyle: AppStyle }> = ({ lang, appStyle }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, loading]);

  const askOracle = async (query: string) => {
    if (!query.trim() || loading) return;

    const userMsg: Message = { role: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const voiceTone = {
        'CELESTIAL': 'Seraphic and wise',
        'VOID': 'Binary, cryptic and digital',
        'CHTHONIC': 'Gravelly, ancient and dark'
      }[appStyle];

      const prompt = `Oracle [Tone: ${voiceTone}]: Answer briefly and mystically to the question: "${query}". Lang: ${lang === 'ru' ? 'Russian' : 'English'}. Max 15 words.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setMessages(prev => [...prev, { role: 'oracle', text: response.text || "..." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'oracle', text: lang === 'ru' ? "Связь прервана." : "Link broken." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full animate-fadeIn mb-12 mt-6">
      <div className="relative flex flex-col h-[200px] md:h-[240px] magical-gold-frame rounded-[1.5rem] overflow-hidden shadow-2xl bg-black/40">
        
        <div className="px-5 py-3 border-b border-white/5 flex items-center gap-3 shrink-0 bg-black/20 group">
          <div className="relative">
            <Orbit size={14} className="text-[var(--accent)] opacity-40 group-hover:opacity-100 group-hover:text-[var(--accent-bright)] animate-[spin_10s_linear_infinite] transition-all" />
          </div>
          <h3 className="text-[10px] font-cinzel font-black text-[var(--accent)] opacity-50 group-hover:opacity-100 group-hover:text-[var(--accent-bright)] tracking-[0.3em] uppercase transition-all">{t.oracleTitle}</h3>
        </div>

        <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-4 hide-scrollbar">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-10 text-center px-8">
              <Mail size={16} className="mb-2 text-[var(--accent)]" strokeWidth={1} />
              <span className="text-[9px] font-black tracking-[0.4em] text-[var(--accent)] uppercase leading-relaxed">
                Вопрошайте Бездну
              </span>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
              <div className={`max-w-[85%] px-4 py-2 rounded-[1rem] text-[12px] leading-relaxed border transition-colors ${
                msg.role === 'user' 
                ? 'bg-[var(--accent-glow)] text-[var(--accent-bright)] border-[var(--accent-glow)] rounded-br-none' 
                : 'bg-white/[0.02] text-[var(--accent)] opacity-70 italic font-playfair border-white/5 rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); askOracle(input); }} className="p-3 flex gap-3 border-t border-white/5 bg-black/60 shrink-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.oraclePlaceholder}
            className="flex-grow bg-white/5 border border-white/10 rounded-full px-5 py-2 text-[12px] text-[var(--accent)] focus:text-[var(--accent-bright)] focus:outline-none focus:border-[var(--accent)] transition-all placeholder:text-[var(--accent)] placeholder:opacity-20"
          />
          <button type="submit" disabled={!input.trim() || loading} className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black active:scale-90 transition-all border border-white/10">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Mail size={18} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OracleChat;
