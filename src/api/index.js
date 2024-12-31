import request from './request.js'

export const testApi = (config = {}) => {
    request({
      url: '/test/wangjunjie',
      method: 'get',
      ...config,
    });
}

export const testPostApi = (config = {}) => {
    request({
      url: '/test/wangjunjie',
      method: 'post',
      ...config,
    });
}