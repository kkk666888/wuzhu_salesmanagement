import Vue from 'vue';
import Router from 'vue-router';
import _import from './importFile.js';

import authorityManageRoutes from './authorityManage.js'; //权限管理
import dataDashboard from './dataDashboard';// 数据
import financeManage from './financeManage';// 融资
import addresslistManager from './addresslistManager';// 通讯录

Vue.use(Router);

let routes = [
  {
    name: 'login',
    path: '/login',
    component: () => _import('normal/login/login'),
    meta: { authority: false, hidden: true }
  },
  {
    name: '401',
    path: '/401',
    component: () => _import('normal/401'),
    meta: { authority: false, hidden: true }
  },
  {
    name: '404',
    path: '/404',
    component: () => _import('normal/404'),
    meta: { authority: false, hidden: true }
  }
];

let authorityRoutes = {
  path: '/',
  name: 'adminSys',
  redirect: '/index',
  component: () => _import('auth/layout/layout'),
  meta: { authority: true },
  children: [
    {
      path: 'index', //首页
      name: 'index',
      component: () => _import('auth/index'),
      meta: { authority: true, routeTab: true, code: 'index' }
    }
  ]
};

authorityRoutes.children = [
  ...authorityRoutes.children,
  ...authorityManageRoutes,
  ...dataDashboard,
  ...financeManage,
  ...addresslistManager
];

routes.push(authorityRoutes);
routes.push({ path: '*', redirect: '/404', meta: { hidden: true } });
const router = new Router({ routes: routes });

router.beforeEach((to, from, next) => {
  // console.log('to', to);
  // console.log('from', from);

  let app = router.app;
  let store = app.$store;
  if (to.meta.authority) {
    let resources = app.storage.session.getObj(app.common.storageKey.resources);
    let token = app.$storage.cookie.get('tokenStr');
    if (resources && token) {
      //页面刷新处理
      if (!store.state.main.isHandleData) {
        store.commit('set_permission_resources', resources);
      }
      //判断用户是否有权限
      let hasPermission = app.permission.hasMenuPermission(to, store.state.main.simpleMenus);
      if (hasPermission) {
        next();
      } else {
        next('/401');
      }
    } else {
      app.alert.toast('登录失效，请重新登录');
      next('/login?redirect=' + to.name);
    }
  } else {
    next();
  }
});

export default router;
