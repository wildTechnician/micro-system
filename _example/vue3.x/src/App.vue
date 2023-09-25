<template></template>

<script setup lang="ts">
const router = useRouter();

window.$wujie?.bus.$on('router-change', (path: string) => {
  path = path.trim();
  router.push({ path });
});
</script>

<style lang="scss" scoped></style>
