const {
  encryptPassword,
  createJWT,
  verifyPassword,
} = require("../helpers/AuthHelper");
const User = require("../model/User");

exports.registerAPI = async (req, res) => {
  try {
    let post = req.body;
    if (post.password) {
      const encryptedPassword = encryptPassword(post.password);
      post = {
        ...post,
        password: encryptedPassword,
      };
    } else {
      return res.status(400).json({
        message: "Password must be provided",
      });
    }

    const user = new User(post);
    const createUser = await user.save();

    if (createUser) {
      let token = createJWT({
        email: createUser.email,
        fullName: createUser.fullName,
        id: createUser._id,
      });

      return res.status(200).json({
        message: "User created successfully",
        user: createUser,
        token: token,
      });
    } else {
      return res.status(400).json({
        message: "Failed to create account at the moment!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

exports.loginAPI = async (req, res) => {
  try {
    const post = req.body;
    const email = post.email;
    const password = post.password;
    const isUserExists = await User.findOne({ email: email });
    if (isUserExists) {
      if (!verifyPassword(password, isUserExists.password)) {
        return res.status(400).json({
          message: "Password incorrect!",
        });
      } else {
        let token = createJWT({
          email: isUserExists.email,
          fullName: isUserExists.fullName,
          id: isUserExists._id,
        });

        return res.status(200).json({
          user: isUserExists,
          token: token,
        });
      }
    } else {
      return res.status(400).json({
        message: "No user found!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

exports.getUserInfoAPI = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.query.email }).select(
      "-password"
    );
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json({
        message: "No user found!",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

exports.updateInfoAPI = async (req, res) => {
  try {
    let post = req.body;
    if (post.password) {
      const encryptedPassword = encryptPassword(post.password);
      post = {
        ...post,
        password: encryptedPassword,
      };
    } else {
      return res.status(400).json({
        message: "Password must be provided",
      });
    }
    const result = await User.findOneAndUpdate(
      { email: post.email },
      {
        $set: {
          ...post,
        },
      },
      { new: true, runValidators: true }
    );
    if (result) {
      let token = createJWT({
        email: result.email,
        fullName: result.fullName,
        id: result._id,
      });

      return res.status(200).json({
        user: result,
        token: token,
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong!",
    });
  }
};
