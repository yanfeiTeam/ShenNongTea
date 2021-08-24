<template>
    <div class="sysUserEdit">
        <el-page-header v-on:back="goBack" content="新增茶类" style="padding-bottom:30px;"></el-page-header>
        <el-tabs type="border-card">
          <el-tab-pane label="填写茶类信息">
            <el-form v-bind:model="ruleForm" v-bind:rules="rules" ref="ruleForm" label-width="100px" style="width:96%;padding:30px 0;">
            <el-form-item label="茶类名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="所属茶系" prop="phone">
                <el-select v-model="ruleForm.categoryId" placeholder="请选择茶系">
                    <el-option
                      v-for="item in categoryData"
                      v-bind:key="item.id"
                      v-bind:label="item.name"
                      v-bind:value="item.id">
                    </el-option>
                  </el-select>
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
          categoryId: null,
          sort: 1
        },
        rules: {
          name: [
            { required: true, message: '请输入茶类名称', trigger: 'blur' }
          ],
          sort: [
            { type: 'number', message: '必须为数字值', min: 1, max: 999 }
          ]
        },
        
        categoryData: [{
          id: '',
          name: ''
        }]

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

      async submitForm(formName) {
        const that = this;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            // 验证通过 
            that.createTeaType();
          } else {
            return false;
          }
        })
      },

      async createTeaType(){
        var that = this;
        await that.$http.post('createTeaTypes', that.ruleForm);
        that.$message({
          type: 'success',
          message: '保存成功'
        })
        // 跳转用户列表
        that.$router.push('/teaTypes/list')
      },

      async getTeaCategoryList(){
        var that = this;
        let params = Object.assign({}, {name:''});
        const { err, data } = await that.$http.post('getTeaCategoryList', params);
        if (err) {
          return false
        }
        // 赋值茶系列
        this.$data.categoryData = data.data
      },

      resetForm(formName) {
        const that = this;
        that.$refs[formName].resetFields();
      },

    }
  }
</script>