const axios = require("axios");

const HF_URL =
  "https://api-inference.huggingface.co/models/ourafla/mental-health-bert-finetuned";

async function analyzeMessage(message) {
  try {
    const response = await axios.post(
      HF_URL,
      { inputs: message },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
      }
    );

    return response.data[0]; 
  } catch (error) {
    console.error("HF Error:", error.response?.data || error.message);
    throw new Error("Model inference failed");
  }
}

module.exports = analyzeMessage;
