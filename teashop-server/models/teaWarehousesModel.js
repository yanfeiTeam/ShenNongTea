const {Sequelize, DataTypes} = require('sequelize');
const config = require('../config/config.js');
const sequelize = new Sequelize(config.mysqldb);

let warehousesModel = sequelize.define(
    'warehouses',
    {
        name: {
            type: DataTypes.STRING,
            comment: '仓库名称'
        },
        state: {
            type: DataTypes.INTEGER,
            comment: '状态'
        },
        warehouseType: {
            type: DataTypes.INTEGER,
            comment: '仓库类型'
        },
        placeDelivery: {
            type: DataTypes.STRING,
            comment: '仓库地址'
        },
        balance: {
            type: DataTypes.INTEGER,
            comment: '货品总数'
        },
        projectCode: {
            type: DataTypes.INTEGER,
            comment: '项目ID'
        },
        create_time: {
            type: DataTypes.DATE,
            comment: '创建时间',
            defaultValue: new Date(new Date().getTime() + 28800000)
        },
        update_time: {
            type: DataTypes.DATE,
            comment: '更新时间',
            defaultValue: new Date(new Date().getTime() + 28800000)
        }
    },
    {
        timestamps: false,
        tableName: 'tea_warehouses'
    }
)


module.exports = warehousesModel;