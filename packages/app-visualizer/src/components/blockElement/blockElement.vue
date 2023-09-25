<template>
  <div class="blockElement-container">
    <p class="blockElement-container-title">
      <slot name="header">
        <span v-if="props.icon" class="blockElement-container-title_icon">
          <component :is="icon"></component>
        </span>
        <span>{{ title }}</span>
      </slot>
    </p>
    <div style="position: relative">
      <blockElementCenter>
        <slot></slot>
      </blockElementCenter>
    </div>
  </div>
</template>
<script setup lang="ts" name="blockElement">
import { useIcon } from '@packages/utils-common/hook';
import blockElementCenter from './blockElementCenter.vue';

type PropsType = {
  title?: string;
  icon?: string;
};

const props = defineProps<PropsType>();

const [icon] = useIcon(props.icon);
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../styles/variable.scss' as *;

.blockElement-container {
  color: var(--el-color-white);
  position: relative;
  &-title {
    height: map.get($block, 'height');
    line-height: 26px;
    font-size: 16px;
    font-weight: var(--el-font-weight-primary);
    &_icon {
      vertical-align: middle;
      display: inline-block;
      text-align: center;
      margin-right: 5px;
      svg {
        width: var(--el-font-size-base);
        height: var(--el-font-size-base);
      }
    }
    @include textEllipsis;
    @include loadImage('/area.png') {
      background-repeat: no-repeat;
      background-position: -60px 33.3%;
      background-clip: border-box;
      padding-left: 40px;
      background-size: 1920px;
    }
  }
}
</style>
