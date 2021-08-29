<template>
    <div class="activitiesEdit">
      <el-page-header v-on:back="goBack()" v-bind:content="ruleForm.id == '' ? '新增客户批次':'修改客户批次'" style="padding-bottom:30px;"></el-page-header>
      <el-tabs type="border-card">
        <el-tab-pane label="填写批次信息">
          <el-form v-bind:model="ruleForm" v-bind:rules="rules" ref="ruleForm" label-width="120px" style="width:96%;padding:30px 0;">
          <el-form-item label="客户名" prop="customerName">
              <el-input v-model="ruleForm.customerName" disabled></el-input>
          </el-form-item>
          <el-form-item label="卡名称" prop="cardName">
              <el-input v-model="ruleForm.cardName"></el-input>
          </el-form-item>
          <el-form-item label="卡封面" prop="imagePath">
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
          <el-form-item label="单卡金额" prop="amount">
              <el-input v-model="ruleForm.amount" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="合同金额" prop="contractAmount">
              <el-input v-model="ruleForm.contractAmount" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="限制金额" prop="limitAmount">
              <el-input v-model="ruleForm.limitAmount" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="是否预制内购卡" prop="isBankCard">
              <el-radio-group v-model="ruleForm.isBankCard">
                <el-radio v-bind:label="1">是</el-radio>
                <el-radio v-bind:label="0">否</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="单卡实付金额" prop="actualPayment">
              <el-input v-model="ruleForm.actualPayment" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="是否限制" prop="isLimit">
              <el-radio-group v-model="ruleForm.isLimit">
                <el-radio v-bind:label="1">是</el-radio>
                <el-radio v-bind:label="0">否</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="宣传视频" prop="videoPath">
              <el-upload class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              </el-upload>
          </el-form-item>
          <el-form-item label="批次简介" prop="introduction">
              <el-input type="textarea"
                    rows="2"
                    placeholder="请输入内容"
                    v-model="ruleForm.introduction">
              </el-input>
          </el-form-item>
          <el-form-item label="是否需要关注" prop="mastFollow">
              <el-radio-group v-model="ruleForm.mastFollow">
                <el-radio v-bind:label="1">是</el-radio>
                <el-radio v-bind:label="0">否</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" v-on:click="submitForm('ruleForm')">立即创建</el-button>
              <el-button type="morenbt" v-on:click="resetForm('ruleForm')">重置</el-button>
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
          id: '',
          customerId: '',
          customerName: '',
          cardName: '',
          imagePath: null,
          amount: null,
          contractAmount: null,
          limitAmount: null,
          isBankCard: 0,
          actualPayment: null,
          isLimit: 0,
          videoPath: null,
          introduction: '',
          mastFollow: 0
        },
        rules: {
          customerName: [
            { required: true, message: '客户名称有误', trigger: 'blur' }
          ],
          cardName: [
            { required: true, message: '请输入卡名称', trigger: 'blur' }
          ]
        },

        imageUrl: null
      }
    },

    mounted() {
      var that = this;
      // 更新批次 批次ID
      const batchId = that.$route.params.bid | ''
      that.$data.ruleForm.id = batchId;
      if(batchId){
        that.getCardBatchInfo(batchId);
      }

      // 初始化 客户ID
      const customerId = that.$route.params.cid | '';
      that.$data.ruleForm.customerId = customerId;
      // 获取 客户信息
      that.getCustomersInfo(customerId);
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
            if(that.$data.ruleForm.id){
              await that.$http.post('updateCardBatch', that.ruleForm);
            }else{
              await that.$http.post('createCardBatch', that.ruleForm);
            }
            that.$message({
              type: 'success',
              message: '保存成功'
            })
            // 跳转用户列表
            that.$router.push('/cardBatch/list/'+ that.$data.ruleForm.customerId)
          } else {
            return false;
          }
        })
      },

      resetForm(formName) {
        const that = this;
        that.$refs[formName].resetFields();
      },

      async getCustomersInfo(customerId) {
        let params = Object.assign({}, {id: customerId});
        const { data } = await this.$http.post('getCustomersInfoById', params);
        this.ruleForm.customerName = data.data.name;
        this.$forceUpdate();
      },

      async getCardBatchInfo(batchId) {
        let params = Object.assign({}, {id: batchId});
        const { data } = await this.$http.post('getCardBatchInfoById', params);
        this.ruleForm = data.data;
        this.$forceUpdate();
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