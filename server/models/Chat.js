const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const chatSchema = new Schema({
    user_1:    {
        type: Schema.Types.ObjectId,
        ref: 'owner'
    },
    user_2: {
        type: Schema.Types.ObjectId,
        ref: 'owner'
    },
    messages:  [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
}]
});
const Chat = model('Chat', chatSchema);

module.exports = Chat;
