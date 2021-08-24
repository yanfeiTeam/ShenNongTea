<template>
    <div class="sysUserList">
        <el-page-header @back="goBack" content="系统用户列表" style="padding-bottom:30px;"></el-page-header>
        <div class="search-header">
            <el-form inline
                     ref="searchRef"
                     :model="searchData">
                <el-form-item>
                    <el-input v-model="searchData.username"
                              size="small"
                              clearable
                              placeholder="用户名">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="searchData.nickname"
                              size="small"
                              clearable
                              placeholder="昵称">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               size="small"
                               icon="el-icon-search"
                               @click="getUserList()">查询
                    </el-button>
                    <el-button type="primary"
                               size="small"
                               icon="el-icon-plus"
                               @click="createUserClick()">新增
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column 
                fixed
                type="index"
                label="序号"
                width="100">
            </el-table-column>
            <el-table-column 
                fixed
                prop="username"
                label="用户名">
            </el-table-column>
            <el-table-column
                prop="nickname"
                label="昵称">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="手机号">
            </el-table-column>
            <el-table-column
                prop="rolename"
                label="授权角色">
            </el-table-column>
            <el-table-column prop="is_use"
                             label="是否冻结"
                             align="center">
                <template slot-scope='scope'>
                    <span>{{scope.row.is_use == 1 ? '冻结':'正常'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="lasetime"
                label="最近登录">
            </el-table-column>
             <el-table-column prop="update_time"
                             label="更新时间"
                             align="center">
                <template slot-scope='scope'>
                    <span>{{scope.row.update_time | dateTime}}</span>
                </template>
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="updateUserClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="openUserClick(scope.row)"   v-if="scope.row.is_use == 1" type="text" size="small">开启</el-button>
                    <el-button @click="frozenUserClick(scope.row)" v-else type="text" size="small">冻结</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
  
</template>

<script>
  export default {
    data() {
      return {
        searchData: {
            username: '',
            nickname: ''
        },
        tableData: [{
            id: '1',
            username: 'admin',
            nickname: '运营-小王',
            phone: '13456265654',
            rolename: '系统管理员',
            last_login_time: '2021-12-32 12:45:56',
            update_time: '2021-12-32 12:45:56'
        }]
      }
    },

    mounted() {
        this.getUserList();
    },

    methods: {

      createUserClick(){
        this.$router.push('/sysuser/create')
      },

      async getUserList(){
        let params = Object.assign({}, this.searchData);
        const { err, data } = await this.$http.post('getUserList', params);
        if (err) {
        return false
        }
        this.$data.tableData = data.data
      },

      updateUserClick(row) {
        alert(row);
      },

      frozenUserClick(row) {
        var that = this;
        that.$confirm('确定冻结 '+ row.username +' 用户？', '冻结操作', {
          distinguishCancelAndClose: false,
          confirmButtonText: '确定'
        })
        .then(async () => {
            let params = Object.assign({}, {id: row.id});
            await that.$http.post('closeUserById', params);
            that.$message({
                type: 'success',
                message: '冻结成功'
            })
            this.getUserList()
        })
        .catch(action => {
        })
      },

      openUserClick(row) {
        var that = this;
        that.$confirm('确定开启 '+ row.username +' 用户？', '启动操作', {
          distinguishCancelAndClose: false,
          confirmButtonText: '确定'
        })
        .then(async () => {
            let params = Object.assign({}, {id: row.id});
            await that.$http.post('openUserById', params);
            that.$message({
                type: 'success',
                message: '启动成功'
            })
            this.getUserList()
        })
        .catch(action => {
        })
      },

    },

    filters: {
        dateTime : value => {
            let oDate = null;
            if (value === null) {
                return '';
            }
            if (value > 9999999999) {
                oDate = new Date(value);
                console.log(oDate);
            } else {
                oDate = new Date(value * 1000);
            }
            let oMonth = oDate.getMonth() + 1;
            function toDou(n) {
                return n < 10 ? '0' + n : '' + n;
            }
            return (
                oDate.getFullYear() +
                '-' +
                toDou(oMonth) +
                '-' +
                toDou(oDate.getDate()) +
                ' ' +
                toDou(oDate.getHours()) +
                ':' +
                toDou(oDate.getMinutes()) +
                ':' +
                toDou(oDate.getSeconds())
            );
        }
    }
    
  }
</script>