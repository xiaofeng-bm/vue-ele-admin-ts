<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">Vue Element Admin</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"></svg-icon>
        </span>
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="大写已开启"
        placement="right"
        manual
      >
        <el-form-item>
          <span class="svg-container">
            <svg-icon icon-class="password"></svg-icon>
          </span>
          <el-input
            ref="password"
            :type="passwordType"
            v-model="loginForm.password"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        class="login-btn"
        type="primary"
        :loading="loading"
        @click="handleLogin"
      >
        登录
      </el-button>

      <div class="tips-container">
        <div class="tips-item" v-for="user in tipsList" :key="user.username">
          <span>账号：{{ user.username }}</span>
          <span>密码：{{ user.password }}</span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Input, Form } from "element-ui";
import { UserModule } from "@/store/modules/user";

@Component({
  name: "Login",
})
export default class extends Vue {
  private loginForm = {
    username: "admin",
    password: "123456",
  };
  private loginRules = {
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  };
  private tipsList = [
    { username: 'admin', password: '随便填' },
    { username: 'zhangshucai', password: '随便填' },
    { username: 'feiqiaohong', password: '随便填' },
    { username: 'xuwenmin', password: '随便填' },
    { username: 'linzhengpeng', password: '随便填' },
  ]

  private loading = false;
  private passwordType = "password"; // 密码框type
  private capsTooltip = false; // 大写提示是否可见

  private async handleLogin() {
    (this.$refs.loginForm as Form).validate(async (valid: boolean) => {
      if (valid) {
        this.loading = true;
        await UserModule.Login(this.loginForm).catch(err => {
          this.loading = false;
        });
        this.loading = false;
        this.$router.push({ path: "/" });
      }
    });
  }
  // 显示密码
  private showPwd() {
    if (this.passwordType === "password") {
      this.passwordType = "text";
    } else {
      this.passwordType = "password";
    }
    this.$nextTick(() => {
      (this.$refs.password as Input).focus();
    });
  }
  // 判断大小写
  private checkCapslock(e: KeyboardEvent) {
    const { key } = e;
    this.capsTooltip =
      key !== null && key.length === 1 && key >= "A" && key <= "Z";
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background-color: $login_bg;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    width: 420px;
  }

  .title-container {
    .title {
      font-size: 26px;
      color: $light_gray;
      text-align: center;
      font-weight: bold;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 6px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    // 去除来回切换选中问题
    user-select: none;
  }

  .login-btn {
    width: 100%;
  }
}
</style>
<style lang="scss">
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      color: $light_gray;
      padding: 12px 5px 12px 15px;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
.tips-container {
  margin-top: 20px;
  color: #fff;
  width: 100%;
   span {
     width: 50%;
     display: inline-block;
     padding: 4px 0;
   }
}

</style>
