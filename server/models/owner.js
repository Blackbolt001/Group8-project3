const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Book.js
const petSchema = require('./pet');

const ownerSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    likes:[{
        type: Schema.Types.ObjectId,
        ref: 'owner'
    }],
    age: {
        type: Number,
        minimum: [16, 'You must be at least 16 years old'],
        maximum: [99, 'There is no way you are that old...'],
    },
    interests: {
        type: String,
    },
    pet: [petSchema]
});

// set up pre-save middleware to create password
ownerSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });

// compare the incoming password with the hashed password
ownerSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

const Owner = model('Owner', ownerSchema);

module.exports = Owner;