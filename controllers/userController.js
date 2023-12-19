// userController.js
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// for registering the user
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        if (!username || !email || !password) {
            res.status(400).json({ error: "All fields are required!" });
            return;
        }

        const userAvailable = await User.findOne({ email });

        if (userAvailable) {
            res.status(400).json({ error: "User already registered!" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        console.log(`User created ${user}`);
        res.status(201).json({ _id: user.id, email: user.email });
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// for the login of users (JWT is used)
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            res.status(400).json({ error: "All fields are mandatory" });
            return;
        }

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const key = jwt.sign(
                {
                    user: {
                        username: user.username,
                        email: user.email,
                        id: user.id,
                    },
                },
                process.env.ACCESS_TOKEN_SECERT,
                { expiresIn: "1m" }
            );
            res.status(200).json({ key });
        } else {
            res.status(401).json({ error: "Email or password is not valid" });
        }
    } catch (error) {
        console.error("Error during user login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// for the current user (private; only the logged-in user can access it)
const currentUser = asyncHandler(async (req, res) => {
    res.json({ message: "current user info" });
});

module.exports = { registerUser, loginUser, currentUser };
