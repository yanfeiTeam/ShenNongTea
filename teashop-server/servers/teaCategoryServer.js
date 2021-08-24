const teaCategoryModel = require('../models/teaCategoryModel')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

/**
 * 添加茶 类别 
 * @param {*} body 参数
 * @param {*} res  返回
 */
const createCategory = async (body, res) => {
	const categroy = body;
	if(categroy.name == ''){
		return
	}
	if(categroy.sort == '' || categroy.sort <= 0){
		body.sort = 1
	}
	const categroyNew = await teaCategoryModel.create(body);
	res.json({
		code: 200,
		data: categroyNew,
		msg: 'success'
	})
}

/**
 * 获取品牌 列表
 * @param {*} body 
 * @param {*} res 
 */
const getCategoryList = async (body, res) => { 
	await teaCategoryModel
		.findAll({
			where: {
				name: {[Op.like]: '%' +body.name+ '%'}
			},
			order: [
				['sort', 'DESC']
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
 * 获取品牌ByID 信息
 * @param {*} body 
 * @param {*} res 
 */
const getCategoryInfo = async (body, res) => {
	await teaCategoryModel
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
 * 修改品牌 更新
 * @param {*} body 
 * @param {*} res 
 */
const updateCategory = async (body, res) => {
	body.update_time = new Date().setHours(new Date().getHours() + 8);
	await teaCategoryModel
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


/**
 * 删除品牌 信息
 * @param {*} body 
 * @param {*} res 
 */
const deleteCategory = async (body, res) => {
	await teaCategoryModel
		.destroy({
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

module.exports = { createCategory, getCategoryList, getCategoryInfo, updateCategory, deleteCategory }