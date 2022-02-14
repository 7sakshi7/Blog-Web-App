const express = require("express");

const router = express.Router();

const blogController = require("../controller/blog.js");

const fetchUser = require("../controller/fetchUser");

router.post("/publishblog", fetchUser, blogController.postAddBlog);

router.get("/fetchallblogs", blogController.getFetchAllBlogs);

router.get("/fetchuserblogs", fetchUser, blogController.getFetchUserBlogs);

router.put("/updateblog/:blogId", fetchUser, blogController.postUpdateBlog);

router.delete("/delete/:blogId", fetchUser, blogController.deleteBlog);

router.get("/:blogId", fetchUser, blogController.getBlog);

router.get("/user/:userId", fetchUser, blogController.getUser);

router.post("/updateprofile", fetchUser, blogController.postUpdateProfile);

module.exports = router;
