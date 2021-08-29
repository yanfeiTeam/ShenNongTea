const {Sequelize, DataTypes} = require('sequelize');
const moment = require('moment');
const config = require('../config/config.js');
const sequelize = new Sequelize(config.mysqldb);

let cardActivitiesModel = sequelize.define(
    'cardActivities',
    {
        activityName: {
            field: 'activity_name',
            type: DataTypes.STRING,
            comment: '活动名称'
        },
        activityType: {
            field: 'activity_type',
            type: DataTypes.STRING,
            comment: '活动类型'
        },
        startTime: {
            field: 'start_time',
            type: DataTypes.DATE,
            comment: '创建时间',
            defaultValue: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
            get() {
                const rawValue = this.getDataValue('startTime');
                return rawValue ? moment(rawValue).utc().format('YYYY-MM-DD HH:mm:ss') : '';
            }
        },
        endTime: {
            field: 'end_time',
            type: DataTypes.DATE,
            comment: '更新时间',
            defaultValue: moment().utc().format('YYYY-MM-DD HH:mm:ss'),
            get() {
                const rawValue = this.getDataValue('endTime');
                return rawValue ? moment(rawValue).utc().format('YYYY-MM-DD HH:mm:ss') : '';
            }
        },
        state: {
            type: DataTypes.INTEGER,
            comment: '活动状态'
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
        tableName: 'card_activities'
    }
)


module.exports = cardActivitiesModel;