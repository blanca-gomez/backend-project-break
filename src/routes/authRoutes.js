const express = require ('express');
const router = express.Router();
const authController = require('../controlles/authController')


router.get('/signup', authController.renderSignUpForm);
router.get('/signin', authController.renderSignInForm);


router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);

router.get('/signout', authController.signout)

module.exports = router;


