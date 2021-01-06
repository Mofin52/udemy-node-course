const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

// GET /admin/add-product
router.get("/add-product", adminController.getAddProduct);

// POST /admin/add-product
router.post("/add-product", adminController.postAddProduct);

// GET /admin/products
router.get("/products", adminController.getProducts);

module.exports = router;
