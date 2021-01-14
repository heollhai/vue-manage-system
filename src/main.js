import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 全局配置
import "@/assets/font-icon/iconfont.css";
import "element-ui/lib/theme-chalk/index.css";
import http from "@/utils/config";
import "normalize.css";

// 第三方引入
import Element from "element-ui";
Vue.use(Element);
Vue.prototype.$http = http;
import "./mock";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
