module.exports = app => {
  const posts = require('../controllers/post.controller.js');

  var router = require("express").Router();

  router.post('/addPost', posts.addPost);

  router.post('/addPostimg',posts.addPostimg);

  app.use('/api/posts', router);
}