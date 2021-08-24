const teaGoodsModel = require('../models/teaGoodsModel')
const teaGoodsImgModel = require('../models/teaGoodsImgModel')
const teaCategoryModel = require('../models/teaCategoryModel')
const teaTypesModel = require('../models/teaTypesModel')
const supplierModel = require('../models/supplierModel')

const Sequelize = require('sequelize')
const Op = Sequelize.Op


/**
 * 添加 商品（茶）
 * @param {*} body 参数
 * @param {*} res  返回
 */
const creatTeaGoods = async (body, res) => {
	const goods = body;
	if(goods.name == ''){
		return
	}
	body.skuId = parseInt(Math.random() * 9999);
	const goodsNew = await teaGoodsModel.create(body);
	res.json({
		code: 200,
		data: goodsNew,
		msg: 'success'
	})
}

/**
 * 添加 商品（茶）
 * @param {*} body 参数
 * @param {*} res  返回
 */
 const creatTeaGoodsImg = async (body, res) => {
	const goods = body;
	if(goods.imagePath == ''){
		return
	}
	const goodsNew = await teaGoodsImgModel.create(body);
	res.json({
		code: 200,
		data: goodsNew,
		msg: 'success'
	})
}

/**
 * 获取所有商品 列表
 * @param {*} body 
 * @param {*} res 
 */
const getTeaGoodsList = async (body, res) => { 
	teaGoodsModel.belongsTo(teaCategoryModel,{
		foreignKey:'categoryId',
		targetKey: 'id'
	})
	teaGoodsModel.belongsTo(teaTypesModel,{
		foreignKey:'teaTypeId',
		targetKey: 'id'
	})
	teaGoodsModel.belongsTo(supplierModel,{
		foreignKey:'supplierId',
		targetKey: 'id'
	})
	await teaGoodsModel
		.findAll({
			where: {
				name: {[Op.like]: '%' +body.name+ '%'}
			},
			include: [{
				model: teaCategoryModel,
				attributes:[['name','cname']]
			},{
				model: teaTypesModel,
				attributes:[['name','tname']]
			},{
				model: supplierModel,
				attributes:[['name','sname']]
			}],
			order: [
				['state', 'ASC']
			]
		})
		.then(result => {
			res.json({
				code: 200,
				data: result,
				msg: 'success'
			})
		})
		.catch(err => {
			res.json({
				code: 500,
				data: null,
				msg: err
			})
		})
}

/**
 * 获取单个商品ByID 信息
 * @param {*} body 
 * @param {*} res 
 */
 const getTeaGoodsInfo = async (body, res) => {
	await teaGoodsModel
		.findOne({
			where: { id: body.id },
			raw: true
		})
		.then(result => {
			res.json({
				code: 200,
				data: result,
				msg: 'success'
			})
		})
		.catch(err => {
			res.json({
				code: 500,
				data: null,
				msg: err
			})
		})
}

/**
 * 修改商品信息 更新
 * @param {*} body 
 * @param {*} res 
 */
const updateTeaGoods = async (body, res) => {
	body.update_time = Date.parse(new Date()) / 1000;
	await teaGoodsModel
		.update(body, {
			where: { id: body.id }
		})
		.then(result => {
			res.json({
				code: 200,
				data: result,
				msg: 'success'
			})
		})
		.catch(err => {
			res.json({
				code: 500,
				data: null,
				msg: err
			})
		})
}


module.exports = { creatTeaGoods, creatTeaGoodsImg, getTeaGoodsList, getTeaGoodsInfo, updateTeaGoods }