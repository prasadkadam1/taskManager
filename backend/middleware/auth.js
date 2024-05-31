const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../config");
const dotenv = require("dotenv");
dotenv.config();
const USER_SCHEMA = require("../models/user");

exports.protect = async (req, res, next) => {
  var token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized to access this route" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = await USER_SCHEMA.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({ message: " internal server error" });
  }
};