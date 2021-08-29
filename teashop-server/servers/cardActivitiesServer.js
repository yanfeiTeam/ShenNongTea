const cardActivitiesModel = require('../models/cardActivitiesModel')

const moment = require('moment')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

/**
 * 添加 神农茶票 活动 
 * @param {*} body 参数
 * @param {*} res  返回
 */
const createActivities = async (body, res) => {
	const activitiesNew = await cardActivitiesModel.create(body);
	res.json({
		code: 200,
		data: activitiesNew,
		msg: 'success'
	})
}

/**
 * 获取 神农茶票 活动 
 * @param {*} body 
 * @param {*} res 
 */
const getActivitiesList = async (body, res) => { 
	await cardActivitiesModel
		.findAll({
			where: {
				activityName: {[Op.like]: '%' +body.activityName+ '%'}
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
 * 获取 神农茶票 活动单 信息
 * @param {*} body 
 * @param {*} res 
 */
const getActivitiesInfo = async (body, res) => {
	await cardActivitiesModel
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
 * 修改 神农茶票 活动  更新
 * @param {*} body 
 * @param {*} res 
 */
const updateActivities = async (body, res) => {
	body.update_time = moment().utc().format('YYYY-MM-DD HH:mm:ss');
	await cardActivitiesModel
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
 * 删除 神农茶票 活动 信息
 * @param {*} body 
 * @param {*} res 
 */
const deleteActivities = async (body, res) => {
	await cardActivitiesModel
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

module.exports = { createActivities, getActivitiesList, getActivitiesInfo, updateActivities, deleteActivities }