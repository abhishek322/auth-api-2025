

const adminMiddleware = (req, res, next) => {
    if (req.userInfo.role !== "admin"){
        res.status(400).json({
            success: false,
            message: 'Access denied. Admin rights are required.'
        })
    }

    next();
}

module.exports = adminMiddleware;