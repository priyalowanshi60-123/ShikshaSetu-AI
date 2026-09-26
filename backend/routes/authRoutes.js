const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    registerUser,
    loginUser
} = require("../controllers/authController");

const {
    getProfile
} = require("../controllers/userController");

const router = express.Router();

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Auth route is working"
    });
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/login-test", (req, res) => {
    res.json({
        success: true,
        message: "Login route is working"
    });
});

router.get("/profile", protect, getProfile);

module.exports = router;