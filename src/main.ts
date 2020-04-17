import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入normalize.css初始化css
import "@/style/normalize.css";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "@/style/index.scss";

import Settings from "./settings";

// 引入svg-Icon
import "@/icons";

Vue.use(Element, {
  size: Settings.elementSize
});

// 引入权限判断守卫
import "./permission";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
