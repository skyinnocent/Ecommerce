// imports
const Product = require("./../models/productModel");
const Seller = require("./../models/sellerModel");
const mongoose = require("mongoose");
// controller
const productController = {
  listProduct: async (req, res, next) => {
    const seller = req.params.id;
    const { title, description, price, image } = req.body;
    let newProduct;
    try {
      const existingSeller = await Seller.findById(seller);
      if (!existingSeller) {
        res.status(400).json({ message: "Seller does not exist" });
      }
      newProduct = await Product.create({
        title,
        description,
        image,
        price,
        seller,
      });
      const session = await mongoose.startSession();
      session.startTransaction();
      await newProduct.save({ session });
      await existingSeller.product.push(newProduct);
      await existingSeller.save({ session });
      session.commitTransaction();
    } catch (error) {
      console.error(error);
      res
        .status(409)
        .json({ message: "something went wrong while listing product" });
    }
    res.status(201).json({ message: "Product created" });
  },

  getProduct: async (req, res, next) => {
    const _id = req.params.id;
    try {
      const product = await Product.findById(_id);
      if (!product) {
        res.status(400).json({ message: "product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "something whent wrong" });
    }
  },
  updateProduct: async (req, res, next) => {
    const _id = req.params.id;
    const { title, price, description } = req.body;
    try {
      const product = await Product.findById(_id);
      if (!product) {
        res.status(400).json({ message: "product does not exist" });
      }
      product.title = title || product.title;
      product.price = price || product.price;
      product.description = description || product.description;
      const updatedProduct = await product.save();

      res.status(201).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(200).json({ message: "Something went wrong" });
    }
  },
  deleteProduct: async (req, res, next) => {
    // REMEMBER: in frontend first signin will be checked then a delete page will open.
    const _id = req.params.id;
    try {
      console.log(_id);
      const deletedseller = await Seller.findById(_id);
      if (!deletedseller) {
        res.status(400).json({ message: "Bad Request" });
      }
      deletedseller.status = "delete-requested";
      const response = await deletedseller.save();
      res.status(201).json({ message: "delete-requested" });
    } catch (error) {
      console.error(error);
    }
  },
  getAllProducts: async (req, res, next) => {
    try {
      const allProducts = await Product.find();
      req.allProducts = allProducts;
      next();
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Something went wrong" });
    }
  },
};

const productFilterController = {
  omniFilter: async (req, res, next) => {
    const { category, sortByPrice, pageSize, pageNo } = req.query;
    let categories = category ? category.split(",") : [];
    try {
      // first get all products
      const allProducts = await Product.find();
      let modifiedProducts = allProducts;
      // then see if category exists
      if (categories.length > 0) {
        modifiedProducts = modifiedProducts.filter(function (product) {
          return categories.includes(product.category);
        });
      }
      // then see if sorting by price exists
      if (sortByPrice) {
        modifiedProducts = modifiedProducts.sort((a, b) => {
          if (sortByPrice === "asc") {
            return a.price - b.price;
          } else return b.price - a.price;
        });
      }
      // pagesize arr.slice()
      if (pageSize || pageNo) {
        let start = (pageNo - 1) * pageSize;
        let end = start + pageSize;
        modifiedProducts = modifiedProducts.slice(start, end);
      }
      // finally send items
      res
        .status(200)
        .json({ length: modifiedProducts.length, modifiedProducts });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "something went wrong" });
    }
  },
};

module.exports = { productController, productFilterController };
