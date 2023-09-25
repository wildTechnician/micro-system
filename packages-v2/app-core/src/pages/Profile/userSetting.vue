<template>
  <el-divider content-position="left">基本设置</el-divider>
  <el-form ref="form" :model="form" label-position="top">
    <el-row>
      <el-col :span="24">
        <el-form-item label="姓名" prop="nickname">
          <!-- <el-input v-model.trim="form.nickname" placeholder="请输入用户昵称" /> -->
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="邮箱" prop="email">
          <!-- <el-input v-model.trim="form.email" placeholder="请输入邮箱" /> -->
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="电话" prop="phone">
          <!-- <el-input v-model.trim="form.phone" placeholder="请输入电话" /> -->
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="性别" prop="sex">
          <!-- <el-radio-group v-model.trim="form.sex" style="width: 100%">
            <el-radio :label="'M'">男</el-radio>
            <el-radio :label="'G'">女</el-radio>
          </el-radio-group> -->
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item>
          <el-button type="primary" @click="submitForm">更新信息</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup name="userSetting" lang="ts">
const form = shallowReactive({});

const submitForm = () => {};
</script>
