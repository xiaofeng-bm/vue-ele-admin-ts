import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "@/store";

export interface IAppState {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
}

@Module({ dynamic: true, store, name: "app" })
class App extends VuexModule implements IAppState {
  public sidebar = {
    opened: true,
    withoutAnimation: true,
  };

  @Mutation
  private TOGGLE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = !this.sidebar.opened;
    this.sidebar.withoutAnimation = withoutAnimation;
  }
  @Mutation
  private SET_SIDEBAR(state: boolean) {
    this.sidebar.opened = state;
    this.sidebar.withoutAnimation = false;
  }

  @Action
  public ToggleSideBar(withoutAnimation: boolean) {
    this.TOGGLE_SIDEBAR(withoutAnimation);
  }

  @Action SetSidebar(state: boolean) {
    this.SET_SIDEBAR(state)
  }
}

export const AppModule = getModule(App);
