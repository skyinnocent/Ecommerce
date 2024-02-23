const bcrypt = require("bcrypt");
const validateEmail = (email) => {
  console.log("email validator ran");
};

const validatePassword = (password) => {
  console.log("password validator ran");
};

async function PasswordHash(next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.error("Mongo DB Error from password pre save:", error);
    return next(error);
  }
}

module.exports = { validateEmail, validatePassword, PasswordHash };
