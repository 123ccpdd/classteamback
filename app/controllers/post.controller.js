const Post = require('../models/post.model.js');

exports.addPost = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!"
    });
    return;
  }

  const post = new Post(
    {
      picture: req.body.picture,
      content: req.body.content,
      poster: req.user.prefix_id,
      deleter: null
    }
  )

  Post.addPost(post,
    (err, data) => {
      if (err) {
        res.status(500).json({
          message: err.message || "Some error occurred while adding the Post."
        })
      }
      else {
        res.json({
          message: 'Post added successfully',
          ...data
        })
      }
    }
  )
}

exports.getPost = (req, res) => {
  Post.getPost((err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message || "Some error occurred while getting the Post."
      });
    } else {
      res.json({
        message: 'Successfully retrieved content',
        data: data
      });
    }
  });
}

  exports.getPostdetail = async (req, res) => {
    try {
      const data = await Post.getPostdetail(req.body.poster);
      if (!data) {
        res.status(400).json({
            message: "Remark ID can not be empty!"
        });
        return;
      }
      res.json({
        message: 'Successfully retrieved content',
        data: data
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "Some error occurred while getting the Post."
      });
    }
  };
