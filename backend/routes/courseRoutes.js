const express = require("express");

const {
    createCourse,
    getCourses,
    getCourseById
} = require("../controllers/courseController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);

module.exports = router;