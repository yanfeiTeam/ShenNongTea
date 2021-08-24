<template>
    <div class="sysUserEdit">
      <el-page-header v-on:back="goBack()" content="新增品牌供货商" style="padding-bottom:30px;"></el-page-header>
      <el-tabs type="border-card">
        <el-tab-pane label="填写品牌信息">
          <el-form v-bind:model="ruleForm" v-bind:rules="rules" ref="ruleForm" label-width="100px" style="width:96%;padding:30px 0;">
          <el-form-item label="品牌名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="品牌Logo" prop="image_path">
              <el-upload
                class="avatar-uploader"
                action="http://localhost:3000/admin/api/upload/img"
                v-bind:show-file-list="false"
                v-bind:on-success="handleAvatarSuccess"
                v-bind:before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" v-bind:src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
          </el-form-item>
          <el-form-item label="电 话" prop="phone">
              <el-input v-model.number="ruleForm.phone" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="邮 箱" prop="email">
              <el-input v-model="ruleForm.email" type="email"></el-input>
          </el-form-item>
          <el-form-item label="排 序" prop="sort">
              <el-input v-model.number="ruleForm.sort" type="number"></el-input>
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
                    v-model="ruleForm.introduction">
                  </el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary"  v-on:click="submitForm('ruleForm')">立即创建</el-button>
              <el-button type="morenbt"  v-on:click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          imagePath: '',
          phone: null,
          email: '',
          sort: 1,
          video: '',
          introduction: ''
        },
        rules: {
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

        imageUrl: ''
      }
    },
    methods: {
      goBack() {
        var that = this;
        that.$router.go(-1);
      },

      async submitForm(formName) {
        const that = this;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            // 验证通过 
            that.createSupplier();
          } else {
            return false;
          }
        })
      },

      async createSupplier(){
        var that = this;
        const res = await that.$http.post('createSupplier', that.ruleForm);
        that.$message({
          type: 'success',
          message: '保存成功'
        })
        // 跳转用户列表
        that.$router.push('/teaSupplier/list')
      },

      resetForm(formName) {
        const that = this;
        that.$refs[formName].resetFields();
      },

      // 上传 Logo 上传 视频
      handleAvatarSuccess(res, file) {
        var that = this;
        that.$data.imageUrl = URL.createObjectURL(file.raw);
        that.$data.ruleForm.imagePath = res.data.url;
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
      }

    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>