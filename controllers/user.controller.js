const Joi = require("joi");
const asyncValidator = require("../middleware/async");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const  Mongo_User = require("../models/user_model");
const dbDebugger = require('debug')('app:db');

exports.register = asyncValidator(async (req, res) => {
  const { error, value } = validateRegisterUser(req);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const user = User.fromJson(value);
  //hash the passwrd
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;

  //check if the user is already registered or not with the email

  // find user by the current register user
  const isNew = await Mongo_User.findOne({ email: user.email });
  if (isNew!==null) throw new Error("the account is already exist,please login.");

  const userData = new Mongo_User({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    password: user.password,
  });

  const currentUser = await userData.save();
  dbDebugger("users : ", currentUser);

  //return jwt token not user data
  //load teh private key from config
  token = userData.GenerateAuthToken();

  res.status(200).send(token);
});

exports.login = asyncValidator(async (req, res) => {
  //validate user input
  const { error, value } = validateLoginUser(req);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  //see if the user is registered or not
  const user = User.fromJson(value);

  const login_user = await Mongo_User.findOne({ email: user.email });
  dbDebugger("login user is : ",login_user);
  if (login_user === null) {
    throw new Error("email or password is wrong.");
  }
  const canLoggin = await bcrypt.compare(user.password, login_user.password);

  // //respond to the errors

  if (canLoggin === null) {
    throw new Error("email or password is wrong.");
  }

  //return jwt token not user data
  //load the private key from config
  token = login_user.GenerateAuthToken();

  res.status(200).send(token);
});

//validater functions

function validateRegisterUser(req) {
  const schema = Joi.object({
    fullName: Joi.string().min(5).required(),
    email: Joi.string().min(7).required(),
    phone: Joi.string().min(5).required(),
    password: Joi.string().min(5).required(),
  });

  return schema.validate(req.body);
}

function validateLoginUser(req) {
  const schema = Joi.object({
    email: Joi.string().min(7).required(),
    password: Joi.string().min(5).required(),
  });

  return schema.validate(req.body);
}
