import router from "./router";
import { Route } from "vue-router";
import NProgress from "nprogress";
import { getToken } from "@/utils/auth";
import { UserModule } from "@/store/modules/user";
import { PermissionModule } from "@/store/modules/permission";

NProgress.configure({ showSpinner: true });
// 重定向白名单
const whiteList = ["/login"];

router.beforeEach(async (to: Route, from: Route, next: any) => {
  const hasToken = getToken();
  if (hasToken) {
    const hasRoles = UserModule.roles && UserModule.roles.length > 0;
    // 判断是否有用户信息，没有则发请求去后台获取当前登录用户信息
    if (hasRoles) {
      next();
    } else {
      try {
        await UserModule.GetUserInfo();
        const roles = UserModule.roles;
        PermissionModule.GenerateRoutes(roles);
        // 设置replace: true不会在浏览器留下浏览痕迹
        next({ ...to, replace: true });
      } catch (error) {
        // remove token and redirect to login page
        UserModule.ResetToken();
        next(`/login?redirect=${to.path}`);
      }
    }
    // 设置replace：true，浏览器不会留下历史记录
    // next({ ...to, replace: true})
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});
