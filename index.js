const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const companyRouter = require("./routes/Company");
const noticeRouter = require("./routes/Notice");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const userAppliedRouter = require("./routes/UserApplied");
const { User } = require("./model/User");

const cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};
const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = "qwertyuiopasdfghjklzxcvbnmIsTheSecretKey";

const server = express();

//Middlewares
server.use("/files", express.static("files"));
server.use(express.static("build"));
server.use(cors());
server.use(cookieParser());
server.use(express.json());
server.use(
  session({
    secret: "qwertyuiopasdfghjklzxcvbnmIsTheSecretKey",
    resave: false,
    saveUninitialized: false,
  })
);
server.use(passport.authenticate("session"));
server.use("/companyList", isAuth(), companyRouter.router);
server.use("/notices", isAuth(), noticeRouter.router);
server.use("/users", isAuth(), userRouter.router);
server.use("/auth", authRouter.router);
server.use("/applied", isAuth(), userAppliedRouter.router);

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          done(null, false, { message: "User does not exists" });
        } else if (user.password === password) {
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
          done(null, tokenUser);
        } else {
          done(null, false, { message: "Invalid credentials" });
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      console.log("jwt_payload", jwt_payload.user.id);
      const user = await User.findById(jwt_payload.user.id);
      console.log("use", user);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      done(err);
    }
  })
);

passport.serializeUser(function (user, cb) {
  console.log("serialize", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  console.log("deserialize", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

function isAuth(req, res, done) {
  return passport.authenticate("jwt");
}

mongoose
  .connect(
    "mongodb+srv://tejaswa1234bedi:tejaswa@cluster0.afezkru.mongodb.net/sarthi?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Connection to DB failed !", err);
  });

server.listen(8080, () => {
  console.log("Server started.");
});
