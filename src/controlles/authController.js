const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const config = require('../config/config');


const renderSignUpForm = (req, res) => {
    res.render('signUp');
};

const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.render('signup-success');
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: "Error al registrarse" });
    }
};

const renderSignInForm = (req, res) => {
    res.render('signIn');
};

const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.status(400).render('error', { message: 'Usuario no encontrado' });
        }

        const matchPassword = await userFound.comparePassword(password, userFound.password);
        if (!matchPassword) {
            return res.status(400).render('error', { message: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ id: userFound._id }, config.SECRET, {
            expiresIn: 86400 
        });
        res.cookie('token', token, {httpOnly:true})
        res.render('signIn-success', { username: userFound.username }); 
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { message: 'Error al iniciar sesión' });
    }
};

const signout = (req,res) => {
    res.clearCookie('token')
    res.redirect('/products')
}


module.exports = { signUp, signIn, renderSignUpForm, renderSignInForm, signout};