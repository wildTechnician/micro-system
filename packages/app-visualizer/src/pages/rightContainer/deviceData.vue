<template>
  <block-element title="设备数据">
    <div class="deviceContainer">
      <div class="deviceContainer-display">
        <el-scrollbar style="padding: 0 25px">
          <el-progress v-for="item in 10" :key="`dede3ef${item}`" :percentage="50" style="margin: 15px 0">
            <span style="color: #fff">10/9</span>
          </el-progress>
        </el-scrollbar>
      </div>
      <div class="deviceContainer-legend">
        <div class="legend">
          <i style="background-color: red"></i>
          <span>离线</span>
        </div>
        <div class="legend">
          <i style="background-color: var(--el-color-primary)"></i>
          <span>在线</span>
        </div>
      </div>
    </div>
  </block-element>
</template>

<script setup lang="ts" name="deviceData">
import { blockElement } from '@/components';
</script>

<style lang="scss" scoped>
.deviceContainer {
  height: tovh(200);
  min-height: 200px;
  &-display {
    height: 90%;
  }
  &-legend {
    height: 10%;
    display: flex;
    justify-content: flex-end;
  }
  .legend {
    height: 100%;
    display: flex;
    font-size: 12px;
    align-items: center;
    margin: 0 5px;
    i {
      height: 10px;
      width: 10px;
      margin: 0 3px;
      border-radius: 100%;
    }
  }
}
</style>
