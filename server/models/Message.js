const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const messageSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    time:{
        type: Date,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'owner'
    },
    chat:{
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    },
    name:{
        type: String,
        required: true,
    }
});
const Message = model('Message', messageSchema);

module.exports = Message;
