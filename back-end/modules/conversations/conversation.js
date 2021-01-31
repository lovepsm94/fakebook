const mongoose = require('mongoose');

const ConversationShema = new mongoose.Schema({
    owner: [String],
    messages: [{
        text: String
    }, {
        timestamps: true
    }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Conversation', UserSchema);