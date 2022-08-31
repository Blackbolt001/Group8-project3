

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
    username: 
       {
        type: String,
        required: true,
       }
});
const Message = model('Message', messageSchema);

module.exports = Message;
