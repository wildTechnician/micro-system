<template>
  <div class="iconBlock-container">
    <p class="iconBlock-container-title">
      <component :is="icon"></component>
      <span>{{ title }}</span>
    </p>
    <slot></slot>
  </div>
</template>

<script setup lang="ts" name="iconBlockElement">
import { useIcon } from '@packages/utils-common/hook/useIcon';
type PropsType = {
  icon?: string;
  title?: string;
};

const props = defineProps<PropsType>();

const [icon] = useIcon(props?.icon);
</script>

<style lang="scss" scoped>
@use 'sass:map';
@use '../../styles/variable.scss' as *;
.iconBlock-container-title {
  width: 100%;
  height: map.get($block, 'height');
  line-height: map.get($block, 'height');
  @include textEllipsis;
  svg {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-right: 5px;
    vertical-align: middle;
  }
  span {
    font-size: 14px;
    font-weight: bold;
  }
}
</style>
