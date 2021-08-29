<template>
    <div class="customersList">
        <el-page-header v-on:back="goBack" content="客户列表" style="padding-bottom:30px;"></el-page-header>    
        <div class="search-header">
            <el-form inline
                     ref="searchRef"
                     v-bind:model="searchData">
                <el-form-item>
                    <el-input v-model="searchData.name"
                              size="small"
                              clearable
                              placeholder="客户名称">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               size="small"
                               icon="el-icon-search"
                               v-on:click="getCustomersList()">查询
                    </el-button>
                    <el-button type="primary"
                               size="small"
                               icon="el-icon-plus"
                               v-on:click="createCustomers()">新增
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
                label="客户名称">
            </el-table-column>
            <el-table-column
                prop="imagePath"
                label="客户Logo">
                <template slot-scope='scope'>
                    <el-image
                        style="width: 100px; height: 100px"
                        v-bind:src="scope.row.imagePath"
                        fit="fit">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column
                prop="videoPath"
                label="客户视频">
                <template slot-scope='scope'>
                    <el-image
                        style="width: 100px; height: 100px"
                        v-bind:src="scope.row.imagePath"
                        fit="fit">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column
                prop="introduction"
                label="客户简介">
            </el-table-column>
             <el-table-column
                prop="update_time"
                label="更新时间"
                align="center">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="180">
                <template slot-scope="scope">
                    <el-button v-on:click="gotoBatchListClick(scope.row)" type="text" size="small">卡批次管理</el-button>
                    <el-button v-on:click="updateCustomersClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button v-on:click="deleteCustomersClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改客户信息"
                width="800px"
                v-bind:close-on-click-modal="false"
                v-bind:visible.sync="dialogVisible">
            <el-form ref="saveDataRules"
                  v-bind:model="saveData"
                  v-bind:rules="saveDataRules"
                  label-width="90px">
                <el-form-item label="客户名称" prop="name">
                    <el-input v-model="saveData.name"></el-input>
                </el-form-item>
                <el-form-item label="客户Logo" prop="imagePath">
                    <el-upload
                        class="avatar-uploader"
                        action="http://localhost:3000/admin/api/upload/img"
                        v-bind:show-file-list="false"
                        v-bind:on-success="handleAvatarSuccess"
                        v-bind:before-upload="beforeAvatarUpload">
                        <img v-if="saveData.imagePath" v-bind:src="saveData.imagePath" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="宣传视频" prop="videoPath">
                    <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="简 介" prop="introduction">
                    <el-input
                        type="textarea"
                        rows="2"
                        placeholder="请输入内容"
                        v-model="saveData.introduction">
                    </el-input>
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
            imagePath: '',
            videoPath: '',
            introduction: '',
            update_time: ''
        }],

        saveData: {
            name: '',
            imagePath: '',
            videoPath: '',
            introduction: ''
        },
        saveDataRules: {
            name: [
                { required: true, message: '请输入客户名称', trigger: 'blur' }
            ]
        },
        dialogVisible: false
      }
    },

    mounted() {
        this.getCustomersList();
    },

    methods: {
      goBack() {
        var that = this;
        that.$router.go(-1);
      },

      createCustomers() {
        var that = this;
        that.$router.push('/cardCustomers/create')
      },

      gotoBatchListClick(row) {
        var that = this;
        that.$router.push('/cardBatch/list/'+ row.id)
      },

      async getCustomersList() {
        let params = Object.assign({}, this.searchData);
        const { err, data } = await this.$http.post('getCustomersList', params);
        if (err) {
        return false
        }
        this.$data.tableData = data.data
      },

      async updateCustomersClick(row) {
        var that = this;
        let params = Object.assign({}, {id: row.id});
        const { err, data } = await that.$http.post('getCustomersInfoById', params);
        if (err) {
          return false
        }
        that.$data.saveData = data.data
        that.$data.dialogVisible = true
      },

      submitForm(formName) {
        const that = this;
        that.$refs[formName].validate( async (valid) => {
          if (valid) {
            // 验证通过 
            await that.$http.post('updateCustomersById', that.saveData);
            that.$message({
              type: 'success',
              message: '修改成功'
            })
            // 关闭修改框
            that.closeDialogClick();
            // 重新加载数据
            this.getCustomersList();
          } else {
            return false;
          }
        })
      },

      closeDialogClick(){
        var that = this;
        that.$data.dialogVisible = false
      },


      deleteCustomersClick(row){
        var that = this;
        that.$confirm('确定删除 '+ row.name +' 客户？', '删除操作', {
          distinguishCancelAndClose: false,
          confirmButtonText: '确定'
        })
        .then(async () => {
            let params = Object.assign({}, {id: row.id});
            await that.$http.post('delCustomersById', params);
            that.$message({
                type: 'success',
                message: '删除成功'
            })
            this.getCustomersList()
        })
        .catch(() => {
        })
      },

      // 上传 Logo 上传 视频
        handleAvatarSuccess(res, file) {
            var that = this;
            // that.$data.imageUrl = URL.createObjectURL(file.raw);
            that.$data.saveData.imagePath = res.data.url;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传Logo图片只能是 JPG/PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传Logo图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },

    }
    
  }
</script>