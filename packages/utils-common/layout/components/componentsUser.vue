<template>
  <el-row justify="center" align="middle" class="container">
    <el-avatar :size="26" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">
      <span class="container-imgName">admin</span>
    </el-avatar>
    <!-- <span class="container-name">系统管理员</span> -->
  </el-row>
</template>

<style lang="scss" scoped>
.container {
  text-align: center;
  cursor: pointer;
  &-imgName {
    font-size: var(--el-font-size-small);
  }
  &-name {
    @include textEllipsis();
    font-size: var(--el-font-size-extra-small);
    // font-weight: var(--el-font-weight-primary);
    color: var(--el-text-color-regular);
  }
}
</style>
