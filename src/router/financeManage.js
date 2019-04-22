// 客户账户管理
import _import from './importFile.js';

const financeManage = [
  // 融资管理---------------------------------------------
  {
    path: 'financeOrderList', // 融资查询
    name: 'FinanceOrderList',
    component: () => _import('FinanceManager/FinanceOrderList'),
    meta: { authority: true, routeTab: true, code: 'financeOrderList' }
  },
  {
    path: 'jinzuFinanceManager', // 金租融资管理
    name: 'JinzuFinanceManager',
    component: () => _import('FinanceManager/JinzuFinanceManager'),
    meta: { authority: true, routeTab: true, code: 'jinzuFinanceManager' }
  },
  {
    path: 'RefundsManager', // 金租融资管理
    name: 'RefundsManager',
    component: () => _import('FinanceManager/RefundsManager/RefundsManager'),
    meta: { authority: true, routeTab: true, code: 'RefundsManager' }
  }
];

export default financeManage;
