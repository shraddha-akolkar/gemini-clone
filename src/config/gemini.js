// src/config/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Use your Gemini API key
const API_KEY = "AIzaSyB1PVbo3kC7HJXkD_jQ2zKftWCQogiQ9rM";

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(API_KEY);

// Function to get a response from Gemini
export async function getGeminiResponse(prompt) {
  try {
    // ✅ Use the correct model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;

    // Return the text output
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "⚠️ Error fetching response from Gemini.";
  }
}
