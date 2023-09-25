<template>
  <div class="blockElement-container-content">
    <span class="blockElement-container-content_bg"></span>
    <span class="blockElement-container-content_border"></span>
    <div class="blockElement-container-content_content">
      <slot> </slot>
    </div>
  </div>
</template>

<script setup name="blockElementCenter"></script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../styles/variable.scss' as *;
.blockElement-container-content {
  margin-top: map.get($block, 'margin-top');
  height: 100%;
  &_bg {
    background-color: var(--el-color-primary);
    width: 100%;
    opacity: 0.1;
    position: absolute;
    z-index: 0;
    display: inline;
    height: 100%;
  }
  &_border {
    width: 100%;
    border: solid 0.5px var(--el-color-primary);
    position: absolute;
    z-index: 0;
    height: 100%;
    display: inline;
    opacity: 0.23;
  }
  &_content {
    position: relative;
    padding: map.get($block, 'content-padding');
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &::before {
    content: '';
    position: absolute;
    border: 5px solid transparent;
    border-top: 5px solid var(--el-color-primary);
    top: 5px;
    left: 0px;
    z-index: 2;
    transform: rotate(135deg);
  }
  &::after {
    content: '';
    position: absolute;
    border: 5px solid transparent;
    border-top: 5px solid var(--el-color-primary);
    top: 5px;
    right: 0px;
    z-index: 2;
    transform: rotate(-135deg);
  }
}
</style>
