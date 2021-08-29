var express = require('express')
var router = express.Router()

const fs = require('fs')
const multer = require('multer');
const path = require('path')
const moment = require('moment');

const {createCardBatch, getCardBatchList, getCardBatchInfo, updateCardBatch, importCardByBatch, deleteCardBatch} = require('../servers/cardBatchServer')


/**
 * 添加 批次 信息
 * http://localhost:3000/admin/createCardBatch
 */
router.post('/createCardBatch', function(req, res, next){
    createCardBatch(req.body, res);
})

/**
 * 获取 批次 信息
 * http://localhost:3000/admin/getCardBatchList
 */
 router.post('/getCardBatchList', function(req, res, next){
    getCardBatchList(req.body, res);
})

/**
 * 获取 批次 信息
 * http://localhost:3000/admin/getCardBatchInfoById
 */
 router.post('/getCardBatchInfoById', function(req, res, next){
    getCardBatchInfo(req.body, res);
})

/**
 * 修改 批次 信息
 * http://localhost:3000/admin/updateCardBatch
 */
 router.post('/updateCardBatch', function(req, res, next){
    updateCardBatch(req.body, res);
})

/**
 * 导入 批次卡 信息
 * http://localhost:3000/admin/importCardByExcel
 */
 var upload = multer({ dest: path.join(__dirname, '../uploads') })
 router.post('/importCardByExcel', upload.single('file'), function(req, res, next){
    fs.readFile(req.file.path, (err, data) => {
        // 如果读取失败
        if (err) {
            res.json({code: 500, data: null, msg: '上传失败'});
        }
        // 声明名字为时间戳和随机数拼接成的，尽量确保唯一性
        let time = 
            moment().utc().format('YYYYMMDDhh') +
            parseInt(Math.random() * 999) + 
            parseInt(Math.random() * 2222);
        // 拼接成图片名
        let keepname = time + '.xlsx';
        let url = path.join(__dirname, '../static/excels/' + keepname);
        fs.writeFile(url, data, err => {
            if (err) {
                res.json({ code: 500, data: null, msg: '写入失败' })
            }
            // 写入 数据库
            req.body.filePath = url;
            importCardByBatch(req.body, res);
        })
    })
})

/**
 * 删除 批次 信息
 * http://localhost:3000/admin/delCardBatchById
 */
 router.post('/delCardBatchById', function(req, res, next){
    deleteCardBatch(req.body, res);
})

module.exports = router;