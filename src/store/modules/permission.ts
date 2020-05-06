import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from "vuex-module-decorators";
import { RouteConfig, Route } from "vue-router";
import { baseRoutes, asyncRoutes } from "@/router";
import store from "@/store";

function hasPermission(roles: string[], route: RouteConfig) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => {
      return route.meta.roles.includes(role);
    });
  } else {
    return true;
  }
}

// 根据roles过滤动态路由
export function filterAsyncRoutes(routes: RouteConfig[], roles: string[]) {
  const res: RouteConfig[] = [];
  routes.forEach((route) => {
    const r = { ...route };
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r);
    }
  });
  return res;
}

export interface IPermissionState {
  routes: RouteConfig[];
  dynamicRoutes: RouteConfig[]; // 动态路由
}

@Module({ dynamic: true, store, name: "permission" })
class Permission extends VuexModule implements IPermissionState {
  public routes: RouteConfig[] = [];
  public dynamicRoutes: RouteConfig[] = [];

  @Mutation
  private SET_ROUTES(routes: RouteConfig[]) {
    this.routes = baseRoutes.concat(routes);
    this.dynamicRoutes = routes;
  }

  // 根据角色生成可访问路由
  @Action
  public GenerateRoutes(roles: string[]) {
    let accessedRoutes;
    if (roles.includes("admin")) {
      accessedRoutes = asyncRoutes;
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
    }

    this.SET_ROUTES(accessedRoutes);
  }
}

export const PermissionModule = getModule(Permission);
