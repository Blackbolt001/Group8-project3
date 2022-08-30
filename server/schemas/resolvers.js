const { pet,owner } = require('../models');

const resolvers = {
  Query: {
    owner: async () => {
      return owner.find({});
    },
  pet: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return pet.find(params);
    },
  },
  /*Mutation: {
    createOwner: async (parent, args) => {
      const owner = await owner.create(args);
      return owner;
    },
    createlike: async (parent, { _id, owner_id }) => {
      const like = await owner.findOneAndUpdate(
        { _id },
        { $inc: { [`tech_likes`]: 1 } },
        { new: true }
      );
      return like;
    },
  },
  */
};

module.exports = resolvers;