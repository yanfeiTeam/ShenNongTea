<template>
    <el-container style="height: 98vh;">
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
          <span>Yanfei</span>
        </el-header>
        <el-container>
          <el-aside width="260px">
          <el-menu router :default-openeds="['1']">
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-menu"></i>系统管理</template>
                <el-menu-item-group title="用户管理">
                  <el-menu-item index="/sysuser/list">用户列表</el-menu-item>
                  <el-menu-item index="/sysuser/create">用户添加</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="角色管理">
                  <el-menu-item index="/sysrole/list">角色列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>福利卡管理</template>
                <el-menu-item-group title="神农茶票">
                  <el-menu-item index="/cardCustomers/list">客户批次管理</el-menu-item>
                  <el-menu-item index="2-2">已售茶票管理</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="活动茶票">
                  <el-menu-item index="/cardActivities/list">活动茶票列表</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="礼包管理">
                  <el-menu-item index="2-4">礼包列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-menu"></i>品牌商管理</template>
                <el-menu-item-group title="品牌(供货)商">
                  <el-menu-item index="/teaSupplier/list">品牌商列表</el-menu-item>
                  <el-menu-item index="/teaSupplier/create">品牌商编辑</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-menu"></i>商品管理</template>
                <el-menu-item-group title="茶商品">
                  <el-menu-item index="/teaGoods/list">商品列表</el-menu-item>
                  <el-menu-item index="/teaGoods/create/id=''">商品编辑</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="六大茶系">
                  <el-menu-item index="/teaCategory/list">茶系列表</el-menu-item>
                  <el-menu-item index="/teaCategory/create">茶系编辑</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="茶品类">
                  <el-menu-item index="/teaTypes/list">茶类列表</el-menu-item>
                  <el-menu-item index="/teaTypes/create">茶类编辑</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="茶标签">
                  <el-menu-item index="4-1">标签列表</el-menu-item>
                  <el-menu-item index="4-2">标签编辑</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title"><i class="el-icon-menu"></i>会员管理</template>
                <el-menu-item-group title="小程序会员">
                  <el-menu-item index="2-3">会员列表</el-menu-item>
                  <el-menu-item index="2-3">会员编辑</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="内购会员">
                  <el-menu-item index="2-3">内购列表</el-menu-item>
                  <el-menu-item index="2-3">内购审核</el-menu-item>
                  <el-menu-item index="2-3">内购等级</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="合伙人会员">
                  <el-menu-item index="2-3">合伙人列表</el-menu-item>
                  <el-menu-item index="2-3">合伙人编辑</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title"><i class="el-icon-setting"></i>订单管理</template>
                <el-menu-item-group title="会员订单">
                  <el-menu-item index="3-1">待发货</el-menu-item>
                  <el-menu-item index="3-2">已发货</el-menu-item>
                  <el-menu-item index="3-3">未付款</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="合伙人订单">
                  <el-menu-item index="3-4">待发货</el-menu-item>
                  <el-menu-item index="3-5">已发货</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7">
                <template slot="title"><i class="el-icon-setting"></i>账户资金</template>
                <el-menu-item-group title="财务统计">
                  <el-menu-item index="3-3">资金统计</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="财务明细">
                  <el-menu-item index="3-3">资金明细</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="8">
                <template slot="title"><i class="el-icon-setting"></i>销售统计</template>
                <el-menu-item-group title="品牌销售">
                  <el-menu-item index="3-3">销售统计</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="商品销售">
                  <el-menu-item index="3-3">销售统计</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="运费">
                  <el-menu-item index="3-3">运费统计</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="9">
                <template slot="title"><i class="el-icon-setting"></i>小程序设置</template>
                <el-menu-item-group title="微信小程序">
                  <el-menu-item index="8-1">微信小程序设置</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
          <!-- <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table> -->
        </el-main>
      </el-container>
    </el-container>

</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>