import axios from "axios";

const Api = axios.create({
  baseURL: 'http://localhost:3000/', // 域名配置，可添加变量配置文件定义
  headers: {
    post: {
      'Content-Type': 'application/json',
    },
  },
  timeout: 30000, // 请求超时时间
});

// 错误处理函数
function errorHandle(response) {
  switch (response.status) {
    case 400:
      // 处理错误信息，例如抛出错误信息提示，或者跳转页面等处理方式。
      // return Promise.resolve(error)
      break;
    case 401:
      //
      break;
    case 404:
      //
      break;
    // ...
    default:
      throw new Error("未知错误");
  }
}
// 成功处理函数

function successHandle(response) {
  switch (response.status) {
    case 200:
      //
      return response.data;
    // ....
    default:
      return;
  }
}
// 请求拦截器
Api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // 错误抛到业务代码
    error.data = {};
    error.data.msg = "服务器异常";
    return Promise.resolve(error);
  }
);

Api.interceptors.response.use(
  (response) => {
    successHandle(response);
  },
  (err) => {
    errorHandle(err);
  }
);

export default Api;


