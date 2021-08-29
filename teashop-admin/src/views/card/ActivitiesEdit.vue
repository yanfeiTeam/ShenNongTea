<template>
    <div class="activitiesEdit">
      <el-page-header v-on:back="goBack()" content="新增活动" style="padding-bottom:30px;"></el-page-header>
      <el-tabs type="border-card">
        <el-tab-pane label="填写活动信息">
          <el-form v-bind:model="ruleForm" v-bind:rules="rules" ref="ruleForm" label-width="100px" style="width:96%;padding:30px 0;">
          <el-form-item label="活动名称" prop="activityName">
              <el-input v-model="ruleForm.activityName"></el-input>
          </el-form-item>
          <el-form-item label="活动类型" prop="activityType">
              <el-radio-group v-model="ruleForm.activityType">
                <el-radio v-bind:label="1">赠卡</el-radio>
                <el-radio v-bind:label="2">集卡</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="开始时间" prop="startTime">
              <el-date-picker
                v-model="ruleForm.startTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" prop="endTime">
              <el-date-picker
                v-model="ruleForm.endTime"
                type="datetime"
                placeholder="选择日期时间">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="活动状态" prop="state">
              <el-radio-group v-model="ruleForm.state">
                <el-radio v-bind:label="0">未开始</el-radio>
                <el-radio v-bind:label="1">已开始</el-radio>
                <el-radio v-bind:label="2">已结束</el-radio>
              </el-radio-group>
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
          activityName: '',
          activityType: '',
          startTime: null,
          endTime: null,
          state: 0
        },
        rules: {
          activityName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      goBack() {
        var that = this;
        that.$router.go(-1);
      },

      submitForm(formName) {
        const that = this;
        that.$refs[formName].validate(async (valid) => {
          if (valid) {
            // 验证通过 
            await that.$http.post('createActivities', that.ruleForm);
            that.$message({
              type: 'success',
              message: '保存成功'
            })
            // 跳转用户列表
            that.$router.push('/cardActivities/list')
          } else {
            return false;
          }
        })
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