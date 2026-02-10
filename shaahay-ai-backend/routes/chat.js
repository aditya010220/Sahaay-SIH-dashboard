const express = require("express");
const analyzeMessage = require("../services/huggingface");
const generateReply = require("../utils/responseGenerator");

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const predictions = await analyzeMessage(message);

    // highest confidence label
    const bestPrediction = predictions.reduce((a, b) =>
      a.score > b.score ? a : b
    );

    const reply = generateReply(bestPrediction);

    res.json({
      userMessage: message,
      detectedState: bestPrediction.label,
      confidence: bestPrediction.score,
      botReply: reply,
    });
  } catch (err) {
    res.status(500).json({ error: "AI processing failed" });
  }
});

module.exports = router;
