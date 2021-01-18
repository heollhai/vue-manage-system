<template>
  <div class="header">
    <div class="headerPath">
      <i class="iconfont icon-caidan headerCss" @click="COLLAPSETYPE"></i>
      <el-breadcrumb separator="/" class="crumbs">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-if="currentMenu"
          :to="{ path: currentMenu.path }"
          >{{ currentMenu.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <el-dropdown trigger="click" size="mini">
      <i class="iconfont icon-123 headerCss "></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>用户中心</el-dropdown-item>
        <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState("Crumbs", ["currentMenu"])
  },
  methods: {
    ...mapMutations("Crumbs", ["COLLAPSETYPE"]),
    ...mapMutations("Longin", ["CLEARMENU"]),
    ...mapMutations("User", ["CLEAR_TOKEN"]),
    loginOut() {
      this.CLEARMENU(); // 清除cookie  清除路由菜单
      this.CLEAR_TOKEN(); //清除  cookie
      this.$router.push("/login");
      location.reload(); //页面刷新
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  .headerCss {
    font-size: 30px;
    color: $theme-bgcolor;
  }
  .headerPath {
    display: flex;
    align-items: center;
    .crumbs {
      margin-left: 20px;
    }
  }
}
</style>
<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
