//  所有关于频道的借口
import request from '@/utils/request'
/**
 * 获取用户自己的频道
 * @returns Promise
 */
export const cheChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
/**
 * 获取所有频道
 * @returns Promise
 */
export const getAllChannelAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}
