
import React, { useState, useRef, useEffect } from 'react';
import { Send, Orbit, Loader2 } from 'lucide-react';
import { translations, Language } from '../translations';
import { GoogleGenAI } from '@google/genai';

interface Message {
  role: 'user' | 'oracle';
  text: string;
}

const OracleChat: React.FC<{ lang: Language }> = ({ lang }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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
      const prompt = `Ты - Оракул Шепотов, древнее мистическое существо. Искатель спрашивает: "${query}". Ответь с глубокой мистической мудростью. Твой ответ должен быть не длиннее 1 предложения. Отвечай на языке: ${lang === 'ru' ? 'Русский' : 'English'}.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      const oracleText = response.text || (lang === 'ru' ? "Звезды сегодня молчаливы..." : "The stars are silent today...");
      setMessages(prev => [...prev, { role: 'oracle', text: oracleText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'oracle', text: lang === 'ru' ? "Эфирные помехи..." : "Etheric interference..." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[140px] md:h-[160px] w-full max-w-[450px] mx-auto animate-fadeIn group relative">
      <div className="relative flex flex-col h-full bg-black/40 backdrop-blur-2xl rounded-[1.2rem] border border-[#d4af3710] overflow-hidden shadow-2xl transition-all duration-700 hover:border-[#d4af3725]">
        
        {/* Compact Header */}
        <div className="px-3 py-1 border-b border-[#d4af3708] bg-[#d4af3705] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Orbit size={12} className="text-[#f9e29c] animate-[spin_10s_linear_infinite]" />
            <h3 className="text-[7px] font-cinzel font-black gold-gradient-text tracking-[0.2em] uppercase leading-none">{t.oracleTitle}</h3>
          </div>
          <div className="flex gap-1">
             <div className="w-1 h-1 rounded-full bg-[#d4af3720]"></div>
          </div>
        </div>

        {/* Message Stream */}
        <div 
          ref={scrollRef}
          className="flex-grow overflow-y-auto p-2 flex flex-col gap-1.5 scrollbar-none"
        >
          {messages.length === 0 && (
            <div className="flex-grow flex items-center justify-center opacity-10">
              <p className="text-[6px] font-montserrat text-[#d4af37] tracking-[0.3em] uppercase font-bold">
                {lang === 'ru' ? 'ЗАДАЙТЕ ВОПРОС' : 'ASK THE VOID'}
              </p>
            </div>
          )}
          
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
              <div className={`max-w-[85%] p-1.5 rounded-[0.8rem] text-[8px] md:text-[9px] leading-tight ${
                msg.role === 'user' 
                ? 'bg-[#d4af3710] text-[#f9e29c] rounded-br-none' 
                : 'bg-white/[0.03] text-[#e2e2d5cc] italic rounded-bl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="p-1.5 rounded-[0.8rem] rounded-bl-none flex items-center gap-2">
                <Loader2 size={8} className="text-[#d4af3750] animate-spin" />
              </div>
            </div>
          )}
        </div>

        {/* Mini Input Field */}
        <div className="p-1.5 bg-black/20 border-t border-[#d4af3705] shrink-0">
          <form 
            onSubmit={(e) => { e.preventDefault(); askOracle(input); }}
            className="flex gap-1.5"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.oraclePlaceholder}
              className="flex-grow bg-black/20 border border-[#d4af3710] rounded-full px-3 py-1 text-[8px] md:text-[9px] text-[#f9e29c] placeholder:text-[#d4af3710] focus:outline-none focus:border-[#d4af3730] transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-6 h-6 rounded-full bg-[#d4af3710] text-[#d4af37] flex items-center justify-center hover:bg-[#d4af3720] disabled:opacity-10 transition-all"
            >
              <Send size={10} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OracleChat;
