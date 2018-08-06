import storageService from './storageService.js';
//公用js方法
export default {
  testData() {
    let data = [];
    for (var i = 1; i < 50; i++) {
      data.push({
        a: '测试数据',
        b: '测试数据',
        c: '测试数据',
        d: '测试数据',
        e: '测试数据',
        f: '测试数据',
        g: '测试数据',
        h: '测试数据',
        i: '测试数据',
        j: '测试数据',
        k: '测试数据',
        l: '测试数据',
        m: '测试数据',
        n: '测试数据'
      });
    }
    return data;
  },
  logonOut(vm) {
    storageService.session.remove(this.storageKey.resources);
  },
  storageKey: {
    resources: 'resources'
  },
  //深复制
  deepCopy(obj) {
    let type = Object.prototype.toString.call(obj);

    if (type == '[object Object]') {
      let newobj = {};

      for (var attr in obj) {
        newobj[attr] = this.deepCopy(obj[attr]);
      }

      return newobj;
    } else if (type == '[object Array]') {
      let newArr = [];

      for (var attr in obj) {
        newArr.push(this.deepCopy(obj[attr]));
      }

      return newArr;
    } else {
      return obj;
    }
  },
  //两对象深合并
  deepMerge(obj1, obj2) {
    var key;
    for (key in obj2) {
      obj1[key] =
        obj1[key] && obj1[key].toString() === '[object Object]'
          ? this.deepMerge(obj1[key], obj2[key])
          : (obj1[key] = obj2[key]);
    }
    return obj1;
  },
  //model赋值 目前只作用于一层
  setModelValue(model, data) {
    if (model && data) {
      for (var i in data) {
        if (model.hasOwnProperty(i)) {
          model[i] = data[i];
        }
      }
    }
  },
  //减少执行次数 比如在window.onresize
  throttle(method, context) {
    if (!method.tId) {
      method.call(context);
      method.tId = 1;
      setTimeout(() => (method.tId = 0), 500);
    }
  },
  // 去抖
  debounce(method, context) {
    var timer = null;
    return function() {
      clearTimeout(timer);
      timer = setTimeout(function() {
        method.call(context);
      }, 1000);
    };
  },
  //数组里移除项
  removeItem(data, prop, value) {
    let removeIndex = -1;

    if (data) {
      for (var i in data) {
        if (data[i][prop] == value) {
          removeIndex = parseInt(i);
          break;
        }
      }
    }

    if (removeIndex > -1) {
      data.splice(removeIndex, 1);
    }

    return removeIndex;
  },
  //上下移动排序
  move(data, type, index) {
    let result = [];
    let currentItem = data[index];

    switch (type) {
      case 'up':
        data[index] = data[index - 1];
        data[index - 1] = currentItem;
        break;
      case 'down':
        data[index] = data[index + 1];
        data[index + 1] = currentItem;
        break;
    }

    result = Object.assign([], data);

    return result;
  },
  //时间格式化
  defaultFormartData(date) {
    return this.formatDate(date, 'yyyy-MM-dd hh:mm:ss');
  },
  //时间格式化
  formatDate(date, fmt) {
    var o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt))
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    return fmt;
  },
  //获取时间差-小时
  getDateDifference(start, end) {
    var startDate = new Date(start);
    var endDate = new Date(end);
    return parseInt(endDate - startDate) / 1000 / 60 / 60;
  },
  //生成唯一标识
  generateUniqueValue() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  },
  //替换换行符
  replaceEnter(value) {
    value = value || '';
    let str = value.replace(/\r\n/g, '<br>');
    str = str.replace(/\n/g, '<br>');
    return str;
  },
  //设置高度
  setAutoHeight(el) {
    let rect = el.getBoundingClientRect();
    let height = window.innerHeight - rect.top - 10;
    el.style.height = height + 'px';
  },
  //正则验证
  valid: {
    isFloat(value) {
      let pattern = /^\d+(?:\.\d{1,2})?$/;
      return pattern.test(value);
    },
    //正整数
    isNum(value) {
      let pattern = /^\+?[0-9][0-9]*$/;
      return pattern.test(value);
    },
    isDate(value) {
      let pattern = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
      return pattern.test(value);
    },
    //判断是否只有一个字母
    isOneLetter(val) {
      let pattern = /^[A-Za-z]{1}$/;
      return pattern.test(val);
    }
  }
};
