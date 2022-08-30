const { Pet, Owner } = require('../models');
const {signToken} = require('../utils/auth');
const {AuthenticationError, UserInputError} = require("apollo-server-express");

const resolvers = {
  Query: {
    owner: async (parent, args, context) => {
      if(context.owner) {
        return Owner.findOne({_id:context.owner_id})
        .populate('savedPets');
      }
      throw new AuthenticationError('')
    },
    pet: async (parent,args,context) => {
      if(context.pet) {
        return Owner.findOne({_id:context.pet_id});
      }
    },

//     Mutation: {
//       addUser: async (parent, { username, email, password }) => {
//         const user = await User.create({ username, email, password });
//         const token = signToken(user);
//         return { token, user };
//       },
//       login: async( parent, {email,password}) => {
//         const user = await User.findOne({email});

//         if(!user) {
//             throw new AuthenticationError('User not found');
//         }

//         const correctPw = await user.isCorrectPassword(password);

//         if(!correctPw) {
//           throw new AuthenticationError('Didnt say the magic word!');
//         }

//         const token = signToken(user);
//             return {token,user};
//       }
//     },
  },
};

module.exports = resolvers;