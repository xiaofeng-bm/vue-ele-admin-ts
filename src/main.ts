import Vue, { DirectiveOptions } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as directives from "@/directives";

// 引入normalize.css初始化css
import "@/style/normalize.css";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/style/index.scss";

import Settings from "./settings";

import BmTable from "@/components/BmTable/index.vue";
import BmPagination from "@/components/Pagination/index.vue";
Vue.component("bm-table", BmTable);
Vue.component("bm-pagination", BmPagination);

// 引入svg-Icon
import "@/icons";

Vue.use(Element, {
  size: Settings.elementSize,
});

Object.keys(directives).forEach((key) => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key]);
});

// 引入权限判断守卫
import "./permission";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
