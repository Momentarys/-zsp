import request from '@/utils/request'

/**
 *
 * @param {String} mobile 手机号
 * @param {Number} code 验证码
 * @returns promiss
 */
// user.js划分是跟后端接口文档
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

/**
 *
 * @param {String} mobile
 * @returns promiss
 */
// 定义一个函数传参 获取接口
export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}
