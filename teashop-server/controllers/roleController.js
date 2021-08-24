var express = require('express')
var router = express.Router()

const {createRole, getRoleList, deleteRole} = require('../servers/roleServer')


/**
 * 添加 系统角色
 * http://localhost:3000/admin/createRole
 */
router.post('/createRole', function(req, res, next){
    createRole(req.body, res);
})

/**
 * 获取 系统角色
 * http://localhost:3000/admin/getRoleList
 */
 router.post('/getRoleList', function(req, res, next){
    getRoleList(req.body, res);
})

/**
 * 删除 系统角色
 * http://localhost:3000/admin/delRoleById
 */
 router.post('/delRoleById', function(req, res, next){
    deleteRole(req.body, res);
})

module.exports = router;