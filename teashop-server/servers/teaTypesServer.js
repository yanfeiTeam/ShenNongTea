const teaTypesModel = require('../models/teaTypesModel')
const teaCategoryModel = require('../models/teaCategoryModel')

const moment = require('moment')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

/**
 * 添加茶 类别 
 * @param {*} body 参数
 * @param {*} res  返回
 */
const createTeaTypes = async (body, res) => {
	const teaType = body;
	if(teaType.name == ''){
		return
	}
	if(teaType.sort == '' || teaType.sort <= 0){
		teaType.sort = 1
	}
	const teaTypeNew = await teaTypesModel.create(body);
	res.json({
		code: 200,
		data: teaTypeNew,
		msg: 'success'
	})
}

/**
 * 获取茶类别 列表
 * @param {*} body 
 * @param {*} res 
 */
const getTeaTypesList = async (body, res) => { 
	teaTypesModel.belongsTo(teaCategoryModel,{
		//as: 'categoryAs',
		foreignKey:'categoryId',
		targetKey: 'id'
	})
	await teaTypesModel
		.findAll({
			where: {
				name: {[Op.like]: '%' +body.name+ '%'}
			},
			include: [{
				model: teaCategoryModel,
				attributes:[['name','categoryName']]
			}],
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
 * 获取茶类别ByID 信息
 * @param {*} body 
 * @param {*} res 
 */
const getTeaTypesInfo = async (body, res) => {
	await teaTypesModel
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
 * 修改茶类别 更新
 * @param {*} body 
 * @param {*} res 
 */
const updateTeaTypes = async (body, res) => {
	body.update_time = moment().utc().format('YYYY-MM-DD HH:mm:ss');
	await teaTypesModel
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
 * 删除茶类别 信息
 * @param {*} body 
 * @param {*} res 
 */
const deleteTeaTypes = async (body, res) => {
	await teaTypesModel
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

module.exports = { createTeaTypes, getTeaTypesList, getTeaTypesInfo, updateTeaTypes, deleteTeaTypes }