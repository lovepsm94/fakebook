const jwt = require('jsonwebtoken');
const UserModel = require('../auth/user');

const isAuth = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const {userId} = data;
        const foundUser = await UserModel.findById(userId);
        if (!foundUser) {
            throw new Error('User not found');
        }
        req.user = foundUser;
        next();
    } catch (error) {
        res.status(401).send({ success: 0, message: error.message || 'un auth' });
    }
}

module.exports = isAuth;