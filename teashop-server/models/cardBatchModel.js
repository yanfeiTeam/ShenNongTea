const {Sequelize, DataTypes} = require('sequelize');
const moment = require('moment');
const config = require('../config/config.js');
const sequelize = new Sequelize(config.mysqldb);

let cardBatchModel = sequelize.define(
    'cardBatch',
    {
        batchId: {
            type: DataTypes.INTEGER,
            comment: '批次号',
            defaultValue: Math.floor(Math.random() * 999999)
        },
        customerId: {
            type: DataTypes.INTEGER,
            comment: '客户ID'
        },
        cardName: {
            type: DataTypes.STRING,
            comment: '卡名称'
        },
        imgPath: {
            type: DataTypes.STRING,
            comment: '批次图片'
        },
        cardCount: {
            type: DataTypes.INTEGER,
            comment: '卡数量'
        },
        amount: {
            type: DataTypes.DOUBLE,
            comment: '总金额'
        },
        contractAmount: {
            type: DataTypes.DOUBLE,
            comment: '合同金额'
        },
        cardAddTime: {
            type: DataTypes.DATE,
            comment: '导入时间',
            defaultValue: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
            get() {
                const rawValue = this.getDataValue('create_time');
                return rawValue ? moment(rawValue).utc().format('YYYY-MM-DD HH:mm:ss') : '';
            }
        },
        isLimit: {
            type: DataTypes.INTEGER,
            comment: '是否限制'
        },
        limitType: {
            type: DataTypes.INTEGER,
            comment: '限制类型'
        },
        limitId: {
            type: DataTypes.STRING,
            comment: '限制ID'
        },
        limitAmount: {
            type: DataTypes.DOUBLE,
            comment: '限制金额'
        },
        isBankCard: {
            type: DataTypes.INTEGER,
            comment: '是否内购卡'
        },
        actualPayment: {
            type: DataTypes.DOUBLE,
            comment: '单卡实付金额'
        },
        videoPath: {
            field: 'video',
            type: DataTypes.STRING,
            comment: '视频路径'
        },
        introduction: {
            type: DataTypes.STRING,
            comment: '批次简介'
        },
        url: {
            type: DataTypes.STRING,
            comment: '路径'
        },
        mastFollow: {
            type: DataTypes.INTEGER,
            comment: '是否关注后领取'
        },
        cardBatchType: {
            type: DataTypes.INTEGER,
            comment: '卡类型'
        },
        gradeDiscount: {
            type: DataTypes.FLOAT,
            comment: ''
        },
        limitMaxAmount: {
            type: DataTypes.DOUBLE,
            comment: ''
        },
        minOrderAmount: {
            type: DataTypes.DOUBLE,
            comment: ''
        },
        create_time: {
            type: DataTypes.DATE,
            comment: '创建时间',
            defaultValue: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
            get() {
                const rawValue = this.getDataValue('create_time');
                return rawValue ? moment(rawValue).utc().format('YYYY-MM-DD HH:mm:ss') : '';
            }
        },
        update_time: {
            type: DataTypes.DATE,
            comment: '更新时间',
            defaultValue: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
            get() {
                const rawValue = this.getDataValue('update_time');
                return rawValue ? moment(rawValue).utc().format('YYYY-MM-DD HH:mm:ss') : '';
            }
        }
    },
    {
        timestamps: false,
        tableName: 'card_card_batch'
    }
)


module.exports = cardBatchModel;