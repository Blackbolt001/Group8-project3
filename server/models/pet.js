const { Schema } = require('mongoose');

const petSchema = new Schema({
    pet_name: {
        type: String,
    },
    breed: {
        type: String,
    },
    age: {
        type: Number
    },
    nature: {
        type: String
    },
    gender: {
        type: String,
    }
    },
)

module.exports = petSchema;