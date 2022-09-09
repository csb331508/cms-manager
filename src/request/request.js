
import axios from "axios";


const intance = axios.create({
  baseURL: '/api',
  timeout: 5000
})
// 请求拦截器
intance.interceptors.request.use(
  (config) => {
    // 添加cookie
    let token = localStorage.getItem("cms-token")
    if(token){
      config.headers = {"cms-token":token}
    }
  
    // console.log('请求成功拦截');
    return config
  },
  (error) => {
    // console.log('请求失败拦截');
    return Promise.reject(error)
  }
)
// 响应拦截器
intance.interceptors.response.use(
  (response) => {
    // console.log('响应成功拦截');
    return response.data
  },
  (error) => {
    // console.log('响应失败拦截');
    return Promise.reject(error)
  }
)
export default intance
