const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        titleEn: {
            type: String,
            default: ""
        },

        titleHi: {
            type: String,
            default: ""
        },

        description: {
            type: String,
            required: true
        },

        descriptionEn: {
            type: String,
            default: ""
        },

        descriptionHi: {
            type: String,
            default: ""
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        language: {
            type: String,
            default: "Hindi"
        },

        level: {
            type: String,
            enum: [
                "Beginner",
                "Intermediate",
                "Advanced"
            ],
            default: "Beginner"
        },

        duration: {
            type: String,
            default: ""
        },

        lessons: {
            type: Number,
            default: 0
        },

        skills: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true
    }
);

const Course =
    mongoose.model(
        "Course",
        courseSchema
    );

module.exports = Course;