const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const chatSchema = new Schema({
   /* user_1:    {
        type: Schema.Types.ObjectId,
        ref: 'owner'
    },
    user_2: {
        type: Schema.Types.ObjectId,
        ref: 'owner'
    },*/
    user_1: {
        type: String,
        required: true,
    },
    user_2: {
        type: String,
        required: true,
       }
    ,
  messages:  [{
    type: Schema.Types.ObjectId,
    ref: 'message'
}]
});
const Chat = model('Chat', chatSchema);

module.exports = Chat;
