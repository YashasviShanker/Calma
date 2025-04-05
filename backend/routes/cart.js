const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const Cart = require("../models/Cart");
const asyncHandler = require("express-async-handler");

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    res.json(cart || { items: [] });
  })
);

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { productId, quantity, size } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity, size }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId && item.size === size
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity, size });
      }
      await cart.save();
    }

    cart = await cart.populate("items.product");
    res.status(201).json(cart);
  })
);

// @desc    Update cart item
// @route   PUT /api/cart/:itemId
// @access  Private
router.put(
  "/:itemId",
  protect,
  asyncHandler(async (req, res) => {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404);
      throw new Error("Cart not found");
    }

    const item = cart.items.id(req.params.itemId);
    if (!item) {
      res.status(404);
      throw new Error("Item not found");
    }

    item.quantity = quantity;
    await cart.save();

    const updatedCart = await cart.populate("items.product");
    res.json(updatedCart);
  })
);

// @desc    Remove item from cart
// @route   DELETE /api/cart/:itemId
// @access  Private
router.delete(
  "/:itemId",
  protect,
  asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404);
      throw new Error("Cart not found");
    }

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== req.params.itemId
    );
    await cart.save();

    const updatedCart = await cart.populate("items.product");
    res.json(updatedCart);
  })
);

module.exports = router;
