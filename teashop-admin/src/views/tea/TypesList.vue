<template>
    <div class="teaTypesList">
        <el-page-header v-on:back="goBack" content="茶分类列表" style="padding-bottom:30px;"></el-page-header>
        <div class="search-header">
            <el-form inline
                     ref="searchRef"
                     v-bind:model="searchData">
                <el-form-item>
                    <el-input 
                      v-model="searchData.name"
                      size="small"
                      clearable
                      placeholder="茶类名称">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button 
                      type="primary"
                      size="small"
                      icon="el-icon-search"
                      v-on:click="getTeaTypesList()">查询
                    </el-button>
                    <el-button 
                      type="primary"
                      size="small"
                      icon="el-icon-plus"
                      v-on:click="createTeaTypes()">新增
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-bind:data="tableData" border style="width: 100%">
            <el-table-column 
                fixed
                type="index"
                label="序号"
                width="100">
            </el-table-column>
            <el-table-column 
                fixed
                prop="name"
                label="茶类名称">
            </el-table-column>
            <el-table-column
                prop="category"
                label="所属茶系">
                <template v-if="scope.row.category != null" slot-scope='scope'>
                  <span v-if="scope.row.category.hasOwnProperty('categoryName')">{{scope.row.category.categoryName}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="sort"
                label="排序">
            </el-table-column>
             <el-table-column 
                prop="update_time"
                label="更新时间"
                align="center">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="updateCategoruClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteTeaTypeClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改茶类"
                  width="800px"
                  v-bind:close-on-click-modal="false"
                  v-bind:visible.sync="dialogVisible">
            <el-form ref="saveDataRules"
                  v-bind:model="saveData"
                  v-bind:rules="saveDataRules"
                  label-width="90px">
                    <el-form-item label="茶类名称" prop="name">
                    <el-input v-model="saveData.name"></el-input>
                </el-form-item>
                <el-form-item label="所属茶系" prop="phone">
                    <el-select v-model="saveData.categoryId" value-key="id" placeholder="请选择茶系">
                        <el-option
                            v-for="item in categoryData"
                            v-bind:key="item.id"
                            v-bind:label="item.name"
                            v-bind:value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排 序" prop="sort">
                    <el-input v-model.number="saveData.sort" type="number"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button size="small" @click="closeDialogClick('saveDataRules')">取消</el-button>
                <el-button type="primary" size="small" @click="submitForm('saveDataRules')">保存</el-button>
            </span>
        </el-dialog>
    </div>
  
</template>

<script>
  export default {
    data() {
      return {
        searchData: {
            name: ''
        },
        tableData: [{
            id: '',
            name: '',
            categoryId: '',
            category: [],
            sort: 0,
            update_time: ''
        }],
        saveData: {
            id: '',
            name: '',
            isShow: '',
            sort: 1
        },
        saveDataRules: {
            name: [{required: true, message: '请输入茶系名称', trigger: 'blur'}]
        },
        dialogVisible: false,

        categoryData:[]
      }
    },

    mounted() {
        this.getTeaTypesList();
    },

    methods: {
      goBack() {
        var that = this;
        that.$router.go(-1);
      },

      createTeaTypes(){
        this.$router.push('/teaTypes/create')
      },

      async updateCategoruClick(row) {
        var that = this;
        let params = Object.assign({}, {id: row.id});
        const { err, data } = await that.$http.post('getTypesInfoById', params);
        if (err) {
          return false
        }
        that.$data.saveData = data.data
        let paramsc = Object.assign({}, {name:''});
        const resuls = await that.$http.post('getTeaCategoryList', paramsc);
        if (resuls.err) {
          return false
        }
        that.$data.categoryData = resuls.data.data
        that.$data.dialogVisible = true
      },

      async getTeaTypesList(){
        let params = Object.assign({}, this.searchData);
        const { err, data } = await this.$http.post('getTeaTypesList', params);
        if (err) {
            return false
        }
        this.$data.tableData = data.data
      },

      submitForm(formName) {
        const that = this;
        that.$refs[formName].validate( async (valid) => {
          if (valid) {
            // 验证通过 
            await that.$http.post('updateTeaTypesById', that.saveData);
            that.$message({
              type: 'success',
              message: '修改成功'
            })
            // 关闭修改框
            that.closeDialogClick();
            // 重新加载数据
            this.getTeaTypesList();
          } else {
            return false;
          }
        })
      },

      closeDialogClick(){
        var that = this;
        that.$data.dialogVisible = false
      },

      deleteTeaTypeClick(row){
        var that = this;
        that.$confirm('确定删除 '+ row.name +' 茶分类？', '删除操作', {
          distinguishCancelAndClose: false,
          confirmButtonText: '确定'
        })
        .then(async () => {
            let params = Object.assign({}, {id: row.id});
            await that.$http.post('delTeaTypesById', params);
            that.$message({
                type: 'success',
                message: '删除成功'
            })
            this.getTeaTypesList()
        })
        .catch(() => {
        })
      }

    }
    
  }
</script>