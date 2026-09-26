const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },

        completedLessons: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Lesson",
            default: []
        },

        progressPercentage: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        }
    },
    {
        timestamps: true
    }
);

const Progress = mongoose.model("Progress", progressSchema);

module.exports = Progress;