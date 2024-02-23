const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { PasswordHash } = require("../utils/someUtils");
const Schema = mongoose.Schema;
const adminModel = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

adminModel.pre("save", PasswordHash);
