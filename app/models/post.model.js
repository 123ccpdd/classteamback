const sql = require('./db.js');
//promisify将回调风格的函数转换为promise
const { promisify } = require('util');

const queryAsync = promisify(sql.query).bind(sql);


class Post {
  // 初始化构造函数
  constructor(post) {
    this.picture = post.picture;
    this.content = post.content;
    this.poster = post.poster;
    this.deleter = post.deleter;
  }
  // 使用async和await可以避免嵌套的.then()和.catch()回调
  static async addPost(newPost, result) {
    try {
      //获取当前时间
      const now = new Date();
      //转化为mysql的DATATIME格式
      const formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' ');

      const res1 = await queryAsync("INSERT INTO post(picture,content,poster,time_p) VALUES(?,?,?,?)",
        [newPost.picture, newPost.content, newPost.poster,formattedDateTime]);
      const postId = res1.insertId;
      const res2 = await queryAsync("UPDATE post SET prefix_id=? WHERE id=?",
        ["post" + postId, postId]);

      console.log("post added:", { id: postId, ...newPost });
      result(null, { id: postId, time_p: formattedDateTime, ...newPost });
    }
    catch (err) {
      console.log(err);
      return result;
    }
  }

  static async getPost(result) {
    try {
      const res = await queryAsync("SELECT post.*, `teacher`.`name` , `teacher`.`subject`  FROM `post` , `teacher` WHERE post.`poster` = `teacher`.`prefix_id` ");
      console.log("post retrieved:", res);
      result(null, res);
    }
    catch (err) {
      console.log(err);
      result(err, null);
    }
  }

  static async getPostdetail(poster){
    try {
      const res = await queryAsync("SELECT post.*, `teacher`.`name` , `teacher`.`subject`  FROM `post` , `teacher` WHERE post.`poster` = `teacher`.`prefix_id` AND `post`.`poster` = ?",
        [poster]);
      console.log("postdetail retrieved:", res);
      return res;
    }
    catch(err) {
      console.log(err);
      return res;
    }
  }
  static async deletePost(postId, deleter, result) {
    try {
      const res1 = await queryAsync("UPDATE post SET deleter=? WHERE id =?",
        [deleter, postId]);
      const res2 = await queryAsync("SELECT * FROM post WHERE id =?", postId);
      const postDeleted = res2[0];

      console.log("post deleted:", { ...postDeleted });
      result(null, { ...postDeleted });

    }
    catch (err) {
      console.log(err);
      result(err, null);
    }
  }
}
//导出Post类，让其他文件可以导入require
module.exports = Post;
