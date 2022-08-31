const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const ownerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },


    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    interests: {
        type: String,
    },
    pets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Pet'
        }
    ]
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