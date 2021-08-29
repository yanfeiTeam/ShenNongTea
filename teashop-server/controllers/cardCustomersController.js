var express = require('express')
var router = express.Router()

const {createCustomers, getCustomersList, getCustomersInfo, updateCustomers, deleteCustomers} = require('../servers/cardCustomersServer')


/**
 * 添加 客户 信息
 * http://localhost:3000/admin/createCustomers
 */
router.post('/createCustomers', function(req, res, next){
    createCustomers(req.body, res);
})

/**
 * 获取 客户 信息
 * http://localhost:3000/admin/getCustomersList
 */
 router.post('/getCustomersList', function(req, res, next){
    getCustomersList(req.body, res);
})

/**
 * 获取 客户 信息
 * http://localhost:3000/admin/getCustomersInfoById
 */
 router.post('/getCustomersInfoById', function(req, res, next){
    getCustomersInfo(req.body, res);
})

/**
 * 修改 客户 信息
 * http://localhost:3000/admin/updateCustomersById
 */
 router.post('/updateCustomersById', function(req, res, next){
    updateCustomers(req.body, res);
})

/**
 * 删除 客户 信息
 * http://localhost:3000/admin/delCustomersById
 */
 router.post('/delCustomersById', function(req, res, next){
    deleteCustomers(req.body, res);
})

module.exports = router;