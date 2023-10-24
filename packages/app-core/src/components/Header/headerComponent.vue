<template>
  <header class="header" :style="{ background: props.transparent ? '#000' : 'linear-gradient(261deg, #08271f 0%, #000000 62%, #093041 100%)' }">
    <el-row class="header-container" align="middle">
      <el-col :span="8" class="header-left">
        <a href="/">{{ appTitle }}</a>
      </el-col>
      <el-col :span="13" class="header-content">
        <div class="header-content-bg"></div>
        <div class="header-content-container">
          <header-component-menu></header-component-menu>
        </div>
      </el-col>
      <el-col :span="3" class="header-right">
        <header-component-tools></header-component-tools>
      </el-col>
    </el-row>
  </header>
</template>

<script lang="ts" setup name="headerComponent">
import headerComponentTools from './toolsComponent/toolsComponentIndex.vue';
import headerComponentMenu from './menuComponent/headerComponentMenu.vue';

const appTitle = import.meta.env.VITE_APP_TITLE;
const props = defineProps<{
  transparent: boolean;
}>();
</script>

<style lang="scss" scoped>
a {
  color: var(--el-color-white);
}
.header {
  height: tovh(80);
  min-height: $core-height;
  min-width: 1080px;
  &-container {
    background-repeat: no-repeat;
    background-position: tovw(-570) tovh(10);
    background-size: 93%;
    height: 100% !important;
  }
  &-left {
    align-self: inherit;
    letter-spacing: 8px;
    font-size: 30px;
    text-align: center;
    color: var(--el-color-white);
    @include textEllipsis();
  }
  &-content {
    height: 100% !important;
    align-self: baseline;
    position: relative;
    & > div {
      height: 40px;
      width: 100%;
    }
    &-bg {
      position: absolute;
      transform: skewX(-40deg);
      bottom: 0;
      background: linear-gradient(180deg, var(--el-color-black) 0%, var(--el-color-primary) 100%);
    }
    &-container {
      padding: 0 25px;
      position: absolute;
      bottom: 0;
    }
  }
  &-right {
    align-self: baseline;
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
