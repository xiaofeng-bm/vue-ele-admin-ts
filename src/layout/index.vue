<template>
  <div class="app-wapper" :class="classObj">
    <side-bar class="sidebar-container"></side-bar>

    <div class="main-container">
      <div class="fixed-header">
        <nav-bar></nav-bar>
      </div>
      <app-main></app-main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SideBar, AppMain, NavBar } from "./components";
import { AppModule } from "@/store/modules/app";

@Component({
  name: "Layout",
  components: {
    SideBar,
    AppMain,
    NavBar,
  },
})
export default class extends Vue {
  get sidebar() {
    return AppModule.sidebar;
  }
  get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
    };
  }
}
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
  transition: width 0.28s; // 添加过渡动画
}
.hideSidebar {
  .sidebar-container {
    width: 54px;
  }
  .main-container {
    margin-left: 54px;
  }
  .fixed-header {
    width: calc(100% - 54px);
  }
}

.main-container {
  min-height: 100%;
  margin-left: $sideBarWidth;
  transition: margin-left 0.28s;
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
  z-index: 9;
}
</style>
