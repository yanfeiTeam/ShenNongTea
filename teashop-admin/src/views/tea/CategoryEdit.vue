<template>
    <div class="teaCategoryEdit">
        <el-page-header v-on:back="goBack()" content="新增茶系" style="padding-bottom:30px;"></el-page-header>
        <el-tabs type="border-card">
          <el-tab-pane label="填写茶系信息">
            <el-form v-bind:model="ruleForm" v-bind:rules="rules" ref="ruleForm" label-width="100px" style="width:96%;padding:30px 0;">
            <el-form-item label="茶系名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="是否显示" prop="isShow">
                <el-switch
                  v-model="ruleForm.isShow"
                  active-value= "0"
                  inactive-value="1"
                  v-bind:active-text="ruleForm.isShow == 0 ? '显示' :'隐藏'">
                </el-switch>
            </el-form-item>
            <el-form-item label="排 序" prop="sort">
                <el-input v-model.number="ruleForm.sort" type="number"></el-input>
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
          name: '',
          isShow: '0',
          sort: 1
        },
        rules: {
          name: [
            { required: true, message: '请输入茶系名称', trigger: 'blur' }
          ],
          sort: [
            { type: 'number', message: '必须为数字值', min: 1, max: 999 }
          ]
        }
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
            that.createTeaCategory();
          } else {
            return false;
          }
        })
      },

      async createTeaCategory(){
        var that = this;
        await that.$http.post('createTeaCategory', that.ruleForm);
        that.$message({
          type: 'success',
          message: '保存成功'
        })
        // 跳转茶系列表
        that.$router.push('/teaCategory/list')
      },

      resetForm(formName) {
        const that = this;
        that.$refs[formName].resetFields();
      },

    }
  }
</script>