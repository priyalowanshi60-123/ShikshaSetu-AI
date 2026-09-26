const express = require("express");

const { askAI } = require("../controllers/aiController");

const router = express.Router();

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "AI route is working"
    });
});

router.post("/ask", askAI);

module.exports = router;