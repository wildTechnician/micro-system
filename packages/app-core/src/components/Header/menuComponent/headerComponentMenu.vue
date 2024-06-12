<template>
  <el-menu mode="horizontal" class="menuStyle" :default-active="routerDefaultActive" menu-trigger="click" @select="changeMenu">
    <componentsMenuItem v-for="(ItemData, ItemIndex) in usePermission.allRouters" :key="`ItemData${ItemIndex}`" :items="ItemData"></componentsMenuItem>
  </el-menu>
</template>

<script lang="ts" setup name="headerComponentMenu">
import usePermissionStore from '../../../store/permission';
import { componentsMenuItem } from '@packages/utils-common/layout/components';
import { shallowRef } from 'vue';
import { useStorage } from '@packages/utils-common/hook';
import { Essential, MenuType } from '@packages/utils-common/enum';
import { useRouter } from 'vue-router';
import { loopSearchMenu } from '@packages/utils-common/utils';

const usePermission = usePermissionStore();
const router = useRouter();
const routerDefaultActive = shallowRef<string>();
const { set: setCurrentChildHost } = useStorage(sessionStorage);

// 点击跳转
function changeMenu(index: string, indexPath: string[]) {
  let routerParams: string = '';
  let hasChildSystem: boolean = false;

  const resMenu = loopSearchMenu(usePermission.allRouters, 0, (item, depth) => {
    if (item.path == indexPath[depth as number]) {
      if (item.meta.type == MenuType.SYSTEM) hasChildSystem = true;
      return true;
    }
    return false;
  });

  // 应用内点击
  if (!hasChildSystem) {
    router.push({ path: index });
    return;
  }

  // 切换子应用
  if (resMenu.length <= 0) return;
  else if (usePermission.getDefaultRouter.path !== resMenu[0].path) {
    for (let i = 1; i < resMenu.length; i++) {
      routerParams += resMenu[i].path;
    }
    // 缓存当前子应用域名地址。当页面刷新后直接跳转当前子系统
    setCurrentChildHost(Essential.CURRENT_SYSTEM_HOST, { path: resMenu[0].path, name: resMenu[0].name });
    usePermission.childrenRouters = resMenu;
    usePermission.defaultRouter = { ...resMenu[0], path: resMenu[0].path + routerParams || '/' };
    router.push({ name: `wujieVue`, params: { path: routerParams || '/' } });
  }
}
</script>

<style lang="scss" scoped>
.menu-container,
.el-menu {
  background: none !important;
  height: 100%;
}

.el-menu--horizontal.el-menu {
  border: none;
}
</style>
