// 所有关于频道导航的接口
import request from '@/utils/request'

/**
 * 获取用户自己的频道
 * @returns promise
 */
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

/**
 * 获取所有频道
 * @returns promise
 */
export const getAllChannelsAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}

/**
 * 删除频道
 * @param {Number|String} id
 * @returns promise
 */

export const delChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}

/**
 * 新增频道
 * @param {Number|String} id 新增频道的id
 * @param {Number} seq 新增频道议案九的索引值
 * @returns promise
 */
export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
