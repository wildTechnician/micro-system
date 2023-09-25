<template>
  <div class="main">
    <h1>ElementPlus Icon</h1>
    <ul class="container">
      <li v-for="(ElementPlusIconItem, ElementPlusIconIndex) in ElementPlusIcon" :key="`ElementPlusIcon${ElementPlusIconIndex}`">
        <p>
          <el-icon size="18">
            <component :is="ElementPlusIconIndex"></component>
          </el-icon>
        </p>
        <p>{{ ElementPlusIconIndex }}</p>
      </li>
    </ul>
    <h1>Preset Icon</h1>
    <ul class="container">
      <li v-for="(presetIconsItem, presetIconsIndex) in presetIcons" :key="`presetIcons${presetIconsIndex}`">
        <p>
          <el-icon size="18">
            <component :is="presetIconsIndex"></component>
          </el-icon>
        </p>
        <p>{{ presetIconsIndex }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import * as presetIcon from './index';
import * as ElementPlus from './elementPlus';
import { Component, defineComponent } from 'vue';

const ElementPlusIcon: { [key: string]: Component } = {};
const presetIcons: { [key: string]: Component } = {};
for (const [key, component] of Object.entries(ElementPlus)) {
  ElementPlusIcon[key] = component;
}
for (const [key, component] of Object.entries(presetIcon)) {
  presetIcons[key] = component;
}
export default defineComponent({
  components: { ...ElementPlusIcon, ...presetIcons },
  data() {
    return {
      ElementPlusIcon,
      presetIcons,
    };
  },
});
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  overflow: auto;
  h1 {
    color: #000;
    text-align: center;
    background-color: #fff;
    padding: 1rem 0;
  }
  .container {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    // margin: 1rem;
    border-left: solid 1px #dcdfe6;
    border-top: solid 1px #dcdfe6;
    background-color: #fff;

    li {
      height: 70px;
      text-align: center;
      padding: 10px;
      border-right: solid 1px #dcdfe6;
      border-bottom: solid 1px #dcdfe6;

      color: #000;
      font-size: 14px;
    }
  }
}
</style>
