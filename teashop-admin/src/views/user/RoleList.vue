<template>
    <div class="sysRoleList">
        <el-page-header @back="goBack" content="系统角色列表" style="padding-bottom:30px;"></el-page-header>
        <div class="search-header">
            <el-form inline
                     ref="searchRef"
                     :model="searchData">
                <el-form-item>
                    <el-input v-model="searchData.rolename"
                              size="small"
                              clearable
                              placeholder="角色名称">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               size="small"
                               icon="el-icon-search"
                               @click="getRoleList()">查询
                    </el-button>
                    <el-button type="primary"
                               size="small"
                               icon="el-icon-plus"
                               @click="createClick()">新增
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
                prop="rolename"
                label="角色名称">
            </el-table-column>
            <el-table-column
                prop="nickname"
                label="拥有权限">
            </el-table-column>
            <el-table-column prop="create_time"
                             label="注册时间"
                             align="center">
                <template slot-scope='scope'>
                    <span>{{scope.row.create_time | dateTime}}</span>
                </template>
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
                    <el-button @click="updateClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="delRoleClick(scope.row)" type="text" size="small">删除</el-button>
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
            rolename: ''
        },
        tableData: [{
            id: '1',
            rolename: '运营管理员',
            permission: '',
            create_time: '2021-12-32 12:45:56',
            update_time: '2021-12-32 12:45:56'
        }]
      }
    },

    mounted() {
        this.getRoleList();
    },

    methods: {
      
      createClick(){
        this.$router.push('/sysrole/create')
      },

      async getRoleList(){
        let params = Object.assign({}, this.searchData);
        const { err, data } = await this.$http.post('getRoleList', params);
        if (err) {
        return false
        }
        this.$data.tableData = data.data
      },

      updateClick(row) {
        alert(row);
      },

      delRoleClick(row){
        var that = this;
        that.$confirm('确定删除 '+ row.rolename +' 角色？', '删除操作', {
          distinguishCancelAndClose: false,
          confirmButtonText: '确定'
        })
        .then(async () => {
            let params = Object.assign({}, {id: row.id});
            await that.$http.post('delRoleById', params);
            that.$message({
                type: 'success',
                message: '删除成功'
            })
            this.getRoleList()
        })
        .catch(action => {
        })
      }

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