const Lesson = require("../models/lesson");

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
            message: "Course ID, Subject ID, title and content are required"
        });
    }

    const lesson = await Lesson.create({
        courseId: courseId,
        subjectId: subjectId,
        title: title,
        content: content,
        duration: duration || "",
        order: order || 1
    });

    return res.status(201).json({
        success: true,
        message: "Lesson created successfully",
        lesson: lesson
    });

} catch (error) {
    console.error(
        "Create lesson error:",
        error.message
    );

    return res.status(500).json({
        success: false,
        message: "Server error while creating lesson"
    });
}

};

const getLessonsByCourse = async (req, res) => {
try {
const courseId = req.params.courseId;

    const lessons = await Lesson.find({
        courseId: courseId
    }).sort({
        order: 1,
        createdAt: 1
    });

    return res.status(200).json({
        success: true,
        count: lessons.length,
        lessons: lessons
    });

} catch (error) {
    console.error(
        "Get lessons error:",
        error.message
    );

    return res.status(500).json({
        success: false,
        message: "Server error while fetching lessons"
    });
}

};

const getLessonById = async (req, res) => {
try {
const lessonId = req.params.id;

    const lesson = await Lesson.findById(
        lessonId
    );

    if (!lesson) {
        return res.status(404).json({
            success: false,
            message: "Lesson not found"
        });
    }

    return res.status(200).json({
        success: true,
        lesson: lesson
    });

} catch (error) {
    console.error(
        "Get lesson error:",
        error.message
    );

    return res.status(500).json({
        success: false,
        message: "Server error while fetching lesson"
    });
}

};

module.exports = {
createLesson,
getLessonsByCourse,
getLessonById
};