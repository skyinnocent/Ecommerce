const mongoose = require("mongoose");
const { PasswordHash } = require("../utils/someUtils");
const Schema = mongoose.Schema;
const sellerSchema = Schema({
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
  status: {
    type: String,
    enum: ["active", "suspended", "pending", "delete-requested"],
    default: "pending",
  },
});

sellerSchema.pre("save", async function (next) {
  await PasswordHash.call(this, next);
});

module.exports = mongoose.model("Seller", sellerSchema);
