// 客户账户管理
import _import from './importFile.js';

const dataDashboard = [
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
  }
];

export default dataDashboard;
