const Blog = require("../models/Blog");
const User = require("../models/User");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const { findOne } = require("../models/User");

exports.postAddBlog = async (req, res, next) => {
  console.log("entered");
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const err = new Error("Validation Failed");
  //   err.statusCode = 422;
  //   throw err;
  // }

  // console.log("File ====== ", req.file);
  if (!req.file) {
    const error = new Error("No File Attached");
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path;
  const { title, category, desc } = req.body;
  console.log(title, category, desc);
  const blog = new Blog({
    title,
    imageUrl,
    category,
    desc,
    userId: req.userId,
  });
  blog
    .save()
    .then((result) => {
      // console.log('result of blog save',result);
      return User.findById(req.userId);
    })
    .then((user) => {
      // console.log('current user',user);
      user.blogs.push(blog);
      user.save();
    })
    .then((result) => {
      // console.log('Final result = ',result);
      res.status(201).json({
        message: "Posts created!",
        blog: blog,
      });
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getFetchAllBlogs = async (req, res, next) => {
  const blogs = await Blog.find();
  res.status(200).json(blogs);
};

exports.getFetchUserBlogs = async (req, res, next) => {
  const blogs = await Blog.find({ userId: req.userId });
  res.status(200).json(blogs);
};

exports.postUpdateBlog = async (req, res, next) => {
  let imageUrl = req.body.image;
  if (req.file) imageUrl = req.file.path;
  const { title, category, desc } = req.body;
  const blogId = req.params.blogId;

  if (!imageUrl) {
    const error = new Error("No file picked");
    error.statusCode = 422;
    throw error;
  }

  // find the blog to be updated
  Blog.findById(blogId)
    .then((blog) => {
      if (!blog) {
        return res.status(401).send({ error: "No Such Blog Found" });
      }

      if (blog.userId.toString() !== req.userId.toString()) {
        return res.status(401).send({ error: "You can't update this blog" });
      }

      if (imageUrl != blog.imageUrl) {
        clearImage(blog.imageUrl);
      }

      if (blog.title !== title) {
        blog.title = title;
      }
      if (blog.category !== category) {
        blog.category = category;
      }
      if (blog.desc !== desc) {
        blog.desc = desc;
      }
      blog.imageUrl = imageUrl;
      return blog.save();
    })
    .then((resData) => {
      console.log("updated!!!!!!");
      res.status(201).json(resData);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getBlog = (req, res, next) => {
  const blogId = req.params.blogId;
  console.log("entered", blogId);
  Blog.findOne({ _id: blogId })
    .then((blog) => {
      console.log(blog);
      if (!blog) {
        throw new Error("No Such Blog found");
      }
      return res.status(200).json(blog);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteBlog = (req, res, next) => {
  const blogId = req.params.blogId;
  Blog.findByIdAndDelete(blogId)
    .then((resData) => {
      console.log("Deleted Successfully!!", resData);
      res.status(200).json({ message: "Deeletd Successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postUpdateProfile = async (req, res, next) => {
  let imageUrl;
  if (req.file) imageUrl = req.file.path;
  const { aboutMe, categories } = req.body;
  console.log(aboutMe, categories);
  const user = await User.findOne({ _id: req.userId });
  user.aboutMe = aboutMe;
  user.categories = categories;
  user.imageUrl = imageUrl;
  console.log(user);
  user
    .save()
    .then((resData) => {
      console.log(resData);
      return res.status(200).json({ resData });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  console.log(userId);
  User.findById(userId)
    .then((resData) => {
      return res.status(200).json({ resData });
    })
    .catch((err) => {
      console.log(err);
    });
};

function clearImage(filePath) {
  console.log(filePath);
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => {
    console.log(err);
  });
}
