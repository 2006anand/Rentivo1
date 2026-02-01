
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePropertyDescription = async (details: {
  title: string;
  rent: number;
  location: string;
  facilities: string[];
}) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a compelling real estate description for a rental property in India with the following details: 
      Title: ${details.title}, 
      Rent: ₹${details.rent}/mo, 
      Location: ${details.location}, 
      Facilities: ${details.facilities.join(', ')}.
      Make it professional and highlight the benefits. Keep it under 100 words.`,
    });
    return response.text || "No description generated.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Beautifully maintained property in a prime location with all basic amenities.";
  }
};

export const analyzeDocument = async (base64Data: string, mimeType: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: "Extract all key information from this document (e.g., receipt details, menu items, or chart data). Provide a clean summary in bullet points.",
          },
        ],
      },
    });
    return response.text || "Could not analyze the document.";
  } catch (error) {
    console.error("Analysis Error:", error);
    return "Failed to process document.";
  }
};

export const generateCustomBanner = async (prompt: string, aspectRatio: "1:1" | "4:3" | "16:9" | "9:16") => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A professional real estate marketing banner for: ${prompt}. Clean, high-end, architectural photography style.` }],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
        },
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Image Gen Error:", error);
    return null;
  }
};
