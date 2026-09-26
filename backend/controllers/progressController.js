const Progress = require("../models/progress");
const Lesson = require("../models/lesson");

const getProgress = async (req, res) => {
try {
const { courseId } = req.params;

    let progress = await Progress.findOne({
        userId: req.user.userId,
        courseId: courseId
    });

    if (!progress) {
        progress = await Progress.create({
            userId: req.user.userId,
            courseId: courseId,
            completedLessons: [],
            progressPercentage: 0
        });
    }

    return res.status(200).json({
        success: true,
        progress: progress
    });
} catch (error) {
    console.error(
        "Get progress error:",
        error.message
    );

    return res.status(500).json({
        success: false,
        message: error.message
    });
}

};

const getAllProgress = async (req, res) => {
try {
const progressList = await Progress.find({
userId: req.user.userId
}).sort({
updatedAt: -1
});

    return res.status(200).json({
        success: true,
        progress: progressList
    });
} catch (error) {
    console.error(
        "Get all progress error:",
        error.message
    );

    return res.status(500).json({
        success: false,
        message: error.message
    });
}

};

const completeLesson = async (req, res) => {
try {
const { courseId, lessonId } = req.body;

    if (!courseId || !lessonId) {
        return res.status(400).json({
            success: false,
            message:
                "Course ID and lesson ID are required"
        });
    }

    const lesson = await Lesson.findById(
        lessonId
    );

    if (!lesson) {
        return res.status(404).json({
            success: false,
            message: "Lesson not found"
        });
    }

    let progress = await Progress.findOne({
        userId: req.user.userId,
        courseId: courseId
    });

    if (!progress) {
        progress = await Progress.create({
            userId: req.user.userId,
            courseId: courseId,
            completedLessons: [],
            progressPercentage: 0
        });
    }

    const alreadyCompleted =
        progress.completedLessons.some(
            (id) =>
                id.toString() ===
                lessonId.toString()
        );

    if (!alreadyCompleted) {
        progress.completedLessons.push(
            lessonId
        );
    }

    const totalLessons =
        await Lesson.countDocuments({
            courseId: courseId
        });

    progress.progressPercentage =
        totalLessons > 0
            ? Math.min(
                  100,
                  Math.round(
                      (progress.completedLessons
                          .length /
                          totalLessons) *
                          100
                  )
              )
            : 0;

    await progress.save();

    return res.status(200).json({
        success: true,
        message:
            "Lesson marked as completed",
        progress: progress
    });
} catch (error) {
    console.error(
        "Complete lesson error:",
        error.message
    );

    return res.status(500).json({
        success: false,
        message: error.message
    });
}

};

module.exports = {
getProgress,
getAllProgress,
completeLesson
};