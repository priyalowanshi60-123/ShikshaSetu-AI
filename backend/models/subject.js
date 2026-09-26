const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
    {
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        lessons: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;