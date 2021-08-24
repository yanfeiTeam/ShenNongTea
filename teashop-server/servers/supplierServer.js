const supplierModel = require('../models/supplierModel')

const moment = require('moment')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

/**
 * 添加品牌 
 * @param {*} body 参数
 * @param {*} res  返回
 */
const createSupplier = async (body, res) => {
	const supplier = body;
	if(supplier.name == ''){
		return
	}
	if(supplier.phone == ''){
		supplier.phone = null
	}
	if(supplier.sort == '' || supplier.sort <= 0){
		supplier.sort = 1
	}
	const supplierNew = await supplierModel.create(body);
	res.json({
		code: 200,
		data: supplierNew,
		msg: 'success'
	})
}

/**
 * 获取品牌 列表
 * @param {*} body 
 * @param {*} res 
 */
const getSupplierList = async (body, res) => { 
	await supplierModel
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
 * 获取品牌ByID 信息
 * @param {*} body 
 * @param {*} res 
 */
const getSupplierInfo = async (body, res) => {
	await supplierModel
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
const updateSupplier = async (body, res) => {
	body.update_time = moment().utc().format('YYYY-MM-DD HH:mm:ss');
	await supplierModel
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
const deleteSupplier = async (body, res) => {
	await supplierModel
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

module.exports = { createSupplier, getSupplierList, getSupplierInfo, updateSupplier, deleteSupplier }