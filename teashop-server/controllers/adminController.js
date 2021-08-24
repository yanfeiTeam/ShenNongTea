var express = require('express')
var router = express.Router()

const { addUser, getUserList, updateUser } = require('../servers/adminServer')


/**
 * 添加 系统管理员
 * http://localhost:3000/admin/createUser
 */
router.post('/createUser', function(req, res, next){
    addUser(req.body, res);
})

/**
 * 获取 系统管理员
 * http://localhost:3000/admin/getUserList
 */
 router.post('/getUserList', function(req, res, next){
    getUserList(req.body, res);
})

/**
 * 冻结 系统管理员
 * http://localhost:3000/admin/closeUserById
 */
 router.post('/closeUserById', function(req, res, next){
    req.body.is_use = 1;
    updateUser(req.body, res);
})

/**
 * 开启 系统管理员
 * http://localhost:3000/admin/openUserById
 */
 router.post('/openUserById', function(req, res, next){
    req.body.is_use = 0;
    updateUser(req.body, res);
})


module.exports = router;