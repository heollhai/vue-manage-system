import Vue from "vue";
import Vuex from "vuex";
import Crumbs from "./methods/crumbs.js";
import Longin from "./methods/login.js";
import User from "./methods/user.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Crumbs,
    Longin,
    User
  }
});
