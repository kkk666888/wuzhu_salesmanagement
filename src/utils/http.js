import axios from 'axios';
import qs from 'qs';

const Http = {
  // _hoststr: 'http://10.35.40.71:8102/market/',    // quanyong
  // _hoststr: 'http://10.35.90.9:8106/market/',    // haijun
  _hoststr: 'https://wuzhu.woozhu.cn/market/', // shengchan
  _timeout: 60000, // 60s
  withCredentials: true,

  reConstruct: function(url, headers) {
    url = Http._hoststr + url;
    if (typeof headers !== 'object') {
      console.error('Http: headers is not object!!');
    }
    // headers['withCredentials'] = true
    return [url, headers];
  },
  qs: val => {
    return qs.stringify(val);
  },
  get: (url, params = {}, headers = {}, usrTimeout = null, errorCallback) => {
    [url, headers] = Http.reConstruct(url, headers);
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: params,
          headers: headers,
          timeout: usrTimeout || Http._timeout,
          withCredentials: true
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
          // setError(err)
          if (typeof errorCallback === 'function') {
            errorCallback(err);
          }
        });
    });
  },
  post: (url, data = {}, headers = {}, usrTimeout = null, errorCallback) => {
    [url, headers] = Http.reConstruct(url, headers);
    return new Promise((resolve, reject) => {
      console.log('recalled');
      axios
        .post(url, data, {
          headers: headers,
          timeout: usrTimeout || Http._timeout,
          withCredentials: true
        })
        .then(
          res => {
            resolve(res.data);
          },
          err => {
            reject(err);
            // setError(err)
            if (typeof errorCallback === 'function') {
              errorCallback(err);
            }
          }
        );
    });
  },
  patch: (url, data = {}, headers = {}, usrTimeout = null, errorCallback) => {
    [url, headers] = Http.reConstruct(url, headers);
    return new Promise((resolve, reject) => {
      axios
        .patch(url, data, {
          headers: headers,
          timeout: usrTimeout || Http._timeout,
          withCredentials: true
        })
        .then(
          res => {
            resolve(res.data);
          },
          err => {
            reject(err);
            // setError(err)
            if (typeof errorCallback === 'function') {
              errorCallback(err);
            }
          }
        );
    });
  },
  put: (url, data = {}, headers = {}, usrTimeout = null, errorCallback) => {
    [url, headers] = Http.reConstruct(url, headers);
    return new Promise((resolve, reject) => {
      axios
        .put(url, data, {
          headers: headers,
          timeout: usrTimeout || Http._timeout,
          withCredentials: true
        })
        .then(
          res => {
            resolve(res.data);
          },
          err => {
            reject(err);
            // setError(err)
            if (typeof errorCallback === 'function') {
              errorCallback(err);
            }
          }
        );
    });
  }
};
export default Http;
