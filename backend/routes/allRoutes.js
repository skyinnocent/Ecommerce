const express = require("express");
const router = express.Router();
const { adminController } = require("./../controllers/adminController");
// Admin Routes

// all the check will involve querying password and email
router
  .route("/api/v1/admin")
  .post(adminController.signupAdmin)
  .get(adminController.signinAdmin)
  .put(adminController.updatePassword)
  .delete(adminController.delteAdmin);

// Seller Routes

// Customer Routes

// Product Routes

// export router
module.exports = { router };
