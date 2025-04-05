const fs = require("fs");
const https = require("https");
const path = require("path");

const collections = [
  {
    name: "Summer Collection",
    description: "Light and breezy pieces perfect for summer days",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    filename: "summer-collection.jpg",
  },
  {
    name: "Winter Collection",
    description: "Cozy and warm essentials for the cold season",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    filename: "winter-collection.jpg",
  },
  {
    name: "Casual Collection",
    description: "Everyday comfort meets style",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050",
    filename: "casual-collection.jpg",
  },
  {
    name: "Sports Collection",
    description: "Performance wear for active lifestyles",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b",
    filename: "sports-collection.jpg",
  },
  {
    name: "Evening Collection",
    description: "Elegant attire for special occasions",
    image: "https://images.unsplash.com/photo-1490725263030-1f0521cec8ec",
    filename: "evening-collection.jpg",
  },
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(
      __dirname,
      "../public/images/collections",
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

// Create collections data file
const createCollectionsData = () => {
  const collectionsData = collections.map((collection) => ({
    name: collection.name,
    description: collection.description,
    image: `/images/collections/${collection.filename}`,
  }));

  fs.writeFileSync(
    path.join(__dirname, "collections-data.json"),
    JSON.stringify(collectionsData, null, 2)
  );
};

// Download all images
Promise.all(
  collections.map((collection) =>
    downloadImage(collection.image, collection.filename)
  )
)
  .then((results) => {
    console.log("All collection images downloaded successfully");
    createCollectionsData();
    console.log("Collections data file created");
  })
  .catch((error) => {
    console.error("Error downloading images:", error);
  });
