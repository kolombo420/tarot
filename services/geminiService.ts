
import { GoogleGenAI, Type } from "@google/genai";
import { AppStyle } from "../types";

export const generateTarotCardImage = async (
  cardName: string, 
  visualElements: string, 
  deckStyle: string,
  appStyle: AppStyle = 'CELESTIAL'
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const atmosphere = {
    'CELESTIAL': 'Divine holiness, ethereal golden light, renaissance perfection, sacred geometry.',
    'VOID': 'Cyberpunk neon, digital glitches, data streams, cold violet light, holographic mysticism.',
    'CHTHONIC': 'Ancient blood rituals, sacrificial crimson, deep obsidian shadows, visceral horror, hellish glow.'
  }[appStyle];

  const prompt = `HIGH QUALITY TAROT ART: "${cardName}". Atmosphere: ${atmosphere}. Style: ${deckStyle}. Visual keys: ${visualElements}. Full height card composition, symmetrical, centered. NO TEXT, NO UI ELEMENTS. Masterpiece quality.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: { imageConfig: { aspectRatio: "9:16" } }
    });

    const part = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
    if (part?.inlineData?.data) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
    throw new Error("Image data missing");
  } catch (error) {
    console.error("Image Gen Error:", error);
    return `https://images.unsplash.com/photo-1601024445121-e5b82f020549?q=80&w=800&auto=format&fit=crop`;
  }
};

export interface InterpretationResult {
  outcome: string;
  cardInterpretations: string[];
}

export const generateReadingInterpretation = async (
  lang: string,
  category: string,
  readingTitle: string,
  cards: string[],
  context: { spell?: string | null },
  appStyle: AppStyle = 'CELESTIAL'
): Promise<InterpretationResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const voiceTone = {
    'CELESTIAL': 'Seraphic, wise, high-vibrational, compassionate and encouraging.',
    'VOID': 'Synthesized, mathematical, logical, cold, precise and detached.',
    'CHTHONIC': 'Gravelly, ancient, ominous, warning, visceral and blood-bound.'
  }[appStyle];

  const prompt = `Oracle [Tone: ${voiceTone}]: Deep Tarot Ritual for ${cards.join(', ')}. 
  Seeker's Intent: ${context.spell || 'Silent contemplation'}. 
  Lang: ${lang === 'ru' ? 'Russian' : 'English'}.

  TASK: Create a profound, professional esoteric analysis.
  
  1. MASTER PROPHECY (outcome):
     - Section "ДУХ" (Spirit): The core energy of the situation. 2-3 paragraphs.
     - Section "ТЕНЬ" (Shadow): Hidden dangers, ego traps, or external malice. 2-3 paragraphs.
     - Section "СВЕТ" (Light): The solution, actionable steps, and the final revelation. 2-3 paragraphs.
  2. CARD ANALYTICS (cardInterpretations):
     - For each card, write 3 sentences: Archetypal meaning, Situational meaning, Advice.

  Strict JSON format:
  {
    "outcome": "HTML formatted text using <b> (for headers only) and <p> tags",
    "cardInterpretations": ["Interpret string 1", "Interpret string 2", ...]
  }`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            outcome: { type: Type.STRING },
            cardInterpretations: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING }
            }
          },
          required: ["outcome", "cardInterpretations"]
        }
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text) as InterpretationResult;
  } catch (error) {
    console.error("Interpretation Error:", error);
    return {
      outcome: lang === 'ru' ? "<p>Нити судьбы спутаны. Эфир молчит.</p>" : "<p>The threads of fate are tangled. The ether is silent.</p>",
      cardInterpretations: cards.map(() => lang === 'ru' ? "Значение сокрыто." : "Meaning obscured.")
    };
  }
};
