<template>
    <div class="teaGoodsEdit">
      <el-page-header v-on:back="goBack" content="查看商品" style="padding-bottom:30px;"></el-page-header>
      <el-tabs type="border-card">
        <el-tab-pane label="填写基本信息">
          <!-- 基本信息面板 -->
          <el-form v-if="stepsActive == 1" v-bind:model="ruleForm" v-bind:rules="rules" ref="ruleForm" label-width="120px" style="width:96%;" >
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品主图" prop="image_path">
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:3000/admin/api/upload/img"
                  accept=".jpeg,.jpg,.png,"
                  v-bind:show-file-list="false"
                  v-bind:on-success="handleAvatarSuccess"
                  v-bind:before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="所属茶系" prop="categoryId">
                <el-select v-model="ruleForm.categoryId" placeholder="请选择茶系">
                  <el-option
                    v-for="item in CategoryData"
                    v-bind:key="item.id"
                    v-bind:label="item.name"
                    v-bind:value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属品牌" prop="supplierId">
                <el-select v-model="ruleForm.supplierId" placeholder="请选择品牌">
                  <el-option
                    v-for="item in SupplierData"
                    v-bind:key="item.id"
                    v-bind:label="item.name"
                    v-bind:value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="所属品类" prop="teaTypeId">
                <el-select v-model="ruleForm.teaTypeId" placeholder="请选择品类">
                  <el-option
                    v-for="item in TypesData"
                    v-bind:key="item.id"
                    v-bind:label="item.name"
                    v-bind:value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品进价" prop="nakedPrice">
                <el-input v-model="ruleForm.nakedPrice" placeholder="0.00" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="商品售价" prop="price">
                <el-input v-model="ruleForm.price" placeholder="0.00" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="商品折扣" prop="discount">
                <el-input v-model="ruleForm.discount" placeholder="请输入折扣" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="库存数量" prop="stock_num">
                <el-input v-model.number="ruleForm.stock_num" placeholder="请输入库存" oninput="value=value.replace(/[^0-9]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="限购数量" prop="limit_num">
                <el-input v-model.number="ruleForm.limit_num" placeholder="请输入限购数量" oninput="value=value.replace(/[^0-9]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="库存警告数量" prop="stock_num_warning">
                <el-input v-model.number="ruleForm.stock_num_warning" placeholder="请输入库存警告" oninput="value=value.replace(/[^0-9]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="规格(文字描述)" prop="text_specifications">
                <el-input v-model="ruleForm.text_specifications" placeholder="请输入规格：5g*7"></el-input>
            </el-form-item>
            <el-form-item label="规格单位" prop="specs">
                <el-input v-model="ruleForm.specs" placeholder="g/克/袋/包"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="weight">
                <el-input v-model="ruleForm.weight" placeholder="请输入商品重量：5g"></el-input>
            </el-form-item>
            <el-form-item label="运费" prop="freight">
                <el-input v-model="ruleForm.freight" placeholder="请输入运费：元" oninput="value=value.replace(/[^0-9.]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="上/下架" prop="state">
                <el-radio-group v-model="ruleForm.state">
                  <el-radio v-bind:label="0">上架</el-radio>
                  <el-radio v-bind:label="1">下架</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否可售" prop="sele_state">
                <el-radio-group v-model="ruleForm.sele_state">
                  <el-radio v-bind:label="0">可售</el-radio>
                  <el-radio v-bind:label="1">不可售</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="推荐商品" prop="recommend">
                <el-radio-group v-model="ruleForm.recommend">
                  <el-radio v-bind:label="0">推荐</el-radio>
                  <el-radio v-bind:label="1">不推荐</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input v-model.number="ruleForm.sort" type="number"></el-input>
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
          name: '',
          imagePath: '',
          categoryId: null,
          supplierId: null,
          teaTypeId: null,
          nakedPrice: null,
          price: null,
          discount: null,
          stock_num: null,
          limit_num: null,
          stock_num_warning: null,
          text_specifications: '',
          specs: '',
          weight: '',
          freight: null,
          introduce:'',
          specifications:'',
          state: '0',
          sele_state: '0',
          recommend: '1',
          sort: 1
        },

        imageUrl: '',

        CategoryData: [{
          id: '1',
          name: '白茶'
        }],
        SupplierData: [{
          id: '1',
          name: '绿雪芽'
        }],
        TypesData: [{
          id: '1',
          name: '白毫银针'
        }],


        dialogImageUrl: '',
        dialogVisible: false,
      }
    },

    mounted() {
      var that = this;
      // 初始化 ID
      that.$data.ruleForm.id = that.$route.params.id | '';
      if(that.$data.ruleForm.id){
        that.getTeaGoodsInfo();
      }
      // 初始化 茶系
      that.getCategoryList();
      // 初始化 品牌
      that.getSupplierList();
      // 初始化 茶类
      that.getTeaTypesList();
    },

    methods: {
      goBack() {
        var that = this;
        that.$router.go(-1);
      }, 

      
      // 获取茶系数据列表
      async getTeaGoodsInfo(){
        var that = this;
        let params = Object.assign({}, {id: that.$data.ruleForm.id});
        const { err, data } = await that.$http.post('getTeaGoodsInfoById', params);
        if (err) {
          return false
        }
        that.$data.ruleForm = data.data
      },

      // 获取茶系数据列表
      async getCategoryList(){
        let params = Object.assign({}, {name:''});
        const { data } = await this.$http.post('getTeaCategoryList', params);
        this.$data.CategoryData = data.data | []
      },
      // 获取品牌数据列表
      async getSupplierList(){
        let params = Object.assign({}, {name:''});
        const { data } = await this.$http.post('getSupplierList', params);
        this.$data.SupplierData = data.data | []
      },
      // 获取茶类数据列表
      async getTeaTypesList(){
        let params = Object.assign({}, {name:''});
        const { data } = await this.$http.post('getTeaTypesList', params);
        this.$data.TypesData = data.data | []
      },

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

  /* css 图片个数够5张时 上传按钮框隐藏 */
  .disUoloadSty .el-upload--picture-card{
      display:none;   /* 上传按钮隐藏 */
  }
</style>