const cardBatchModel = require('../models/cardBatchModel')

const Sequelize = require('sequelize')
const Op = Sequelize.Op
var xlsx = require('node-xlsx');
const moment = require('moment')


/**
 * 添加 神农茶票 批次卡 
 * @param {*} body 参数
 * @param {*} res  返回
 */
const createCardBatch = async (body, res) => {
	const cardBatchNew = await cardBatchModel.create(body);
	res.json({
		code: 200,
		data: cardBatchNew,
		msg: 'success'
	})
}

/**
 * 获取 神农茶票 批次卡 
 * @param {*} body 
 * @param {*} res 
 */
const getCardBatchList = async (body, res) => { 
	await cardBatchModel
		.findAll({
			where: {
				batchId: {[Op.like]: '%' +body.batchId+ '%'}
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
 * 获取 神农茶票 批次卡 信息
 * @param {*} body 
 * @param {*} res 
 */
const getCardBatchInfo = async (body, res) => {
	await cardBatchModel
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
 * 修改 神农茶票 批次卡  更新
 * @param {*} body 
 * @param {*} res 
 */
const updateCardBatch = async (body, res) => {
	body.update_time = moment().utc().format('YYYY-MM-DD HH:mm:ss');
	await cardBatchModel
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
 * 导入 神农茶票 批次卡 
 * @param {*} body 参数
 * @param {*} res  返回
 */
 const importCardByBatch = async (body, res) => {
	var filename= body.filePath || '';
	if(!filename) {
		res.json({code: 404, data: null, msg: '文件为空~'	});
	}
	// read from a file
	var cardObject = xlsx.parse(filename);
	console.log(JSON.stringify(cardObject));

	// const cardObjNew = await cardBatchModel.create(body);
	res.json({
		code: 200,
		data: cardObjNew,
		msg: 'success'
	})
}


/**
 * 删除 神农茶票 批次卡 信息
 * @param {*} body 
 * @param {*} res 
 */
const deleteCardBatch = async (body, res) => {
	await cardBatchModel
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

module.exports = { createCardBatch, getCardBatchList, getCardBatchInfo, updateCardBatch, importCardByBatch, deleteCardBatch }