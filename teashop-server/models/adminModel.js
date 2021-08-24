const {Sequelize, DataTypes} = require('sequelize');
const config = require('../config/config.js');
const sequelize = new Sequelize(config.mysqldb);

let adminModel = sequelize.define(
    'admin',
    {
        username: {
            type: DataTypes.STRING,
            comment: '用户名'
        },
        nickname: {
            type: DataTypes.STRING,
            comment: '昵称'
        },
        password: {
            type: DataTypes.STRING,
            comment: '密码'
        },
        phone: {
            type: DataTypes.INTEGER,
            comment: '手机号'
        },
        logo: {
            type: DataTypes.STRING,
            comment: '头像'
        },
        is_use: {
            field: 'is_use',
            type: DataTypes.INTEGER,
            comment: '是否冻结'
        },
        role_id: {
            type: DataTypes.INTEGER,
            comment: '权限ID'
        },
        last_login_time: {
            type: Sequelize.INTEGER,
            comment: '最后登录时间',
            defaultValue: Date.parse(new Date()) / 1000
        },
        created_time: {
            type: Sequelize.INTEGER,
            comment: '注册时间',
            defaultValue: Date.parse(new Date()) / 1000
        },
        update_time: {
            type: Sequelize.INTEGER,
            comment: '更新时间',
            defaultValue: Date.parse(new Date()) / 1000
        }
    },
    {
        timestamps: false,
        tableName: 'sys_user'
    }
)


module.exports = adminModel;