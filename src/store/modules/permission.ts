import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from "vuex-module-decorators";
import { RouteConfig } from "vue-router";
import { baseRoutes } from '@/router';
import store from '@/store';

export interface IPermissionState {
  routes: RouteConfig[];
}

@Module({ dynamic: true, store, name: 'permission' })
class Permission extends VuexModule implements IPermissionState {
  public routes: RouteConfig[] = [];

  @Mutation
  private SET_ROUTES(routes: RouteConfig[]) {
    this.routes = routes;
  }

  @Action
  public GenerateRoutes(roles: string[]) {
    this.SET_ROUTES(baseRoutes)
  }
}

export const PermissionModule = getModule(Permission);
