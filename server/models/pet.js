const { Schema, model } = require('mongoose');

const petSchema = new Schema({
    pet_name: {
        type: String,
        required: true
    },
    Breed: {
        type: String,
        required: true,
    },
    Age: {
        type: Number
    },
    Nature: {
        type: String
    },
    Gender: {
        type: String,
        required: true,
    },
})

const Pet = model('Pet', petSchema);

module.exports = Pet;