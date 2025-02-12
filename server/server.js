import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

app.use(express.json()); 
app.use(cors()); 

app.post("/summarise", async (req, res) => {
    const { text } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!text) {
        return res.status(400).json({ error: "Missing text input" });
    }

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: `Summarise this: ${text}` }],
                max_tokens: 500,
            },
            {
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json({ message: response.data.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to fetch summary" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on ${BASE_URL}`);
});
