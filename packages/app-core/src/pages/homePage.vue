<template>
  <div class="main">
    <header-component :transparent="false"> </header-component>
    <router-view></router-view>
  </div>
</template>
<style lang="scss">
.main {
  height: 100%;
  overflow: hidden;
}
</style>
