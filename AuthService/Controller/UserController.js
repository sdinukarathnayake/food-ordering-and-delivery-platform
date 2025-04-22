const userModel = require('../Models/UserModel');
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs');

const login = async (req, res) => {
    try {
        const { name, password } = req.body;

        const existingUser = await userModel.findOne({ name });

        if (!existingUser) {
            return res.status(401).json({ message: "No such user" });
        }

        const isMatch = await bcryptjs.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Passwords don't match" });
        }

        const token = jwt.sign(
            { id: existingUser.id, name: existingUser.name, email: existingUser.email, role: existingUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: 'Strict',
            secure: false,
            maxAge: 2 * 60 * 60 * 1000
        });

        res.status(200).json({ token });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'Strict',
        secure: false,
    });
    res.status(200).json({ message: 'Logged out successfully' });
}

const checkToken = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: "No token found" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ token });
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const photo = req.files['customerPhoto'] ? req.files['customerPhoto'][0].filename : null;

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newUser = new userModel({ name, email, password: hashedPassword, photo });

        await newUser.save();

        res.status(201).json({ message: `User registered successfully: ${name}` });

    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports= {login,logout,checkToken,register}