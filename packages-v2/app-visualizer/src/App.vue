<template>
  <el-config-provider>
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
const router = useRouter();

window.$wujie?.bus.$on('router-change', (path: string) => {
  router.push({ path });
});
</script>
