const Tweet = require("../models/Tweet");
const User = require("../models/User");
const httpStatus = require("http-status");
const cloudinary = require("cloudinary").v2;

const index = async (req, res, next) => {
  try {
    const allTweet = await Tweet.find({}).populate({
      path: "userId",
      select: "_id username followers followings",
    });
    return res.status(httpStatus.OK).send(allTweet);
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const result = await Tweet.findById(req.params.id).populate({
      path: "userId",
      select: "_id username followers followings",
    });
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    // req.body.user_id = req.user;

    if (req.files) {
      const file = req.files.img;
      cloudinary.uploader.upload(file.tempFilePath, { folder: "twitter/Tweets" }, function (err, result) {
        console.log("err :", err);
        console.log("result :", result);
        let Tweets = {
          ...req.body,
          img: result.url,
          user_id: req.user,
        };

        const addTweet = new Tweet(Tweets);
        const resultTweet = addTweet.save();
        return res.status(httpStatus.CREATED).send(resultTweet);
      });
    } else {
      const addTweet = new Tweet(req.body);
      const resultTweet = addTweet.save();
      return res.status(httpStatus.CREATED).send(resultTweet);
    }
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await Tweet.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await Tweet.findByIdAndDelete({ _id: req.params.id });
    if (result) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: "Tweet have deleted" });
    } else {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Tweet not found" });
    }
  } catch (error) {
    next(error);
  }
};

const like = async (req, res, next) => {
  try {
    console.log("req.body :>> ", req.body);
    console.log("req.params :>> ", req.params);
    const LikeTweet = await Tweet.findById(req.params.id);
    if (!LikeTweet.likes.includes(req.body.userId)) {
      await LikeTweet.updateOne({ $push: { likes: req.body.userId } });
      return res.status(httpStatus.OK).send({ message: "Tweet  has been liked" });
    } else {
      await LikeTweet.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(httpStatus.OK).send({ message: "Tweet  has been disliked" });
    }
  } catch (error) {
    next(error);
  }
};

const timeline = async (req, res, next) => {
  try {
    console.log("req.body :>> ", req.body);
    const currentUser = await User.findById(req.body.userId);
    const userTweets = await Tweet.find({ userId: currentUser._id }).populate({
      path: "userId",
      select: "_id username followers followings",
    });
    const friendTweets = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Tweet.find({ userId: friendId }).populate({
          path: "userId",
          select: "_id username followers followings",
        });
      })
    );
    return res.status(httpStatus.OK).json(userTweets.concat(...friendTweets));
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res) => {
  try {
    console.log("req.params.username :>> ", req.params);
    const user = await User.findOne({ username: req.params.username });
    const tweet = await Tweet.find({ userId: user._id }).populate({
      path: "userId",
      select: "_id username profilePicture followers followings isAdmin",
    });
    return res.status(httpStatus.OK).send(tweet);
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

const addComment = async (req, res) => {
  try {
    await Tweet.findOne({ _id: req.params.id }).then((mainTweet) => {
      if (!mainTweet) return res.status(httpStatus.NOT_FOUND).send({ message: "tweet not found" });
      const comment = {
        ...req.body,
        commented_at: new Date(),
        user_id: req.user,
      };
      mainTweet.comments.push(comment);
      mainTweet
        .save()
        .then((updatedDoc) => {
          return res.status(httpStatus.OK).send(updatedDoc);
        })
        .catch((err) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err));
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

const deleteComment = async (req, res) => {
  try {
    await Tweet.findOne({ _id: req.params.id }).then((mainTweet) => {
      if (!mainTweet) return res.status(httpStatus.NOT_FOUND).send({ message: "tweet not found" });

      mainTweet.comments = mainTweet.comments.filter((comment) => comment._id?.toString() !== req.params.commentId);
      mainTweet
        .save()
        .then((updatedDoc) => {
          return res.status(httpStatus.OK).send(updatedDoc);
        })
        .catch((err) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err));
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

// const retweet = async (req, res) => {
//   const retweetId = [];
//   const tweet = await Tweet.findOne({ _id: req.params.tweetId });
//   const user = await User.findOne({ _id: req.user._id });
//   if (!tweet) return null;

//   const { retweets } = tweet;

//   retweets.map((retweet) => retweetId.push(retweet._id.toString()));

//   if (!retweetId.includes(userId.toString())) {
//     tweet.retweets.push(user._id);
//     user.retweetedTweets.push(tweet._id);

//     await tweet.save();
//     await user.save();
//   } else {
//     tweet.retweets = tweet.retweets.filter(
//       (retweet) => retweet._id.toString() !== userId.toString()
//     );
//     user.retweetedTweets = user.retweetedTweets.filter(
//       (retweet) => retweet.toString() !== tweetId.toString()
//     );

//     await tweet.save();
//     await user.save();
//   }

//   return tweet;
// };

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
  like,
  timeline,
  profile,
  retweet,
  addComment,
  deleteComment,
};
