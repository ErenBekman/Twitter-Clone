const Conversation = require("../models/Conversation");
const httpStatus = require("http-status");

const create = async (req, res, next) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    return res.status(httpStatus.OK).send(savedConversation);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).send(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    }).populate({
      path: "members",
      select: "_id username",
    });
    return res.status(httpStatus.OK).send(conversation);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).send(err);
  }
};

const find = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });

    return res.status(httpStatus.OK).send(conversation);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).send(err);
  }
};

module.exports = {
  create,
  getUser,
  find,
};
