const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Get all products or filter by category
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new product
router.post("/", upload.array("images"), async (req, res) => {
  try {
    const productData = {
      ...req.body,
      images: req.files.map((file) => `/uploads/products/${file.filename}`),
      sizes: JSON.parse(req.body.sizes),
      styleAttributes: JSON.parse(req.body.styleAttributes),
      tags: req.body.tags.split(",").map((tag) => tag.trim()),
    };

    const product = new Product(productData);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a product
router.put("/:id", upload.array("images"), async (req, res) => {
  try {
    const productData = {
      ...req.body,
      sizes: JSON.parse(req.body.sizes),
      styleAttributes: JSON.parse(req.body.styleAttributes),
      tags: req.body.tags.split(",").map((tag) => tag.trim()),
    };

    if (req.files && req.files.length > 0) {
      productData.images = req.files.map(
        (file) => `/uploads/products/${file.filename}`
      );
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
