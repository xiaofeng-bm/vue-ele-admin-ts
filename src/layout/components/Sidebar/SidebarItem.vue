<template>
  <div v-if="item.meta">
    <template v-if="theOnlyOneChild && !theOnlyOneChild.children">
      <el-menu-item :index="item.path">
        <span v-if="item.meta.title">{{ item.meta.title }}</span>
      </el-menu-item>
    </template>

    <el-submenu v-else :index="resolvePath(item.path)">
      <template slot="title">
        <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(child.path)"
        >
        </sidebar-item>
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { RouteConfig } from "vue-router";
import path from "path";

@Component({
  // 此组件为递归组件，必须给个name
  // https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E9%80%92%E5%BD%92%E7%BB%84%E4%BB%B6
  name: "SidebarItem",
})
export default class extends Vue {
  @Prop({ required: true }) private item!: RouteConfig;
  @Prop({ default: "" }) private basePath!: string;

  // 获取当前路由children个数
  get showingChildNumber() {
    if (this.item.children) {
      // 过滤出需要显示的children个数
      const showingChildren = this.item.children.filter((item) => {
        if (item.meta && item.meta.hidden) {
          return false;
        } else {
          return true;
        }
      });
      return showingChildren.length;
    } else {
      return 0;
    }
  }

  // 只有一个children元素时，就将其展示为根元素
  get theOnlyOneChild() {
    if (this.showingChildNumber > 1) {
      return null;
    }
    if (this.item.children) {
      for (const child of this.item.children) {
        if (!child.meta || !child.meta.hidden) {
          return child;
        }
      }
    }
    return { ...this.item, path: "" };
  }

  private resolvePath(routePath: string) {
    return path.resolve(this.basePath, routePath);
  }

  // mounted() {
  //   console.log(this.theOnlyOneChild);
  // }
}
</script>

<style lang="scss" scoped></style>
