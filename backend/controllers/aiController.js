const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const askAI = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                success: false,
                message: "Question is required"
            });
        }

        console.log("AI question received:", question);
        console.log(
            "OpenAI API key loaded:",
            process.env.OPENAI_API_KEY ? "YES" : "NO"
        );

        const response = await client.responses.create({
            model: "gpt-5-mini",
            input: [
                {
                    role: "system",
                    content:
                        "You are ShikshaSetu-AI, an educational assistant. Explain concepts clearly and simply for college students. Use Hinglish when appropriate."
                },
                {
                    role: "user",
                    content: question
                }
            ]
        });

        console.log("AI response received successfully");

        return res.status(200).json({
            success: true,
            question: question,
            answer: response.output_text
        });

    } catch (error) {
        console.error("========== AI ERROR ==========");
        console.error("Message:", error.message);
        console.error("Status:", error.status);
        console.error("Code:", error.code);
        console.error("==============================");

        return res.status(500).json({
            success: false,
            message: "AI response failed"
        });
    }
};

module.exports = {
    askAI
};