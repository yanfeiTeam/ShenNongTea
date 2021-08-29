<template>
    <div class="batchsList">
        <el-page-header v-on:back="goBack" content="客户批次列表" style="padding-bottom:30px;"></el-page-header>    
        <div class="search-header">
            <el-form inline
                     ref="searchRef"
                     v-bind:model="searchData">
                <el-form-item>
                    <el-input v-model="searchData.batchId"
                              size="small"
                              clearable
                              placeholder="批次号">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               size="small"
                               icon="el-icon-search"
                               v-on:click="getCardBatchList()">查询
                    </el-button>
                    <el-button type="primary"
                               size="small"
                               icon="el-icon-plus"
                               v-on:click="createCardBatch()">新增
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
                prop="batchId"
                label="批次号">
            </el-table-column>
            <el-table-column 
                prop="imgPath"
                label="封面">
                <template slot-scope='scope'>
                    <el-image
                        style="width: 100px; height: 100px"
                        v-bind:src="scope.row.imagePath"
                        fit="fit">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column 
                prop="cardCount"
                label="总数">
            </el-table-column>
            <el-table-column 
                prop="amount"
                label="金额">
            </el-table-column>
            <el-table-column
                prop="cardBatchType"
                label="卡类型">
                <template slot-scope='scope'>
                    <span v-if="scope.row.cardBatchType == 1">普通卡</span>
                    <span v-if="scope.row.cardBatchType == 2">内购卡</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="isLimit"
                label="是否限制">
                <template slot-scope='scope'>
                    <span v-if="scope.row.isLimit == 0">未限制</span>
                    <span v-if="scope.row.isLimit == 1">已限制</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="limitAmount"
                label="限制金额">
            </el-table-column>
            <el-table-column
                prop="introduction"
                label="批次简介">
            </el-table-column>
            <el-table-column
                prop="mastFollow"
                label="是否需要关注领取">
                <template slot-scope='scope'>
                    <span v-if="scope.row.mastFollow == 0">否</span>
                    <span v-if="scope.row.mastFollow == 1">是</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="cardAddTime"
                label="导入时间"
                align="center">
            </el-table-column>
            <el-table-column
                prop="create_time"
                label="合同开始时间"
                align="center">
            </el-table-column>
            <el-table-column
                label="操作"
                width="150">
                <template slot-scope="scope">
                    <el-button v-on:click="importCardClick(scope.row)" type="text" size="small">导入茶卡</el-button>
                    <el-button v-on:click="updateCardBatchClick(scope.row)" type="text" size="small">编辑批次</el-button><br>
                    <el-button v-on:click="gotoCardListClick(scope.row)" type="text" size="small">茶卡列表</el-button>
                    <el-button v-on:click="gotoCardBatchImgClick(scope.row)" type="text" size="small">批次图片</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
  
</template>

<script>
  export default {
    data() {
      return {
        searchData: {
            batchId: ''
        },
        tableData: [{
            id: '',
            batchId: '',
            imgPath: '',
            cardCount: '',
            amount: null,
            contractAmount: null,
            cardBatchType: 0,
            isLimit: 0,
            limitAmount: 0,
            introduction: '',
            mastFollow: 0,
            cardAddTime: null,
            create_time: null
        }]
      }
    },

    mounted() {
        var that = this;
        // 初始化 客户ID
        that.$data.customersId = that.$route.params.cid | '';
        // 初始化 批次列表
        that.getCardBatchList();
    },

    methods: {
      goBack() {
        var that = this;
        that.$router.go(-1);
      },

      createCardBatch() {
        var that = this;
        that.$router.push('/cardBatch/create/'+ that.$data.customersId +'/'+ ' ')
      },

      updateCardBatchClick(row) {
        var that = this;
        that.$router.push('/cardBatch/create/'+ that.$data.customersId +'/'+ row.id)
      },

      async getCardBatchList() {
        let params = Object.assign({}, this.searchData);
        const { err, data } = await this.$http.post('getCardBatchList', params);
        if (err) {
            return false
        }
        this.$data.tableData = data.data
      },


      importCardClick(row) {
        var that = this;
        that.$router.push('/cardBatch/import/'+ that.$data.customersId +'/'+ row.id)
      },

      gotoCardListClick(row) {
        var that = this;
        
      },


      deleteCardBatchClick(row){
        var that = this;
        that.$confirm('确定删除 '+ row.batchId +' 批次？', '删除操作', {
          distinguishCancelAndClose: false,
          confirmButtonText: '确定'
        })
        .then(async () => {
            let params = Object.assign({}, {id: row.id});
            await that.$http.post('delCardBatchById', params);
            that.$message({
                type: 'success',
                message: '删除成功'
            })
            this.getCardBatchList()
        })
        .catch(() => {
        })
      },

    }
    
  }
</script>