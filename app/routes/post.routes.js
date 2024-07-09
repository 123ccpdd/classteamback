module.exports = app => {
  const posts = require('../controllers/post.controller.js');

  var router = require("express").Router();

  router.post('/addPost', posts.addPost);

  router.get('/getPost', posts.getPost);

  router.post('/getPostdetail',posts.getPostdetail);

  app.use('/api/posts', router);
}