<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu 
      mode="vertical" 
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        ></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { PermissionModule } from "@/store/modules/permission";
import SidebarItem from "./SidebarItem.vue";
import variables from "@/style/_variables.scss";

@Component({
  name: "SideBar",
  components: {
    SidebarItem,
  },
})
export default class extends Vue {
  //
  get routes() {
    return PermissionModule.routes;
  }
  get variables() {
    return variables;
  }
}
</script>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
}
.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
