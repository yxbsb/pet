import * as API from './'
import httpClient from "../utils/httpClient";


export default {
  //分页查询
  listByPage: (data,callback) => {
    console.log(data)
    return httpClient('/petListByPage', {method:'post',data,}, callback);
  },

  //添加
  insert: (data,callback) => {
    return httpClient('/petInsert', {method:'post',data,}, callback);
  },

  //修改
  update: (data,callback) => {
    return httpClient('/petUpdate', {method:'post',data,}, callback);
  },

  //删除
  delete: (data,callback) => {
    return httpClient('/petDelete', {method:'post',data,}, callback);
  },
}
