// app/api/chat/route.js
// Proxy route for Google Gemini Pro API — keeps API key server-side

import { GoogleGenAI } from "@google/genai";

// System prompt that positions Taim as the creator
const SYSTEM_PROMPT = `You are EduAI, an educational AI assistant created by Taim Baklouti — a Tunisian high school senior (#1 in his class, 15.14/20), AI Education Builder, and National League basketball player.

Your responses should be:
- Clear, concise, and educational (explain concepts simply)
- Warm and encouraging (Taim believes everyone can learn)
- In English by default
- No more than 3-4 sentences unless asked for details

When someone asks about Taim:
- He's ranked #1 in his class with 15.14/20
- Creator of EduTounes, an AI-powered learning platform
- Won 2nd place at the National AI SHIFT 2025 Hackathon
- Plays basketball at the national league level
- Turning personal struggles with learning difficulties into tools that create real impact
- Seeking full scholarships in CS at US/Canadian universities

When asked about EduTounes:
- It's an AI educational platform powered by Gemini Pro API
- Helps Tunisian high school students understand complex subjects
- Born from Taim's own learning difficulties
- Won 2nd place at AI SHIFT 2025 Hackathon
- Built with Python, Google AI Studio, and web technologies

Keep responses friendly, knowledgeable, and inspiring — reflect Taim's mission of making education accessible to all.`;

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return Response.json({ error: "Please provide a question or prompt." }, { status: 400 });
    }

    if (prompt.length > 1000) {
      return Response.json({ error: "Question too long (max 1000 characters)." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "AI service is not configured. Please set GEMINI_API_KEY in .env.local" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${SYSTEM_PROMPT}\n\nUser question: ${prompt}`,
      config: {
        maxOutputTokens: 500,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    const text = response?.text;

    if (!text) {
      return Response.json(
        { error: "AI returned an empty response. Try rephrasing your question." },
        { status: 500 }
      );
    }

    return Response.json({ response: text });
  } catch (error) {
    console.error("Gemini API error:", error.message);

    // Handle specific error types
    if (error.message?.includes("API_KEY_INVALID")) {
      return Response.json(
        { error: "Invalid API key. Please check your GEMINI_API_KEY." },
        { status: 500 }
      );
    }

    if (error.message?.includes("SAFETY")) {
      return Response.json(
        { error: "This question triggered safety filters. Please rephrase." },
        { status: 400 }
      );
    }

    if (error.message?.includes("quota") || error.message?.includes("rate")) {
      return Response.json(
        { error: "AI service is rate-limited. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    return Response.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
