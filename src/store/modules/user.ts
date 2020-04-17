import {
  VuexModule,
  Module,
  Action,
  Mutation,
  getModule,
} from "vuex-module-decorators";
import { getToken, setToken } from "@/utils/auth";
import { login, getUserInfo } from "@/api/user";
import store from "@/store";

export interface IUserState {
  token: string;
  name: string;
  roles: string[];
}

@Module({ dynamic: true, store, name: "user" })
class User extends VuexModule implements IUserState {
  public token = getToken() || "";
  public name = "";
  public roles: string[] = [];

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }
  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles;
  }
  @Mutation
  private SET_NAME(name: string) {
    this.name = name;
  }

  @Action
  public async Login(userInfo: { username: string; password: string }) {
    const { username, password } = userInfo;
    const { data }: any = await login({ username, password });
    setToken(data.token);
    this.SET_TOKEN(data.token);
  }
  @Action
  public async GetUserInfo() {
    if (!this.token) {
      throw Error("未获取到token，请重新登录");
    }
    const { data } = await getUserInfo();
    // 用户信息为空判断
    const { roles, name } = data;
    if (!roles && roles.length === 0) {
      throw Error("roles is must array!");
    }
    this.SET_ROLES(roles);
    this.SET_NAME(name);
  }
}

export const UserModule = getModule(User);
