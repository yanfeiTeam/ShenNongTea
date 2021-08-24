<template>
    <div class="teaGoodsList">
        <el-page-header v-on:back="goBack" content="商品列表" style="padding-bottom:30px;"></el-page-header>
        <div class="search-header">
            <el-form inline
                    ref="searchRef"
                    v-bind:model="searchData">
                <el-form-item>
                    <el-input v-model="searchData.name"
                        size="small"
                        clearable
                        placeholder="商品名称">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                        size="small"
                        icon="el-icon-search"
                        v-on:click="getTeaGoodsList()">查询
                    </el-button>
                    <el-button type="primary"
                        size="small"
                        icon="el-icon-plus"
                        v-on:click="createTeaGoods()">新增
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column 
                fixed
                type="index"
                label="序号">
            </el-table-column>
            <el-table-column 
                fixed
                prop="name"
                label="商品名称">
            </el-table-column>
            <el-table-column
                prop="image_path"
                label="商品logo">
                <template slot-scope='scope'>
                    <el-image
                        style="width: 100px; height: 100px"
                        v-bind:src="scope.row.imagePath"
                        fit="fit">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column
                prop="supplier"
                label="所属品牌">
                <template v-if="scope.row.supplier != null" slot-scope='scope'>
                  <span v-if="scope.row.supplier.hasOwnProperty('sname')">{{scope.row.supplier.sname}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="category"
                label="所属茶系">
                <template v-if="scope.row.category != null" slot-scope='scope'>
                  <span v-if="scope.row.category.hasOwnProperty('cname')">{{scope.row.category.cname}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="price"
                label="售价">
            </el-table-column>
            <el-table-column
                prop="text_specifications"
                label="规格">
            </el-table-column>
            <el-table-column
                prop="teaType_id"
                label="标签">
            </el-table-column>
            <el-table-column
                prop="sele_state"
                label="可售/上下架">
            </el-table-column>
            <el-table-column
                prop="recommend"
                label="推荐商品">
            </el-table-column>
            <el-table-column
                prop="sort"
                label="排序">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button v-on:click="updateTeaGoodsClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button v-on:click="deleteTeaGoodsClick(scope.row)" type="text" size="small">删除</el-button>
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
            name: ''
        },
        tableData: [{
            id: '1',
            name: '白沙溪',
            imagePath: '4578452110.jpg',
            nakedPrice: '88',
            price: '128',
            text_specifications: '',
            freight: '10',
            teaTypeId:'',
            sort: 1,
            sele_state: 1,
            recommend: 1,
            supplierId: '',
            supplier_id: ''
        }]
      }
    },

    mounted() {
      this.getTeaGoodsList();
    },

    methods: {
      goBack() {
        var that = this;
        that.$router.go(-1);
      },

      createTeaGoods(id = ' '){
        var that = this;
        that.$router.push('/teaGoods/create/'+ id)
      },

      async getTeaGoodsList(){
        let params = Object.assign({}, this.searchData);
        const { err, data } = await this.$http.post('getTeaGoodsList', params);
        if (err) {
            return false
        }
        this.$data.tableData = data.data
      },

      updateTeaGoodsClick(row) {
        var that = this;
        that.$router.push('/teaGoods/create/'+ row.id)
      },

      deleteTeaGoodsClick(row){
        var that = this;
        that.$confirm('确定删除 '+ row.name +' 商品？', '删除操作', {
          distinguishCancelAndClose: false,
          confirmButtonText: '确定'
        })
        .then(async () => {
            let params = Object.assign({}, {id: row.id});
            await that.$http.post('delTeaGoodsById', params);
            that.$message({
                type: 'success',
                message: '删除成功'
            })
            this.getTeaGoodsList()
        })
        .catch(() => {
        })
      }

    }
    
  }
</script>