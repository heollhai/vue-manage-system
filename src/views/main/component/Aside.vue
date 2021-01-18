<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="collapseType"
  >
    <el-menu-item
      v-for="item in onAisdeMenuChilider"
      :index="item.path"
      :key="item.path"
      @click="selctMent(item)"
    >
      <i :class="item.icon" :key="item.path"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasAisdeMenuChilider"
      :index="item.label"
      :key="item.path"
    >
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          @click.native.stop="selctMent(subItme)"
          :index="item.path"
          v-for="subItme in item.children"
          :key="subItme.path"
        >
          <i :class="subItme.icon"></i>{{ subItme.label }}</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapMutations, mapState } from "vuex"; //方法二 ;
export default {
  computed: {
    ...mapState("Crumbs", ["collapseType"]),
    ...mapState("Longin", ["menu"]),
    onAisdeMenuChilider() {
      return this.menu.filter(item => !item.children);
    },
    hasAisdeMenuChilider() {
      return this.menu.filter(item => item.children);
    }
  },
  mounted() {
    console.log(this.collapseType, "collapseType");
  },
  methods: {
    ...mapMutations("Crumbs", ["SELCTMENT"]),
    selctMent(item) {
      this.$router.push(item.path);
      this.SELCTMENT(item);
      console.log(item);
    }
  },
  data() {
    return {
      asideMenu: []
    };
  }
};
</script>

<style lang="scss" scoped="scoped">
.el-menu {
  height: 100%;
  border: none;
}
.icon {
  margin-right: 5px;
  color: #409eff;
}
</style>
