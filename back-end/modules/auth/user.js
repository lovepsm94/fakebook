    const mongoose = require('mongoose');

    const UserSchema = new mongoose.Schema({
        email: {
            unique: true,
            type: String
        },
        password: {
            type: String
        },
        fullName: {
            type: String
        },
        gender: {
            type: String
        },
        birthDate: {
            type: Date
        },
        conversation : {
            type: Array
        }
    }, {
        timestamps: true
    });

    module.exports = mongoose.model('User', UserSchema);