<template>
    <div class="activitiesEdit">
      <el-page-header v-on:back="goBack()" content="导入批次卡" style="padding-bottom:30px;"></el-page-header>
      <el-tabs type="border-card">
        <el-tab-pane label="导入批次信息">
          <el-form ref="uploadForm" label-width="120px" style="width:96%;padding:30px 0;">
          <el-form-item label="Execl卡文件" prop="excelPath">
              <el-upload class="upload-demo"
                  drag
                  action="javascript:void(0)"
                  accept=".xls,.xlsx,"
                  v-bind:limit="1"
                  v-bind:auto-upload="false"
                  v-bind:on-change="changeBatchImport">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件，且不超过5Mb</div>
              </el-upload>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" v-on:click="submitForm('ruleForm')">立即上传</el-button>
              <el-button type="morenbt" v-on:click="goBack('ruleForm')">返回</el-button>
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
        uploadForm: {
          execlPath: null
        }
      }
    },

    mounted() {
      var that = this;
      // 初始化 客户ID
      const customersId = that.$route.params.cid | '';
      that.$data.customersId = customersId;
      // 初始化 批次ID
      const batchId = that.$route.params.bid | '';
      that.$data.batchId = batchId;
    },

    methods: {
      goBack() {
        var that = this;
        that.$router.go(-1);
      },

      async submitForm() {
        const that = this;
        if(that.uploadForm.execlPath){
          let fd = new FormData()
          fd.append('file', that.uploadForm.execlPath)
          await that.$http.post('importCardByExcel', fd);
          that.$message({
            type: 'success',
            message: '导入成功'
          })
          // 跳转用户列表
          that.$router.push('/cardBatch/list/'+ that.$data.customersId +'/'+that.$data.batchId)
        }
      },

      // 验证 批次卡导入
      changeBatchImport(file, fileList){
        var that = this;
        var testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
        const extension = testmsg === 'xls'
        const extension2 = testmsg === 'xlsx'
        const isLt2M = file.size / 1024 / 1024 < 5
        if(!isLt2M){
          that.$message({
            type: 'warning',
            message: '文件大小请限制在5M以内'
          })
          return false
        }
        if(!extension && !extension2) {
          that.$message({
            message: '上传文件只能是 xls、xlxs格式!',
            type: 'warning'
          })
          return false
        }
        that.uploadForm.execlPath = file.raw
        return (extension || extension2) && isLt2M;
      },

    }
  }
</script>