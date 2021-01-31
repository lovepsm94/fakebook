const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        require: true,
        type: String
    },
    description: String,
    imageUrl: String,
    userId: {
        ref: 'user',
        type: mongoose.Types.ObjectId
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);