const Quiz = require("../models/quiz");

// Get all quizzes
const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find()
            .populate("courseId", "title");

        res.status(200).json({
            success: true,
            quizzes
        });

    } catch (error) {
        console.error("Get quizzes error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching quizzes"
        });
    }
};

// Get single quiz
const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id)
            .populate("courseId", "title");

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        res.status(200).json({
            success: true,
            quiz
        });

    } catch (error) {
        console.error("Get quiz error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching quiz"
        });
    }
};

module.exports = {
    getQuizzes,
    getQuizById
};

