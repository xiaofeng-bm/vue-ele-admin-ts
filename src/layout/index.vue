<template>
  <div class="app-wapper">
    <side-bar class="sidebar-container"></side-bar>

    <div class="main-container">
      <nav-bar></nav-bar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SideBar, AppMain, NavBar } from "./components";

@Component({
  name: "Layout",
  components: {
    SideBar,
    AppMain,
    NavBar,
  },
})
export default class extends Vue {}
</script>
<style lang="scss">
.sidebar-container {
  .el-scrollbar__view {
    height: 100%;
  }
}
</style>
<style lang="scss" scoped>
.app-wapper {
  width: 100%;
  height: 100%;
  position: relative;
}
.sidebar-container {
  width: $sideBarWidth;
  height: 100%;
  position: fixed;
  top: 0;
}

.main-container {
  margin-left: $sideBarWidth;
}
</style>
