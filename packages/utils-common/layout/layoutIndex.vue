<template>
  <el-row class="right">
    <layout-sidebar :menu-list="menuList"></layout-sidebar>
    <div class="left">
      <el-row class="tagHeader">
        <layout-header></layout-header>
        <layout-tag></layout-tag>
      </el-row>

      <router-view v-slot="{ Component, route }">
        <transition name="slide-fade" mode="out-in" :appear="true">
          <keep-alive>
            <Suspense>
              <div class="center">
                <component :is="Component" :key="route.fullPath" />
                <layoutFooter></layoutFooter>
              </div>
              <template #fallback>loading....</template>
            </Suspense>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </el-row>
</template>

<script setup lang="ts">
import { layoutSidebar, layoutTag, layoutHeader, layoutFooter } from './index';

defineProps<{ menuList: MenuRoute.Route[] }>();
</script>
<style lang="scss" scoped>
.right {
  height: 100%;
}
.left {
  flex: 1;
  overflow: auto;
}
.center {
  background-color: var(--el-bg-color-page);
  padding: 20px;
  height: 100%;
}
.tagHeader {
  box-shadow: var(--el-box-shadow-lighter);
}
.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  // transform: translateZ(20px);
  opacity: 0;
}
</style>
