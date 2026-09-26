const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
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
            enum: ["Beginner", "Intermediate", "Advanced"],
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

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;