const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getStyleRecommendations,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/auth");

router.route("/").get(getProducts).post(protect, admin, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.post("/style-recommendations", getStyleRecommendations);

module.exports = router;
