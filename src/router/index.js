import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "VideoManage" */ "@/views/login")
  },
  {
    path: "/404",
    name: "404",
    component: () =>
      import(/* webpackChunkName: "VideoManage" */ "@/views/error")
  }
  // { path: "*", redirect: "/404" }
  // {
  //   path: "/",
  //   component: () => import(/* webpackChunkName: "main" */ "@/views/main"),
  //   children: [
  //     {
  //       path: "/",
  //       component: () =>
  //         import(/* webpackChunkName: "VideoManage" */ "@/views/Home")
  //     },
  //     {
  //       path: "/VideoManage",
  //       component: () =>
  //         import(/* webpackChunkName: "VideoManage" */ "@/views/VideoManage")
  //     },
  //     {
  //       path: "/User",
  //       component: () =>
  //         import(/* webpackChunkName: "VideoManage" */ "@/views/User")
  //     },
  //     {
  //       path: "/pageOne",
  //       component: () =>
  //         import(/* webpackChunkName: "VideoManage" */ "@/views/Other/pageOne")
  //     },
  //     {
  //       path: "/pageTwo",
  //       component: () =>
  //         import(/* webpackChunkName: "VideoManage" */ "@/views/Other/pageTwo")
  //     }
  //   ]
  // }
];

const router = new VueRouter({
  routes
});

export default router;
