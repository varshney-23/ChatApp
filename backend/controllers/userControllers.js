const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const bcrypt = require('bcrypt');
const { token } = require("morgan");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword);
  res.send(users);
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {

  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).send("User already exists");
    // throw new Error("User already exists");
  }

  const hashPass = await bcrypt.hash(password , 10);
  
  // console.log(hashPass);

  const user = await User.create({
    name,
    email,
    password : hashPass,
    pic
  });
  // console.log(user);
  const token = generateToken(user._id);
  // console.log(token);
  res.cookie("jwt", token, {
    expires : new Date(Date.now() + 30000),
    httpOnly: true
  });
  res.status(200).json({ success: true });
  // return res.send(token);
  console.log("success");

});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if(!user){
    return res.status(500).send("Please Register First");
  }

  const validatedPassword = await bcrypt.compare(password, user.password);
  // console.log(validatedPassword);
  const token = generateToken(user._id);
  console.log(token);

  res.cookie("jwt", token, {
    expires : new Date(Date.now() + 100000),
    httpOnly: true,
  });

  if (validatedPassword) {
    res.status(201).send("Success");
  } else {
    return res.status(401).send("Invalid Password");
    // throw new Error("Invalid Email or Password");
  }
});

module.exports = { allUsers, registerUser, authUser };
