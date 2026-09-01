import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import chatRouter from "../routes/chat.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "AI Chatbot API is running"
  });
});

app.use("/api/chat", chatRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});