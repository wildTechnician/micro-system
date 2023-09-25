<template>
  <button class="noneTrans-selectLayer" title="选择图层">
    <icon></icon>
  </button>
</template>

<script setup lang="ts">
import { getIcon } from '@packages/utils-icon/src/get';

const icon = getIcon('card-two');
</script>
