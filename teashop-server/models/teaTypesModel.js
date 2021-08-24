const {Sequelize, DataTypes} = require('sequelize');
const moment = require('moment');
const config = require('../config/config.js');
const sequelize = new Sequelize(config.mysqldb);

let teaTypesModel = sequelize.define(
    'teaTypes',
    {
        name: {
            type: DataTypes.STRING,
            comment: '茶类名称'
        },
        categoryId: {
            field: 'category_id',
            type: DataTypes.INTEGER,
            comment: '所属茶系'
        },
        sort: {
            type: DataTypes.INTEGER,
            comment: '排序',
            defaultValue: 1
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
        tableName: 'tea_tea_types'
    }
)


module.exports = teaTypesModel;