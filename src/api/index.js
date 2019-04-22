import baseJs from './base.js';
import login from './service/login.js';

// 系统管理
import role from './systemManager/characterManager.js';
import source from './systemManager/sourceManager.js';
import department from './systemManager/departmentManager.js';
import user from './systemManager/userManager.js';
import area from './systemManager/areaManager.js';

// 人员管理
import address from './staffManager/addresslistManager';

// 数据面板
import custom from './dataDashBoard/customBoard';
import customerDetail from './dataDashBoard/customerDetailBoard';
import customerDetailMore from './dataDashBoard/customerDetailMoreBoard';
import orderDetail from './dataDashBoard/orderDetailBoard';
import orderDetailMore from './dataDashBoard/orderDetailMoreBoard';
import personal from './dataDashBoard/personalBoard';
import wind from './dataDashBoard/windBoard';

// 融资管理
import financeManager from './financeManager/financeManager';
// 退款管理
import refunds from './financeManager/refundsManager';

const api = {
  login: baseJs.init(login),
  role: baseJs.init(role),
  source: baseJs.init(source),
  department: baseJs.init(department),
  user: baseJs.init(user),
  area: baseJs.init(area),
  address: baseJs.init(address),
  custom: baseJs.init(custom),
  customerDetail: baseJs.init(customerDetail),
  customerDetailMore: baseJs.init(customerDetailMore),
  orderDetail: baseJs.init(orderDetail),
  orderDetailMore: baseJs.init(orderDetailMore),
  personal: baseJs.init(personal),
  wind: baseJs.init(wind),
  financeManager: baseJs.init(financeManager),
  refunds: baseJs.init(refunds)
};

export default api;
