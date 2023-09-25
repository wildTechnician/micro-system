<template>
  <wujie-vue
    :url="currentApp.path"
    :name="currentApp.name"
    :sync="false"
    class="wujieContainer"
    :props="propsData"
    :load-error="errorPage"
    :exec="true"
    :plugins="[
      EventTargetPlugin(),
      InstanceofPlugin(),
      {
        jsIgnores: [/\S*cesium\S*\.js/i],
        cssIgnores: [/\S*cesium\S*\.css/i],
      },
    ]"
  ></wujie-vue>
</template>

<script lang="ts" setup name="Wujie">
import WujieVue from '@packages/utils-common/components/Monorepo/WujieVue.vue';
import { EventTargetPlugin, InstanceofPlugin } from '@packages/utils-common/components/Monorepo/WujiePloyfill';
import { useMonorepo } from './useMonorepo';
import { useRouter } from 'vue-router';

const { propsData, currentApp } = useMonorepo(WujieVue);
const router = useRouter();
const errorPage = () => {
  router.push({ path: '/404' });
};
</script>

<style lang="scss">
.wujieContainer {
  height: calc(100% - tovh(80));
  width: 100%;
  min-height: calc(100% - $core-height);
}
</style>
