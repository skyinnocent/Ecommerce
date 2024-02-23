const express = require("express");
const router = express.Router();
const { adminController } = require("./../controllers/adminController");
const { sellerController } = require("../controllers/sellerController");
// Admin Routes

// all the check will involve querying password and email
router
  .route("/api/v1/admin")
  .post(adminController.signupAdmin)
  .get(adminController.signinAdmin)
  .put(adminController.updatePassword);
router.route("/api/v1/admin/:id").delete(adminController.delteAdmin);
// gets all sellers and segerates them as per status
router.route("/api/v1/admin/sellers").get(adminController.getSellerStatuses);
router
  .route("/api/v1/admin/sellers/:id")
  .put(adminController.activateSeller)
  .delete(adminController.deleteSeller);
router
  .route("/api/v1/admin/sellers/suspend/:id")
  .put(adminController.suspendSeller);
//==============================================================================

// Seller Routes
router
  .route("/api/v1/seller")
  .post(sellerController.signupSeller)
  .get(sellerController.signinSeller)
  .put(sellerController.updatePassword);

router.route("/api/v1/seller/:id").delete(sellerController.delteSeller);
// Customer Routes

// Product Routes

// export router
module.exports = { router };
