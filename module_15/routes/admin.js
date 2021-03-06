const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

// GET /admin/add-product
router.get("/add-product", isAuth, adminController.getAddProduct);

// POST /admin/add-product
router.post("/add-product", isAuth, adminController.postAddProduct);

// GET /admin/products
router.get("/products", isAuth, adminController.getProducts);

// GET /admin/edit-product
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

// POST /admin/edit-product
router.post("/edit-product", isAuth, adminController.postEditProduct);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
