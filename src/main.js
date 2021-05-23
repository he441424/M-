import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad)
// Vue.use(LazyLoad)

Vue.config.productionTip = false

// 路由守卫
router.beforeEach((to,from,next) => {
  // to从哪里来 from 到哪里去 next放行  
  // 一个路由匹配到的所有路由记录会暴露为 $route 对象（还有在导航钩子中的 route 对象）的 
  // $route.matched 数组。因此，我们需要遍历 $route.matched 来检查路由记录中的 meta 字段。
  if (to.matched.some(record => record.meta.auth)) {
    // 判断 如果在vuex中login为false的时候 就进入login 否则放行
    if (!store.state.userInfo) {
      // 定向到登录页面
      next({
        path: '/login',
        query: {
          redirect:to.fullPath
        }
      })
    } else {
    next()
      
    }
  } else {
    next()
  }
})



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// import axios from 'axios'
// Vue.prototype.$axios = axios
// axios.defaults.baseURL = 'http://xmall.exrick.cn' 