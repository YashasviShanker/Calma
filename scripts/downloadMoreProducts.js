const fs = require("fs");
const https = require("https");
const path = require("path");

const productImages = [
  {
    url: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
    filename: "product-11.jpg",
    name: "Elegant White Dress",
    price: 129.99,
    description: "A stunning white dress perfect for summer occasions",
    category: "Dresses",
  },
  {
    url: "https://images.unsplash.com/photo-1543076447-215ad9ba6923",
    filename: "product-12.jpg",
    name: "Classic Leather Boots",
    price: 189.99,
    description: "Handcrafted leather boots for timeless style",
    category: "Footwear",
  },
  {
    url: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3",
    filename: "product-13.jpg",
    name: "Designer Handbag",
    price: 299.99,
    description: "Premium leather handbag with gold accents",
    category: "Accessories",
  },
  {
    url: "https://images.unsplash.com/photo-1582142306909-195724d33ffc",
    filename: "product-14.jpg",
    name: "Silk Evening Gown",
    price: 449.99,
    description: "Elegant silk evening gown in deep burgundy",
    category: "Dresses",
  },
  {
    url: "https://images.unsplash.com/photo-1617952385804-7b326fa42766",
    filename: "product-15.jpg",
    name: "Premium Watch",
    price: 599.99,
    description: "Luxury timepiece with leather strap",
    category: "Accessories",
  },
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(
      __dirname,
      "../public/images/products",
      filename
    );
    const file = fs.createWriteStream(filepath);

    https
      .get(`${url}?w=800&q=80`, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve({
            filename,
            success: true,
          });
        });
      })
      .on("error", (err) => {
        fs.unlink(filepath, () => {
          reject({
            filename,
            success: false,
            error: err.message,
          });
        });
      });
  });
};

// Create products data file
const createProductsData = () => {
  const productsData = productImages.map((product) => ({
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
    images: [`/images/products/${product.filename}`],
  }));

  fs.writeFileSync(
    path.join(__dirname, "new-products.json"),
    JSON.stringify(productsData, null, 2)
  );
};

// Download all images
Promise.all(productImages.map((img) => downloadImage(img.url, img.filename)))
  .then((results) => {
    console.log("All images downloaded successfully");
    createProductsData();
    console.log("Products data file created");
  })
  .catch((error) => {
    console.error("Error downloading images:", error);
  });
