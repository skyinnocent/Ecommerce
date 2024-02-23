const mongoose = require("mongoose");
const { PasswordHash } = require("../utils/someUtils");
const Schema = mongoose.Schema;
const adminSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  sellerApprovals: [],
  productApprovals: [],
});

adminSchema.pre("save", async function (next) {
  await PasswordHash.call(this, next);
});

module.exports = mongoose.model("Admin", adminSchema);
