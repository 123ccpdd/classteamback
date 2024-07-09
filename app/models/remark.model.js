const sql = require('./db.js');

const { promisify } = require ('util');

const queryAsync = promisify(sql.query).bind(sql);

class Remark {
    constructor(remark){
        this.content = remark.content;
        this.post = remark.post;
    }

    static async getRemark(id,prefix_id,data) {

      let user_type = null;

      if (prefix_id.startsWith('teacher')) {
        user_type = 'teacher';
      }
      else if (prefix_id.startsWith('parent')) {
        user_type = 'parent';
      }
      if(user_type == 'teacher'){
        try {
          const res = await queryAsync("SELECT r.*,t.name,t.subject FROM remark r JOIN teacher t ON r.send = t.id WHERE post = ?", [data]);
          console.log("post retrieved:", res);
          return res;
        }
        catch (err) {
          console.log(err);
          throw err;
        }
      }else if(user_type == 'parent'){
        try {
          const res = await queryAsync("SELECT r.*,t.name FROM remark r JOIN parent t ON r.send = t.id; WHERE post = ?", [data]);
          console.log("post retrieved:", res);
          return res;
        }
        catch (err) {
          console.log(err);
          throw err;
        }
      }
    }

    static async addRemark(newRemark,id,result){
      try {
        //获取当前时间
        const now = new Date();
        //转化为mysql的DATATIME格式
        const formattedDateTime = now.toISOString().slice(0, 19).replace('T', ' ');
  
        const res1 = await queryAsync("INSERT INTO `try`.`remark` (`content`,`post`,w_time,send) VALUES(?,?,?,?)",
          [newRemark.content, newRemark.post,formattedDateTime,id]);
        const postId = res1.insertId;
        const res2 = await queryAsync("UPDATE remark SET prefix_id=? WHERE id=?",
          ["remark" + postId, postId]);
  
        console.log("remark added:", { id: postId, ...newRemark });
        result(null, { id: postId, s_time: formattedDateTime, ...newRemark });
      }
      catch (err) {
        console.log(err);
        result(err, null);
      }
    }
}

module.exports = Remark;