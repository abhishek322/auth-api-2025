const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");

const homeRouter = express.Router();

homeRouter.get('/welcome', authMiddleware, (req, res) => {

    const { userId, username, role } = req.userInfo;

    res.status(200).json({
        success: true,
        message: 'Welcome to the Home page',
        user: {
            _id: userId,
            username,
            role
        }
    })
});

module.exports = homeRouter;