<template>
  <el-config-provider size="default" :locale="zhCn">
    <el-container style="height: 100%">
      <el-aside width="auto">
        <layoutSidebar :menu-list="systemMenus.menu"></layoutSidebar>
      </el-aside>
      <el-container class="container-main">
        <el-header height="auto" class="container-main_header"><layout-tag></layout-tag></el-header>
        <el-main>
          <router-view v-slot="{ Component, route }">
            <template v-if="Component">
              <transition mode="out-in" name="slide-fade">
                <Suspense timeout="0">
                  <div :key="(route.name as string)">
                    <KeepAlive :max="5">
                      <component :is="Component" />
                    </KeepAlive>
                  </div>
                  <template #fallback>
                    <template v-if="uiLoading"><rectangleLoading /></template
                  ></template>
                </Suspense>
              </transition>
            </template>
            <template v-else>
              <errorPage></errorPage>
            </template>
          </router-view>
        </el-main>
        <!-- <layoutFooter></layoutFooter> -->
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script setup lang="ts">
import { layoutSidebar, layoutTag, layoutFooter } from '@packages/utils-common/layout';
import usePermissionStore from '@/store/permission';
import errorPage from '@packages/utils-common/components/Error/errorPage.vue';
import rectangleLoading from '@packages/utils-common/components/Loading/rectangleLoading.vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import { useThrottleRender } from 'element-plus';

const systemMenus = usePermissionStore();
const uiLoading = useThrottleRender(ref(true), 1000);
</script>

<style lang="scss">
.container-main {
  background-color: var(--el-bg-color-page);
  &_header {
    padding: 0 !important;
    box-shadow: var(--el-box-shadow-lighter);
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
