const Course = require("../models/course");

const createCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            language,
            level,
            duration,
            lessons,
            skills
        } = req.body;

        if (!title || !description || !category) {
            return res.status(400).json({
                success: false,
                message: "Title, description and category are required"
            });
        }

        const course = await Course.create({
            title,
            description,
            category,
            language: language || "Hindi",
            level: level || "Beginner",
            duration: duration || "",
            lessons: lessons || 0,
            skills: skills || []
        });

        return res.status(201).json({
            success: true,
            message: "Course created successfully",
            course
        });

    } catch (error) {
        console.error("Create course error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while creating course"
        });
    }
};

const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: courses.length,
            courses
        });

    } catch (error) {
        console.error("Get courses error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while fetching courses"
        });
    }
};

const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        return res.status(200).json({
            success: true,
            course
        });

    } catch (error) {
        console.error("Get course error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error while fetching course"
        });
    }
};

module.exports = {
    createCourse,
    getCourses,
    getCourseById
};