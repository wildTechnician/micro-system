<template>
  <el-row class="header" align="middle" tag="header">
    <el-col :span="4" class="header-left">
      <a href="/">
        <img src="../../assets/images/logo.png" />
        <span> {{ appTitle }}</span>
      </a>
    </el-col>
    <el-col :span="19" class="header-content">
      <div class="header-content-container">
        <header-component-menu></header-component-menu>
      </div>
    </el-col>
    <el-col :span="1" class="header-right">
      <header-component-tools></header-component-tools>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup name="headerComponent">
import headerComponentTools from './toolsComponent/toolsComponentIndex.vue';
import headerComponentMenu from './menuComponent/headerComponentMenu.vue';

const appTitle = import.meta.env.VITE_APP_TITLE;
</script>

<style lang="scss" scoped>
.header {
  height: tovh(80);
  min-height: $core-height;
  min-width: 1080px;
  padding: 0 var(--el-component-size);
  border-bottom: var(--el-border);
  &-left {
    font-size: 28px;
    font-weight: var(--el-font-weight-primary);
    @include textEllipsis();
    a {
      color: var(--el-text-color-primary);
    }
    img {
      height: tovh(50);
      min-height: $core-height - 30;
      border-style: none;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
  &-content {
    height: 100% !important;
  }
  &-right {
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
