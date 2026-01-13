
import { GoogleGenAI } from "@google/genai";

const getAIInstance = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const analyzeTasks = async (tasks: any[]) => {
  const ai = getAIInstance();
  const prompt = `Analise as seguintes tarefas de campo e forneça um resumo motivacional curto (em português do Brasil) e 3 dicas de otimização de rota ou tempo. 
  Tarefas: ${JSON.stringify(tasks.map(t => ({ title: t.title, status: t.status, priority: t.priority })))}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "Você é um assistente de produtividade para trabalhadores de campo. Seja direto, motivador e fale como um mentor técnico.",
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Não foi possível carregar a análise da IA no momento. Continue o bom trabalho!";
  }
};

export const parseVoiceToTask = async (text: string) => {
  const ai = getAIInstance();
  const prompt = `Transforme o seguinte texto em um objeto JSON de tarefa com as propriedades: title, description, priority (low, medium, high, urgent). 
  Texto: "${text}"`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Parsing Error:", error);
    return null;
  }
};
