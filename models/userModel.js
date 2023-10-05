const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userPawnPos: {
    type: Number,
  },
  opponentPawnPos: {
    type: Number,
  },
  wins: {
    type: Number,
  },
});

userSchema.statics.signup = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  if (!username.match(/^(?![0-9]*$)[a-zA-Z0-9]+$/)) {
    throw Error("Username can only contain alphanumeric values");
  }

  if (password.length < 8) {
    throw Error("Password must be atleast 8 characters");
  }

  const exists = await this.findOne({ username });

  if (exists) {
    throw Error("Username already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    username,
    password: hash,
    userPawnPos: 1,
    opponentPawnPos: 1,
    wins: 0,
  });

  return user;
};

userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error("Invalid credentials");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid credentials");
  }

  return user;
};

userSchema.statics.updateWin = async function (username, winCount) {
  try {
    const user = await this.findOneAndUpdate(
      { username: username },
      { wins: winCount }
    );

    if (!user) {
      throw Error("Game progress lost");
    }
  } catch (err) {
    throw Error("Game progress lost");
  }
};

userSchema.statics.updatePawn = async function (
  username,
  userPawnPos,
  botPawnPos
) {
  try {
    await this.findOneAndUpdate(
      { username: username },
      { $set: { userPawnPos: userPawnPos, opponentPawnPos: botPawnPos } }
    );
  } catch (err) {
    throw Error("Game progress lost");
  }
};

module.exports = mongoose.model("User", userSchema);
