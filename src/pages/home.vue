
<template>
  <div class="home">
    <el-card style="max-width: 480px">
      <template #header>
        <div class="card-header">
          <span>Card name</span>
        </div>
      </template>
      <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
      <template #footer>Footer content</template>
    </el-card>
  </div>
</template>

<script setup>
import { useRouter} from 'vue-router';
const router = useRouter();


</script>


<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
}
</style>
