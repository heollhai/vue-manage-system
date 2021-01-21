<template>
  <div class="login">
    <div class="login_content">
      <component-from
        :form="loginFrom"
        :formLabel="formLabel"
        :config="config"
        :rules="rules"
        ref="aaaa"
      >
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
        width: "80px"
      },
      loginFrom: {
        username: "admin",
        password: "123456"
      },
      formLabel: [
        {
          label: "账号 :",
          model: "username",
          rules: "username"
        },
        {
          label: "密码 :",
          model: "password",
          rules: "password",
          type: "password"
        }
      ],
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapMutations("Longin", ["SETMENU", "CLEARMENU", "ADDMENU"]),
    ...mapMutations("User", ["SET_TOKEN"]),
    // 登录
    loginClick() {
      // console.log(this.$refs.aaaa.form, "this.$refs.aaaa.form");
      this.$refs.aaaa.$refs["form"].validate(valid => {
        if (valid) {
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
        } else {
          console.log("error submit!!");
          return false;
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
