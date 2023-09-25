<template>
  <footer class="container">
    <div class="left">
      <!-- item -->
      <div class="left-item">
        <el-dropdown :trigger="'click'" :teleported="false">
          <span class="el-dropdown-link">
            布局
            <el-icon>
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>紧促</el-dropdown-item>
              <el-dropdown-item>默认</el-dropdown-item>
              <el-dropdown-item>夸大</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="right">
      <div class="right-item">
        <span>当前版本: <el-button link type="primary">2.0.0 beta20230815</el-button></span>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup name="layoutFooter">
import { ArrowDown } from '@packages/utils-icon/src/elementPlus';
</script>

<style lang="scss" scoped>
@use 'sass:map';

@use './styles/var.scss';

.container {
  height: map-get(var.$footer, base, height);
  border-top: solid 1px var(--el-border-color);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left,
.right {
  &-item {
    margin: 0 10px;
    font-size: var(--el-font-size-small);
    color: var(--el-text-color-regular);
  }
}
</style>
