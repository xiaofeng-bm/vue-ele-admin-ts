import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Layout from "@/layout/index.vue";

Vue.use(VueRouter);

// 基础路由，不限制权限
export const baseRoutes: RouteConfig[] = [
  {
    path: "/",
    redirect: "/dashboard",
    component: Layout,
    children: [
      {
        path: "/dashboard",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/dashboard/index.vue"
          ),
        meta: {
          title: "dashboard",
          icon: "dashboard",
        },
      },
    ],
  },
  {
    path: "/table",
    component: Layout,
    meta: {
      title: "表格",
      icon: "table",
    },
    children: [
      {
        path: "drag-table",
        component: () => import("@/views/table/drag-table.vue"),
        meta: {
          title: '拖拽表格'
        }
      },
      {
        path: 'config-table',
        component: () => import("@/views/table/config-table.vue"),
        meta: {
          title: '可配置表格'
        }
      }
    ],
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/login/index.vue"),
  },
];

function createRouter() {
  return new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes: baseRoutes,
  });
}
// 创建router实例
const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  // reset router 
  // hack方法: 所有的 vue-router 注册的路由信息都是存放在matcher之中的，所以当我们想清空路由的时候，我们只要新建一个空的Router实例，将它的matcher重新赋值给我们之前定义的路由就可以了。巧妙的实现了动态路由的清除。
  (router as any).matcher = (newRouter as any).matcher;
}

export default router;
