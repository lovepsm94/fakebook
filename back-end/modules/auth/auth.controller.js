const UserModel = require('./user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async ({ email, password, fullName, birthDate, gender }) => {
    const user = await UserModel.create({ email, password, fullName, birthDate, gender });
    return user;
};
const findUser = async ({ email, password }) => {
    const foundUser = await UserModel.findOne({ email }).lean();

    if (!foundUser) throw new Error('Email not found');
    const { password: foundPassword } = foundUser;
    const samePassword = bcrypt.compareSync(password, foundPassword);

    if (!samePassword) throw new Error('Password incorrect');
    const { password: userPassword, ...restUser } = foundUser;

    //gen token
    const token = jwt.sign(
        { userId: restUser._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    )
    return { user: restUser, token }
};

module.exports = {
    createUser,
    findUser
}