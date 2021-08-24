const {Sequelize, DataTypes} = require('sequelize');
const config = require('../config/config.js');
const sequelize = new Sequelize(config.mysqldb);

let teaGoodsImgModel = sequelize.define(
    'teaGoodsImg',
    {
        commodityId: {
            field: 'commodity_id',
            type: DataTypes.INTEGER,
            comment: '商品ID'
        },
        imagePath: {
            type: DataTypes.STRING,
            comment: '主图'
        },
        sort: {
            type: DataTypes.INTEGER,
            comment: '排序'
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
        tableName: 'tea_commodity_images'
    }
)


module.exports = teaGoodsImgModel;