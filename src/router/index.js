import Vue from 'vue';
import Router from 'vue-router';

const _import = file => import('@/views/' + file + '.vue');

Vue.use(Router);

const router = new Router({
  routes: [
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
    },
    {
      name: 'system',
      path: '/system',
      component: () => _import('normal/404'),
      meta: { authority: false, hidden: true }
    },
    {
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
        },
        // 数据管理-------------------------------------------
        {
          path: 'DataDashboard/PersonalBoard', // 个人基本情况
          name: 'PersonalBoard',
          component: () => _import('m-dataManager/DataDashboard/PersonalBoard'),
          meta: { authority: true, routeTab: true, code: 'PersonalBoard' }
        },
        {
          path: 'DataDashboard/CustomBoard', // 销售基本情况
          name: 'CustomBoard',
          component: () => _import('m-dataManager/DataDashboard/CustomBoard'),
          meta: { authority: true, routeTab: true, code: 'CustomBoard' }
        },
        {
          path: 'DataDashboard/CustomerDetailBoard', // 客户明细
          name: 'CustomerDetailBoard',
          component: () => _import('m-dataManager/DataDashboard/CustomerDetailBoard'),
          meta: { authority: true, routeTab: true, code: 'CustomerDetailBoard' }
        },
        {
          path: 'DataDashboard/OrderDetailBoard', // 下单详情
          name: 'OrderDetailBoard',
          component: () => _import('m-dataManager/DataDashboard/OrderDetailBoard'),
          meta: { authority: true, routeTab: true, code: 'OrderDetailBoard' }
        },
        {
          path: 'DataDashboard/WindBoard', // 风控情况
          name: 'WindBoard',
          component: () => _import('m-dataManager/DataDashboard/WindBoard'),
          meta: { authority: true, routeTab: true, code: 'WindBoard' }
        },
        {
          path: 'DataDashboard/CustomerDetailMoreBoard', // 客户详情(客户明细更多)
          name: 'CustomerDetailMoreBoard',
          component: () => _import('m-dataManager/DataDashboard/CustomerDetailMoreBoard'),
          meta: { authority: true, routeTab: true, code: 'CustomerDetailMoreBoard' }
        },
        {
          path: 'DataDashboard/OrderDetailMoreBoard', // 订单详情（下单详情更多）
          name: 'OrderDetailMoreBoard',
          component: () => _import('m-dataManager/DataDashboard/OrderDetailMoreBoard'),
          meta: { authority: true, routeTab: true, code: 'OrderDetailMoreBoard' }
        },
        // 系统管理---------------------------------------------
        {
          path: 'userManager', // 用户管理
          name: 'UserManager',
          component: () => _import('m-systemManager/UserManager/UserManager'),
          meta: { authority: true, routeTab: true, code: 'userManager' }
        },
        {
          path: 'characterManager', // 角色管理
          name: 'CharacterManager',
          component: () => _import('m-systemManager/CharacterManager/CharacterManager'),
          meta: { authority: true, routeTab: true, code: 'characterManager' }
        },
        {
          path: 'resourceManager', // 资源管理
          name: 'ResourceManager',
          component: () => _import('m-systemManager/ResourceManager/ResourceManager'),
          meta: { authority: true, routeTab: true, code: 'resourceManager' }
        },
        {
          path: 'areaManager', // 区域管理
          name: 'AreaManager',
          component: () => _import('m-systemManager/AreaManager/AreaManager'),
          meta: { authority: true, routeTab: true, code: 'areaManager' }
        },
        {
          path: 'departmentManager', // 部门管理
          name: 'DepartmentManager',
          component: () => _import('m-systemManager/DepartmentManager/DepartmentManager'),
          meta: { authority: true, routeTab: true, code: 'departmentManager' }
        },
        // 人员管理---------------------------------------------------
        {
          path: 'AddresslistManager', // 通讯录管理
          name: 'AddresslistManager',
          component: () => _import('m-staffManager/AddresslistManager/AddresslistManager'),
          meta: { authority: true, routeTab: true, code: 'AddresslistManager' }
        }
      ]
    },
    {
      path: '*',
      redirect: '/404',
      meta: { hidden: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  let app = router.app;
  let store = app.$store;
  if (to.meta.authority) {
    let resources = app.$storage.session.getObj(app.$common.storageKey.resources);
    let token = app.$storage.cookie.get('tokenStr');
    if (resources && token) {
      //页面刷新处理
      if (!store.state.main.isHandleData) {
        store.commit('set_permission_resources', resources);
      }
      //判断用户是否有权限
      let hasPermission = app.$permission.hasMenuPermission(to, store.state.main.simpleMenus);
      if (hasPermission) {
        next();
      } else {
        next('/401');
      }
    } else {
      app.$alert.toast('登录失效，请重新登录');
      next('/login?redirect=' + to.name);
    }
  } else {
    next();
  }
});

export default router;
