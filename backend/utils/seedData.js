require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const User = require("../models/User");

const sampleProducts = [
  // T-Shirts
  {
    name: "Classic Cotton Crew Neck T-Shirt",
    description:
      "Premium cotton crew neck t-shirt with a comfortable fit. Perfect for everyday wear with breathable fabric and reinforced stitching.",
    price: 29.99,
    category: "tshirts",
    images: ["/images/products/tshirt-1.jpg"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["casual", "cotton", "basic"],
    careInstructions: "Machine wash cold, tumble dry low",
    styleAttributes: {
      fit: "Regular",
      material: "100% Cotton",
      color: "White",
      occasion: "Casual",
    },
  },
  // Shirts
  {
    name: "Oxford Button-Down Dress Shirt",
    description:
      "Classic Oxford dress shirt with button-down collar. Made from premium cotton with a tailored fit perfect for business or formal occasions.",
    price: 59.99,
    category: "shirts",
    images: ["/images/products/shirt-1.jpg"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["formal", "business", "oxford"],
    careInstructions: "Machine wash cold, iron if needed",
    styleAttributes: {
      fit: "Tailored",
      material: "Oxford Cotton",
      color: "Light Blue",
      occasion: "Business",
    },
  },
  // Pants
  {
    name: "Classic Chino Pants",
    description:
      "Versatile chino pants made from premium cotton twill. Features a comfortable straight fit with a slight stretch for ease of movement.",
    price: 69.99,
    category: "pants",
    images: ["/images/products/pants-1.jpg"],
    sizes: ["30x30", "32x32", "34x34", "36x34"],
    tags: ["casual", "business casual", "chino"],
    careInstructions: "Machine wash cold, tumble dry low",
    styleAttributes: {
      fit: "Straight",
      material: "Cotton Twill",
      color: "Khaki",
      occasion: "Business Casual",
    },
  },
  // Jeans
  {
    name: "Premium Selvedge Denim Jeans",
    description:
      "High-quality selvedge denim jeans with a modern slim fit. Made from Japanese denim with traditional craftsmanship.",
    price: 149.99,
    category: "jeans",
    images: ["/images/products/jeans-1.jpg"],
    sizes: ["30x30", "32x32", "34x34", "36x34"],
    tags: ["denim", "selvedge", "premium"],
    careInstructions: "Wash rarely, cold water when needed",
    styleAttributes: {
      fit: "Slim",
      material: "Selvedge Denim",
      color: "Indigo",
      occasion: "Casual",
    },
  },
  // Suits
  {
    name: "Italian Wool Business Suit",
    description:
      "Premium Italian wool suit with modern cut. Features a two-button jacket and flat-front trousers. Perfect for business and formal occasions.",
    price: 599.99,
    category: "suits",
    images: ["/images/products/suit-1.jpg"],
    sizes: ["38R", "40R", "42R", "44R"],
    tags: ["formal", "business", "wool"],
    careInstructions: "Dry clean only",
    styleAttributes: {
      fit: "Modern",
      material: "Italian Wool",
      color: "Navy",
      occasion: "Formal",
    },
  },
  // Shoes
  {
    name: "Classic Oxford Dress Shoes",
    description:
      "Handcrafted leather Oxford shoes with Goodyear welt construction. Perfect for formal occasions with timeless style.",
    price: 249.99,
    category: "shoes",
    images: ["/images/products/shoes-1.jpg"],
    sizes: ["8", "9", "10", "11", "12"],
    tags: ["formal", "leather", "oxford"],
    careInstructions: "Polish regularly, use shoe trees",
    styleAttributes: {
      fit: "True to size",
      material: "Full-grain Leather",
      color: "Black",
      occasion: "Formal",
    },
  },
  // Perfumes
  {
    name: "Signature Gentleman's Cologne",
    description:
      "Sophisticated fragrance with notes of bergamot, cedar, and vanilla. Long-lasting scent perfect for any occasion.",
    price: 89.99,
    category: "perfumes",
    images: ["/images/products/perfume-1.jpg"],
    sizes: ["50ml", "100ml"],
    tags: ["fragrance", "luxury", "signature"],
    careInstructions: "Store in a cool, dark place",
    styleAttributes: {
      fit: "N/A",
      material: "Eau de Parfum",
      color: "N/A",
      occasion: "All occasions",
    },
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
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/calma"
    );
    console.log("MongoDB Connected:", mongoose.connection.host);

    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();

    // Create admin user
    const adminUser = await User.create(sampleAdmin);
    console.log("Admin user created successfully");

    // Add admin user reference to products
    const productsWithUser = sampleProducts.map((product) => ({
      ...product,
      user: adminUser._id,
    }));

    // Insert products
    await Product.insertMany(productsWithUser);
    console.log("Sample products inserted successfully");

    console.log("Database seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
