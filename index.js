const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const multer = require("multer");

const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

const MONGO_URI =
"mongodb+srv://sakshi:sakshi@cluster0.v2o4h.mongodb.net/blogsWebsite?&w=majority";

const app = express();

// app.use(cors());

// app.use(express.json());

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

// app.use({ storage: fileStorage }).single("image");
app.use(bodyParser.json());

app.use(multer({ storage: fileStorage }).single("image"));

app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});


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
