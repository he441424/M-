import axios from 'axios'

const http = axios.create({
  baseURL: 'http://xmall.exrick.cn/', // 共用的域名
  timeout: 10000, // 超过这个时间报错
  headers: { "Access-Control-Allow-Origin":"http://xmall.exrick.cn/"}
})

// axios拦截器
// http.interceptors.request//发送请求之前做的事情
// http.interceptors.response接受数据之前做的事情

http.interceptors.request.use(function (config) {
  // 拦截之前做一个加载提示
 
  return config
}, function (error) {
  return error
}
)
http.interceptors.response.use(function (config) {
  // 返回数据之前加载
  // 把提示给关闭
  
  return config
}, function (error) {
  return error
})

// 导出
export default http
