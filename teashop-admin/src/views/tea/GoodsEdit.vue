<template>
    <div class="teaGoodsEdit">
      <el-page-header v-on:back="goBack" v-bind:content="ruleForm.id =='' ? '新增商品':'修改商品'" style="padding-bottom:30px;"></el-page-header>
      <el-tabs type="border-card">
        <el-tab-pane label="填写基本信息">
          <el-steps style="padding:50px 50px;" v-bind:active="stepsActive" finish-status="success">
            <el-step title="步骤 1" icon="el-icon-edit" description="填写基本信息"></el-step>
            <el-step title="步骤 2" icon="el-icon-upload" description="上传图片"></el-step>
            <el-step title="步骤 3" icon="el-icon-picture" description="预览商品"></el-step>
          </el-steps>
          <!-- 基本信息面板 -->
          <el-form v-if="stepsActive == 0" v-bind:model="ruleForm" v-bind:rules="rules" ref="ruleForm" label-width="120px" style="width:96%;" >
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
            <el-form-item>
                <el-button type="primary" v-on:click="submitForm('ruleForm')">保存，下一步</el-button>
                <el-button type="morenbt" v-on:click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>

          <!-- 上传图片面板 -->
          <el-form v-if="stepsActive == 1" label-width="120px" style="width:96%;" >
            <el-form-item label="商品轮播图">
                <el-upload
                  action="javascript:void(0);"
                  list-type="picture-card"
                  accept=".jpeg,.jpg,.png,"
                  v-bind:class="{disUoloadSty:hideUploadEdit}"
                  v-bind:limit="5"
                  v-bind:file-list="uploadForm.fileLists"
                  v-bind:auto-upload="false"
                  v-bind:on-change="changeGoodsPicture"
                  v-bind:on-preview="previewGoodsPicture"
                  v-bind:on-remove="removeGoodsPicture">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <!-- 大图预览框 -->
            　　<el-dialog v-bind:visible.sync="dialogImgVisible" title="图片">
                　　<img width="100%" v-bind:src="dialogImageUrl" alt="主图">
            　　</el-dialog>
            </el-form-item>
            <el-form-item label="商品介绍图">
                <el-upload
                  class="upload-demo"
                  drag
                  action="javascript:void(0)"
                  accept=".jpeg,.jpg,.png,"
                  v-bind:limit="1"
                  v-bind:auto-upload="false"
                  v-bind:on-change="changeIntroduceImg"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="规格介绍图">
                <el-upload
                  class="upload-demo"
                  drag
                  action="javascript:void(0)"
                  accept=".jpeg,.jpg,.png,"
                  v-bind:limit="1"
                  v-bind:auto-upload="false"
                  v-bind:on-change="changeSpecificationsImg"
                  multiple>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-on:click="submitUploadImgForm()">保存,下一步</el-button>
                <el-button type="morenbt" v-on:click="stepsActive = 0">返回,上一步</el-button>
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
          state: 0,
          sele_state: 0,
          recommend: 1,
          sort: 1
        },
        rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
          ],
          category: [
            { required: true, message: '请选择所属茶系', trigger: ['blur', 'change'] }
          ],
          nakedPrice: [
            { required: true, message: '必须为数字值', min: 1.00, max: 9999999.00 }
          ],
          price: [
            { required: true, message: '必须为数字值', min: 1.00, max: 9999999.00 }
          ],
          discount: [
            { message: '必须为数字值', min: 1, max: 9 }
          ],
          stock_num: [
            { required: true, type: 'number', message: '必须为数字值', min: 0, max: 99999 }
          ],
          limit_num: [
            { type: 'number', message: '必须为数字值', min: 0, max: 99999 }
          ],
          stock_num_warning: [
            { type: 'number', message: '必须为数字值', min: 0, max: 99999 }
          ],
          freight: [
            { message: '必须为数字值', min: 0, max: 1000 }
          ],
          sort: [
            { type: 'number', message: '必须为数字值', min: 1, max: 999 }
          ]
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

        stepsActive: 0,

        dialogImageUrl: '',
        dialogVisible: false,

        // 上传模块Form
        uploadForm: {
          fileLists: [],
          introduceImg:'',
          specificationsImg:'',
        },
        
        dialogImgVisible: false,//大图预览框
        hideUploadEdit:false,//图片个数设置 超过5张为true
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

      /** 第一步：商品基本信息 */

      async submitForm(formName) {
        const that = this;
        that.$refs[formName].validate(async (valid) => {
          if (valid) {
            // 验证通过 
            if(that.$data.ruleForm.id){
              const { data } = await that.$http.post('updateTeaGoods', that.ruleForm);
              that.$data.commodityNew = data.data;
            }else{
              const { data } = await that.$http.post('createTeaGoods', that.ruleForm);
              that.$data.commodityNew = data.data;
            }
            that.$message({
              type: 'success',
              message: '保存成功'
            })
            // 操作下一步
            that.$data.stepsActive = 1
          } else {
            return false;
          }
        })
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

      resetForm(formName) {
        const that = this;
        that.$refs[formName].resetFields();
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
      },

      /**  第二步：商品上传图片     */
      async submitUploadImgForm(){
        var that = this
        // 上传轮播图
        if(that.uploadForm.fileLists.length >= 1){
          that.uploadForm.fileLists.forEach(async function(item,index){
            let fd = new FormData()
            fd.append('file',item.raw)
            const { data } = await that.$http.post('upload/img', fd);
            let params = Object.assign({}, {
                commodityId: that.$data.commodityNew.id,
                imagePath: data.data.url,
                sort: index
            })
            await that.$http.post('createTeaGoodsImg', params);
            that.$message({
              type: 'success',
              message: '上传成功'
            })
          })
        }
        
        // 上传商品简介图
        if(that.uploadForm.introduceImg || that.uploadForm.specificationsImg){
          let introduceData = {data:{data:{url:''}}};
          if(that.uploadForm.introduceImg){
            let fd1 = new FormData()
            fd1.append('file', that.uploadForm.introduceImg)
            introduceData = await that.$http.post('upload/img', fd1);
          }
          let specificationsData = {data:{data:{url:''}}};
          if(that.uploadForm.specificationsImg){
            // 上传商品规格图
            let fd2 = new FormData()
            fd2.append('file', that.uploadForm.specificationsImg)
            specificationsData = await that.$http.post('upload/img', fd2);
          }
          let params = Object.assign({}, {
              id: that.$data.commodityNew.id,
              introduce: introduceData.data.data.url,
              specifications: specificationsData.data.data.url
          })
          await that.$http.post('updateTeaGoods', params);
          that.$message({
            type: 'success',
            message: '上传成功'
          })
        }
        // 操作下一步
        that.$data.stepsActive = 2
      },

      // 验证 商品主图
      changeGoodsPicture(file, fileList){
        var that = this;
        var testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
        const extension = testmsg === 'jpeg'
        const extension2 = testmsg === 'jpg'
        const extension3 = testmsg === 'png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if(!isLt2M){
          that.$message({
            type: 'warning',
            message: '文件大小请限制在2M以内'
          })
          return
        }
        if(!extension && !extension2 && !extension3) {
          that.$message({
            message: '上传文件只能是 jpeg、jpg、png格式!',
            type: 'warning'
          })
          return
        }
        that.uploadForm.fileLists.push(file)
        that.hideUploadEdit = that.uploadForm.fileLists.length >= 5
        return (extension || extension2 || extension3) && isLt2M;
      },
      // 验证 商品简介图
      changeIntroduceImg(file, fileList){
        var that = this;
        var testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
        const extension = testmsg === 'jpeg'
        const extension2 = testmsg === 'jpg'
        const extension3 = testmsg === 'png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if(!isLt2M){
          that.$message({
            type: 'warning',
            message: '文件大小请限制在2M以内'
          })
          return
        }
        if(!extension && !extension2 && !extension3) {
          that.$message({
            message: '上传文件只能是 jpeg、jpg、png格式!',
            type: 'warning'
          })
          return
        }
        that.uploadForm.introduceImg = file.raw
        return (extension || extension2 || extension3)  && isLt2M;
      },
      // 验证 商品规格图
      changeSpecificationsImg(file, fileList){
        var that = this;
        var testmsg = file.name.substring(file.name.lastIndexOf('.')+1)
        const extension = testmsg === 'jpeg'
        const extension2 = testmsg === 'jpg'
        const extension3 = testmsg === 'png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if(!isLt2M){
          that.$message({
            type: 'warning',
            message: '文件大小请限制在2M以内'
          })
          return
        }
        if(!extension && !extension2 && !extension3) {
          that.$message({
            message: '上传文件只能是 jpeg、jpg、png格式!',
            type: 'warning'
          })
          return
        }
        that.uploadForm.specificationsImg = file.raw
        return (extension || extension2 || extension3) && isLt2M;
      },
      // 删除 商品主图
      removeGoodsPicture(file, fileList) {
        var that = this
        that.uploadForm.fileLists = fileList
        that.hideUploadEdit = that.uploadForm.fileLists.length >= 5
      },
      // 预览 商品主图
      previewGoodsPicture(file) {
        var that = this
        that.dialogImageUrl = file.url;
        that.dialogImgVisible = true;
      },

      /** 第三步：商品预览 */


      // 获取茶系数据列表
      async getCategoryList(){
        let params = Object.assign({}, {name:''});
        const { data } = await this.$http.post('getTeaCategoryList', params);
        this.$data.CategoryData = data.data || []
      },
      // 获取品牌数据列表
      async getSupplierList(){
        let params = Object.assign({}, {name:''});
        const { data } = await this.$http.post('getSupplierList', params);
        this.$data.SupplierData = data.data || []
      },
      // 获取茶类数据列表
      async getTeaTypesList(){
        let params = Object.assign({}, {name:''});
        const { data } = await this.$http.post('getTeaTypesList', params);
        this.$data.TypesData = data.data || []
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