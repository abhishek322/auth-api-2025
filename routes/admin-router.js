const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

const adminRouter = express.Router();

adminRouter.get('/welcome', authMiddleware, adminMiddleware, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the admin page...',
    })  
})

module.exports = adminRouter;