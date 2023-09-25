<template>
  <el-header class="btn-bar">
    <slot></slot>
    <el-button v-if="$attrs.uploadJson" link @click="emits('uploadJson')"> 导入JSON </el-button>
    <el-button v-if="$attrs.clearable" link @click="emits('clearable')"> 清空 </el-button>
    <el-button v-if="$attrs.preview" link @click="emits('preview')"> 预览 </el-button>
    <el-button v-if="$attrs.generateJson" link @click="emits('generateJson')"> </el-button>
    <el-button v-if="$attrs.generateCode" link @click="emits('generateCode')"> 生成代码 </el-button>
  </el-header>
</template>

<script lang="ts" setup name="CustomHeader">
const emits = defineEmits(['uploadJson', 'clearable', 'preview', 'generateJson', 'generateCode']);
</script>
