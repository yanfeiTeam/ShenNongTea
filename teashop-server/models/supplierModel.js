const {Sequelize, DataTypes} = require('sequelize');
const moment = require('moment');
const config = require('../config/config.js');
const sequelize = new Sequelize(config.mysqldb);

let supplierModel = sequelize.define(
    'supplier',
    {
        name: {
            type: DataTypes.STRING,
            comment: '品牌名称'
        },
        imagePath: {
            type: DataTypes.STRING,
            comment: '品牌Logo',
            get() {
                const rawValue = this.getDataValue('imagePath');
                return rawValue ? config.uploadImgUrl + rawValue : '';
            }
        },
        phone: {
            type: DataTypes.INTEGER,
            comment: '品牌电话',
            defaultValue: null
        },
        email: {
            type: DataTypes.STRING,
            comment: '邮箱'
        },
        sort: {
            type: DataTypes.INTEGER,
            comment: '排序',
            defaultValue: 1
        },
        video: {
            type: DataTypes.STRING,
            comment: '宣传视频'
        },
        introduction: {
            type: DataTypes.STRING,
            comment: '品牌简介'
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
        tableName: 'tea_suppliers'
    }
)


module.exports = supplierModel;