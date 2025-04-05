const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/auth");

router.use(protect);

router.route("/").get(getCart).post(addToCart);

router.route("/:itemId").put(updateCartItem).delete(removeFromCart);

module.exports = router;
