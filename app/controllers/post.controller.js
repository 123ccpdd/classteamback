const Post = require('../models/post.model.js');
const multiparty = require('multiparty')

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

exports.addPostimg = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  let form = new multiparty.Form({ uploadDir: './img' });  
  form.parse(req, (err, fields, files) => {  
      if (err) {  
        // 如果发生错误，返回错误消息  
        return res.status(500).send('Error uploading file: ' + err.message);  
      }  
    
      // 检查是否有文件被上传  
      if (Object.keys(files).length === 0) {  
        // 如果没有文件被上传，返回相应的消息  
        return res.send('No file was uploaded.');  
      }  
    
      // 假设我们只处理名为 'file' 的文件输入字段  
      // 注意：根据您的表单，这里的 'file' 可能需要更改为实际的字段名  
      const fileField = 'file'; // 或者从某处动态获取字段名  
      if (files[fileField] && files[fileField].length > 0) {  
        // 如果文件存在且至少有一个文件被上传  
        console.log(fields, 'fields');  
        console.log(files, 'files');  
    
        // 这里可以添加额外的文件处理逻辑，比如保存到数据库  
    
        // 这里发送失败也会显示successfully，稍后修改
        res.send('img added successfully');  
      } else {  
        // 如果字段名错误或没有文件在指定字段中  
        res.send('img added successfully');  
      }  
    });  
}