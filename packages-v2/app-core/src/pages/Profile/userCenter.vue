<template>
  <el-divider content-position="left">个人信息</el-divider>
  <el-descriptions title="" direction="horizontal" :column="4" border>
    <el-descriptions-item v-for="(userListVal, userListIndex) in userList" :key="`userList${userListIndex}`" :label="userListVal.label" :span="userListVal.span">
      <span v-if="userListVal.type == 'text'">{{ '-' }}</span>
      <el-tag v-else-if="userListVal.type == 'state'" type="success">异常</el-tag>
    </el-descriptions-item>
  </el-descriptions>

  <el-divider content-position="left">其他信息</el-divider>
  <el-descriptions title="" direction="horizontal" :column="4" border>
    <el-descriptions-item :span="1" label="所属部门"> - </el-descriptions-item>
    <el-descriptions-item :span="1" label="部门负责人">- </el-descriptions-item>
    <el-descriptions-item :span="2" label="所属角色"> - </el-descriptions-item>
    <el-descriptions-item :span="2" label="所属岗位"> - </el-descriptions-item>
  </el-descriptions>
</template>

<script setup name="userCenter" lang="ts">
const userList = [
  { label: '用户名', field: 'username', span: 1, type: 'text' },
  { label: '昵称', field: 'nickname', span: 1, type: 'text' },
  { label: '性别', field: 'sex', span: 1, type: 'text' },
  { label: '邮箱', field: 'email', span: 1, type: 'text' },
  { label: '联系方式', field: 'phone', span: 1, type: 'text' },
  { label: '账户状态', field: 'enabled', span: 1, type: 'state' },
  { label: '注册时间', field: 'createTime', span: 2, type: 'text' },
  { label: '创建人', field: 'creatorName', span: 1, type: 'text' },
  { label: '修改时间', field: 'lastModifiedTime', span: 2, type: 'text' },
];
</script>
