const { sendEmail } = require("../middlewares/sendEmail.js");
const Post = require("../models/post.js");
const User = require("../models/user.js");
const crypto = require("crypto");

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "sample id",
        url: "sample url",
      },
    });

    const token = await user.generateToken();

    res
      .status(201)
      .cookie("token", token, {
        expires: new Date(Date.now() + 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        user,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exists",
      });
    }

    const isMarched = await user.matchPassword(password);

    if (!isMarched) {
      return res.status(400).json({
        success: false,
        message: "Inncorrect password",
      });
    }

    const token = await user.generateToken();

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 60 * 60 * 1000),
        httpOnly: true,
      })
      .json({
        success: true,
        user,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("+password");

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide old and new password",
      });
    }
    const isMarched = await user.matchPassword(oldPassword);

    if (!isMarched) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Old password",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }

    //Cloudnary avatar uploading

    user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    const posts = user.posts;
    const followers = user.followers;
    const following = user.following;
    const userId = user._id;
    //Cloudnary avatar uploading

    user.deleteOne();
    //Logout User
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    //Deleting Posts
    for (let i = 0; i < posts.length; i++) {
      const post = await Post.findById(posts[i]);
      await post.deleteOne();
    }

    //Removing user from follower following
    for (let i = 0; i < followers.length; i++) {
      const follower = await User.findById(followers[i]);
      const index = follower.following.indexOf(userId);
      follower.following.splice(index, 1);
      await follower.save();
    }

    //Removing user from following follwers
    for (let i = 0; i < following.length; i++) {
      const followed = await User.findById(following[i]);
      const index = followed.followers.indexOf(userId);
      followed.followers.splice(index, 1);
      await followed.save();
    }

    res.status(200).json({
      success: true,
      message: "Profile Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.myProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("posts");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSingleUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("posts");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.frogotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is Required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const resetPasswordToken = await user.getResetPasswordToken();

    await user.save();

    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/password/reset/${resetPasswordToken}`;

    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Reset your password by clicking on the link : \n\n ${resetUrl} `;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { Token } = req.params;

    if (!Token) {
      return res.status(404).json({
        success: false,
        message: "token is required",
      });
    }

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(Token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is Invalid or has been Expired",
      });
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.followUser = async (req, res, next) => {
  try {
    const userToFollow = await User.findById(req.params.id);

    const loggedInUser = await User.findById(req.user._id);

    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (userToFollow.followers.includes(req.user._id)) {
      const index = loggedInUser.following.indexOf(userToFollow._id);
      const index2 = userToFollow.followers.indexOf(req.user._id);

      loggedInUser.following.splice(index, 1);
      userToFollow.followers.splice(index2, 1);

      await userToFollow.save();
      await loggedInUser.save();

      return res.status(400).json({
        success: false,
        message: `Unfollowed ${userToFollow.name}`,
      });
    } else {
      loggedInUser.following.push(userToFollow._id);

      userToFollow.followers.push(loggedInUser._id);

      await userToFollow.save();
      await loggedInUser.save();

      res.status(200).json({
        success: true,
        message: `Followed ${userToFollow.name}`,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
