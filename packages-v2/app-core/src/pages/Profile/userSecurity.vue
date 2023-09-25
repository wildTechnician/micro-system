<template>
  <el-divider content-position="left">安全设置</el-divider>
  <div class="userSecurity-container-item">
    <div class="userSecurity-item-left">
      <p class="item-left-title">
        <el-text tag="b">修改密码</el-text>
      </p>
      <p class="item-left-label">
        <el-text type="info" size="small">成功更新密码后，您将被重定向到登录页面，在那里您可以使用新密码登录。</el-text>
      </p>
    </div>
    <el-button link>
      <el-text type="primary" size="small">修改</el-text>
    </el-button>
  </div>
</template>

<script setup name="userSecurity" lang="ts"></script>

<style lang="scss" scoped>
.userSecurity-container-item {
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #f2f2f2;
  padding: 10px 0;
  .userSecurity-item-left {
    max-width: 95%;
  }
}
</style>
