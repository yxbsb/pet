// 引用axios
var axios = require('axios')

//基地址
let base = process.env.API_ROOT


//通用方法
export const POST = (url, params) => {
  return axios.post(`${base}${url}`, params).then(res => res.data)
}

//表单方法
export const POSTFORM = (url, params) => {
  const config ={headers:{"Content-Type":"multipart/form-data"}}
  return axios.post(`${base}${url}`, params, config).then(res => res.data)
}

export const GET = (url, params) => {
  return axios.get(`${base}${url}`, {
    params: params
  }).then(res => res.data)
}

export const PUT = (url, params) => {
  return axios.put(`${base}${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
  return axios.delete(`${base}${url}`, {
    params: params
  }).then(res => res.data)
}

export const PATCH = (url, params) => {
  return axios.patch(`${base}${url}`, params).then(res => res.data)
}
