const { Router } = require("express");
const {
  createPost,
  likeAndUnlikePost,
  deletePost,
  getPostOfFollwoing,
  updateCaption,
  commentOnPost,
  DeleteCommentOnPost,
} = require("../controllers/post");
const { isAuthenticated } = require("../middlewares/auth.js");
const uploadMiddleware = require("../middlewares/multer");

const router = Router();

router
  .route("/new/upload")
  .post(isAuthenticated, uploadMiddleware.single("file"), createPost);

router.route("/following/posts").get(isAuthenticated, getPostOfFollwoing);

router
  .route("/:id")
  .get(isAuthenticated, likeAndUnlikePost)
  .put(isAuthenticated, updateCaption)
  .delete(isAuthenticated, deletePost);

router
  .route("/comment/:id")
  .put(isAuthenticated, commentOnPost)
  .delete(isAuthenticated, DeleteCommentOnPost);

module.exports = router;
