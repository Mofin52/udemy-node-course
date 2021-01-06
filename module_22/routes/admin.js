const path = require("path");

const express = require("express");
const { check, body } = require("express-validator/check");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

// GET /admin/add-product
router.get("/add-product", isAuth, adminController.getAddProduct);

// POST /admin/add-product
router.post(
  "/add-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 200 }).trim(),
  ],
  isAuth,
  adminController.postAddProduct
);

// GET /admin/products
router.get("/products", isAuth, adminController.getProducts);

// GET /admin/edit-product
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

// POST /admin/edit-product
router.post(
  "/edit-product",
  [
    body("title").isString().isLength({ min: 3 }).trim(),
    body("price").isFloat(),
    body("description").isLength({ min: 5, max: 200 }).trim(),
  ],
  isAuth,
  adminController.postEditProduct
);

router.delete("/product/:productId", isAuth, adminController.deleteProduct);

module.exports = router;
