<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item> </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { RouteRecord, Route } from 'vue-router';

@Component({
  name: "Breadcrumb",
})
export default class extends Vue {
  private breadcrumbs: RouteRecord[] = [];

  @Watch('$route')
  private onRouteChange(route: Route) {
    // if(route.path)
  }

  created() {
    //

  }

  private getBreadcrumb() {
    //
  }
}
</script>

<style lang="scss" scoped></style>
