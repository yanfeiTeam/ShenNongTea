<template>
    <div class="teaCategoryList">
      <el-page-header v-on:back="goBack" content="茶系列表" style="padding-bottom:30px;"></el-page-header>
      <div class="search-header">
          <el-form inline ref="searchRef" v-bind:model="searchData">
              <el-form-item>
                  <el-input v-model="searchData.name" size="small" clearable placeholder="茶系名称"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" size="small" icon="el-icon-search" v-on:click="getTeaCategoryList()">查询</el-button>
                  <el-button type="primary" size="small" icon="el-icon-plus" v-on:click="createTeaCategory()">新增</el-button>
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
              label="茶系名称">
          </el-table-column>
          <el-table-column prop="isShow" label="是否显示" align="center">
              <template slot-scope='scope'>
                <el-switch v-bind:value="scope.row.isShow == 0 ? '0':'1'" disabled active-value='0' inactive-value='1'></el-switch>
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
                  <el-button v-on:click="updateCategoruClick(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button v-on:click="delTeaCategoryClick(scope.row)" type="text" size="small">删除</el-button>
              </template>
          </el-table-column>
      </el-table>

      <el-dialog title="修改茶系"
                width="800px"
                v-bind:close-on-click-modal="false"
                v-bind:visible.sync="dialogVisible">
          <el-form ref="saveDataRules"
                v-bind:model="saveData"
                v-bind:rules="saveDataRules"
                label-width="90px">
              <el-form-item label="茶系名称"
                            prop="name">
                  <el-input v-model="saveData.name" size="small"></el-input>
              </el-form-item>
              <el-form-item label="是否显示" prop="isShow">
              <el-switch
                    v-model="saveData.isShow"
                    active-value= "0"
                    inactive-value="1"
                    v-bind:active-text="saveData.isShow == 0 ? '显示':'隐藏'">
                  </el-switch>
              </el-form-item>
              <el-form-item label="排 序" prop="sort">
                  <el-input v-model.number="saveData.sort" type="number"></el-input>
              </el-form-item>
          </el-form>
          <span slot="footer">
              <el-button size="small" v-on:click="closeDialogClick('saveDataRules')">取消</el-button>
              <el-button type="primary" size="small" v-on:click="submitForm('saveDataRules')">保存</el-button>
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
          isShow: '',
          sort: '',
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
        dialogVisible: false
      }
    },

    mounted() {
        this.getTeaCategoryList();
    },

    methods: {
      goBack() {
        var that = this;
        that.$router.go(-1);
      },

      createTeaCategory(){
        var that = this;
        that.$router.push('/teaCategory/create')
      },

      async updateCategoruClick(row) {
        var that = this;
        let params = Object.assign({}, {id: row.id});
        const { err, data } = await that.$http.post('getTeaCategoryInfo', params);
        if (err) {
          return false
        }
        that.$data.saveData = data.data
        that.$data.dialogVisible = true
      },

      async getTeaCategoryList(){
        var that = this;
        let params = Object.assign({}, that.searchData);
        const { err, data } = await that.$http.post('getTeaCategoryList', params);
        if (err) {
          return false
        }
        that.$data.tableData = data.data
      },

      submitForm(formName) {
        const that = this;
        that.$refs[formName].validate( async (valid) => {
          if (valid) {
            // 验证通过 
            await that.$http.post('updateTeaCategoryById', that.saveData);
            that.$message({
              type: 'success',
              message: '修改成功'
            })
            // 关闭修改框
            that.closeDialogClick();
            // 重新加载数据
            this.getTeaCategoryList();
          } else {
            return false;
          }
        })
      },

      closeDialogClick(){
        var that = this;
        that.$data.dialogVisible = false
      },

      delTeaCategoryClick(row){
        var that = this;
        that.$confirm('确定删除 '+ row.name +' 茶系？', '删除操作', {
          distinguishCancelAndClose: false,
          confirmButtonText: '确定'
        })
        .then(async () => {
            let params = Object.assign({}, {id: row.id});
            await that.$http.post('delTeaCategoryById', params);
            that.$message({
                type: 'success',
                message: '删除成功'
            })
            this.getTeaCategoryList()
        })
        .catch(() => {
        })
      }

    }
    
  }
</script>