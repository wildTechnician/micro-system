<template>
  <a href="#">
    <el-row class="container" align="middle">
      <el-col class="container-img" :span="6">
        <img :src="LOGO" alt="XJ Admin System" />
      </el-col>
      <el-col :span="0" class="container-title">
        <p>XJ Admin System</p>
      </el-col>
    </el-row>
  </a>
</template>

<script lang="ts" setup name="componentsLogo">
import LOGO from '../../assets/images/logo.png';
type PropsType = {
  expand: boolean;
};
const props = defineProps<PropsType>();
</script>

<style lang="scss" scoped>
@use 'sass:map';

@use '../styles/var.scss';
.container {
  height: map-get(var.$header, base, height);
  padding: 15px 0;
  border-bottom: solid 1px var(--el-border-color-lighter);
  overflow: hidden;
  &-img {
    height: 100%;
    display: block;
    text-align: center;
    img {
      height: 100%;
    }
  }
  &-title {
    font-size: var(--el-font-size-large);
    font-weight: 400;
    flex: 1;
    color: var(--el-text-color-primary);
  }
}
</style>
