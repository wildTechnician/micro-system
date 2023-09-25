<template>
  <div class="msg-user">
    <p><el-avatar size="large" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" /></p>
    <el-text tag="b">未知用户</el-text>
    <el-row align="middle" justify="space-around" class="msg-user_list">
      <el-col v-for="(messageRouteItem, messageRouteIndex) in useProfile.messageRoute" :key="`messageRoute${messageRouteIndex}`" :span="Math.ceil(24 / useProfile.messageRoute.length)">
        <RouterLink :to="`/profile/${messageRouteItem.component}`">
          <p>
            <el-icon color="var(--el-color-info)">
              <component :is="messageRouteItem.icon"></component>
            </el-icon>
          </p>
          <p>
            <el-text type="info">{{ messageRouteItem.name }}</el-text>
            <span class="dot">0</span>
          </p>
        </RouterLink>
      </el-col>
    </el-row>
  </div>
  <el-divider>操作</el-divider>
  <div class="msg-container">
    <p v-for="(msgTypeListItem, msgTypeListIndex) in useProfile.route" :key="`msgTypeList${msgTypeListIndex}`" class="msg-container-li">
      <router-link :to="`/profile/${msgTypeListItem.component}`">
        <el-row align="bottom">
          <el-col :span="2">
            <el-icon size="14" color="var(--el-color-info)">
              <component :is="msgTypeListItem.icon"></component>
            </el-icon>
          </el-col>
          <el-col :span="19" :push="2">
            <el-text type="info"> {{ msgTypeListItem.name }}</el-text>
          </el-col>
        </el-row>
      </router-link>
    </p>

    <el-divider>其他</el-divider>
    <el-row align="middle" class="msg-container-li" @click="quit">
      <el-col :span="2">
        <el-icon size="14" color="var(--el-color-info)">
          <SwitchButton></SwitchButton>
        </el-icon>
      </el-col>
      <el-col :span="19" :push="2">
        <el-text type="info"> 退出登录</el-text>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup name="toolsComponentUser">
import profileStore from '../../../store/profile';
import { SwitchButton } from '@packages/utils-icon/src/elementPlus';
import { logout } from '@packages/utils-common/enter';
import { useRouter } from 'vue-router';
import usePermissionStore from '@/store/permission';

const usePermission = usePermissionStore();

const useProfile = profileStore();
const router = useRouter();
const quit = async () => {
  await logout();
  usePermission.reset();
  await router.push({ name: 'login' });
};
</script>

<style lang="scss" scoped>
.msg-user {
  margin: 10px 0;
  text-align: center;
  &_list {
    margin: 10px 0;
  }
  .dot {
    padding: 0px 5px;
    border-radius: 10px;
    font-size: 10px;
    background-color: var(--el-color-danger);
    color: var(--el-color-white);
  }
}
.msg-container {
  min-width: 300px;
  &-li {
    padding: 14px 14px 14px 20px;
    cursor: pointer;
    &:hover {
      background-color: var(--el-bg-color-page);
    }
  }
}
</style>
