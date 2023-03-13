const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

// @desc    Register a user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) throw new Error("please add all fields");

    const userExists = await User.findOne({ email });
    if (userExists) throw new Error("User already exists");

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    if (user) {
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        },
      });
    } else {
      throw new Error("Error creating user");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) throw new Error("Invalid email");

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(201).json({
        message: "User Logged in successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        },
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// @desc    Get a user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// GENERATE JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { registerUser, loginUser, getMe };
