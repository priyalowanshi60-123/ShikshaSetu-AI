const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({
path: path.resolve(__dirname, "../.env")
});

const app = express();
const PORT = process.env.PORT || 5000;

// ===============================
// ROUTES
// ===============================

const authRoutes =
require("./routes/authRoutes");

const courseRoutes =
require("./routes/courseRoutes");

const subjectRoutes =
require("./routes/subjectRoutes");

const progressRoutes =
require("./routes/progressRoutes");

const lessonRoutes =
require("./routes/lessonRoutes");

// ===============================
// MODELS
// ===============================

const Quiz =
require("./models/quiz");

const Progress =
require("./models/progress");

// ===============================
// AUTH
// ===============================

const protect =
require("./middleware/authMiddleware");

// ===============================
// MIDDLEWARE
// ===============================

app.use(express.json());

app.use(
express.static(
path.join(
__dirname,
"../frontend"
)
)
);

// ===============================
// MAIN API ROUTES
// ===============================

app.use(
"/api/auth",
authRoutes
);

app.use(
"/api/courses",
courseRoutes
);

app.use(
"/api/subjects",
subjectRoutes
);

app.use(
"/api/lessons",
lessonRoutes
);

// ===============================
// PROGRESS DASHBOARD API
// ===============================

app.get(
"/api/progress/dashboard",
protect,
async (req, res) => {
try {
const progress =
await Progress.find({
userId:
req.user.userId
}).lean();

        return res.status(200).json({
            success: true,
            progress: progress
        });

    } catch (error) {

        console.error(
            "DASHBOARD PROGRESS ERROR:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                error.message
        });
    }
}

);

app.use(
"/api/progress",
progressRoutes
);

// ===============================
// QUIZ API
// ===============================

app.get(
"/api/quizzes",
async (req, res) => {

    try {

        const quizzes =
            await Quiz.find()
                .populate(
                    "courseId",
                    "title"
                );

        return res.status(200).json({
            success: true,
            quizzes: quizzes
        });

    } catch (error) {

        console.error(
            "Get quizzes error:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message:
                "Server error while fetching quizzes"
        });
    }
}

);

app.get(
"/api/quizzes/",
async (req, res) => {

    try {

        const quiz =
            await Quiz.findById(
                req.params.id
            ).populate(
                "courseId",
                "title"
            );

        if (!quiz) {

            return res.status(404).json({
                success: false,
                message:
                    "Quiz not found"
            });
        }

        return res.status(200).json({
            success: true,
            quiz: quiz
        });

    } catch (error) {

        console.error(
            "Get quiz error:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message:
                "Server error while fetching quiz"
        });
    }
}

);

// ===============================
// LOCAL AI TEST
// ===============================

app.get(
"/api/ai/test",
(req, res) => {

    return res.status(200).json({
        success: true,
        message:
            "Local Ollama AI route is working"
    });
}

);

// ===============================
// LOCAL AI ASK
// ===============================

app.post(
"/api/ai/ask",
async (req, res) => {

    try {

        const question =
            String(
                req.body.question || ""
            ).trim();

        if (!question) {

            return res.status(400).json({
                success: false,
                message:
                    "Question is required"
            });
        }

        console.log(
            "AI question received:",
            question
        );

        const ollamaResponse =
            await fetch(
                "http://127.0.0.1:11434/api/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        model:
                            "llama3.2",

                        stream: false,

                        messages: [
                            {
                                role: "system",
                                content:
                                    "You are ShikshaSetu-AI, an educational assistant for college students in India. Explain concepts simply and clearly. Use Hinglish when appropriate. Give helpful, accurate and student-friendly answers."
                            },
                            {
                                role: "user",
                                content:
                                    question
                            }
                        ]
                    })
                }
            );

        const data =
            await ollamaResponse.json();

        if (!ollamaResponse.ok) {

            throw new Error(
                data.error ||
                "Ollama request failed"
            );
        }

        const answer =
            data.message &&
            data.message.content
                ? data.message.content
                : "No answer generated.";

        console.log(
            "Local Llama response received successfully"
        );

        return res.status(200).json({
            success: true,
            question: question,
            answer: answer
        });

    } catch (error) {

        console.error(
            "========== LOCAL AI ERROR =========="
        );

        console.error(
            "Message:",
            error.message
        );

        console.error(
            "===================================="
        );

        return res.status(500).json({
            success: false,
            message:
                "Local AI response failed. Please check Ollama.",
            error:
                error.message
        });
    }
}

);

// ===============================
// HOME PAGE
// ===============================

app.get(
"/",
(req, res) => {

    return res.sendFile(
        path.join(
            __dirname,
            "../frontend/index.html"
        )
    );
}

);

// ===============================
// MONGODB
// ===============================

mongoose
.connect(
process.env.MONGO_URI
)
.then(() => {

    console.log(
        "MongoDB connected successfully"
    );

})
.catch((error) => {

    console.error(
        "MongoDB connection failed:",
        error.message
    );
});

// ===============================
// START SERVER
// ===============================

app.listen(
PORT,
() => {

    console.log(
        `ShikshaSetu-AI Backend running at http://localhost:${PORT}`
    );
}

);