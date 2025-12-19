
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const generateTarotCardImage = async (cardName: string, deckStyle: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `Create an artistic symbolic tarot card for "${cardName}" in the style of "${deckStyle}". 
  The card should be visually distinct, mystical, and high-quality. 
  Preserve traditional tarot symbolism.
  CRITICAL: Do NOT include any human figures or faces. Use symbolic objects, nature, or abstract forms.
  CRITICAL: Do NOT include any text, letters, or numbers on the image. 
  The composition should be centered and mystical.`;

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

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("Изображение не было сгенерировано.");
  } catch (error) {
    console.error("AI Generation Error:", error);
    // Fallback to a placeholder if API fails
    return `https://picsum.photos/seed/${cardName}-${deckStyle.length}/400/700`;
  }
};
