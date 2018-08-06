const data = {
  id: 1,
  loginName: 'admin',
  realName: '管理员',
  menuTree: [
    {
      id: 111,
      parentId: 0,
      resourceName: '首页',
      resourceCode: 'index',
      resourceType: 'MENU',
      resourceUrl: '',
      resourceIcon: '',
      requestMethod: null,
      orderNum: 1,
      leaf: false
    },
    {
      id: 1,
      parentId: 0,
      resourceName: '系统管理',
      resourceCode: 'systemManager',
      resourceType: 'DIRT',
      resourceUrl: '',
      resourceIcon: '',
      requestMethod: null,
      orderNum: 1,
      leaf: false,
      children: [
        {
          id: 11,
          parentId: 1,
          resourceName: '用户管理',
          resourceCode: 'userManager',
          resourceType: 'MENU',
          resourceUrl: '',
          resourceIcon: '',
          requestMethod: null,
          orderNum: 1,
          leaf: false
        },
        {
          id: 12,
          parentId: 1,
          resourceName: '区域管理',
          resourceCode: 'areaManager',
          resourceType: 'MENU',
          resourceUrl: '',
          resourceIcon: '',
          requestMethod: null,
          orderNum: 1,
          leaf: false
        },
        {
          id: 13,
          parentId: 1,
          resourceName: '角色管理',
          resourceCode: 'characterManager',
          resourceType: 'MENU',
          resourceUrl: '',
          resourceIcon: '',
          requestMethod: null,
          orderNum: 1,
          leaf: false
        },
        {
          id: 14,
          parentId: 1,
          resourceName: '资源管理',
          resourceCode: 'resourceManager',
          resourceType: 'MENU',
          resourceUrl: '',
          resourceIcon: '',
          requestMethod: null,
          orderNum: 1,
          leaf: false
        },
        {
          id: 15,
          parentId: 1,
          resourceName: '部门管理',
          resourceCode: 'departmentManager',
          resourceType: 'MENU',
          resourceUrl: '',
          resourceIcon: '',
          requestMethod: null,
          orderNum: 1,
          leaf: false
        }
      ]
    },
    {
      id: 2,
      parentId: 0,
      resourceName: '数据管理',
      resourceCode: 'dataManager',
      resourceType: 'DIRT',
      resourceUrl: '',
      resourceIcon: '',
      requestMethod: null,
      orderNum: 1,
      leaf: false,
      children: [
        // {
        //   id: 21,
        //   parentId: 2,
        //   resourceName: '数据看板',
        //   resourceCode: 'dataDashboard1',
        //   resourceType: 'MENU',
        //   resourceUrl: '',
        //   resourceIcon: '',
        //   requestMethod: null,
        //   orderNum: 1,
        //   leaf: false
        // }
        {
          id: 21,
          parentId: 2,
          resourceName: '个人基本情况',
          resourceCode: 'PersonalBoard',
          resourceType: 'MENU',
          resourceUrl: '',
          resourceIcon: '',
          requestMethod: null,
          orderNum: 1,
          leaf: false
        },
        {
          id: 22,
          parentId: 2,
          resourceName: '销售基本情况',
          resourceCode: 'CustomBoard',
          resourceType: 'MENU',
          resourceUrl: '',
          resourceIcon: '',
          requestMethod: null,
          orderNum: 1,
          leaf: false
        },
        {
          id: 23,
          parentId: 2,
          resourceName: '客户明细',
          resourceCode: 'CustomerDetailBoard',
          resourceType: 'MENU',
          resourceUrl: '',
          resourceIcon: '',
          requestMethod: null,
          orderNum: 1,
          leaf: false
        },
        {
          id: 24,
          parentId: 2,
          resourceName: '下单情况',
          resourceCode: 'OrderDetailBoard',
          resourceType: 'MENU',
          resourceUrl: '',
          resourceIcon: '',
          requestMethod: null,
          orderNum: 1,
          leaf: false
        },
        {
          id: 25,
          parentId: 2,
          resourceName: '风控情况',
          resourceCode: 'WindBoard',
          resourceType: 'MENU',
          resourceUrl: '',
          resourceIcon: '',
          requestMethod: null,
          orderNum: 1,
          leaf: false
        }
      ]
    },
    {
      id: 3,
      parentId: 0,
      resourceName: '人员管理',
      resourceCode: 'staffManager',
      resourceType: 'DIRT',
      resourceUrl: '',
      resourceIcon: '',
      requestMethod: null,
      orderNum: 1,
      leaf: false,
      children: [
        {
          id: 31,
          parentId: 3,
          resourceName: '通讯录管理',
          resourceCode: 'AddresslistManager',
          resourceType: 'MENU',
          resourceUrl: '',
          resourceIcon: '',
          requestMethod: null,
          orderNum: 1,
          leaf: false
        }
      ]
    }
    // {
    //   id: 99,
    //   parentId: 0,
    //   resourceName: '归还管理',
    //   resourceCode: 'returnManage',
    //   resourceType: 'DIRT',
    //   resourceUrl: '',
    //   resourceIcon: '',
    //   requestMethod: null,
    //   orderNum: 1,
    //   leaf: false,
    //   children: [
    //     {
    //       id: 991,
    //       parentId: 99,
    //       resourceName: '归还申请单管理',
    //       resourceCode: 'returnApplication',
    //       resourceType: 'MENU',
    //       resourceUrl: '',
    //       resourceIcon: '',
    //       requestMethod: null,
    //       orderNum: 1,
    //       leaf: false
    //     },
    //     {
    //       id: 993,
    //       parentId: 99,
    //       resourceName: '订单管理',
    //       resourceCode: 'order',
    //       resourceType: 'MENU',
    //       resourceUrl: '',
    //       resourceIcon: '',
    //       requestMethod: null,
    //       orderNum: 1,
    //       leaf: false
    //     }
    //   ]
    // }
  ]
};
export default data;
