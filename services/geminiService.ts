
import { GoogleGenAI } from "@google/genai";

export const generateTarotCardImage = async (cardName: string, deckStyle: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Оптимизированный промпт для быстрой генерации четких образов
  const prompt = `Professional tarot card art: "${cardName}". 
  Style: ${deckStyle}. 
  Composition: Central focus on a singular symbolic entity, clean edges, high contrast. 
  Palette: Rich but focused, minimal color bleeding. 
  Background: Simple sacred geometry or flat textured mystical plane to ensure fast processing.
  CRITICAL: No text, no letters, no numbers. Ornate card border. 
  Output format: Masterpiece, vivid, occult essence.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "9:16"
        }
      }
    });

    if (response.candidates && response.candidates[0] && response.candidates[0].content) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("Generation failed");
  } catch (error) {
    console.error("AI Generation Error:", error);
    // Высококачественный фолбек
    return `https://images.unsplash.com/photo-1576158113928-4c240eaaf360?q=80&w=800&auto=format&fit=crop`;
  }
};
