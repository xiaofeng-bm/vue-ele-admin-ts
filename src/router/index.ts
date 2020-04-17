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
        name: "Dashboard",
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ "@/views/dashboard/index.vue"
          ),
        meta: {
          title: "dashboard",
        },
      },
    ],
  },
  {
    path: "/components",
    component: Layout,
    children: [
      {
        path: "one",
        component: () =>
          import(
            /* webpackChunkName: "one" */ "@/views/components-demo/demo-one.vue"
          ),
        meta: {
          title: "one",
        },
      },
      {
        path: "two",
        component: () =>
          import(
            /* webpackChunkName: "two" */ "@/views/components-demo/demo-two.vue"
          ),
        meta: {
          title: "two",
        }
      },
    ],
    meta: {
      title: '组件'
    }
  },
  {
    path: '/table',
    component: Layout,
    meta: {
      title: '表格'
    },
    children: [
      {
        path: 'table1',
        component: () => import('@/views/table/table1.vue')
      }
    ]
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/login/index.vue"),
  },
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: baseRoutes,
});

export default router;
