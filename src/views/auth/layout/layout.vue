<template>
  <div class="index-main">
    <div class="index-header">
      <div class="index-header-logo">
        <!-- <img :src="favicon"/> -->
        业务管理
        <span class="index-s-z" @click="setZhankuai()">
          <i v-show="isZhankuai" class="iconfont icon-shouqi-test"></i>
          <i v-show="!isZhankuai" class="iconfont icon-zhankai-test"></i>
        </span>
      </div>
      <div class="index-header-right">
        <div>
          <span class="index-header-welcome">欢迎您，{{realName}}</span>
          <a href="javascript:;" class="modify-password" @click="modifyPassword">修改密码</a>
          <div class="login-out-btn" @click="loginOut()">退出登录</div>
        </div>
      </div>
    </div>
    <div class="index-body">
      <div class="index-left" :class="{'index-left-shouqi':!isZhankuai}">
        <div class="index-menu">
          <my-tree ref="tree" :data="get_permission_menus" :option="treeOption" @treeClick="menuClick"></my-tree>
        </div>
      </div>
      <div class="index-right">
        <div id="indexTabs" class="index-tabs">
          <div id="tabContainer" class="tab-container">
            <span class="tab-item" :class="{'tab-item-active':routeTabs.active === item.name}" v-for="item in routeTabs.data" :key="item.id" @click="tabClick(item)">
              {{item.label}}
              <span v-if="item.name!='index'" class="span-close" @click="tabRemove($event,item)">
                <i class="el-icon-close"></i>
              </span>
            </span>
          </div>
        </div>
        <transition name="fade" mode="out-in">
          <keep-alive :include="include">
            <router-view class="router-view" />
          </keep-alive>
        </transition>
      </div>
    </div>
    <!-- 修改密码弹窗 -->
    <my-dialog :title='modifyDialog.title' :visible.sync='modifyDialog.visible' @onConfirm="confirmReceiptSave()">
      <div class="confirm-receipt-dialog">
        <el-form :model="modifyPasswordForm" :rules="modifyPasswordRules" ref="modifyPasswordForm" label-width="100px" class="dialog-form">
          <el-form-item label="旧密码" prop="oldPwd">
            <el-input type="password" v-model="modifyPasswordForm.oldPwd" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPwd">
            <el-input type="password" v-model="modifyPasswordForm.newPwd" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPwd">
            <el-input type="password" v-model="modifyPasswordForm.confirmPwd" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </my-dialog>
  </div>
</template>

<script>
import layoutJs from './layout.js';
export default layoutJs;
</script>

<style lang="scss" scoped>
@import './layout.scss';
</style>
