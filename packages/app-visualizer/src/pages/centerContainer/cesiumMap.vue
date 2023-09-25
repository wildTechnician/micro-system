<template>
  <div class="cesium-container">
    <div class="cesium-container_map">
      <blockElementCenter>
        <cesiumView></cesiumView>
      </blockElementCenter>
    </div>
    <div class="cesium-container_type">
      <div class="cesium-container_type-polygon"></div>
      <div class="cesium-container_type-fn"></div>
    </div>
  </div>
</template>

<script lang="ts" setup name="mapContainer">
import { cesiumView } from '@packages/utils-cesium/src/index';
import { blockElementCenter } from '@/components/index';
</script>

<style lang="scss" scoped>
.cesium-container {
  &_map {
    min-height: 450px;
    height: tovh(450);
    position: relative;
  }
  &_type {
    height: 40px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    &-fn {
      height: 100%;
      width: 30%;
      background-color: var(--el-color-primary);
      opacity: 0.1;
    }
    &-polygon {
      height: 100%;
      width: 50px;
      background-color: var(--el-color-primary);
      opacity: 0.1;
      clip-path: polygon(100% 0px, 0px 0px, 500% 500%);
    }
  }
}
</style>
