const User = require("../models/User");
const httpStatus = require("http-status");
const bcrypt = require("bcrypt");

const index = async (req, res, next) => {
  try {
    const allUser = await User.find({});
    return res.status(httpStatus.OK).send(allUser);
  } catch (error) {
    // return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const result = await User.find({ _id: req.params.id });
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const addUser = new User(req.body);
    const result = await addUser.save();
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await User.findByIdAndDelete({ _id: req.params.id });
    if (result) {
      return res.status(httpStatus.OK).send({ msg: "user have deleted" });
    } else {
      return res.status(httpStatus.BAD_REQUEST).send({ msg: "user not found" });

      // throw new Error('user not found');
    }
  } catch (error) {
    next(error);
  }
};

const friends = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username } = friend;
      friendList.push({ _id, username });
    });
    return res.status(httpStatus.OK).send(friendList);
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

const follow = async (req, res, next) => {
  try {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          return res.status(httpStatus.OK).send({ message: "user has been followed" });
        } else {
          return res.status(httpStatus.BAD_REQUEST).send({ message: "you allready follow this user" });
        }
      } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      }
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "you cant follow yourself" });
    }
  } catch (error) {
    next(error);
  }
};

const unfollow = async (req, res, next) => {
  try {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          return res.status(httpStatus.OK).send({ message: "user has been unfollowed" });
        } else {
          return res.status(httpStatus.BAD_REQUEST).send({ message: "you dont follow this user" });
        }
      } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
      }
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "you cant unfollow yourself" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  friends,
  follow,
  unfollow,
};
