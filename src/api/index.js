import baseJs from './base.js';
import login from './service/login.js';
import logistic from './service/logistic.js';
// 系统管理
import role from './systemManager/characterManager';
import source from './systemManager/sourceManager';
import deparment from './systemManager/departmentManager';
import user from './systemManager/userManager';
import area from './systemManager/areaManager';

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

const api = {
  login: baseJs.init(login),
  logistic: baseJs.init(logistic),
  role: baseJs.init(role),
  source: baseJs.init(source),
  department: baseJs.init(deparment),
  address: baseJs.init(address),
  user: baseJs.init(user),
  area: baseJs.init(area),
  custom: baseJs.init(custom),
  customerDetail: baseJs.init(customerDetail),
  customerDetailMore: baseJs.init(customerDetailMore),
  orderDetail: baseJs.init(orderDetail),
  orderDetailMore: baseJs.init(orderDetailMore),
  personal: baseJs.init(personal),
  wind: baseJs.init(wind)
};

export default api;
