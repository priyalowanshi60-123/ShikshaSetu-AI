const express = require("express");

const {
    createSubject,
    getSubjects,
    createLesson,
    getLessons
} = require("../controllers/subjectController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createSubject);

router.get("/course/:courseId", getSubjects);

router.post("/lesson", protect, createLesson);

router.get("/lessons/:subjectId", getLessons);

module.exports = router;