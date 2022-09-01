const { AuthenticationError } = require("apollo-server-express");
const { petSchema, Owner,Chat, message, Message } = require('../models');

const {signToken} = require('../utils/auth');

const resolvers = {
  Query: {
    owner: async () => {
      return await Owner.find().populate('pet');
    },

    findOwnerById: async(parent, {_id}) => {
      return await Owner.findById(_id).populate('pet');
    },

    chat: async (parent, { user }) => {
     newchat = Chat.find(
     { $or: [{user_1: user},{user_2: user}]});
     return newchat
    },
    message: async (parent,{user, chat}) => {
     test = Message.find({chat: chat})
     return test
    },

    pet: async (parent, { _id }) => {
      return await Owner.findOne({ _id }).populate('pet');
    },
  },

  Mutation: {
    login: async( parent, {email, password}) => {
      const owner = await Owner.findOne({email});

      if(!owner) {
          throw new AuthenticationError('Owner not found');
      }

      const correctPw = await owner.isCorrectPassword(password);

      if(!correctPw) {
        throw new AuthenticationError('Didnt say the magic word!');
      }

      const token = signToken(owner);
      return { token, owner };
    },

    createChat: async (parent, args) => {
      const chat = await Chat.create(args);
      return chat
    },
    createMessage: async (parent, args) => {
      console.log("message")
      console.log(args);
      const message = await Message.create(args);

      const Chat1 = await Chat.findByIdAndUpdate(
        {_id:message.chat},
        {$push: {messages:message.id}},
        {new:true});
       
      return message
    },


    createOwner: async (parent, {username, email, password}) => {
      const owner = await Owner.create({username, email, password});
      const token = signToken(owner);
      return {token, owner}
    },

    createPet: async (parent, { pet_name, age, breed, gender, nature }, context) => {
    //  if (context.owner) {
        const updatedPet = await Owner.findByIdAndUpdate(
          { _id: "631002d0d29ed904c8ece6b3" },
          { $push: { pet: {"pet_name": pet_name, "age": age, "breed": breed, "gender": gender, "nature": nature} } },
          { new: true }
        );

        return updatedPet;
      // }

      throw new AuthenticationError('You need to be logged in!');
     },

    updatePet: async(parent, {petData}, context) => {
      if(context.owner) {
        const owner = await Owner.findByIdAndUpdate(
          { _id: context.owner._id },
          { $Set: { pet : petData } },
          { new: true }
        );
        return owner;
      }
      throw new AuthenticationError('You Didnt say the magic word');
    },
  },
};
  
module.exports = resolvers;