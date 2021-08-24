const roleModel = require('../models/roleModel')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

/**
 * 添加系统角色
 * @param {*} body 参数
 * @param {*} res  返回
 */
const createRole = async (body, res) => {
	const role = body;
	if(role.rolename == ''){
		return
	}
	const roleNew = await roleModel.create(body);
	res.json({
		code: 200,
		data: roleNew,
		msg: 'success'
	})
}

/**
 * 获取系统角色 列表
 * @param {*} body 
 * @param {*} res 
 */
const getRoleList = async (body, res) => { 
	await roleModel
		.findAll({
			where: {
				rolename: {[Op.like]: '%' +body.rolename+ '%'}
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
 * 删除系统角色 信息
 * @param {*} body 
 * @param {*} res 
 */
 const deleteRole = async (body, res) => {
	await roleModel
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

module.exports = {createRole, getRoleList, deleteRole}