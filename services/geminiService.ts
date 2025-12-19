
import { GoogleGenAI, Type } from "@google/genai";

export const generateTarotCardImage = async (cardName: string, deckStyle: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Mystical tarot card: "${cardName}". Style: ${deckStyle}. Cinematic lighting, esoteric atmosphere, highly detailed. Clear focal point, NO text on card. Detailed ornate border.`;

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
    // Fallback image
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
  context: { spell?: string | null, outcome?: string | null }
): Promise<InterpretationResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Act as an ancient mystic Oracle. Perform a ${category} reading called "${readingTitle}" for these cards: ${cards.join(', ')}.
  User context: Intent is "${context.spell || 'unknown'}", goal is "${context.outcome || 'unknown'}".
  Language: ${lang === 'ru' ? 'Russian' : 'English'}.
  Provide a JSON result with two fields: 
  1. 'outcome': a powerful 2-3 sentence overall prophecy.
  2. 'cardInterpretations': an array of strings, one for each card in order (1-2 sentences each). 
  Make it dark, esoteric, and insightful.`;

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

    return JSON.parse(response.text || '{}') as InterpretationResult;
  } catch (error) {
    console.error("Interpretation Error:", error);
    return {
      outcome: lang === 'ru' ? "Пути судьбы туманны, но свет интуиции выведет вас из тьмы." : "The paths of fate are misty, but the light of intuition will lead you out of the dark.",
      cardInterpretations: cards.map(() => lang === 'ru' ? "Тайный смысл этого аркана откроется вам в медитации." : "The secret meaning of this arcana will be revealed in meditation.")
    };
  }
};
