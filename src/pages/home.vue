
<template>
  <div class="home_page">
    <div class="home_box">
      <el-card header="上传图片" class="upload_box">
        <div class="upload_box_content">
          <el-upload
            multiple
            :multiple="false"
            :before-upload="beforeUpload"
          >
            <el-button type="primary" :icon="UploadFilled">上传要识别的图片</el-button>
          </el-upload>
          <div class="point_desc">精准度调整{{ score }}%</div>
          <!-- <el-progress :percentage="score" color="#1989fa" /> -->
          <el-button-group>
            <el-button :icon="Minus" @click="decrease" />
            <el-button :icon="Plus" @click="increase" />
          </el-button-group>
        </div>
        <div class="config_box">
        </div>
      </el-card>
      <br/>
      <el-card header="识别结果" v-show="resData.imageUrl" v-loading="uploadLoading">
        <div class="res_box">
          <el-image :src="uplaodImgFile" :preview-src-list="[uplaodImgFile]" class="res_box_img" fit="cover">
          </el-image>
          <el-image :src="resData.imageUrl" :preview-src-list="[resData.imageUrl]" class="res_box_img" fit="cover">
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
import { UploadFilled, Minus, Plus } from '@element-plus/icons-vue'
import { onMounted, ref} from 'vue'
import { uploadImgIdentifyApi } from '@/api/index.js'

let uploadLoading = ref(false) 
let resData = ref({
  imageUrl: '',
  list: []
})

// 上传的图片
let uplaodImgFile = ref()
// 判定的分数，用户识别高于这个分数的图片
let score = ref(60)

const increase = () => {
  score.value += 10
  if (score.value > 100) {
    score.value = 100
  }
}
const decrease = () => {
  score.value -= 10
  if (score.value < 0) {
    score.value = 0
  }
}

const beforeUpload = async (file) => {
  uploadLoading.value = true
  uplaodImgFile.value = fileToImgSrc(file)
  let formdata = new FormData()
  formdata.append('file', file)
  formdata.append('score', score.value/10)
  let res = await uploadImgIdentifyApi({
    data: formdata,
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
      }
  })
  uploadLoading.value = false
  resData.value = res
  resData.value.imageUrl = 'http://111.229.47.63' + res.imageUrl
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
  overflow: scroll;
  margin: 20px 0;
  .home_box {
    width: 70%;
    .upload_box {
      max-height: 300px;
      .upload_box_content {
        width: 100%;
        height: 20px;
        display: flex;
        font-size: 14px;
        align-items: center;
        .point_desc {
          margin-left: 20px;
        }
      }
      // .upload_box_img {
      //   max-width: 100%;
      //   max-height: 100%;
      // }
    }
    .res_box {
      display: flex;
      justify-content: space-between;
      max-height: 400px;
      overflow: auto;
      .res_box_img {
        width: calc(50% - 8px);
        border-radius: 6px;
        margin-right: 8px;
      }
      .res_box_text {
        width: calc(50% - 8px);
        overflow: scroll;
      }
    }
  }
}
</style>
