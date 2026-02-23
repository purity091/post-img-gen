
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

export const generateInvestmentTitle = async (topic: string): Promise<{ title: string; subtitle: string }> => {
  if (!API_KEY) return { title: "مستقبل الاستثمار", subtitle: "ابدأ رحلتك المالية اليوم" };

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `بصفتك خبير في المحتوى التسويقي والاستثمار، اقترح عنواناً جذاباً ووصفاً قصيراً (سطر واحد) باللغة العربية حول موضوع: ${topic}. أريد النتيجة بتنسيق JSON: {"title": "العنوان", "subtitle": "الوصف"}.`,
      config: {
        responseMimeType: "application/json"
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      title: result.title || "مستقبل الاستثمار",
      subtitle: result.subtitle || "خطواتك الأولى نحو الحرية المالية"
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { title: "منصة المستثمر الذكي", subtitle: "بوابتك لعالم المال والأعمال" };
  }
};
