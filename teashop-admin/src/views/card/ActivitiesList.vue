<template>
    <div class="activitiesList">
        <el-page-header v-on:back="goBack" content="活动列表" style="padding-bottom:30px;"></el-page-header>    
        <div class="search-header">
            <el-form inline
                     ref="searchRef"
                     v-bind:model="searchData">
                <el-form-item>
                    <el-input v-model="searchData.activityName"
                              size="small"
                              clearable
                              placeholder="活动名称">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               size="small"
                               icon="el-icon-search"
                               v-on:click="getActivitiesList()">查询
                    </el-button>
                    <el-button type="primary"
                               size="small"
                               icon="el-icon-plus"
                               v-on:click="createActivities()">新增
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
                prop="activityName"
                label="活动名称">
            </el-table-column>
            <el-table-column
                prop="activityType"
                label="活动类型">
                <template slot-scope='scope'>
                    <span v-if="scope.row.activityType == 1">赠卡</span>
                    <span v-if="scope.row.activityType == 2">集卡</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="state"
                label="活动状态">
                <template slot-scope='scope'>
                    <span v-if="scope.row.state == 0">未开始</span>
                    <span v-if="scope.row.state == 1">已开始</span>
                    <span v-if="scope.row.state == 2">已结束</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="startTime"
                label="开始时间"
                align="center">
            </el-table-column>
            <el-table-column
                prop="endTime"
                label="结束时间"
                align="center">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                    <el-button v-on:click="updateActivitiesClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button v-on:click="updateActivitiesClick" type="text" size="small">赠卡规则</el-button>
                    <el-button v-on:click="deleteActivitiesClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改活动信息"
                width="800px"
                v-bind:close-on-click-modal="false"
                v-bind:visible.sync="dialogVisible">
            <el-form ref="saveDataRules"
                  v-bind:model="saveData"
                  v-bind:rules="saveDataRules"
                  label-width="90px">
                <el-form-item label="活动名称" prop="activityName">
                    <el-input v-model="saveData.activityName"></el-input>
                </el-form-item>
                <el-form-item label="活动类型" prop="activityType">
                    <el-radio-group v-model="saveData.activityType">
                        <el-radio label="1">赠卡</el-radio>
                        <el-radio label="2">集卡</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="开始时间" prop="startTime">
                    <el-date-picker
                        v-model="saveData.startTime"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="endTime">
                    <el-date-picker
                        v-model="saveData.endTime"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="活动状态" prop="state">
                    <el-radio-group v-model="saveData.state">
                        <el-radio v-bind:label="0">未开始</el-radio>
                        <el-radio v-bind:label="1">已开始</el-radio>
                        <el-radio v-bind:label="2">已结束</el-radio>
                    </el-radio-group>
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
            activityName: ''
        },
        tableData: [{
            id: '',
            activityName: '',
            activityType: '',
            startTime: null,
            endTime: null,
            state: 0
        }],

        saveData: {
            activityName: '',
            activityType: '',
            startTime: null,
            endTime: null,
            state: 0
        },
        saveDataRules: {
            activityName: [
                { required: true, message: '请输入活动名称', trigger: 'blur' }
            ]
        },
        dialogVisible: false
      }
    },

    mounted() {
        this.getActivitiesList();
    },

    methods: {
      goBack() {
        var that = this;
        that.$router.go(-1);
      },

      createActivities() {
        this.$router.push('/cardActivities/create')
      },

      async getActivitiesList() {
        let params = Object.assign({}, this.searchData);
        const { err, data } = await this.$http.post('getActivitiesList', params);
        if (err) {
        return false
        }
        this.$data.tableData = data.data
      },

      async updateActivitiesClick(row) {
        var that = this;
        let params = Object.assign({}, {id: row.id});
        const { err, data } = await that.$http.post('getActivitiesInfoById', params);
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
            await that.$http.post('updateActivitiesById', that.saveData);
            that.$message({
              type: 'success',
              message: '修改成功'
            })
            // 关闭修改框
            that.closeDialogClick();
            // 重新加载数据
            this.getActivitiesList();
          } else {
            return false;
          }
        })
      },

      closeDialogClick(){
        var that = this;
        that.$data.dialogVisible = false
      },


      deleteActivitiesClick(row){
        var that = this;
        that.$confirm('确定删除 '+ row.activityName +' 活动？', '删除操作', {
          distinguishCancelAndClose: false,
          confirmButtonText: '确定'
        })
        .then(async () => {
            let params = Object.assign({}, {id: row.id});
            await that.$http.post('delActivitiesById', params);
            that.$message({
                type: 'success',
                message: '删除成功'
            })
            this.getActivitiesList()
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