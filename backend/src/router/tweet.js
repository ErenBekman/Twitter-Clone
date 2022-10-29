const router = require("express").Router();
const tweetController = require("../controllers/TweetController");
const authenticateToken = require("../middleware/auth");
const verifyemail = require("../middleware/verifyemail");

router.get("/", authenticateToken, tweetController.index);
router.get("/:id", authenticateToken, verifyemail, tweetController.show);
router.post("/", authenticateToken, tweetController.create);
router.patch("/:id", authenticateToken, tweetController.update);
router.delete("/:id", authenticateToken, tweetController.destroy);
router.put("/:id/like", authenticateToken, tweetController.like);
router.post("/:id/add-comment", authenticateToken, tweetController.addComment);
router.delete("/:id/:commentId", authenticateToken, tweetController.deleteComment);
router.post("/timeline/all", authenticateToken, tweetController.timeline);
router.get("/profile/:username", authenticateToken, tweetController.profile);

module.exports = router;
