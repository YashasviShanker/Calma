require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const User = require("../models/User");
const { connectDB } = require("../config/db");

const sampleProducts = [
  {
    name: "Classic Denim Jeans",
    description:
      "Timeless straight-fit denim jeans in dark wash. Perfect for any casual occasion.",
    price: 79.99,
    category: "jeans",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d",
      "https://images.unsplash.com/photo-1555689502-c4b22d76c56f",
    ],
    sizes: ["30x32", "32x32", "34x32", "36x32"],
    inStock: true,
    tags: ["denim", "casual", "everyday"],
    careInstructions: "Machine wash cold, tumble dry low",
    styleAttributes: ["casual", "classic"],
  },
  {
    name: "Premium Cotton T-Shirt",
    description:
      "Ultra-soft cotton t-shirt with a modern fit. Available in multiple colors.",
    price: 29.99,
    category: "tshirts",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
    ],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    tags: ["cotton", "basics", "essential"],
    careInstructions: "Machine wash cold, tumble dry low",
    styleAttributes: ["casual", "comfy"],
  },
  {
    name: "Slim Fit Dress Shirt",
    description:
      "Professional dress shirt perfect for the office or formal occasions.",
    price: 89.99,
    category: "shirts",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10",
    ],
    sizes: ["15/32", "15/34", "16/32", "16/34"],
    inStock: true,
    tags: ["formal", "business", "professional"],
    careInstructions: "Dry clean only",
    styleAttributes: ["formal", "classic"],
  },
  {
    name: "Italian Leather Oxford Shoes",
    description:
      "Handcrafted leather oxford shoes made in Italy. Perfect for formal occasions.",
    price: 299.99,
    category: "shoes",
    images: [
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1",
      "https://images.unsplash.com/photo-1614252370352-c4c6c561e9e6",
    ],
    sizes: ["8", "9", "10", "11", "12"],
    inStock: true,
    tags: ["leather", "formal", "shoes"],
    careInstructions: "Clean with leather cleaner, use shoe trees",
    styleAttributes: ["formal", "classic"],
  },
  {
    name: "Signature Cologne",
    description: "A sophisticated blend of citrus and woody notes.",
    price: 129.99,
    category: "perfumes",
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f",
      "https://images.unsplash.com/photo-1594035910387-fea47794261f",
    ],
    sizes: ["50ml", "100ml"],
    inStock: true,
    tags: ["fragrance", "luxury", "signature"],
    careInstructions: "Store in a cool, dry place",
    styleAttributes: ["bold", "classic"],
  },
];

const sampleAdmin = {
  name: "Admin User",
  email: "admin@calma.com",
  password: "admin123",
  role: "admin",
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log("Sample products inserted successfully");

    // Create admin user
    await User.create(sampleAdmin);
    console.log("Admin user created successfully");

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
