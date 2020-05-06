import router from "./router";
import { Route } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth";
import { UserModule } from "@/store/modules/user";
import { PermissionModule } from "@/store/modules/permission";
import { AppModule } from '@/store/modules/app';

NProgress.configure({ showSpinner: true });
// 重定向白名单
const whiteList = ["/login"];

let sidebarState = true;

// 动态设置title
function getPageTitle(title: string) {
  const defaultTitle = "vue-ele-admin-ts";
  if (title) {
    return `${title} - ${defaultTitle}`;
  }
  return defaultTitle;
}

function handleShrink(to: Route, from: Route) {
  // 去掉收缩页面，收缩左边菜单栏
  if(to.meta && to.meta.shrink) {
    // 缓存sidebar状态
    sidebarState = AppModule.sidebar.opened;
    AppModule.SetSidebar(false);
  }
  // 如果是从收缩页面返回。菜单栏恢复到之前的状态
  if(from.meta && from.meta.shrink) {
    AppModule.SetSidebar(sidebarState)
  }
}

router.beforeEach(async (to: Route, from: Route, next: any) => {
  NProgress.start();

  const hasToken = getToken();
  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      const hasRoles = UserModule.roles && UserModule.roles.length > 0;
      // 判断是否有用户信息，没有则发请求去后台获取当前登录用户信息
      if (hasRoles) {
        // 处理收缩路由
        handleShrink(to, from);
        next();
      } else {
        try {
          await UserModule.GetUserInfo();
          const roles = UserModule.roles;
          PermissionModule.GenerateRoutes(roles);
          // 动态添加路由
          router.addRoutes(PermissionModule.dynamicRoutes);
          // 设置replace: true不会在浏览器留下浏览痕迹
          next({ ...to, replace: true });
        } catch (error) {
          // remove token and redirect to login page
          UserModule.ResetToken();
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach((to: Route) => {
  // Finish progress bar
  NProgress.done();
  document.title = getPageTitle(to.meta.title);
});
