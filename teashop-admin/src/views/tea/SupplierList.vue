<template>
    <div class="teaSupplierList">
        <el-page-header v-on:back="goBack" content="品牌供货商列表" style="padding-bottom:30px;"></el-page-header>    
        <div class="search-header">
            <el-form inline
                     ref="searchRef"
                     v-bind:model="searchData">
                <el-form-item>
                    <el-input v-model="searchData.name"
                              size="small"
                              clearable
                              placeholder="品牌名称">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               size="small"
                               icon="el-icon-search"
                               v-on:click="getSupplierList()">查询
                    </el-button>
                    <el-button type="primary"
                               size="small"
                               icon="el-icon-plus"
                               v-on:click="createSupplier()">新增
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
                label="品牌名称">
            </el-table-column>
            <el-table-column
                prop="image_path"
                label="品牌Logo">
                <template slot-scope='scope'>
                    <el-image
                        style="width: 100px; height: 100px"
                        v-bind:src="scope.row.imagePath"
                        fit="fit">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column
                prop="phone"
                label="电话">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱">
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
                    <el-button v-on:click="updateSupplierClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button v-on:click="deleteSupplierClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改品牌信息"
                width="800px"
                v-bind:close-on-click-modal="false"
                v-bind:visible.sync="dialogVisible">
            <el-form ref="saveDataRules"
                  v-bind:model="saveData"
                  v-bind:rules="saveDataRules"
                  label-width="90px">
                <el-form-item label="品牌名称" prop="name">
                    <el-input v-model="saveData.name"></el-input>
                </el-form-item>
                <el-form-item label="品牌Logo" prop="image_path">
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
                <el-form-item label="电 话" prop="phone">
                    <el-input v-model.number="saveData.phone" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="邮 箱" prop="email">
                    <el-input v-model="saveData.email" type="email"></el-input>
                </el-form-item>
                <el-form-item label="排 序" prop="sort">
                    <el-input v-model.number="saveData.sort" type="number"></el-input>
                </el-form-item>
                <el-form-item label="宣传视频" prop="video">
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
            phone: '',
            email: '',
            sort: 0,
            update_time: ''
        }],

        saveData: {
            name: '',
            imagePath: '',
            phone: null,
            email: '',
            sort: 1,
            video: '',
            introduction: ''
        },
        saveDataRules: {
            name: [
                { required: true, message: '请输入品牌名称', trigger: 'blur' }
            ],
            phone: [
                { type: 'number', message: '请输入正确手机号', min: 1000000, max: 99999999999 }
            ],
            email: [
                { type: 'email', message: '请输入正确邮箱地址', trigger: ['blur', 'change'] }
            ],
            sort: [
                { type: 'number', message: '必须为数字值', min: 1, max: 999 }
            ]
        },
        dialogVisible: false,

      }
    },

    mounted() {
        this.getSupplierList();
    },

    methods: {
      goBack() {
        var that = this;
        that.$router.go(-1);
      },

      createSupplier(){
        this.$router.push('/teaSupplier/create')
      },

      async getSupplierList(){
        let params = Object.assign({}, this.searchData);
        const { err, data } = await this.$http.post('getSupplierList', params);
        if (err) {
        return false
        }
        this.$data.tableData = data.data
      },

      async updateSupplierClick(row) {
        var that = this;
        let params = Object.assign({}, {id: row.id});
        const { err, data } = await that.$http.post('getSupplierInfoById', params);
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
            await that.$http.post('updateSupplierById', that.saveData);
            that.$message({
              type: 'success',
              message: '修改成功'
            })
            // 关闭修改框
            that.closeDialogClick();
            // 重新加载数据
            this.getSupplierList();
          } else {
            return false;
          }
        })
      },

      closeDialogClick(){
        var that = this;
        that.$data.dialogVisible = false
      },


      deleteSupplierClick(row){
        var that = this;
        that.$confirm('确定删除 '+ row.name +' 品牌(供货)商？', '删除操作', {
          distinguishCancelAndClose: false,
          confirmButtonText: '确定'
        })
        .then(async () => {
            let params = Object.assign({}, {id: row.id});
            await that.$http.post('delSupplierById', params);
            that.$message({
                type: 'success',
                message: '删除成功'
            })
            this.getSupplierList()
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