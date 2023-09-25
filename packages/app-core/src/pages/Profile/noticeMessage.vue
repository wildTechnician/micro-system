<template>
  <el-divider content-position="left">公告</el-divider>
  <section v-if="showContent">
    <el-row class="content-back">
      <el-button link type="primary" :icon="Back" @click.stop="showContent = false"> 返回</el-button>
    </el-row>
    <h1>测试文案内容</h1>
  </section>
  <div v-else>
    <el-row>
      <el-col :span="2" :push="22"> <el-button link type="primary" :icon="MuteNotification">清除未读</el-button></el-col>
    </el-row>
    <div v-for="messageItems in 10" :key="messageItems" class="container-item" @click.stop="showContent = true">
      <el-row align="middle">
        <el-col :span="24">
          <span class="redCircle"></span>
          <el-text tag="b">测试文案{{ messageItems }}</el-text>
          <el-text type="info" size="small">2023-05-19</el-text>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup name="noticeMessage" lang="ts">
import { MuteNotification, Back } from '@packages/utils-icon/src/elementPlus';
const showContent = shallowRef<boolean>(false);
</script>

<style lang="scss" scoped>
.container-item {
  border-bottom: solid 1px #f2f2f2;
  padding: 10px 0;
  cursor: pointer;
  &:hover {
    background-color: var(--el-bg-color-page);
  }
}
b {
  margin-right: 15px;
}
.content-back {
  padding-bottom: 20px;
}
.redCircle {
  display: inline-block;
  height: 4px;
  width: 4px;
  margin-right: 3px;
  vertical-align: middle;
  background-color: var(--el-color-danger);
  border-radius: 100%;
}
</style>
