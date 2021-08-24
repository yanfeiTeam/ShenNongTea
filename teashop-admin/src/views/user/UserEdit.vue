<template>
    <div class="sysUserEdit">
      <el-page-header @back="goBack" content="新增系统用户" style="padding-bottom:30px;"></el-page-header>
      <el-tabs type="border-card">
        <el-tab-pane label="填写用户信息">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" style="width:96%;padding:30px;">
          <el-form-item label="登录名称" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
              <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
              <el-input v-model="ruleForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
              <el-input v-model.number="ruleForm.phone" maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="即时开启" prop="is_use">
              <el-switch v-model="ruleForm.is_use"></el-switch>
          </el-form-item>
          <el-form-item label="角色分配" prop="roles">
              <el-radio-group v-model="ruleForm.roles">
                  <el-radio label="商品管理员" value='1'></el-radio>
                  <el-radio label="销售管理员" value='2'></el-radio>
                  <el-radio label="运营管理员" value='3'></el-radio>
                  <el-radio label="财务管理员" value='4'></el-radio>
                  <el-radio label="系统管理员" value='5'></el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item>
              <el-button type="primary"  @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button type="morenbt"  @click="resetForm('ruleForm')">重置</el-button>
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
          username: '',
          nickname: '',
          password: '',
          phone: null,
          is_use: false,
          roles: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入登录名称', trigger: 'blur' },
            { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
          ],
          phone: [
            { type: 'number', message: '请输入正确手机号', min: 1000000, max: 99999999999 }
          ],
          roles: [
            { required: true, message: '请选择用户权限', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      async submitForm(formName) {
        const that = this;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            // 验证通过 
            that.createUser();
          } else {
            return false;
          }
        })
      },

      async createUser(){
        var that = this;
        const res = await that.$http.post('createUser', that.ruleForm);
        that.$message({
          type: 'success',
          message: '保存成功'
        })
        // 跳转用户列表
        that.$router.push('/sysuser/list')
      },

      resetForm(formName) {
        const that = this;
        that.$refs[formName].resetFields();
      }
    }
  }
</script>