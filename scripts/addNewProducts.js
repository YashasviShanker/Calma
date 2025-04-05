const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Read the new products data
const productsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "new-products.json"), "utf8")
);

// First login to get the token
async function login() {
  try {
    const response = await api.post("/auth/login", {
      email: "admin@example.com",
      password: "admin123",
    });
    return response.data.token;
  } catch (error) {
    console.error(
      "Login failed:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
}

// Function to add a product
async function addProduct(product, token, userId) {
  try {
    // Prepare the product data according to the schema
    const productData = {
      ...product,
      sizes: ["S", "M", "L", "XL"], // Default sizes
      inStock: true,
      tags: [product.category],
      careInstructions: "Machine wash cold, tumble dry low",
      styleAttributes: {
        fit: "Regular",
        material: "Premium fabric",
        color: "As shown",
        occasion: "Casual",
      },
      user: userId, // Add the user ID
    };

    const response = await api.post("/products", productData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(`Added product: ${product.name}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error adding product ${product.name}:`,
      error.response?.data?.message || error.message
    );
    return null;
  }
}

// Add all products
async function addAllProducts() {
  try {
    console.log("Logging in...");
    const loginResponse = await api.post("/auth/login", {
      email: "admin@example.com",
      password: "admin123",
    });
    const { token, _id: userId } = loginResponse.data;
    console.log("Successfully logged in");

    console.log("Starting to add products...");
    for (const product of productsData) {
      await addProduct(product, token, userId);
      // Add a small delay between requests
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log("Finished adding products");
  } catch (error) {
    console.error("Failed to complete the process:", error.message);
  }
}

// Run the script
addAllProducts();
