var express = require('express')
var router = express.Router()

const { creatTeaGoods, creatTeaGoodsImg, getTeaGoodsList, getTeaGoodsInfo, updateTeaGoods } = require('../servers/teaGoodsServer')


/**
 * 添加 商品信息
 * http://localhost:3000/admin/creatTeaGoods
 */
router.post('/createTeaGoods', function(req, res, next){
    creatTeaGoods(req.body, res);
})

/**
 * 添加 商品轮播图信息
 * http://localhost:3000/admin/createTeaGoodsImg
 */
 router.post('/createTeaGoodsImg', function(req, res, next){
    creatTeaGoodsImg(req.body, res);
})

/**
 * 获取 商品列表
 * http://localhost:3000/admin/getTeaGoodsList
 */
 router.post('/getTeaGoodsList', function(req, res, next){
    getTeaGoodsList(req.body, res);
})

/**
 * 获取 商品列表
 * http://localhost:3000/admin/getTeaGoodsInfoById
 */
 router.post('/getTeaGoodsInfoById', function(req, res, next){
    getTeaGoodsInfo(req.body, res);
})

/**
 * 更新 商品列表
 * http://localhost:3000/admin/updateTeaGoods
 */
 router.post('/updateTeaGoods', function(req, res, next){
    updateTeaGoods(req.body, res);
})


module.exports = router;