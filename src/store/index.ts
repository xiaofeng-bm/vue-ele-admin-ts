import Vue from "vue";
import Vuex from "vuex";
import { IUserState } from "./modules/user";
import { IPermissionState } from "./modules/permission";
import { IAppState } from "./modules/app";

Vue.use(Vuex);

export interface IRootState {
  user: IUserState;
  permission: IPermissionState;
  app: IAppState;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({});
