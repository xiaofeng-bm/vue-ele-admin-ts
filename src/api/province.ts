import request from '@/utils/request';

export  function getProvince() {
  return request({
    url: '/province/province',
    method: 'get'
  })
}

export function getCity(params: any) {
  return request({
    url: '/province/city',
    method: 'get',
    params
  })
}

export function getArea(params: any) {
  return request({
    url: '/province/area',
    method: 'get',
    params
  })
}