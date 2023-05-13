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
} = require("../controllers/user");
const { isAuthenticated } = require("../middlewares/auth");

const router = Router();

router.route("/register").post(createUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/follow/:id").get(isAuthenticated, followUser);

router.route("/update/password").put(isAuthenticated, updatePassword);

router.route("/update/profile").put(isAuthenticated, updateProfile);

router.route("/delete/profile").delete(isAuthenticated, deleteProfile);

router.route("/profile").get(isAuthenticated, myProfile);

router.route("/any/:id").get(isAuthenticated, getSingleUserProfile);

router.route("/all").get(isAuthenticated, getAllUsers);

router.route("/forgot/password").get(frogotPassword);

router.route("/password/reset/:Token").put(resetPassword);

module.exports = router;
