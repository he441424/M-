import Vue from 'vue'
import VueRouter from 'vue-router'
// 首页
import Home from '../views/01-home.vue'
// 商品
import goods from '../views/02-goods.vue'
// 商品详情页
import goodsDetails from '../views/03-goodsDetails.vue'

Vue.use(VueRouter)

const routes = [
  // 主页
  {
    path: '/Home',
    component: Home,
    // 判断那个页面需要显示home和nav等
    meta: {
      istrue: true
    }
  },
  // 全部商品
  {
    path: '/goods',
    component: goods,
    meta: {
      istrue: true
    }

  },
  // 商品详情页
  {
    path: '/goodsDetails/:id',
    component: goodsDetails,
    name: 'goodsDetails',
    meta: {
      istrue: true
    }
  },
  // 购物车详情页
  {
    path: '/cart',
    component: () => import('../views/04-cart.vue'),
    meta: {
      istrue: true,
      auth: true
    }
  },
  // 登录
  {
    path: '/login',
    component: () => import('../views/05-login.vue'),
    meta: {
      istrue: false
    }
  },
  // 用户中心
  {
    path: '/user',
    component: () => import('../views/06-user.vue'),
    meta: {
      auth: true
    }
  },
  // 重定向
  {
    path: '*',
    redirect: 'Home'
  }
]

const router = new VueRouter({

  routes
})

export default router
