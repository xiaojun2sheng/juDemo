
<template>
  <div class="home_page">
    <div class="home_box">
      <el-card header="上传图片" class="upload_box">
        <el-upload
          drag
          multiple
          :multiple="false"
          :before-upload="beforeUpload"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            <em>上传要识别的图片</em>
          </div>
        </el-upload>
      </el-card>
      <br/>
      <el-card header="识别结果" v-show="resData.imageUrl" v-loading="uploadLoading">
        <div class="res_box">
          <el-image :src="resData.imageUrl" class="res_box_img" fit="cover">
          </el-image>
          <el-card class="res_box_text">
            <el-table :data="resData.list" style="width: 100%">
              <el-table-column prop="name" label="名称" width="180" />
              <el-table-column prop="number" label="数量" width="180" />
            </el-table>
          </el-card>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { onMounted, ref} from 'vue'
import { uploadImgIdentifyApi } from '@/api/index.js'

let uploadLoading = ref(false) 
let resData = ref({
  imageUrl: '',
  list: []
})

let uplaodImgFile = ref()
const beforeUpload = async (file) => {
  uploadLoading.value = true
  uplaodImgFile.value = fileToImgSrc(file)
  let formdata = new FormData()
  formdata.append('file', file)
  let res = await uploadImgIdentifyApi({
    data: formdata,
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
      }
  })
  uploadLoading.value = false
  resData.value = res
  resData.value.imageUrl = 'https://dangln.site' + res.imageUrl
}


const fileToImgSrc = (file) => {
  var url = URL.createObjectURL(file);
  return url
}

</script>


<style scoped lang="less">
.home_page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .home_box {
    width: 70%;
    .upload_box {
      max-height: 300px;
      .upload_box_img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .res_box {
      display: flex;
      justify-content: space-between;
      max-height: 400px;
      .res_box_img {
        width: calc(50% - 8px);
        border-radius: 6px;
      }
      .res_box_text {
        width: calc(50% - 8px);
      }
    }
  }
}
</style>
