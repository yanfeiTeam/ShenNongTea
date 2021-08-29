const {Sequelize, DataTypes} = require('sequelize');
const config = require('../config/config.js');
const sequelize = new Sequelize(config.mysqldb);

let cardsModel = sequelize.define(
    'cards',
    {
        serialNo: {
            type: DataTypes.STRING,
            comment: '序号'
        },
        cardNo: {
            type: DataTypes.INTEGER,
            comment: '卡号'
        },
        cardPin: {
            type: DataTypes.STRING,
            comment: '密码'
        },
        qrCode: {
            type: DataTypes.STRING,
            comment: '二维码路径'
        },
        cardName: {
            type: DataTypes.STRING,
            comment: '卡名称'
        },
        isBind: {
            type: DataTypes.INTEGER,
            comment: '是否绑定'
        },
        userName: {
            type: DataTypes.STRING,
            comment: '用户名称'
        },
        customerId: {
            field: 'customer_id',
            type: DataTypes.INTEGER,
            comment: '客户ID'
        },
        beginTime: {
            field: 'begin_time',
            type: DataTypes.DATE,
            comment: '开始时间'
        },
        endTime: {
            field: 'end_time',
            type: DataTypes.DATE,
            comment: '结束时间'
        },
        cardStatus: {
            type: DataTypes.STRING,
            comment: '状态'
        },
        balance: {
            type: DataTypes.DOUBLE,
            comment: '金额'
        },
        waitBinding: {
            type: DataTypes.INTEGER,
            comment: '等待绑定'
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
        tableName: 'tea_cards'
    }
)


module.exports = cardsModel;