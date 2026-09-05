import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import rateLimit from "express-rate-limit";
import { Resend } from "resend";

dotenv.config();

const NOTIFY_TO_EMAIL = process.env.NOTIFY_TO_EMAIL || "julesinbloom96@gmail.com";
const NOTIFY_FROM_EMAIL = process.env.NOTIFY_FROM_EMAIL || "Juls in Bloom Website <onboarding@resend.dev>";

let resendClient: Resend | null = null;
function getResend(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY environment variable is required to send emails.");
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

const geminiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false });
const formLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });

let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json({ limit: "10mb" }));

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.use("/api/gemini", geminiLimiter);

  function isValidEmail(value: unknown): value is string {
    return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  app.post("/api/contact", formLimiter, async (req, res) => {
    try {
      const { name, email, message } = req.body ?? {};
      if (!name || !isValidEmail(email)) return res.status(400).json({ error: "A name and valid email are required." });
      const resend = getResend();
      await resend.emails.send({
        from: NOTIFY_FROM_EMAIL, to: NOTIFY_TO_EMAIL, replyTo: email,
        subject: `New contact form message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message || "(no message provided)"}`,
      });
      res.json({ ok: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to send your message." });
    }
  });

  app.post("/api/newsletter", formLimiter, async (req, res) => {
    try {
      const { email } = req.body ?? {};
      if (!isValidEmail(email)) return res.status(400).json({ error: "A valid email is required." });
      const resend = getResend();
      await resend.emails.send({
        from: NOTIFY_FROM_EMAIL, to: NOTIFY_TO_EMAIL, subject: "New newsletter signup",
        text: `New newsletter signup: ${email}`,
      });
      res.json({ ok: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to sign up." });
    }
  });

  app.post("/api/booking", formLimiter, async (req, res) => {
    try {
      const { name, email, type, message, date, time } = req.body ?? {};
      if (!name || !isValidEmail(email) || !date || !time) return res.status(400).json({ error: "Name, email, date, and time are required." });
      const resend = getResend();
      await resend.emails.send({
        from: NOTIFY_FROM_EMAIL, to: NOTIFY_TO_EMAIL, replyTo: email,
        subject: `New booking request: ${type || "Private session"} on ${date}`,
        text: `Name: ${name}\nEmail: ${email}\nType: ${type || "Private session"}\nDate: ${date}\nTime: ${time}\n\nMessage:\n${message || "(none)"}`,
      });
      res.json({ ok: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Failed to send your booking request." });
    }
  });

  // Google Search Grounding Endpoint (gemini-3.7-flash with googleSearch tool - Free Tier)
  app.post("/api/gemini/search", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          systemInstruction:
            "You are Juls in Bloom's botanical & somatic wellness research guide. Provide accurate, real-world grounded insights citing current scientific literature, astrological/lunar alignments, herbal properties, and nervous system regulation practices. Format with warm, calming clarity.",
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || "";
      const candidate = response.candidates?.[0];
      const groundingMetadata = candidate?.groundingMetadata;
      const groundingChunks = groundingMetadata?.groundingChunks || [];
      const searchQueries = groundingMetadata?.webSearchQueries || [];

      res.json({
        text,
        groundingChunks,
        searchQueries,
      });
    } catch (error: any) {
      console.error("Search Grounding API Error:", error);
      res.status(500).json({
        error: error.message || "Failed to generate search-grounded content",
      });
    }
  });

  // Google Maps Grounding Endpoint (gemini-3.7-flash with googleMaps tool - Free Tier)
  app.post("/api/gemini/maps", async (req, res) => {
    try {
      const { prompt, latitude, longitude } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const ai = getGenAI();
      const config: any = {
        tools: [{ googleMaps: {} }],
      };

      if (latitude && longitude && !isNaN(Number(latitude)) && !isNaN(Number(longitude))) {
        config.toolConfig = {
          retrievalConfig: {
            latLng: {
              latitude: Number(latitude),
              longitude: Number(longitude),
            },
          },
        };
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config,
      });

      const text = response.text || "";
      const candidate = response.candidates?.[0];
      const groundingMetadata = candidate?.groundingMetadata;
      const groundingChunks = groundingMetadata?.groundingChunks || [];

      res.json({
        text,
        groundingChunks,
      });
    } catch (error: any) {
      console.error("Maps Grounding API Error:", error);
      res.status(500).json({
        error: error.message || "Failed to generate maps-grounded content",
      });
    }
  });

  // Botanical Vision & Altar Concept Generator (Free Tier)
  app.post("/api/gemini/vision-concept", async (req, res) => {
    try {
      const { prompt, theme = "sacred_altar" } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: `Create a detailed sacred botanical visualization, altar arrangement, sensory profile, and color palette based on this request: "${prompt}" with theme "${theme}".`,
        config: {
          systemInstruction:
            "You are Juls in Bloom's botanical visual artist. Generate a deeply poetic, sensory-rich altar and floral layout blueprint. Include botanical species names, color harmonies (with hex codes), crystal pairings, sound bowl frequencies, and sacred geometrical layout recommendations.",
        },
      });

      res.json({
        text: response.text || "",
      });
    } catch (error: any) {
      console.error("Vision Concept API Error:", error);
      res.status(500).json({
        error: error.message || "Failed to generate botanical concept",
      });
    }
  });

  // Somatic Reasoning & Inquiry Endpoint (Free Tier)
  app.post("/api/gemini/thinking", async (req, res) => {
    try {
      const { prompt, context } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const systemInstruction = `You are Juls in Bloom's Trauma-Informed Somatic & Neuro-Wellness Guide.
Engage in step-by-step, thorough clinical and compassionate reasoning to synthesize nervous system regulation protocols, polyvagal theory, somatic mindfulness, botanical energetics, sound frequency acoustics (e.g., 432Hz, 528Hz), and custom restorative sequences.
Provide deep, nuanced, comprehensive, and compassionate step-by-step guidance.`;

      const ai = getGenAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: context ? `Context: ${context}\n\nQuery: ${prompt}` : prompt,
        config: {
          systemInstruction,
        },
      });

      const text = response.text || "";

      res.json({
        text,
      });
    } catch (error: any) {
      console.error("Thinking Mode API Error:", error);
      res.status(500).json({
        error: error.message || "Failed to execute deep reasoning",
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Fatal error starting server:", err);
});
