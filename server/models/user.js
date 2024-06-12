const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
    },
    bio: {
      type: String,
    },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "room",
      },
    ],
  },
  { timestamps: true }
);

//register user function
userSchema.statics.register = async function (username, email, password) {
  // validation
  if (!email || !password || !username) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  /*if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }*/
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  const salt = await bcrypt.genSalt();
  hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    username,
    email,
    password: hash,
    rooms: [],
    profileImg: "",
    bio: "",
  });
  return user;
};

//login user function
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email or password");
  }
  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    throw Error("Incorrect password");
  }
  return user;
};

const User = mongoose.model("user", userSchema); // pluriel and search for it in db
module.exports = User;
