const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const multer = require("multer");

const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

const MONGO_URI =
  "YOUR URL";

const app = express();

app.use(cors());

app.use(express.json());

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

// app.use({ storage: fileStorage }).single("image");

app.use(multer({ storage: fileStorage }).single("image"));

app.use("/images", express.static(path.join(__dirname, "images")));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(authRoutes);

app.use(blogRoutes);

mongoose
  .connect(MONGO_URI)
  .then((result) => {
    console.log("connected");
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
