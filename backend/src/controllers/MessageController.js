const Message = require("../models/Messages");
const httpStatus = require("http-status");

const create = async (req, res, next) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    return res.status(httpStatus.OK).send(savedMessage);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).send(err);
  }
};

const getConversation = async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    }).populate({
      path: "conversationId",
      select: "_id members",
    });
    return res.status(httpStatus.OK).send(messages);
  } catch (err) {
    return res.status(httpStatus.BAD_REQUEST).send(err);
  }
};

module.exports = {
  create,
  getConversation,
};
