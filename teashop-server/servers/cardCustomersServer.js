const customersModel = require('../models/cardCustomersModel')

const moment = require('moment')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

/**
 * 添加 客户 信息 
 * @param {*} body 参数
 * @param {*} res  返回
 */
const createCustomers = async (body, res) => {
	const customersNew = await customersModel.create(body);
	res.json({
		code: 200,
		data: customersNew,
		msg: 'success'
	})
}

/**
 * 获取 客户 列表
 * @param {*} body 
 * @param {*} res 
 */
const getCustomersList = async (body, res) => { 
	await customersModel
		.findAll({
			where: {
				name: {[Op.like]: '%' +body.name+ '%'}
			}
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
 * 获取 客户 信息INFO
 * @param {*} body 
 * @param {*} res 
 */
const getCustomersInfo = async (body, res) => {
	await customersModel
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
 * 修改 客户 信息 更新
 * @param {*} body 
 * @param {*} res 
 */
const updateCustomers = async (body, res) => {
	body.update_time = moment().utc().format('YYYY-MM-DD HH:mm:ss');
	await customersModel
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
 * 删除 客户 信息
 * @param {*} body 
 * @param {*} res 
 */
const deleteCustomers = async (body, res) => {
	await customersModel
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

module.exports = { createCustomers, getCustomersList, getCustomersInfo, updateCustomers, deleteCustomers }