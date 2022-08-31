const { Pet, Owner } = require('../models');
const {signToken} = require('../utils/auth');
const {AuthenticationError} = require("apollo-server-express");

const resolvers = {
  Query: {
    owner: async (parent, args, context) => {
      if(context.owner) {
        return Owner.findOne({_id:context.owner_id})
        .populate('savedPets');
      }
      throw new AuthenticationError('');
    },
  },

    Mutation: {

      login: async( parent, {email,password}) => {
        const owner = await Owner.findOne({email});

        if(!owner) {
            throw new AuthenticationError('Owner not found');
}

        const correctPw = await owner.isCorrectPassword(password);

            if(!correctPw) {
                throw new AuthenticationError('Didnt say the magic word!');
}
const token = signToken(owner);
return {token,owner};
    },

    addOwner: async (parent,{username,email,password}) => {
      const owner = await Owner.create({username,email,password});
      const token = signToken(owner);
      return {token,owner}
    },

     addPet: async (parent,{petname,owner}, context) => {
      const pet = await Pet.add({petname,owner});
      return {pet}

     }

   
    
    //createlike: async (parent, { _id, owner_id }) => {
      //const like = await owner.findOneAndUpdate(
        //{ _id },
       // { $inc: { [`tech_likes`]: 1 } },
        //{ new: true }
     // );
     // return like;
  },

  savePet: async(parent,{petSchema},context) => {
    if(context.owner) {
      const owner = await Owner.findByIdAndDelete(
        {_id:context.owner._id},
        {$addtoSet: {savedPets:Pet}},
        {new:true}
      );
      return owner;
 }
    throw new AuthenticationError('You Didnt say the magic word');
},
removePet: async(parent,{pet_Id}, context) => {
  if(context.owner) {
    const owner = await Owner.findByIdAndUpdate(
      {_id:context.owner._id},
      {$pull:{savedPets:{pet_Id}}},
      {new:true}
    );
    return owner;
  }
  throw new AuthenticationError('didnt say the magic word');
},};
  
module.exports = resolvers;