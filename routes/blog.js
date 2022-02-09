const express = require('express');

const router = express.Router();

const blogController = require('../controller/blog.js');

const fetchUser = require('../controller/fetchUser');

router.post('/publishblog',fetchUser,blogController.postAddBlog);

router.get('/fetchallblogs',blogController.getFetchAllBlogs);

router.get('/fetchuserblogs',fetchUser,blogController.getFetchUserBlogs);

router.put('/updateblog/:id',fetchUser,blogController.postUpdateBlog);

module.exports = router;