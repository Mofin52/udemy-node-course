const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    activeProduct: true,
    formsCss: true,
    productCss: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const prod = new Product(req.body.title);
  prod.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", {
      prods: products,
      docTitle: "Shop",
      path: "/",
      hasProds: products.length > 0,
      activeShop: true,
      productCss: true,
    });
  });
};
