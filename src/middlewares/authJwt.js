const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user');

const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/auth/signin'); 
    }

    try {
        const decoded = jwt.verify(token, config.SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.redirect('/auth/signin'); 
        }

        req.userId = decoded.id;
        next(); 
    } catch (error) {
        console.error(error);
        return res.redirect('/auth/signin'); 
    }
};

module.exports = { verifyToken };