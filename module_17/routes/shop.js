const path = require("path");

const express = require("express");
const isAuth = require("../middleware/isAuth");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProductDetails);

router.get("/cart", isAuth, shopController.getCart);

router.post("/cart", isAuth, shopController.postCart);

router.get("/checkout", isAuth, shopController.getCheckout);

router.get("/orders", isAuth, shopController.getOrders);

router.post("/cart-delete-item", isAuth, shopController.postCartDeleteProduct);

router.post("/create-order", isAuth, shopController.postOrder);

module.exports = router;
