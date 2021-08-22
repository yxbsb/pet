<template>
  <el-tabs type="border-card" class="login-container">
    <el-tab-pane>
      <span slot="label"><i class="el-icon-user-solid"></i> 登录</span>
      <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="50px" hide-required-asterisk status-icon
               class="demo-ruleForm">
        <h3 class="title">{{title}}</h3>
        <el-form-item label="账号"prop="username">
          <el-input type="text" v-model="account.username" auto-complete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码"prop="pwd">
          <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane>
      <span slot="label"><i class="el-icon-edit"></i> 注册</span>
      <el-form ref="RegFrom" :model="account" :rules="rules" label-position="left" label-width="50px" status-icon
               class="demo-ruleForm">
        <h3 class="title">注册{{title}}</h3>
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="account.username" auto-complete="off" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="account.name" auto-complete="off" placeholder="请输入您的姓名"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleReg" :loading="loading">注册</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
import API from "../api/api_user";
import { bus } from "../bus.js";

export default {
  name: "Login",
  data() {
    return {
      title: '宠物定位管理平台',
      loading: false,
      account: {
        username: "",
        name: "",
        pwd: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
      },
      checked: true
    };
  },
  methods: {
    handleLogin() {
      let that = this;
      this.$refs.AccountFrom.validate(valid => {
        if (valid) {
          this.loading = true;
          let loginParams = {
            username: this.account.username,
            password: this.account.pwd
          };
          // bus.$emit("setNickName",loginParams.username)
          // that.$router.push({ path: "/home" });

          API.login(loginParams)
            .then(
              function(result) {
                that.loading = false;
                if (result.code === 200) {
                  // this.$bus.$emit("username",loginParams.username)
                  localStorage.setItem("access-token", result.token);
                  localStorage.setItem("menus", JSON.stringify(result.router));
                  localStorage.setItem("perms",JSON.stringify(result.perms))
                  localStorage.setItem("currentUser",JSON.stringify(result.user))
                  // that.$router.push({ path: "/" });
                  that.$router.push({ path: "/home" });
                } else {
                  that.$message.error({
                    showClose: true,
                    message: result.msg || "登录失败",
                    duration: 2000
                  });
                }
              },
              function(err) {
                that.loading = false;
                that.$message.error({
                  showClose: true,
                  message: err.toString(),
                  duration: 2000
                });
              }
            )
            .catch(function(error) {
              that.loading = false;
              console.log(error);
              that.$message.error({
                showClose: true,
                message: "请求出现异常",
                duration: 2000
              });
            });
        }
        else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleReg() {
      let that = this;
      this.$refs.RegFrom.validate(valid => {
        if (valid) {
          this.loading = true;
          let loginParams = {
            username: this.account.username,
            name: this.account.name,
            password: this.account.pwd
          };
          API.register(loginParams)
            .then(
              function(result) {
                that.loading = false;
                if (result.code === 200) {
                  that.$message.success({
                    showClose: true,
                    message: "注册成功，请登录",
                    duration: 2000
                  });
                } else {
                  that.$message.error({
                    showClose: true,
                    message: result.msg || "注册失败",
                    duration: 2000
                  });
                }
              },
              function(err) {
                that.loading = false;
                that.$message.error({
                  showClose: true,
                  message: err.toString(),
                  duration: 2000
                });
              }
            )
            .catch(function(error) {
              that.loading = false;
              console.log(error);
              that.$message.error({
                showClose: true,
                message: "请求出现异常",
                duration: 2000
              });
            });
        }
      });
    },


  },
  beforeDestroy () {
    bus.$emit("setNickName",this.account.username)
  },
}
</script>

<style>
body {
  background: #dfe9fb;
}
</style>
<style lang="scss" scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 25px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 160px auto;
  width: 400px;
  padding: 35px 35px 15px 35px;
  background: #f5f7fa;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  background: -ms-linear-gradient(top, #ace, #00c1de); /* IE 10 */
  background: -moz-linear-gradient(top, #ace, #00c1de); /*火狐*/
  background: -webkit-gradient(
      linear,
      0% 0%,
      0% 100%,
      from(#ace),
      to(#00c1de)
  ); /*谷歌*/
  background: -webkit-linear-gradient(
      top,
      #ace,
      #00c1de
  ); /*Safari5.1 Chrome 10+*/
  background: -o-linear-gradient(top, #ace, #00c1de); /*Opera 11.10+*/

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>
