const {Sequelize, DataTypes} = require('sequelize');
const config = require('../config/config.js');
const sequelize = new Sequelize(config.mysqldb);

let roleModel = sequelize.define(
    'role',
    {
        rolename: {
            type: DataTypes.STRING,
            comment: '角色名称'
        },
        permission: {
            type: DataTypes.STRING,
            comment: '拥有权限'
        },
        create_time: {
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
        tableName: 'sys_roles'
    }
)


module.exports = roleModel;