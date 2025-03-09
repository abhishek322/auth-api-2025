const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    // console.log(authHeader);

    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        res.status(400).json({
            success: false,
            message: "Access denied. PLease login to continue"
        })
    }

    //decode this token
    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(decodeToken);
        
        req.userInfo = decodeToken;
        next();

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Faild to decode Token"
        })
    }

}



module.exports = authMiddleware;