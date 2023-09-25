<template>
  <div class="noneTrans-container">
    <!-- <components-logo :expand="isCollapse"></components-logo> -->
    <el-tabs v-model="activeTabPlan" type="card" tab-position="left" class="noneTrans-container-tab">
      <el-tab-pane v-for="(menuListItem, menuListIndex) in menuList" :key="`menuList${menuListIndex}`" :name="menuListItem.name">
        <!-- key -->
        <template #label>
          <div class="noneTrans-container-leftItem">
            <el-icon size="var(--el-font-size-large)">
              <component :is="getIcon(menuListItem.meta?.icon || '')"></component>
            </el-icon>
            <p style="font-size: var(--el-font-size-small); line-height: 2">{{ menuListItem.meta?.title }}</p>
          </div>
        </template>
        <!-- menu -->
        <el-scrollbar v-if="menuListItem?.children && menuListItem?.children.length > 0">
          <el-menu :default-active="currentRouter" :collapse="isCollapse" class="el-menu-vertical-open" @select="changeMenu">
            <componentsMenuItem
              v-for="(menuListChildItem, menuListChildIndex) in menuListItem?.children"
              :key="`menuListChild${menuListChildIndex}`"
              :items="menuListChildItem"
              :tab-plan-name="(menuListItem.name as string)"
            ></componentsMenuItem>
          </el-menu>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>

    <div class="noneTrans-container-bottom">
      <!-- 
        #TODO: 底部未加个人中心
       -->
      <!-- <componentsUser class="noneTrans-container-bottom_user"></componentsUser> -->
      <div class="noneTrans-container-bottom_expand" @click="isCollapse = !isCollapse">
        <el-icon :size="20">
          <component :is="isCollapse ? Expand : Fold"></component>
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="layoutHeader">
import { componentsLogo, componentsUser, componentsMenuItem } from './components/index';
import { Fold, Expand } from '@packages/utils-icon/src/elementPlus';
import { getIcon } from '@packages/utils-icon/src/get';
import { computed, shallowRef, provide, shallowReactive } from 'vue';
import { useRouter } from 'vue-router';
import { isEmpty, isMonorepo, getWindows } from '../utils';

const props = defineProps<{ menuList: MenuRoute.Route[] }>();
const isCollapse = shallowRef<boolean>(false);
const router = useRouter();
const win = getWindows();
const currentRouter = computed(() => router.currentRoute.value.path || '');
const subMenuIndex = shallowReactive<{ [key: string]: string[] }>({});
const activeTabPlan = computed(() => {
  for (let i in subMenuIndex) {
    if (subMenuIndex[i].includes(currentRouter.value)) return i;
  }
  return isEmpty(props.menuList) ? undefined : props.menuList[0].name;
});

const changeMenu = (index: string) => {
  /**
   * #TODO:父应用传下来的props应该统一管理
   */
  isMonorepo ? win.$wujie.props?.jumpTo(index) : router.push({ path: index });
};

// provide
{
  const addSubMenuIndex = (item: MenuRoute.Route, superName: string) => {
    if (!(superName in subMenuIndex)) subMenuIndex[superName] = [];
    subMenuIndex[superName]?.push(item.path);
  };
  provide('layoutSidebar', { addSubMenuIndex });
}
</script>

<style lang="scss" scoped>
@use 'sass:map';

@use './styles/var.scss';

.noneTrans-container {
  background-color: var(--el-bg-color);
  box-shadow: var(--el-box-shadow-light);
  height: 100%;
  &-tab {
    height: calc(100% - map-get(var.$sideBar, user, height));
  }
  &-bottom {
    display: flex;
    flex-wrap: nowrap;
    color: var(--el-text-color-primary);
    &_user {
      width: map-get(var.$sideBar, base, keyWidth);
      height: map-get(var.$sideBar, user, height);
    }
    &_expand {
      // width: calc(100% - map-get(var.$sideBar, base, keyWidth));
      width: 100%;
      cursor: pointer;
      border-top: solid 1px var(--el-border-color);
      margin-top: -1px;
      line-height: map-get(var.$sideBar, user, height);
      text-align: center;
      background-color: var(--el-bg-color);
      &:hover {
        background-color: var(--el-bg-color-page);
      }
    }
  }

  &-leftItem {
    padding: 10px 0;
    width: map-get(var.$sideBar, base, keyWidth);
    text-align: center;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    i {
      display: block;
      width: 100%;
      text-align: center;
      font-weight: bold;
    }
    p {
      @include textEllipsis();
    }
  }

  //menu
  :deep(.el-menu) {
    border: none;
    background-color: transparent;
  }
  .el-menu-vertical-open:not(.el-menu--collapse) {
    width: map-get(var.$sideBar, base, menuWidth);
  }

  :deep(.el-tabs__header) {
    margin-right: 1px;
  }
  // tab nav
  :deep(.el-tabs__nav-wrap) {
    border-right: var(--el-border);
    .el-tabs__nav {
      background: transparent;
      border: none !important;
      color: var(--el-text-color-primary);
      .el-tabs__item {
        color: var(--el-text-color-regular);
      }
      .el-tabs__item,
      .is-active {
        height: auto;
        padding: 0;
        border: none !important;
      }
      .is-active {
        background-color: var(--el-color-primary);
        color: var(--el-color-white);
      }
    }
  }
}
</style>
