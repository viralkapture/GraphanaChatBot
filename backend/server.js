require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const contextText = fs.readFileSync(path.join(__dirname, "data.txt"), "utf-8");

app.post("/api/ask", async (req, res) => {
  const query = req.body.query || "";
  try {
    const geminiResponse = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You are a helpful assistant. Use only the information below to answer. If not present, say you don't know.\n\n---\n${contextText}\n---\n\nUser: ${query}`
              }
            ]
          }
        ]
      },
      {
        params: { key: process.env.GEMINI_API_KEY }
      }
    );

    const answer =
      geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn’t generate a response.";
    res.json({ answer });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ answer: "Error contacting Gemini API" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
