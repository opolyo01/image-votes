const express = require("express");
const multer = require("multer");
const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost/imageDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create image schema
const imageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  filename: String,
  description: String,
  thumbsUp: { type: Number, default: 0 },
  thumbsDown: { type: Number, default: 0 },
});

const Image = mongoose.model("Image", imageSchema);

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Extract filename from the file object
    const ext = path.extname(file.originalname);
    const newFilename = `image${Date.now()}${ext}`;
    cb(null, newFilename);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { description } = req.body;
    const { filename } = req.file;

    // Generate a unique ID for the image
    const id = `image${Date.now()}`;

    const newImage = new Image({ id, filename, description });
    await newImage.save();
    res.status(201).send("Image uploaded successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.put("/images/:id", async (req, res) => {
  try {
    const { description } = req.body;
    const { id } = req.params;

    const updatedImage = await Image.findOneAndUpdate(
      { id: id },
      { description: description },
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).send("Image not found");
    }

    res.status(200).send(updatedImage);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint to delete an image by filename
app.delete("/images/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // await Image.deleteMany({});
    // return res.status(200).json({ message: "All images deleted successfully" });
    // Check if the image exists in your database
    const image = await Image.findOne({ id });

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    const imagePath = path.join(__dirname, "uploads", image.filename);
    fs.unlinkSync(imagePath); // Remove the file
    await Image.deleteOne({ id });

    return res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/images/:id/thumbs-up", async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch the image by id from the database and increment thumbs-up count
    const updatedImage = await Image.findOneAndUpdate(
      { id: id },
      { $inc: { thumbsUp: 1 } }, // Increment thumbsUp by 1
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).send("Image not found");
    }

    res.status(200).send(updatedImage);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint to update thumbs-down for an image by id
app.post("/images/:id/thumbs-down", async (req, res) => {
  try {
    const { id } = req.params;
    // Fetch the image by id from the database and increment thumbs-down count
    const updatedImage = await Image.findOneAndUpdate(
      { id: id },
      { $inc: { thumbsDown: 1 } }, // Increment thumbsDown by 1
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).send("Image not found");
    }

    res.status(200).send(updatedImage);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/images/removeAll", async (req, res) => {
  try {
    await Image.deleteMany({});
    res.status(200).json({ message: "All images deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, world!" });
});

app.get("/images", async (req, res) => {
  try {
    const images = await Image.find({}, { _id: 0, __v: 0 }); // Exclude _id and __v fields
    res.status(200).json(images);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
