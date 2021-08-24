<template>
    <div class="sysUserEdit">
      <el-page-header @back="goBack" content="新增系统角色" style="padding-bottom:30px;"></el-page-header>
      <el-tabs type="border-card">
        <el-tab-pane label="填写角色信息">
            <el-form v-bind:model="ruleForm" v-bind:rules="rules" ref="ruleForm" label-width="100px" style="width:96%;padding:30px;">
            <el-form-item label="角色名称" prop="rolename">
              <el-input v-model="ruleForm.rolename"></el-input>
            </el-form-item>
            <el-form-item label="权限分配" prop="roles">
              <el-transfer
                v-model="value"
                v-bind:titles="['系统权限', '角色权限']"
                v-bind:button-texts="['取消权限', '绑定权限']"
                v-bind:props="{
                  key: 'value',
                  label: 'desc'
                }"
                v-bind:data="data">
              </el-transfer>
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
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            value: i,
            desc: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      }
      return {
        data: generateData(),
        value: [],
        ruleForm: {
          rolename: '',
          permission: ''
        },
        rules: {
          rolename: [
            { required: true, message: '请输入权限名称', trigger: 'blur' },
            { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
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
            that.createRole();
          } else {
            return false;
          }
        })
      },

      async createRole(){
        var that = this;
        const res = await that.$http.post('createRole', that.ruleForm);
        that.$message({
          type: 'success',
          message: '保存成功'
        })
        // 跳转用户列表
        that.$router.push('/sysrole/list')
      },

      resetForm(formName) {
        const that = this;
        that.$refs[formName].resetFields();
      }
    }
  }
</script>