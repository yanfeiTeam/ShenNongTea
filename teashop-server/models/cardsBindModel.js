const {Sequelize, DataTypes} = require('sequelize');
const config = require('../config/config.js');
const sequelize = new Sequelize(config.mysqldb);

let cardsBindModel = sequelize.define(
    'cardsBind',
    {
        imgPath: {
            type: DataTypes.STRING,
            comment: ''
        },
        cardNo: {
            type: DataTypes.INTEGER,
            comment: ''
        },
        cardId: {
            type: DataTypes.INTEGER,
            comment: ''
        },
        bindTime: {
            type: DataTypes.DATE,
            comment: ''
        },
        userId: {
            type: DataTypes.INTEGER,
            comment: '用户ID'
        },
        giveUserId: {
            type: DataTypes.INTEGER,
            comment: '送给用户ID'
        },
        userName: {
            type: DataTypes.STRING,
            comment: '用户名称'
        },
        userImg: {
            type: DataTypes.STRING,
            comment: '用户头像'
        },
        balance: {
            type: DataTypes.DOUBLE,
            comment: '金额'
        },
        freezeMoney: {
            type: DataTypes.DOUBLE,
            comment: ''
        },
        beginTime: {
            type: DataTypes.DATE,
            comment: '开始时间'
        },
        endTime: {
            type: DataTypes.DATE,
            comment: '结束时间'
        },
        recordStatus: {
            type: DataTypes.INTEGER,
            comment: ''
        },
        forwardLockTime: {
            type: DataTypes.DATE,
            comment: '转送时间'
        },
        isFreeze: {
            type: DataTypes.INTEGER,
            comment: '是否等待'
        },
        isforward: {
            type: DataTypes.INTEGER,
            comment: '是否转送'
        },
        forwardWaiteBind: {
            type: DataTypes.INTEGER,
            comment: '转送等待绑定'
        },
        spreeState: {
            type: DataTypes.INTEGER,
            comment: ''
        },
        actualPayment: {
            type: DataTypes.DOUBLE,
            comment: ''
        },
        activityGive: {
            type: DataTypes.DOUBLE,
            comment: ''
        },
        auditingGive: {
            type: DataTypes.DOUBLE,
            comment: ''
        },
        cumulativeActualPayment: {
            type: DataTypes.DOUBLE,
            comment: ''
        },
        cumulativeBalance: {
            type: DataTypes.DOUBLE,
            comment: ''
        },
        isHandleStatistics: {
            type: DataTypes.INTEGER,
            comment: ''
        },
        frequency: {
            type: DataTypes.INTEGER,
            comment: ''
        },
        isDele: {
            type: DataTypes.INTEGER,
            comment: ''
        },
        isPrivilege: {
            type: DataTypes.INTEGER,
            comment: ''
        }
    },
    {
        timestamps: false,
        tableName: 'tea_card_bind'
    }
)


module.exports = cardsBindModel;