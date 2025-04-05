const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "jeans",
        "tshirts",
        "shirts",
        "shoes",
        "perfumes",
        "suits",
        "pants",
      ],
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    sizes: [
      {
        type: String,
        required: true,
      },
    ],
    inStock: {
      type: Boolean,
      default: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    careInstructions: {
      type: String,
      required: true,
    },
    styleAttributes: [
      {
        type: String,
        enum: [
          "casual",
          "formal",
          "date",
          "comfy",
          "streetwear",
          "bold",
          "classic",
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Add text index for search functionality
productSchema.index({ name: "text", description: "text", tags: "text" });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
