<template>
  <main class="container">
    <div>
      <div>
        <forbidden style="max-width: 300px; max-height: 300px"></forbidden>
      </div>
      <p class="container_title"></p>
      <el-text tag="p" size="large"></el-text>
    </div>
  </main>
</template>

<script setup lang="ts" name="forbiddenPage">
import forbidden from '@packages/utils-icon/components/403-v2.vue';
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
