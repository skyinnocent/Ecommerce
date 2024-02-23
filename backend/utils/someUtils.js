const bcrypt = require("bcrypt");
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
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

async function comparePassword(reqPass, dbPass) {
  try {
    const isMatch = await bcrypt.compare(reqPass, dbPass);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
}

module.exports = {
  validateEmail,
  validatePassword,
  PasswordHash,
  comparePassword,
};
