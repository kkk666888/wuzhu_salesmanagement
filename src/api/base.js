import axios from 'axios';
import qs from 'qs';
import loadingService from '../components/loading/loadingService.js';
import alertService from '../components/alert/alertService.js';
import common from '../utils/common.js';
import storageService from '../utils/storageService.js';

const baseURL = process.env.NODE_URL;

function send(requestData, option, config) {
  let thisObj = this;
  let promise = new Promise((resolve, reject) => {
    let url = thisObj.url;
    let contentType = thisObj.contentType || 'application/json';

    url += '?t=' + new Date().getTime();
    let method = thisObj.method || 'post';
    let axiosOption = {
      method: method, //get,delete,head,post,put,patch
      baseURL: baseURL,
      url: url,
      headers: {
        'Content-type': contentType
      },
      timeout: 30000,
      withCredentials: true
    };

    if (requestData) {
      if (method === 'put' || method === 'post' || method === 'pacth') {
        axiosOption.data = JSON.stringify(requestData);
      } else {
        if (!thisObj.isRESTful) {
          axiosOption.params = requestData;
        }
      }
    }

    axiosOption = common.deepMerge(axiosOption, config);
    let loadingInstance = null;

    if (option && option.showLoading) {
      loadingInstance = loadingService.create({ loadingTxt: option.loadingTxt || 'loading...' });
      loadingInstance.show();
    }
    axios(axiosOption)
      .then(response => {
        if (loadingInstance) {
          loadingInstance.hide();
          loadingInstance.destroy();
        }

        if (response.status === 200) {
          let data = response.data;

          // 登陆失效，跳转登陆页
          if (response.data.code == '2000') {
            storageService.cookie.remove('tokenStr');
            let href = window.location.href.split('#')[0];
            alertService.error('登陆失效，请重新登陆');
            window.location.href = `${href}#/login`;
          } else if ((data.code && data.code != '00') || (data.errCode && data.errCode != 0)) {
            if (option && !option.handleError) {
              alertService.error(data.msg || data.errMsg);
            }
          }

          resolve(data);
        } else {
          reject(error);
        }
      })
      .catch(error => {
        if (loadingInstance) {
          loadingInstance.hide();
          loadingInstance.destroy();
        }
        alertService.error(error.message);
        reject(error);
      });
  });

  return promise;
}

function showCatchErrors(error) {
  let data = null;

  if (error.response) {
    data = error.response.data;
  } else {
    data = error.message;
  }

  if (typeof data == 'string') {
    alertService.error(data);
    return;
  }

  let msg = '';

  if (data.errors) {
    data.errors.forEach(item => {
      msg += item.error + ': ' + item.defaultMessage;
    });
  }

  if (!msg) {
    msg = data.error + ': ' + data.message;
  }

  alertService.error(msg);
}

const apiService = {
  init: function(obj) {
    Object.keys(obj).forEach(item => {
      obj[item].send = send;
    });

    return obj;
  }
};

export default apiService;
