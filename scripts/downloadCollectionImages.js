const fs = require("fs");
const https = require("https");
const path = require("path");

const collections = [
  {
    id: "leather",
    url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800",
    name: "Leather Collection",
  },
  {
    id: "formal",
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800",
    name: "Formal Collection",
  },
  {
    id: "accessories",
    url: "https://images.unsplash.com/photo-1509941943102-10c232535736?w=800",
    name: "Accessories Collection",
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

async function downloadCollectionImages() {
  const baseDir = path.join(__dirname, "../public/images/collections");

  // Create directory if it doesn't exist
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  for (const collection of collections) {
    const filepath = path.join(baseDir, `${collection.id}-collection.jpg`);
    try {
      await downloadImage(collection.url, filepath);
      console.log(`Downloaded: ${collection.name} image`);
    } catch (err) {
      console.error(`Error downloading ${collection.name} image:`, err.message);
    }
  }
}

downloadCollectionImages()
  .then(() => {
    console.log("All collection images downloaded successfully!");
  })
  .catch((err) => {
    console.error("Error:", err);
  });
