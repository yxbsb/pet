import * as API from './'


export default {
  //登录
  login: params => {
    return API.POST('/login', params)
  },
  //注册
  register: params => {
    return API.POST('/register', params)
  },
  //登出
  logout: params => {
    return API.GET('/logout', params)
  }
}
