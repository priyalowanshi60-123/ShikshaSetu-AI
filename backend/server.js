const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { GoogleGenAI } = require("@google/genai");

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

// ===============================
// QUIZ BY ID
// ===============================

app.get(
    "/api/quizzes/:id",
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
// GEMINI AI TEST
// ===============================

app.get(
    "/api/ai/test",
    (req, res) => {

        return res.status(200).json({
            success: true,
            message:
                "Gemini AI route is working"
        });
    }
);

// ===============================
// GEMINI AI ASK
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

            if (!process.env.GEMINI_API_KEY) {

                console.error(
                    "GEMINI_API_KEY is not configured"
                );

                return res.status(500).json({
                    success: false,
                    message:
                        "Gemini API key is not configured"
                });
            }

            console.log(
                "AI question received:",
                question
            );

            const ai =
                new GoogleGenAI({
                    apiKey:
                        process.env.GEMINI_API_KEY
                });

            const response =
                await ai.models.generateContent({
                    model:
                        "gemini-3.8-flash",

                    contents:
                        question,

                    config: {
                        systemInstruction:
                            "You are ShikshaSetu-AI, an educational assistant for college students in India. Explain concepts simply and clearly. Use Hinglish when appropriate. Give helpful, accurate and student-friendly answers."
                    }
                });

            const answer =
                response.text ||
                "No answer generated.";

            console.log(
                "Gemini AI response received successfully"
            );

            return res.status(200).json({
                success: true,
                question: question,
                answer: answer
            });

        } catch (error) {

            console.error(
                "========== GEMINI AI ERROR =========="
            );

            console.error(
                "Message:",
                error.message
            );

            console.error(
                "====================================="
            );

            return res.status(500).json({
                success: false,
                message:
                    "AI response failed. Please try again.",
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