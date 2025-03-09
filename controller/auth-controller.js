const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) =>{
    try {
        const {  username, email, password, role } = req.body;
        const checkExistingUser = await Users.findOne({
            $or: [{username}, {email}]
        })
        if (checkExistingUser){
            res.status(400).json({
                success: false,
                message: "User is already exists. Please try with different username or email"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newResisteredUser = await Users.create({
            username,
            email,
            password: hashPassword,
            role: role || 'user'
        })

        if(newResisteredUser){
            res.status(200).json({
                success: true,
                message: 'User data is registered successfully',
                data: newResisteredUser
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'Faild to register user'
            })
        }
        
    } catch (error) {
        console.error('Faild to register user');
        res.status(500).json({
            success: false,
            message: 'User is not registered. Please try again.'
        })
    }
}

const loginUser = async (req, res) =>{
    try {
        const { username, password } = req.body;
        const isUserPresent = await Users.findOne({username});

        if(!isUserPresent){
            res.status(400).json({
                success: false,
                message: 'Invalid Username and Password'
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, isUserPresent.password);
        if(!isPasswordMatched){
            res.status(400).json({
                success: false,
                message: 'Invalid Username and Password'
            })
        }

        const accessToken = jwt.sign({
            userId: isUserPresent._id,
            username: isUserPresent.username,
            role: isUserPresent.role
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: '20m'
        })

        res.status(200).json({
            success: true,
            message: 'Successfully logedIn',
            accessToken
        })

    } catch (error) {
        console.error('Faild to login user');
        res.status(500).json({
            success: false,
            message: 'User is not logedIn. Please try again.'
        })
    }
}

module.exports = { loginUser, registerUser };