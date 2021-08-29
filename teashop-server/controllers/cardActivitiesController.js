var express = require('express')
var router = express.Router()

const {createActivities, getActivitiesList, getActivitiesInfo, updateActivities, deleteActivities} = require('../servers/cardActivitiesServer')


/**
 * 添加 活动 信息
 * http://localhost:3000/admin/createActivities
 */
router.post('/createActivities', function(req, res, next){
    createActivities(req.body, res);
})

/**
 * 获取 活动 信息
 * http://localhost:3000/admin/getActivitiesList
 */
 router.post('/getActivitiesList', function(req, res, next){
    getActivitiesList(req.body, res);
})

/**
 * 获取 活动 信息
 * http://localhost:3000/admin/getActivitiesInfoById
 */
 router.post('/getActivitiesInfoById', function(req, res, next){
    getActivitiesInfo(req.body, res);
})

/**
 * 修改 活动 信息
 * http://localhost:3000/admin/updateActivitiesById
 */
 router.post('/updateActivitiesById', function(req, res, next){
    updateActivities(req.body, res);
})

/**
 * 删除 活动 信息
 * http://localhost:3000/admin/delActivitiesById
 */
 router.post('/delCardActivitiesById', function(req, res, next){
    deleteActivities(req.body, res);
})

module.exports = router;