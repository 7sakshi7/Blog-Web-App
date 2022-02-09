const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const blogRoutes = require('./routes/blog');

const MONGO_URI =
  "YOUR URL";

const app = express();

app.use(cors());

app.use(express.json());

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
