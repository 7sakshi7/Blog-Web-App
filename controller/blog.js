const Blog = require("../models/Blog");
const mongoose = require("mongoose");

exports.postAddBlog = async (req, res, next) => {
  try {
    const { title, category, desc } = req.body;
    console.log(title, category, desc);
    const blog = new Blog({
      title,
      category,
      desc,
      userId: req.user.id,
    });

    blog
      .save()
      .then((result) => {
        return res.json(result);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: err });
  }
};

exports.getFetchAllBlogs = async (req, res, next) => {
  const blogs = await Blog.find();
  res.json(blogs);
};

exports.getFetchUserBlogs = async (req, res, next) => {
  const blogs = await Blog.find({ userId: req.user.id });
  res.json(blogs);
};

exports.postUpdateBlog = async (req, res, next) => {
  const { title, category, desc } = req.body;
  const newBlog = {};

  if (title) {
    newBlog.title = title;
  }
  if (category) {
    newBlog.category = category;
  }
  if (desc) {
    newBlog.desc = desc;
  }

  // find the blog to be updated
  let blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(401).send({ error: "No Such Blog Found" });
  }

  if (blog.userId.toString() !== req.user.id.toString()) {
    return res.status(401).send({ error: "You can't update this blog" });
  }

  blog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      $set: newBlog,
    },
    { new: true }
  );

  res.json(blog);
};
