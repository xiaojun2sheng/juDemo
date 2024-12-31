
<template>
  <div class="home_page">
    <div class="home_box">
      <el-button @click="testGet">测试test</el-button>
      <el-button @click="testPost">测试Post</el-button>
      <el-card header="上传图片">
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
      <el-card header="识别结果">
        <div class="res_box">
          <el-image :src="resData.imgUrl" class="res_box_img">
          </el-image>
          <el-card class="res_box_text">
            <el-table :data="resData.data" style="width: 100%">
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
import { testApi, testPostApi } from '@/api/index.js'

onMounted(() => {
})

const beforeUpload = async (file) => {
  let formdata = new FormData()
  formdata.append('file', file)
  const res = await testPostApi({
    data: formdata,
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8',
      }
  })
}

const testGet = async () => {
  const res = await testApi({
    params: {
      name: '张三'
    }
  })
}

const testPost = async () => {
  const res = await testPostApi({
    data: {
      name: '张三'
    }
  })
}



let resData = ref({
  imgUrl: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
  data: [
    {
      name: '煊赫门',
      number: '2'
    },
    {
      name: '云烟',
      number: '4'
    }
  ]
})

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
    .res_box {
      display: flex;
      justify-content: space-between;
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
