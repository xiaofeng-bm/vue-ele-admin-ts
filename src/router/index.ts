import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Layout from "@/layout/index.vue";

Vue.use(VueRouter);

// 基础路由，不限制权限
export const baseRoutes: RouteConfig[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401.vue"),
    meta: {
      hidden: true,
    },
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    redirect: "/dashboard",
    component: Layout,
    children: [
      {
        path: "dashboard",
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
  }
];

// 动态路由，根据roles角色信息来动态添加
export const asyncRoutes: RouteConfig[] = [
  {
    path: "/table",
    component: Layout,
    meta: {
      title: "表格",
      icon: "table"
    },
    children: [
      {
        path: "drag-table",
        component: () => import("@/views/table/drag-table.vue"),
        meta: {
          title: "拖拽表格",
        },
      },
      {
        path: "config-table",
        component: () => import("@/views/table/config-table.vue"),
        meta: {
          title: "可配置表格",
        },
      },
      {
        path: "complex-table",
        name: 'complex-table',
        component: () => import("@/views/table/complex-table.vue"),
        meta: {
          title: "综合表格",
        },
        children: [
          {
            path: 'edit',
            component: () => import('@/views/table/components/edit.vue'),
            meta: {
              hidden: true,
              shrink: true
            }
          }
        ]
      },
    ],
  },
  {
    path: '/components',
    component: Layout,
    meta: {
      title: '组件',
      icon: 'component'
    },
    children: [
      {
        path: 'split-pane',
        component: () => import("@/views/components-demo/split-pane.vue"),
        meta: {
          title: '拖拽组件'
        }
      },
      {
        path: 'count-to',
        component: () => import('@/views/components-demo/count-to.vue'),
        meta: {
          title: 'count-to'
        }
      },
      {
        path: 'draggable',
        component: () => import('@/views/components-demo/draggable-dialog.vue'),
        meta: {
          title: '拖拽弹框'
        }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    meta: {
      title: '路由嵌套',
      icon: 'nested'
    },
    children: [
      {
        path: '/menu1',
        meta: {
          title: '菜单1'
        }
      },
      {
        path: '/menu2',
        meta: {
          title: '菜单2'
        },
        children: [
          {
            path: '/menu2-1',
            meta: {
              title: '菜单2-1'
            }
          },
          {
            path: '/menu2-2',
            meta: {
              title: '菜单2-2'
            },
            children: [
              {
                path: '/menu2-2-1',
                meta: {
                  title: '菜单2-2-1'
                }
              },
              {
                path: '/menu2-2-2',
                meta: {
                  title: '菜单2-2-2'
                }
              },
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    meta: {
      title: '权限测试页',
      icon: 'lock'
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page.vue'),
        meta: {
          title: '页面权限',
        }
      },
      {
        path: 'RMD',
        component: () => import('@/views/permission/RMD.vue'),
        meta: {
          title: 'RMD',
          roles: ['RMD']
        }
      },
      {
        path: 'TA',
        component: () => import('@/views/permission/TA.vue'),
        meta: {
          title: 'TA',
          roles: ['TA']
        }
      }
    ]
  },
  {
    path: "/error",
    component: Layout,
    meta: {
      title: "错误页面",
      icon: "404",
    },
    children: [
      {
        path: "401",
        component: () => import("@/views/error-page/401.vue"),
        meta: {
          title: "401",
        },
      },
      {
        path: "404",
        component: () => import("@/views/error-page/404.vue"),
        meta: {
          title: "404",
        },
      },
    ],
  },
  {
    path: "*",
    redirect: "/404",
    meta: { hidden: true },
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
