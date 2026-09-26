const express = require("express");

const {
    getProgress,
    getAllProgress,
    completeLesson
} = require("../controllers/progressController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// IMPORTANT:
// /dashboard MUST come before /:courseId

router.get(
    "/dashboard",
    protect,
    getAllProgress
);

router.get(
    "/:courseId",
    protect,
    getProgress
);

router.post(
    "/complete-lesson",
    protect,
    completeLesson
);

module.exports = router;