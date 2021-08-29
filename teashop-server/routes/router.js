module.exports = app => {
    // 访问路由装载
    const apiUrl = '/admin/api'; 

    // 系统用户路由
    app.use(apiUrl + '/', require('../controllers/adminController'))
    // 系统角色路由
    app.use(apiUrl + '/', require('../controllers/roleController'))


    // 品牌供货商 路由
    app.use(apiUrl + '/', require('../controllers/supplierController'))
    // 商品管理 路由
    app.use(apiUrl + '/', require('../controllers/teaGoodsController'))
    // 茶系(六大茶系) 路由
    app.use(apiUrl + '/', require('../controllers/teaCategoryController'))
    // 茶分类 路由
    app.use(apiUrl + '/', require('../controllers/teaTypesController'))


    // 客户管理 路由
    app.use(apiUrl + '/', require('../controllers/cardCustomersController'))
    // 客户卡批次 路由
    app.use(apiUrl + '/', require('../controllers/cardBatchController'))
    // 活动管理 路由
    app.use(apiUrl + '/', require('../controllers/cardActivitiesController'))


    // 上传图片 路由
    app.use(apiUrl + '/upload/', require('../controllers/uploadController'))
}