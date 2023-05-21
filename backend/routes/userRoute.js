const { Router } = require("express");
const {
  createUser,
  loginUser,
  followUser,
  logoutUser,
  updatePassword,
  updateProfile,
  deleteProfile,
  myProfile,
  getSingleUserProfile,
  getAllUsers,
  frogotPassword,
  resetPassword,
  getMyPosts,
  userPosts,
  addCoverPic,
} = require("../controllers/user");
const uploadMiddleware = require("../middlewares/multer.js");

const { isAuthenticated } = require("../middlewares/auth");

const router = Router();

router.route("/register").post(uploadMiddleware.single("avatar"), createUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/follow/:id").get(isAuthenticated, followUser);

router.route("/update/password").put(isAuthenticated, updatePassword);

router
  .route("/update/profile")
  .put(isAuthenticated, uploadMiddleware.single("avatar"), updateProfile);

router.route("/delete/profile").delete(isAuthenticated, deleteProfile);

router.route("/profile").get(isAuthenticated, myProfile);

router.route("/any/:id").get(isAuthenticated, getSingleUserProfile);

router.route("/all").get(isAuthenticated, getAllUsers);

router.route("/forgot/password/:email").get(frogotPassword);

router.route("/password/reset/:Token").put(resetPassword);

router.route("/myposts").get(isAuthenticated, getMyPosts);

router.route("/userposts/:id").get(isAuthenticated, userPosts);
router
  .route("/cover")
  .post(isAuthenticated, uploadMiddleware.single("cover"), addCoverPic);

module.exports = router;
