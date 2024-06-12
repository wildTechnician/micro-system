<template>
  <el-popover :teleported="false" :popper-style="{ padding: 0 }" width="auto" trigger="click">
    <template #reference>
      <div class="icon-list">
        <el-avatar :size="22" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        <span class="dropdown-caret"></span>
      </div>
    </template>
    <template #default>
      <component :is="toolsComponentUser" v-once></component>
    </template>
  </el-popover>
</template>

<script lang="ts" setup name="toolsComponentIndex">
import toolsComponentUser from './toolsComponentUser.vue';
</script>

<style lang="scss" scoped>
.tool-container {
  color: var(--el-color-white);
  min-width: 110px;
  font-size: 14px;
  text-align: center;
  margin-right: 0 10px;
}
.icon-list {
  display: flex;
  align-items: center;
  cursor: pointer;
  .dropdown-caret {
    border-bottom-color: #0000;
    border-left-color: #0000;
    border-right-color: #0000;
    border-top-color: var(--el-color-info-light-3);
    border-style: solid;
    border-width: 4px 4px 0px;
    display: inline-block;
    height: 0;
    vertical-align: middle;
    width: 0;
    margin-left: 5px;
  }
}
</style>
