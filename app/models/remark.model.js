const sql = require('./db.js');

const { promisify } = require ('util');

const queryAsync = promisify(sql.query).bind(sql);

class Remark {
    constructor(post){
        this.picture = post.picture;
        this.content = post.content;
        this.poster = post.poster;
    }

    static async getRemark(data) {
        try {
          const res = await queryAsync("SELECT * FROM remark WHERE post = ?", [data]);
          console.log("post retrieved:", res);
          return res;
        }
        catch (err) {
          console.log(err);
          throw err;
        }
      }
}

module.exports = Remark;