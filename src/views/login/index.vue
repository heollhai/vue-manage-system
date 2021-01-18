<template>
  <div class="login">
    <div class="login_content">
      <component-from :form="loginFrom" :formLabel="formLabel" :config="config">
        <slot>
          <el-button type="primary" @click="loginClick">登录</el-button>
        </slot>
      </component-from>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import ComponentFrom from "@/components/componentForm";
import { getMenu } from "@/utils/api.js";
export default {
  components: {
    ComponentFrom
  },
  data() {
    return {
      config: {
        width: "50px"
      },
      loginFrom: {
        username: "admin",
        password: "123456"
      },
      formLabel: [
        {
          label: "账号 :",
          model: "username"
        },
        {
          label: "密码 :",
          model: "password",
          type: "password"
        }
      ]
    };
  },
  methods: {
    ...mapMutations("Longin", ["SETMENU", "CLEARMENU", "ADDMENU"]),
    ...mapMutations("User", ["SET_TOKEN"]),
    // 登录
    loginClick() {
      getMenu(this.loginFrom).then(res => {
        if (res.data.code !== 20000) {
          this.$message({
            message: res.data.data.message,
            type: "warning"
          });
        } else {
          // 先清空，，在登录防止2次登录
          this.CLEARMENU(); //清空	token
          this.SETMENU(res.data.data.menu); //保存路由菜单
          this.SET_TOKEN(res.data.data.token); //保存	token
          this.ADDMENU(this.$router); //  把路由菜单添加到  this.$router  里面
          this.$router.push({ path: "/Home" });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped="scoped">
.login {
  width: 100%;
  height: 100%;
  background-color: #e9e9e9;
  &_content {
    background-color: #e1e1e1;
    width: 360px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .el-button {
      width: 100%;
      height: 40px;
    }
  }
}
</style>
