<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[
      isCollapse ? 'simple-mode' : 'full-mode',
      { 'first-level': isFirstLevel },
    ]"
  >
    <template v-if="theOnlyOneChild && !theOnlyOneChild.children">
      <sidebar-item-link
        :to="resolvePath(theOnlyOneChild.path)"
        v-if="theOnlyOneChild.meta"
      >
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': isFirstLevel }"
        >
          <!-- 图标 -->
          <div class="svg-container" v-if="theOnlyOneChild.meta.icon">
            <svg-icon :icon-class="theOnlyOneChild.meta.icon"></svg-icon>
          </div>

          <span v-if="theOnlyOneChild.meta.title">{{
            theOnlyOneChild.meta.title
          }}</span>
        </el-menu-item>
      </sidebar-item-link>
    </template>

    <el-submenu v-else :index="resolvePath(item.path)">
      <template slot="title">
        <div class="svg-container" v-if="item.meta && item.meta.icon">
          <svg-icon :icon-class="item.meta.icon"></svg-icon>
        </div>
        <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          class="nest-menu"
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(child.path)"
          :is-collapse="isCollapse"
          :is-first-level="false"
        >
        </sidebar-item>
      </template>
    </el-submenu>
  </div>
</template>

<script lang="ts">
import path from "path";
import { Component, Vue, Prop } from "vue-property-decorator";
import { RouteConfig } from "vue-router";
import SidebarItemLink from "./SidebarItemLink.vue";

@Component({
  // 此组件为递归组件，必须给个name
  // https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E9%80%92%E5%BD%92%E7%BB%84%E4%BB%B6
  name: "SidebarItem",
  components: {
    SidebarItemLink,
  },
})
export default class extends Vue {
  @Prop({ required: true }) private item!: RouteConfig;
  @Prop({ default: "" }) private basePath!: string;
  @Prop({ default: false }) private isCollapse!: boolean;
  @Prop({ default: true }) private isFirstLevel!: boolean;

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
}
</script>
<style lang="scss">
.el-menu-item.is-active {
  background-color: #001528 !important;
}
.el-submenu.is-active > .el-submenu__title {
  color: $subMenuActiveText !important;
}

.full-mode {
  .nest-menu .el-submenu > .el-submenu__title,
  .el-submenu .el-menu-item {
    min-width: $sideBarWidth !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      & span {
        visibility: hidden;
      }

      .el-tooltip {
        padding: 0 !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      & > .el-submenu__title {
        padding: 0px !important;

        .el-submenu__icon-arrow {
          display: none;
        }

        & > span {
          visibility: hidden;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.svg-container {
  margin-right: 16px;
  display: inline-block;
}

.simple-mode {
  .svg-container {
    margin-left: 20px;
  }
}
</style>
