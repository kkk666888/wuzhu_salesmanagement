<template>
  <div class="login-main">
    <div class="login-words">Hello, Welcome back!</div>
    <div class="login-div">
      <div class="login-body">
        <div class="login-header">业务管理平台</div>
        <div class="login-container">
          <div class="login-item">
            <div class="login-item-icon">
              <div class="user-icon"></div>
            </div>
            <div class="login-item-input-div">
              <input class="login-item-input" type="text" placeholder="请输入账号" v-model="loginName" />
            </div>
          </div>
          <div class="login-item">
            <div class="login-item-icon">
              <div class="user-pwd"></div>
            </div>
            <div class="login-item-input-div">
              <input class="login-item-input" type="password" @keyup.enter="login" placeholder="请输入密码" v-model="password" />
            </div>
          </div>
          <div class="login-btn" @click="login">登录</div>
        </div>
      </div>
    </div>
    <div class="copyright">深圳金达数据科技有限公司版权所有</div>
  </div>
</template>

<script>
import vueJs from './login.js';
export default vueJs;
</script>


<style lang="scss" scoped>
@import './login.scss';
</style>
