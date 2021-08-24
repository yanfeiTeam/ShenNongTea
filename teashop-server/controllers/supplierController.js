var express = require('express')
var router = express.Router()

const {createSupplier, getSupplierList, getSupplierInfo, updateSupplier, deleteSupplier} = require('../servers/supplierServer')


/**
 * 添加 品牌信息
 * http://localhost:3000/admin/createSupplier
 */
router.post('/createSupplier', function(req, res, next){
    createSupplier(req.body, res);
})

/**
 * 获取 品牌信息
 * http://localhost:3000/admin/getSupplierList
 */
 router.post('/getSupplierList', function(req, res, next){
    getSupplierList(req.body, res);
})

/**
 * 获取 品牌信息
 * http://localhost:3000/admin/getSupplierInfoById
 */
 router.post('/getSupplierInfoById', function(req, res, next){
    getSupplierInfo(req.body, res);
})

/**
 * 添加 品牌信息
 * http://localhost:3000/admin/updateSupplierById
 */
 router.post('/updateSupplierById', function(req, res, next){
    updateSupplier(req.body, res);
})

/**
 * 删除 品牌信息
 * http://localhost:3000/admin/delSupplierById
 */
 router.post('/delSupplierById', function(req, res, next){
    deleteSupplier(req.body, res);
})

module.exports = router;