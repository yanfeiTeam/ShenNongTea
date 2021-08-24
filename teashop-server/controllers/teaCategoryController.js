var express = require('express')
var router = express.Router()

const {createCategory, getCategoryList, getCategoryInfo, updateCategory, deleteCategory} = require('../servers/teaCategoryServer')


/**
 * 添加 茶系 信息
 * http://localhost:3000/admin/createTeaCategory
 */
router.post('/createTeaCategory', function(req, res, next){
    createCategory(req.body, res);
})

/**
 * 获取 茶系 信息
 * http://localhost:3000/admin/getTeaCategoryList
 */
 router.post('/getTeaCategoryList', function(req, res, next){
    getCategoryList(req.body, res);
})

/**
 * 获取 茶系 信息
 * http://localhost:3000/admin/getTeaCategoryInfo
 */
 router.post('/getTeaCategoryInfo', function(req, res, next){
    getCategoryInfo(req.body, res);
})

/**
 * 修改 茶系 信息
 * http://localhost:3000/admin/updateTeaCategoryById
 */
 router.post('/updateTeaCategoryById', function(req, res, next){
    updateCategory(req.body, res);
})

/**
 * 删除 茶系 信息
 * http://localhost:3000/admin/delTeaCategoryById
 */
 router.post('/delTeaCategoryById', function(req, res, next){
    deleteCategory(req.body, res);
})

module.exports = router;