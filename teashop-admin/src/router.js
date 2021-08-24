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
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})
