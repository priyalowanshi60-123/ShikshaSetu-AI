const Subject = require("../models/subject");
const Lesson = require("../models/lesson");

const createSubject = async (req, res) => {
    try {
        const { courseId, title, description, lessons } = req.body;

        if (!courseId || !title) {
            return res.status(400).json({
                success: false,
                message: "Course ID and subject title are required"
            });
        }

        const subject = await Subject.create({
            courseId,
            title,
            description: description || "",
            lessons: lessons || 0
        });

        res.status(201).json({
            success: true,
            message: "Subject created successfully",
            subject
        });

    } catch (error) {
        console.error("Create subject error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while creating subject"
        });
    }
};

const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find({
            courseId: req.params.courseId
        }).sort({ createdAt: 1 });

        res.status(200).json({
            success: true,
            count: subjects.length,
            subjects
        });

    } catch (error) {
        console.error("Get subjects error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching subjects"
        });
    }
};

const createLesson = async (req, res) => {
    try {
        const {
            courseId,
            subjectId,
            title,
            content,
            duration,
            order
        } = req.body;

        if (!courseId || !subjectId || !title || !content) {
            return res.status(400).json({
                success: false,
                message: "Course ID, subject ID, title and content are required"
            });
        }

        const lesson = await Lesson.create({
            courseId,
            subjectId,
            title,
            content,
            duration: duration || "",
            order: order || 1
        });

        res.status(201).json({
            success: true,
            message: "Lesson created successfully",
            lesson
        });

    } catch (error) {
        console.error("Create lesson error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while creating lesson"
        });
    }
};

const getLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find({
            subjectId: req.params.subjectId
        }).sort({ order: 1 });

        res.status(200).json({
            success: true,
            count: lessons.length,
            lessons
        });

    } catch (error) {
        console.error("Get lessons error:", error);

        res.status(500).json({
            success: false,
            message: "Server error while fetching lessons"
        });
    }
};

module.exports = {
    createSubject,
    getSubjects,
    createLesson,
    getLessons
};