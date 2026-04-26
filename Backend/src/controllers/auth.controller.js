const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userExists = await userModel.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      message: "user already exists",
    });
  }
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username,Email and password are required",
    });
  }

  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "Registered Successfully",
    user,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //  STEP 1: Validate input FIRST
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  // STEP 2: Find user
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // STEP 4: Generate token
  const token = jwt.sign({ id: user._id }, "secretkey", {
    expiresIn: "1d",
  });

  res.status(200).json({
    message: "Login Successfully",
    user,
    token,
  });
};

module.exports = { register, login };
