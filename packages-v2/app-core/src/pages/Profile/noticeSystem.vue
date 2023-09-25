<template>
  <el-divider content-position="left">通知</el-divider>
  <div v-for="messageItems in 10" :key="messageItems" class="container-item">
    <el-text tag="b">测试文案{{ messageItems }}</el-text>
    <el-text type="info" size="small">2023-05-19</el-text>
  </div>
</template>

<script setup name="noticeSystem" lang="ts"></script>

<style lang="scss" scoped>
.container-item {
  border-bottom: solid 1px #f2f2f2;
  padding: 10px 0;
}
b {
  margin-right: 15px;
}
</style>
