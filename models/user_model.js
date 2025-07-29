const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
const config = require("config");
const { boolean } = require("joi");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: function () {
      return this.isNew;
    },
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  phone: {
    type: String,
    required: function () {
      return this.isNew;
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  isAdmin:{
    type: Boolean,
    required: false,
    default: false,
  }
});

userSchema.methods.GenerateAuthToken = function () {
  const privateKey = config.get("mail.password");
  var token = jwt.sign({ email: this.email,_id:this._id ,isAdmin:this.isAdmin}, privateKey);
  return token;
};

module.exports = mongoose.models.Users || mongoose.model("Users", userSchema);
