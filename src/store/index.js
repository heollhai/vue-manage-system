import Vue from "vue";
import Vuex from "vuex";
import Crumbs from "./methods/crumbs.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Crumbs
  }
});
