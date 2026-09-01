import express from "express";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Messages are required"
      });
    }

    const result = streamText({
      model: openai("gpt-5-mini"),

      system: `
        You are a helpful AI assistant.

        Give clear, accurate and easy-to-understand answers.
        If the user asks a programming question, provide useful
        explanations and examples.
      `,

      messages
    });

    result.pipeTextStreamToResponse(res);

  } catch (error) {
    console.error("AI Error:", error);

    res.status(500).json({
      error: "Failed to generate AI response"
    });
  }
});

export default router;