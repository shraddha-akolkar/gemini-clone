// src/config/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Use your Gemini API key
// src/config/gemini.js
const API_KEY = "AIzaSyDiEA_6vyVVosqnj8B_C90nTmvJhnQAibU";

export async function getGeminiResponse(prompt) {
  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        contents: [
          { parts: [{ text: prompt }] }
        ],
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text 
           || "⚠️ No answer returned";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "⚠️ Error fetching response from Gemini";
  }
}
