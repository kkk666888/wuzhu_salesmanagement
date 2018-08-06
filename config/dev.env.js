'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // NODE_URL: '"http://10.35.90.110:8102/market/"' //销售管理系统-品欣
  // NODE_URL: '"http://10.35.90.9:8102/market/"' //销售管理系统-海军
  // NODE_URL: '"http://10.35.40.67:8102/market/"', //销售管理系统-泉涌
  NODE_URL: '"https://wuzhutes.woozhu.cn:50047/market/"' // 测试环境
  // NODE_URL: '"https://wuzhu.woozhu.cn/market/"',    // 生产环境
});
