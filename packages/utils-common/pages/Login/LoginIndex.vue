<template>
  <div class="container">
    <!-- <video ref="videoPlay" autoplay loop muted poster="@/assets/images/login/init.png">
      <source src="@/assets/video/login/init.mp4" type="video/mp4" />
    </video> -->
  </div>
  <div class="login-header">
    <div class="title">
      <h1>{{ appTitle }}</h1>
    </div>
  </div>
  <el-row class="login-form" align="middle">
    <el-alert v-show="loginError" class="login-form-item" :title="(loginError as string)" type="error" show-icon :closable="false" />
    <el-row align="middle" class="login-form-item">
      <el-input v-model.trim="form.username" :prefix-icon="UserFilled" placeholder="请输入用户名" />
    </el-row>
    <el-row class="login-form-item" align="middle">
      <el-input v-model.trim="form.password" :prefix-icon="WarningFilled" type="password" placeholder="请输入密码" show-password />
    </el-row>

    <el-row align="middle" class="login-form-item" justify="end">
      <el-col :span="6">
        <el-button type="primary" link>忘记密码</el-button>
      </el-col>
    </el-row>
    <el-row style="width: 100%" align="middle" justify="space-between">
      <el-col :span="10"> <el-button type="primary" class="login-form-item" :loading="loginLoading" :disabled="disabled" @click.stop="enter">登陆</el-button></el-col>
      <el-col :span="10"><el-button class="login-form-item" :loading="loginLoading" @click.stop="reset">重置</el-button></el-col>
    </el-row>
  </el-row>

  <el-row class="davido-copy" align="middle" justify="center">
    <el-col :span="10">
      技术支持:<a href="http://www.sxdvd.cn" target="_blank"><el-text type="primary">陕西达维多数据服务有限公司</el-text></a></el-col
    >
    <el-col :span="4">
      当前版本:<a href="#"
        ><el-text type="primary">{{ version }}</el-text></a
      ></el-col
    >
  </el-row>
</template>

<script lang="ts" setup>
import { loginApi } from '../../apis/permission';
import { useRouter } from 'vue-router';
import { WarningFilled, UserFilled } from '@packages/utils-icon/src/elementPlus';
import { isEmpty } from '../../utils';
import { useCookies, useAsync } from '../../hook';
import { version } from '../../../../package.json';
import { Essential } from '../../enum';
import { shallowReactive, computed } from 'vue';

import type { LoginRequestType } from '../../apis/permission';

const initData = (): LoginRequestType => ({ username: 'admin', password: 'davido_admin@2023' });
const router = useRouter();
const appTitle = import.meta.env.VITE_APP_TITLE;
const form = shallowReactive<LoginRequestType>(initData());
const disabled = computed(() => isEmpty(form.password) || isEmpty(form.username));
const { execute: loginForm, loading: loginLoading, state: loginData, error: loginError } = useAsync(() => loginApi(form));
const { set: setCookies } = useCookies();

const reset = () => {
  Object.assign(form, initData());
};
/**
 * 登陆
 */
async function enter() {
  await loginForm();
  if (!loginData.value) return;
  const { value, refreshToken } = loginData.value;
  setCookies(Essential.TOKEN, value);
  setCookies(Essential.REFRESH_TOKEN, refreshToken);
  router.replace({ path: '/' });
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #0e1c39;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  background-image: url('../../assets/images/login/init.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  video {
    object-fit: cover;
    width: 100vw;
    height: 100vh;
    z-index: 1;
  }
}
.login-header {
  z-index: 10;
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  .title {
    letter-spacing: 8px;
    font-weight: bold;
    padding: 16px 50px;
    background-image: url('../../assets/images/login/headerBg.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: fill;
    h1 {
      color: #dffefa;
    }
  }
}

.login-form {
  z-index: 10;
  width: 330px;
  position: fixed;
  top: 8vh;
  right: 50px;
  &-item {
    width: 100%;
    margin-bottom: 20px;
  }
}
.davido-copy {
  z-index: 10;
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 3px 0;
  background: rgba($color: #000, $alpha: 0.55);
  color: var(--el-color-white);
  font-size: var(--el-font-size-base);
  a {
    margin: 0 5px;
  }
}
</style>
