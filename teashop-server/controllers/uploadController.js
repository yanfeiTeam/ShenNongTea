var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

const {addData} = require('../servers/upload')


// 上传图片
var upload = multer({ dest: path.join(__dirname, '../uploads') })
router.post('/img', upload.single('file'), function(req, res, next){
    addData(req, res)
})


module.exports = router;