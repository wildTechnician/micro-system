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
  <el-icon color="#fff" size="22">
    <Search />
  </el-icon>
  <div class="tool-container">
    <p>{{ time.data }}</p>
    <p>{{ time.time }}&nbsp;&nbsp;{{ time.week }}</p>
  </div>
</template>

<script lang="ts" setup name="toolsComponentIndex">
import { Search } from '@packages/utils-icon/src/elementPlus';
import { dateFormatter } from '@packages/utils-common/utils/index';
import toolsComponentUser from './toolsComponentUser.vue';
import { shallowReactive, onUnmounted } from 'vue';

const time = shallowReactive({ data: '', time: '', week: '' });
let handle: any;

const getDate = () => {
  const dataRes: string[] = dateFormatter('YYYY-MM-DD HH:mm:ss w').split(' ');
  time.data = dataRes[0];
  time.time = dataRes[1];
  time.week = dataRes[2];
  handle = setInterval(() => {
    getDate();
  }, 1000);
};

onUnmounted(() => {
  handle && clearInterval(handle);
});

// getDate();
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
  .dropdown-caret {
    border-bottom-color: #0000;
    border-left-color: #0000;
    border-right-color: #0000;
    border-top-color: #fff;
    border-style: solid;
    border-width: 4px 4px 0px;
    display: inline-block;
    height: 0;
    vertical-align: middle;
    width: 0;
  }
}
</style>
