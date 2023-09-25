<template>
  <el-scrollbar class="noneTrans-container" @click.right.prevent="onClick">
    <div class="noneTrans-tags-view-container">
      <div
        v-for="(tagListItem, tagListIndex) in tagList"
        :key="`tagList${tagListIndex as string}`"
        :class="['noneTrans-tags-view-item', router.currentRoute.value.name == tagListIndex ? 'active' : '']"
        @mouseenter.prevent="currentHover = tagListIndex"
        @mouseleave.prevent="currentHover = ''"
      >
        <div @click="toPath((tagListItem as ITagList)?.path)">
          <span>{{ (tagListItem as ITagList)?.meta?.title }}</span>
          <el-icon
            v-if="(currentHover == tagListIndex || router.currentRoute.value.name == tagListIndex) && router.options.routes[0].name !== tagListIndex"
            @click.prevent.stop="deleteMenu(tagListIndex as string)"
          >
            <Close></Close>
          </el-icon>
        </div>
      </div>
    </div>
  </el-scrollbar>

  <!-- <el-dropdown trigger="click">
    <span class="dropdown-container">
      <el-icon size="20px">
        <Menu />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>重新加载</el-dropdown-item>
        <el-dropdown-item divided>关闭当前</el-dropdown-item>
        <el-dropdown-item>关闭全部</el-dropdown-item>
        <el-dropdown-item>关闭其他</el-dropdown-item>
        <el-dropdown-item divided>全屏</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown> -->
</template>

<script lang="ts" setup name="layoutTag">
import { Close } from '@packages/utils-icon/src/elementPlus';
import { shallowReactive, shallowRef, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { isMonorepo, getWindows } from '../utils';

import type { RouteLocationNormalizedLoaded, RouteRecordNormalized, RouteRecordRaw } from 'vue-router';

type ITagList = Pick<RouteLocationNormalizedLoaded | RouteRecordNormalized | RouteRecordRaw, 'path' | 'meta' | 'name'>;

const router = useRouter();
const route = useRoute();
const tagList = shallowReactive<{ [key: string]: ITagList }>({});
const currentHover = shallowRef<string | number | symbol>();
const defaultRouter = router.getRoutes()[0];
const currentRoute = shallowRef<ITagList>();
const win = getWindows();
tagList[defaultRouter.name as string] = defaultRouter;

const onClick = (e: Event) => {};

// 关闭当前
const deleteMenu = async (key: string) => {
  const allTagKey: string[] = Object.keys(tagList);
  const tagDelIndex: number = allTagKey.indexOf(key);

  if (tagDelIndex < 0) return;

  await allTagKey.map(async (item, index) => {
    if (index == tagDelIndex - 1) {
      delete tagList[key];
      if (currentRoute.value?.name == tagList[item].name) return;
      toPath(tagList[item].path);
    }
  });
};

const toPath = (path: string) => {
  /**
   * #TODO:父应用传下来的props应该统一管理
   */
  isMonorepo ? win.$wujie.props?.jumpTo(path) : router.push({ path });
};

watch(
  () => route.fullPath,
  () => {
    const { name } = route;
    if (name && !tagList[name as string]) {
      tagList[name as string] = router.currentRoute.value;
    }
    currentRoute.value = router.currentRoute.value;
  }
);
</script>

<style lang="scss" scoped>
@use 'sass:map';

@use './styles/var.scss';
.noneTrans-container {
  width: 100%;
  background-color: var(--el-bg-color);
}
.noneTrans-tags-view-container {
  height: map-get(var.$tag, base, height);
  display: flex;
  .noneTrans-tags-view-item {
    cursor: pointer;
    height: 87%;
    position: relative;
    color: var(--el-text-color-primary);
    padding: 0 10px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    font-size: var(--el-font-size-base);
    margin-left: 5px;
    margin-top: 5px;
    border-radius: 10px 10px 0px 0px;
    transition: padding var(--el-transition-duration) var(--el-transition-function-ease-in-out-bezier);
    i {
      vertical-align: middle;
      align-self: center;
      color: var(--el-text-color-primary);
      margin-left: 5px;
      &:hover {
        background: var(--el-text-color-disabled);
        border-radius: 50%;
      }
    }
    a > span {
      color: var(--el-text-color-primary);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 100px;
      @include textEllipsis();
    }

    &::before {
      left: -20px;
      clip-path: inset(50% -10px 0 50%);
    }
    &::after {
      right: -20px;
      clip-path: inset(50% 50% 0 -10px);
    }

    &::before,
    &::after {
      position: absolute;
      bottom: 0;
      content: '';
      width: 20px;
      height: 20px;
      border-radius: 100%;
      z-index: 1;
    }

    &:hover {
      padding: 0 20px;
      background-color: var(--el-color-primary-light-9);
      &::after,
      &::before {
        box-shadow: 0 0 0 40px var(--el-color-primary-light-9);
        z-index: 1;
      }
    }
  }
  .active {
    padding: 0 20px;
    background-color: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    i {
      color: var(--el-color-primary);
    }
    &::after,
    &::before {
      box-shadow: 0 0 0 40px var(--el-color-primary-light-9);
      z-index: 1;
    }
  }
}
// .dropdown-container {
//   vertical-align: middle;
//   align-self: center;
//   cursor: pointer;
// }
</style>
