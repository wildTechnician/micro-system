<template>
  <el-row class="container" justify="space-between">
    <el-col :span="6" style="height: 100%">
      <div class="container-itemAlign">
        <suspense>
          <component :is="leftContainerVal" v-for="leftContainerVal in leftContainer" :key="leftContainerVal.name"></component>
        </suspense>
      </div>
    </el-col>
    <el-col :span="12" style="height: 100%">
      <div class="container-itemAlign">
        <suspense>
          <component :is="centerContainerVal" v-for="centerContainerVal in centerContainer" :key="centerContainerVal.name"></component>
        </suspense>
      </div>
    </el-col>
    <el-col :span="5" style="height: 100%">
      <div class="container-itemAlign">
        <suspense>
          <component :is="rightContainerVal" v-for="rightContainerVal in rightContainer" :key="rightContainerVal.name"></component>
        </suspense>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup name="Dashboard">
import * as leftContainer from './leftContainer';
import * as rightContainer from './rightContainer';
import * as centerContainer from './centerContainer';
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  padding: tovh(50) tovw(35);
  @include loadImage('/bg.jpg') {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  &-itemAlign {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    align-content: space-between;
    & > div {
      width: 100%;
    }
  }
}
</style>
