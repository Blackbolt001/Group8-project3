const { Owner } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
  async getSingleOwner({ user = null, params }, res) {
    const foundOwner = await Owner.findOne({
      $or: [{ _id: user ? owner._id : params.id }, { username: params.username }],
    });

    if (!foundOwner) {
      return res.status(400).json({ message: 'Cannot find an Owner with this id!' });
    }
    res.json(foundOwner);
  },
  async createOwner({ body }, res) {
    const owner = await Owner.create(body);

    if (!owner) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(owner);
    res.json({ token, owner });
  },
  async login({ body }, res) {
    const owner = await Owner.findOne({ $or: [{ username: body.username }, { email: body.email }] });
    if (!owner) {
      return res.status(400).json({ message: "Can't find this owner" });
    }

    const correctPw = await owner.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(owner);
    res.json({ token, owner });
  },
  async savePet({ owner, body }, res) {
    console.log(owner);
    try {
      const updatedOwner = await Owner.findOneAndUpdate(
        { _id: owner._id },
        { $addToSet: { savedPets: body } },
        { new: true, runValidators: true }
      );
      return res.json(updatedOwner);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  // remove a book from `savedBooks`
  async deletePet({ owner, params }, res) {
    const updatedOwner = await Owner.findOneAndUpdate(
      { _id: owner._id },
      { $pull: { savedPets: { petId: params.pet_Id } } },
      { new: true }
    );
    if (!updatedOwner) {
      return res.status(404).json({ message: "Couldn't find owner with this id!" });
    }
    return res.json(updatedOwner);
  },
};
