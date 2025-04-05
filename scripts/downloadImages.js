const fs = require("fs");
const https = require("https");
const path = require("path");

// Sample image URLs for luxury fashion collections
const collectionImages = [
  "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800", // Leather collection
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800", // Formal collection
  "https://images.unsplash.com/photo-1509941943102-10c232535736?w=800", // Accessories collection
];

const productImages = [
  {
    id: "product-1",
    urls: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800", // leather jacket
      "https://images.unsplash.com/photo-1551028719-826277b304ac?w=800", // alt view
      "https://images.unsplash.com/photo-1551028719-47c2d647f388?w=800", // detail
    ],
  },
  {
    id: "product-2",
    urls: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"], // leather bag
  },
  {
    id: "product-3",
    urls: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800",
    ], // suit
  },
  {
    id: "product-4",
    urls: [
      "https://images.unsplash.com/photo-1592878940526-0214b0f374f6?w=800",
    ], // blazer
  },
  {
    id: "product-5",
    urls: [
      "https://images.unsplash.com/photo-1623998021450-85c29c644e0d?w=800",
    ], // watch
  },
  {
    id: "product-6",
    urls: [
      "https://images.unsplash.com/photo-1598971861713-54ad16a7e72e?w=800",
    ], // ties
  },
  {
    id: "product-7",
    urls: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800",
    ], // oxford shoes
  },
  {
    id: "product-8",
    urls: [
      "https://images.unsplash.com/photo-1638642507237-bf6e991c94e4?w=800",
    ], // sweater
  },
  {
    id: "product-9",
    urls: [
      "https://images.unsplash.com/photo-1611485988300-b7530defb8e2?w=800",
    ], // overcoat
  },
  {
    id: "product-10",
    urls: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800",
    ], // wallet
  },
];

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res
          .pipe(fs.createWriteStream(filepath))
          .on("error", reject)
          .once("close", () => resolve(filepath));
      } else {
        res.resume();
        reject(
          new Error(`Request Failed With a Status Code: ${res.statusCode}`)
        );
      }
    });
  });
};

async function downloadAllImages() {
  const baseDir = path.join(__dirname, "../public/images/products");

  // Create directory if it doesn't exist
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  for (const product of productImages) {
    for (let i = 0; i < product.urls.length; i++) {
      const url = product.urls[i];
      const filename =
        i === 0
          ? `${product.id}.jpg`
          : i === 1
          ? `${product.id}-alt.jpg`
          : `${product.id}-detail.jpg`;

      const filepath = path.join(baseDir, filename);

      try {
        await downloadImage(url, filepath);
        console.log(`Downloaded: ${filename}`);
      } catch (err) {
        console.error(`Error downloading ${filename}:`, err.message);
      }
    }
  }
}

downloadAllImages()
  .then(() => {
    console.log("All images downloaded successfully!");
  })
  .catch((err) => {
    console.error("Error:", err);
  });
