<template>
  <main class="container">
    <div>
      <div>
        <netWork style="max-width: 300px; max-height: 300px"></netWork>
      </div>
      <p class="container_title">似乎遇到一些问题...</p>
      <el-text tag="p" size="large"></el-text>
    </div>
  </main>
</template>

<script setup lang="ts" name="errorNetwork">
import netWork from '@packages/utils-icon/components/404.vue';
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
}
.container_title {
  font-size: 28px;
  margin: 50px 0 20px 0;
}
</style>
