const Remark = require("../models/remark.model.js")

exports.addRemark = (req, res) => {
    if (!req.body) {
      res.status(400).json({
        message: "Content can not be empty!"
      });
      return;
    }
  
    const remark = new Remark(
      {
        content: req.body.content,
        poster: req.user.prefix_id,
        deleter: null
      }
    )
  
    Remark.addRemark(remark,
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
  
  exports.getRemark = async (req, res) => {
    try {
      const data = await Remark.getRemark(req.body.postID);
      if (!data) {
        res.status(400).json({
            message: "Post ID can not be empty!"
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