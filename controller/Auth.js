const { User } = require("../model/User");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const response = await user.save();
    req.login(user, (err) => {
      if (err) {
        res.status(400).json(err);
      } else {
        const token = jwt.sign(
          { user },
          "qwertyuiopasdfghjklzxcvbnmIsTheSecretKey"
        );
        const tokenUser = {
          email: user.email,
          password: user.password,
          role: user.role,
          profile: user.profile,
          id: user.id,
          token: token,
        };
        res
          .cookie("jwt", token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
          })
          .status(200)
          .json(tokenUser);
      }
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  res
    .cookie("jwt", req.user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(200)
    .json(req.user);
};

exports.checkAuth = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401);
  }
};
