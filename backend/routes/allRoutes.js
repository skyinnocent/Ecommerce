const express = require("express");
const router = express.Router();
const { adminController } = require("./../controllers/adminController");
const { sellerController } = require("../controllers/sellerController");
const {
  productController,
  productFilterController,
} = require("../controllers/productController");

//==============================================================================
//                          **Admin Routes**

// all the check will involve querying password and email
router
  .route("/api/v1/admin")
  .post(adminController.signupAdmin)
  .put(adminController.updatePassword);
router.route("/api/v1/admin/signin").post(adminController.signinAdmin);
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

//                            **Seller Routes**
router
  .route("/api/v1/seller")
  .post(sellerController.signupSeller)
  .get(sellerController.signinSeller)
  .put(sellerController.updatePassword);
router.route("/api/v1/seller/:id").delete(sellerController.delteSeller);
// GETTING ALL PRODUCTS OF A SELLER
router.route("/api/v1/seller/products/:id").get(sellerController.getMyProducts);
//==============================================================================
//                           **PRODUCT ROUTES**
// the below id is of seller
router.route("/api/v1/product/:id").post(productController.listProduct);
// The below id is of product
router
  .route("/api/v1/product/:id")
  .put(productController.updateProduct)
  .get(productController.getProduct);
// get products based on filters
// -----------------------------------------------------------------------------
router.get("/api/v1/products/filters", productFilterController.omniFilter);
//==============================================================================
//                       **Customer Routes**
router.route("/api/v1/customer").post();

// export router
module.exports = { router };
