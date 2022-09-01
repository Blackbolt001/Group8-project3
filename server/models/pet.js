const { Schema } = require('mongoose');

const petSchema = new Schema({
    pet_name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true,
    },
    age: {
        type: Number
    },
    nature: {
        type: String
    },
    gender: {
        type: String,
        required: true,
    }
    },
)

module.exports = petSchema;