const express = require('express');
const User = require("../models/userModel");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

// Middleware to parse JSON bodies
router.use(express.json());

router.post("/", async (req, res) => {
  let { name, email, age, password } = req.body;
  try {
    let userAdded = await User.create({
      name: name,
      email: email,
      age: age,
      password: password
    });
    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const showAll = await User.find();
    res.send(showAll);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const showAll = await User.findById({ _id: id });
    res.send(showAll);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const showAll = await User.findByIdAndDelete({ _id: id });
    res.send(showAll);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  let { name, age, email } = req.body
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedUser);
    // res.send(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
router.post('/login', async (req, res) => {
  let { email, password } = req.body;
  if (!email && !password) {
    res.send("please Enter All Credentials")
  }
  let payload = await User.findOne({ email: email })
  if (!payload) {
    res.send("user not found")
  }
  let isMatched = await payload.matchPassword(password)
  if (!isMatched) {
    res.send("wrong credentials")
  }
  // res.send("User Loggedin Successfully")
  sendToken(payload, 200, res)
})

const sendToken = (user, statusCode, res) => {
  const token = user.getToken()
  const options = {
    expires: new Date(Date.now() + process.env.JWTCOOKIEEXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
  }
  // Optionally secure cookies in production
  if (process.env === 'production') {
    options.secure = true; // Serve secure cookies in production
  }

  // Send token in cookie and response
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,

  });
}
module.exports = router;
