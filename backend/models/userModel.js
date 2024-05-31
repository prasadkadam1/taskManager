const { request } = require("express")
const bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
const dotenv = require("dotenv")
//create schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number
  },
  password: {
    type: String,
    required: true
  }
},
  { timestamps: true }

)


userSchema.pre("save", async function () {
  let salt = await bcrypt.genSalt(5)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// userSchema.methods.getToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWTSECRET, { expiresIn: process.env.JWTCOOKIEEXPIRE })
// }

module.exports = mongoose.model('user', userSchema)
