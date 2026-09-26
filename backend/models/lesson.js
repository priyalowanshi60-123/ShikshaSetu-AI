const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },

        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true
        },

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

        content: {
            type: String,
            required: true
        },

        contentEn: {
            type: String,
            default: ""
        },

        contentHi: {
            type: String,
            default: ""
        },

        duration: {
            type: String,
            default: ""
        },

        order: {
            type: Number,
            default: 1
        }
    },
    {
        timestamps: true
    }
);

const Lesson =
    mongoose.model(
        "Lesson",
        lessonSchema
    );

module.exports = Lesson;