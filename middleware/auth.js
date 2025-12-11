const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkLogin = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Check if authHeader is missing or does not start with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided or bad format' });
    }

    const token = authHeader.split(' ')[1]; // Extract token after 'Bearer '

    try {
        jwt.verify(token, process.env.privateKey);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token', error: error.message });
    }
};

module.exports = checkLogin;
console.log("Auth middleware is working");
