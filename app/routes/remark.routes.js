module.exports = app =>{
    const remark = require('../controllers/remark.controller.js');

    var router = require("express").Router();

    router.post('/addRemark', remark.addRemark);

    router.get('/getRemark', remark.getRemark);

    app.use('/api/remarks', router);
    
}