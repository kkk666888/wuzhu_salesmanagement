// 客户账户管理
import _import from './importFile.js';

const addresslistManager = [
// 人员管理---------------------------------------------------
  {
    path: 'AddresslistManager', // 通讯录管理
    name: 'AddresslistManager',
    component: () => _import('m-staffManager/AddresslistManager/AddresslistManager'),
    meta: { authority: true, routeTab: true, code: 'AddresslistManager' }
  }
];

export default addresslistManager;
