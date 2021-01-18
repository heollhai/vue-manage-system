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

router.beforeEach((to, form, next) => {
  store.commit("User/GET_TOKEN"); //先获取 token
  let token = store.state.User.token;
  // 判断有没有 token
  if (!token && to.path !== "/login") {
    // 如果没有token 并且不是去登录页面   那么去到登录页面
    next("/login");
  } else {
    // 有  token   放行
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit("Longin/ADDMENU", router);
  }
}).$mount("#app");
