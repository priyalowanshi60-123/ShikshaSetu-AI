const express = require("express");

const {
    createLesson,
    getLessonsByCourse,
    getLessonById
} = require("../controllers/lessonController");

const router = express.Router();

router.post("/", createLesson);

router.get(
    "/course/:courseId",
    getLessonsByCourse
);

router.get(
    "/:id",
    getLessonById
);

module.exports = router;