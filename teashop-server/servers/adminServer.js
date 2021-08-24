const adminModel = require('../models/adminModel')

const Sequelize = require('sequelize')
const Op = Sequelize.Op


/**
 * 添加系统用户
 * @param {*} body 参数
 * @param {*} res  返回
 */
const addUser = async (body, res) => {
	const user = body;
	if(user.username == '' || user.password == ''){
		return
	}
	if(user.phone == ''){
		user.phone = null
	}
	const userNew = await adminModel.create(body);
	res.json({
		code: 200,
		data: userNew,
		msg: 'success'
	})
}

/**
 * 获取系统用户 列表
 * @param {*} body 
 * @param {*} res 
 */
const getUserList = async (body, res) => { 
	await adminModel
		.findAll({
			where: {
				username: {[Op.like]: '%' +body.username+ '%'},
				nickname: {[Op.like]: '%' +body.nickname+ '%'}
			},
			order: [
				['is_use', 'ASC']
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
 * 获取系统用户ByID 信息
 * @param {*} body 
 * @param {*} res 
 */
 const getUserInfo = async (body, res) => {
	await adminModel
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
 * 修改系统用户 更新
 * @param {*} body 
 * @param {*} res 
 */
const updateUser = async (body, res) => {
	body.updated_time = Date.parse(new Date()) / 1000;
	delete body.password;
	await adminModel
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


module.exports = { addUser, getUserList, getUserInfo, updateUser }