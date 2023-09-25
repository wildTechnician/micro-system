<template>
  <header class="container">
    <el-row align="middle" class="container-row">
      <!-- left -->
      <el-col :span="18">
        <!-- <el-row align="middle">
          <el-col :span="1">
            <el-icon :size="20" class="container-expand">
              <Fold></Fold>
            </el-icon>
          </el-col>
          <el-col :span="23"></el-col>
        </el-row> -->
      </el-col>
      <!-- right -->
      <el-col :span="5" :offset="1">
        <el-row align="middle">
          <el-col :span="4">
            <el-badge value="1">
              <el-icon :size="20" class="container-expand">
                <Bell></Bell>
              </el-icon>
            </el-badge>
          </el-col>
          <el-col :span="20">
            <el-input placeholder="Type something">
              <template #prefix>
                <el-icon :size="16" class="container-expand"><search /></el-icon>
              </template>
            </el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </header>
</template>

<script lang="ts" setup name="layoutHeader">
import { Fold, Expand, Search, Bell } from '@packages/utils-icon/src/elementPlus';
</script>

<style lang="scss" scoped>
@use 'sass:map';

@use './styles/var.scss';
.container {
  width: 100%;
  height: map-get(var.$header, base, height);
  border-bottom: solid 1px var(--el-border-color-lighter);
  background-color: var(--el-bg-color);
  padding: 0 5px;
  &-row {
    height: 100%;
  }
  &-expand {
    cursor: pointer;
    color: var(--el-text-color-primary);
  }
}
</style>
