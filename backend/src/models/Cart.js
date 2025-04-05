const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  size: {
    type: String,
    required: true,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [cartItemSchema],
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate total before saving
cartSchema.pre("save", async function (next) {
  const cart = this;
  const total = await cart.populate("items.product").then((populatedCart) => {
    return populatedCart.items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);
  });
  cart.total = total;
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
