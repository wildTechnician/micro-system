<template>
  <header-component :transparent="false"> </header-component>
  <div class="container">
    <el-row class="content">
      <el-col :span="4" :push="1" class="content-section">
        <div class="content-avatar">
          <el-upload :show-file-list="false" :limit="1" accept="image/*" :http-request="uploadImage">
            <template #default>
              <el-avatar size="large" class="content-avatar_image" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
            </template>
          </el-upload>
          <el-text tag="p" class="content-avatar_name"><b>系统管理员</b></el-text>
        </div>
        <el-row
          v-for="(useProfileItem, useProfileIndex) in menuList"
          :key="`useProfile${useProfileIndex}`"
          :class="['content-item', route.params.path == useProfileItem.component ? 'content-item_active' : '']"
          align="middle"
          @click="changeMenu(useProfileItem, useProfileIndex)"
        >
          <el-col :span="1">
            <el-icon :size="14">
              <component :is="useProfileItem.icon"></component>
            </el-icon>
          </el-col>
          <el-col :span="20" :push="2">
            <el-text>{{ useProfileItem.name }}</el-text>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="17" :push="2" class="content-section">
        <Suspense>
          <component :is="modules[`./${getComponentName()}.vue`].default"></component>
          <template #fallback>Loading...</template>
        </Suspense>
      </el-col>
    </el-row>
  </div>

  <uploadAvatar v-model:visible="avatarVisible" :image-url="imageUrl"></uploadAvatar>
</template>

<script setup name="userIndex" lang="ts">
import profileStore from '@/store/profile';
import uploadAvatar from './component/uploadAvatar.vue';

import type { IRouterType } from '@/store/profile';
import type { UploadRequestOptions } from 'element-plus';
import type { Component } from 'vue';

const useProfile = profileStore();
const activeNum = shallowRef<number>(0);
const modules = import.meta.glob<{ default: Component }>('./*.vue', { eager: true });
const imageUrl = shallowRef<string>();
const avatarVisible = computed(() => !!imageUrl.value);
const menuList = computed(() => [...useProfile.route, ...useProfile.messageRoute]);
const route = useRoute();
const router = useRouter();

const changeMenu = (item: IRouterType, index: number) => {
  router.push({ path: '/profile/' + item.component });
};

const getComponentName = () => (route.params.path ? route.params.path : menuList.value[activeNum.value].component);

const uploadImage = (options: UploadRequestOptions) => {
  imageUrl.value = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
  return Promise.resolve();
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100% - tovh(85));
  background-color: var(--el-bg-color-page);
}
.content {
  --el-page-width: 1100px;
  --el-section-padding: 20px;

  margin: 0px auto 0 auto;
  max-height: 100%;
  overflow: auto;
  &-avatar {
    padding: var(--el-section-padding) 0;
    text-align: center;
    &_image {
      position: relative;
      cursor: pointer;
    }
    &_name {
      padding-top: var(--el-section-padding);
    }
    &_image:hover::after {
      content: '+';
      vertical-align: middle;
      @include centerElement();
      background: rgba(0, 0, 0, 0.4);
      border-radius: 50%;
      font-size: 40px;
    }
  }
  &-item {
    padding: calc(var(--el-section-padding) - 3px) var(--el-section-padding);
    cursor: pointer;
    color: var(--el-color-info);
    &:hover {
      background-color: var(--el-bg-color-page);
    }
  }
  &-item_active {
    background-color: var(--el-bg-color-page);
    border-left: solid 3px var(--el-color-primary);
  }

  &-section {
    background-color: var(--el-bg-color);
    box-shadow: var(--el-box-shadow-lighter);
    border-radius: var(--el-border-radius-base);
  }
  &-section:first-child {
    padding: var(--el-section-padding) 0;
  }
  &-section:last-child {
    padding: var(--el-section-padding);
  }
}
</style>
