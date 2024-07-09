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
        post: req.body.post,
        deleter: null
      }
    )
  
    const id = req.user.id;
    const prefix_id = req.user.prefix_id;

    Remark.addRemark(remark,id,
      (err, data) => {
        if (err) {
          res.status(500).json({
            message: err.message || "Some error occurred while adding the Post."
          })
        }
        else {
          res.json({
            message: 'Remark added successfully',
            ...data
          })
        }
      }
    )
  }
  
  exports.getRemark = async (req, res) => {
    
    const id = req.user.id;
    const prefix_id = req.user.prefix_id;

    try {
      const data = await Remark.getRemark(id,prefix_id,req.body.postID);
      if (!data) {
        res.status(400).json({
            message: "Remark ID can not be empty!"
        });
        return;
      }
      res.json({
        message: 'Successfully retrieved remark',
        data: data
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || "Some error occurred while getting the Remark."
      });
    }
  };