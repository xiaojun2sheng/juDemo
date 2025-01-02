import request from './request.js'

export const uploadImgIdentifyApi = (config = {}) => {
  return request({
    url: '/cigarette/detect',
    method: 'post',
    ...config,
  });
}