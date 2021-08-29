import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Login from './views/Login.vue'

import UserEdit from './views/user/UserEdit.vue'
import UserList from './views/user/UserList.vue'
import RoleEdit from './views/user/RoleEdit.vue'
import RoleList from './views/user/RoleList.vue'

import SupplierEdit from './views/tea/SupplierEdit.vue'
import SupplierList from './views/tea/SupplierList.vue'
import GoodsEdit from './views/tea/GoodsEdit.vue'
import GoodsList from './views/tea/GoodsList.vue'
import CategoryEdit from './views/tea/CategoryEdit.vue'
import CategoryList from './views/tea/CategoryList.vue'
import TypesEdit from './views/tea/TypesEdit.vue'
import TypesList from './views/tea/TypesList.vue'

import CustomersEdit from './views/card/CustomersEdit.vue'
import CustomersList from './views/card/CustomersList.vue'
import BatchEdit from './views/card/BatchEdit.vue'
import BatchList from './views/card/BatchList.vue'
import BatchImport from './views/card/BatchImport.vue'
import ActivitiesEdit from './views/card/ActivitiesEdit.vue'
import ActivitiesList from './views/card/ActivitiesList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'admin',
      component: Main,
      children:[
        {path: '/sysuser/create', component: UserEdit },
        {path: '/sysuser/list', component: UserList },
        {path: '/sysrole/create', component: RoleEdit },
        {path: '/sysrole/list', component: RoleList },

        {path: '/teaSupplier/create', component: SupplierEdit },
        {path: '/teaSupplier/list', component: SupplierList },
        {path: '/teaGoods/create/:id', component: GoodsEdit },
        {path: '/teaGoods/list', component: GoodsList },
        {path: '/teaCategory/create', component: CategoryEdit },
        {path: '/teaCategory/list', component: CategoryList },
        {path: '/teaTypes/create', component: TypesEdit },
        {path: '/teaTypes/list', component: TypesList },

        {path: '/cardCustomers/create', component: CustomersEdit },
        {path: '/cardCustomers/list', component: CustomersList },
        {path: '/cardBatch/create/:cid/:bid', component: BatchEdit },
        {path: '/cardBatch/list/:cid', component: BatchList },
        {path: '/cardBatch/import/:cid/:bid', component: BatchImport },
        {path: '/cardActivities/create', component: ActivitiesEdit },
        {path: '/cardActivities/list', component: ActivitiesList },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})
