import { GoogleGenAI } from "@google/genai";
import { ApiRequest, ApiResponse, AISuggestion } from "../types";

export const analyzeApiTransaction = async (
  request: ApiRequest,
  response: ApiResponse,
  apiKey: string
): Promise<AISuggestion> => {
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are an expert Senior Backend Engineer and API Specialist. 
    Analyze the following API transaction and provide structured feedback.
    
    REQUEST:
    Method: ${request.method}
    URL: ${request.url}
    Headers: ${JSON.stringify(request.headers)}
    Body: ${request.body}

    RESPONSE:
    Status: ${response.statusCode} ${response.statusText}
    Time: ${response.time}ms
    Size: ${response.size} bytes
    Body: ${JSON.stringify(response.data).substring(0, 5000)} // Truncated for token limits

    Please provide a JSON object with the following fields:
    1. "documentation": A concise summary of what this endpoint appears to do.
    2. "improvements": A list of strings suggesting performance or best practice improvements.
    3. "security": A list of strings suggesting security improvements.
    4. "schemaUpdates": A string description of any potential schema changes or validation logic needed.
    5. "codeSnippet": A JavaScript 'fetch' example to reproduce this request.

    Return ONLY raw JSON.
  `;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = result.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AISuggestion;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      documentation: "Failed to generate documentation.",
      improvements: ["Could not analyze request."],
      security: [],
      schemaUpdates: "N/A",
      codeSnippet: "// Error generating snippet"
    };
  }
};