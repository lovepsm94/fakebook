const AuthRouter = require('express').Router();
const AuthController = require('./auth.controller');
const bcrypt = require('bcryptjs');

AuthRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await AuthController.findUser({ email, password });
        res.send({ success: 1, data: user });
    } catch (error) {
        res.send({ success: 0, message: error.message });
    }

});

AuthRouter.post('/signup', async (req, res) => {
    try {
        const { email, password, fullName, birthDate, gender } = req.body;
        console.log(req.body)
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const user = await AuthController.createUser({ email, password: hashPassword, fullName, birthDate, gender });
        res.send({ success: 1, data: user });
    } catch (error) {
        res.send({ success: 0, message: error.message })
    }

});



module.exports = AuthRouter; 