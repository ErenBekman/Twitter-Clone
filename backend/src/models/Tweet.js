const mongoose = require("mongoose");

const TweetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
      default: null,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: [
      {
        comment: String,
        commented_at: Date,
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tweet", TweetSchema);
