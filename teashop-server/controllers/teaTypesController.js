var express = require('express')
var router = express.Router()

const {createTeaTypes, getTeaTypesList, getTeaTypesInfo, updateTeaTypes, deleteTeaTypes} = require('../servers/teaTypesServer')


/**
 * 添加 茶分类 信息
 * http://localhost:3000/admin/createTeaTypes
 */
router.post('/createTeaTypes', function(req, res, next){
    createTeaTypes(req.body, res);
})

/**
 * 获取 茶分类 信息
 * http://localhost:3000/admin/getTeaTypesList
 */
 router.post('/getTeaTypesList', function(req, res, next){
    getTeaTypesList(req.body, res);
})

/**
 * 获取 茶分类 信息
 * http://localhost:3000/admin/getTypesInfoById
 */
 router.post('/getTypesInfoById', function(req, res, next){
    getTeaTypesInfo(req.body, res);
})

/**
 * 修改 茶分类 信息
 * http://localhost:3000/admin/updateTeaTypesById
 */
 router.post('/updateTeaTypesById', function(req, res, next){
    updateTeaTypes(req.body, res);
})

/**
 * 删除 茶分类 信息
 * http://localhost:3000/admin/delTeaTypesById
 */
 router.post('/delTeaTypesById', function(req, res, next){
    deleteTeaTypes(req.body, res);
})

module.exports = router;