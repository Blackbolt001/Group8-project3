const { AuthenticationError } = require("apollo-server-express");
const { Pet, Owner,Chat, message, Message } = require('../models');
const {signToken} = require('../utils/auth');

const resolvers = {
  Query: {
    // owners: async () => {
    //   return User.find().populate('pet');
    // },
    owner: async (parent, { username }) => {
      return Owner.findOne({ username }).populate('pet')
    },

    chat: async (parent, { username }) => {
      return Chat.findOne({ username }).populate('messages')
    },
    // owner: async (parent, args, context) => {
    //   if(context.owner) {
    //     return Owner.findOne({ _id: context.owner._id })
    //     .populate('savedPets');
    //   }
    //   throw new AuthenticationError('');
    // },
    pet: async (parent, { petId }) => {
      return Pet.findOne({ _id: petId });
    },
    // pet: async (parent, args, context) => {
    //   if(context.pet) {
    //     return Pet.findOne({ _id: context.Owner._id });
    //   }
    // },
    // user: async (parent, args, context) => {
    //   if (context.user) {
    //     return Owner.findOne({ _id: context.owner._id }).populate('pet');
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
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
      const message = await Message.create(args);
      Chat = await Chat.findByIdAndUpdate(
        {_id:message.chat.id},
        {$addtoSet: {messages:message}},
        {new:true})
      return chat
    },

    addOwner: async (parent, {username, email, password}) => {
      const owner = await Owner.create({username, email, password});
      const token = signToken(owner);
      return {token,owner}
    },

     addPet: async (owner,{petname,breed}, context) => {
      const pet = await Pet.add({petname,breed});
      return {pet}

     },


    //createlike: async (parent, { _id, owner_id }) => {
      //const like = await owner.findOneAndUpdate(
        //{ _id },
      // { $inc: { [`tech_likes`]: 1 } },
        //{ new: true }
    // );
    // return like; 
  // },
 


  //savePet: async(parent,{pet},context) => {
   // if(context.owner) {
     // const owner = await Owner.findByIdAndDelete(
       // {_id:context.owner._id},
     //   {$addtoSet:{savedPets:pet}},
    //  );
     // return owner;
// }
 //   throw new AuthenticationError('You Didnt say the magic word');
//},
//removePet: async(parent,{pet_Id}, context) => {
  //if(context.owner) {
    //const owner = await Owner.findByIdAndUpdate(
      //{_id:context.owner._id},
      //{$pull:{savedPets:{pet_Id}}},
     // {new:true}
   // );
   // return owner;
  //}
/*
=======
>>>>>>> 492a2c6e902b7cc14a03ba12e8b7e0375ba30419
    savePet: async(parent, {petSchema} ,context) => {
      if(context.owner) {
        const owner = await Owner.findByIdAndUpdate(
          {_id:context.owner._id},
          {$addtoSet: {savedPets:Pet}},
          {new:true}
        );
        return owner;
      }
      throw new AuthenticationError('You Didnt say the magic word');
    },
    removePet: async(parent, {pet_Id}, context) => {
      if(context.owner) {
        const owner = await Owner.findByIdAndUpdate(
          {_id:context.owner._id},
          {$pull:{savedPets:{pet_Id}}},
          {new:true}
        );
        return owner;
      }
      throw new AuthenticationError("didn't say the magic word");
    },
<<<<<<< HEAD
    */
  },}


  
module.exports = resolvers;