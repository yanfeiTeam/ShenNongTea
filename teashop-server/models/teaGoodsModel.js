const {Sequelize, DataTypes} = require('sequelize');
const config = require('../config/config.js');
const sequelize = new Sequelize(config.mysqldb);

let teaGoodsModel = sequelize.define(
    'teaGoods',
    {
        name: {
            type: DataTypes.STRING,
            comment: '商品名称'
        },
        imagePath: {
            type: DataTypes.STRING,
            comment: '主图',
            get() {
                const rawValue = this.getDataValue('imagePath');
                return rawValue ? config.uploadImgUrl + rawValue : '';
            }
        },
        skuId: {
            type: DataTypes.INTEGER,
            comment: '商品编号'
        },
        state: {
            type: DataTypes.INTEGER,
            comment: '状态'
        },
        categoryId: {
            field: 'category_id',
            type: DataTypes.INTEGER,
            comment: '茶系(六大茶系)'
        },
        teaTypeId: {
            field: 'teaType_id',
            type: DataTypes.INTEGER,
            comment: '茶分类'
        },
        sele_state: {
            type: DataTypes.INTEGER,
            comment: '可售/不可售'
        },
        price: {
            type: DataTypes.DOUBLE,
            comment: '售价'
        },
        nakedPrice: {
            type: DataTypes.DOUBLE,
            comment: '进价'
        },
        discount: {
            type: DataTypes.DOUBLE,
            comment: '折扣'
        },
        deal_count: {
            type: DataTypes.INTEGER,
            comment: ''
        },
        supplierId: {
            field: 'supplier_id',
            type: DataTypes.INTEGER,
            comment: '所属品牌ID'
        },
        sort: {
            type: DataTypes.INTEGER,
            comment: '排序'
        },
        specifications: {
            type: DataTypes.STRING,
            comment: '规格 图片路径'
        },
        introduce: {
            type: DataTypes.STRING,
            comment: '商品介绍图 路径'
        },
        recommend: {
            type: DataTypes.INTEGER,
            comment: '是否推荐'
        },
        text_specifications: {
            type: DataTypes.STRING,
            comment: '规格(文字描述)'
        },
        stock_num: {
            type: DataTypes.INTEGER,
            comment: '库存数量'
        },
        limit_num: {
            type: DataTypes.INTEGER,
            comment: '限购数量'
        },
        stock_num_warning: {
            type: DataTypes.INTEGER,
            comment: '库存警告数量'
        },
        weight: {
            type: DataTypes.STRING,
            comment: '商品重量'
        },
        freight: {
            type: DataTypes.DOUBLE,
            comment: '运费'
        },
        text_introduction: {
            type: DataTypes.STRING,
            comment: ''
        },
        specs: {
            type: DataTypes.STRING,
            comment: '规格单位'
        },
        sales_volume: {
            type: DataTypes.INTEGER,
            comment: ''
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
        tableName: 'tea_commodities'
    }
)


module.exports = teaGoodsModel;