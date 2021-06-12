import Vue from 'vue'
import Vuex from 'vuex'
// 引入vuex持久化组件
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  // plugins: [createPersistedState()],
  state: {
    login: false, // 是否登录 初始值否
    //  localStorage.getItem("name")||null
    userInfo: null, // 个人信息
    cartList: [], // 购物车信息
    showCart: false, // 是否显示购物车
    navShow: true// 导航栏是否显示
  },

  mutations: {
    // 购物车控制显示隐藏
    SHOWCART (state, showCart) {
      state.showCart = showCart
    },
    // 购物车控制显示隐藏导航栏
    showNav (state, shownav) {
      state.navShow = shownav
    },
    // 个人信息储存
    isuser (state, info) {
      state.userInfo = info
      state.login = true
    },
    // 购物车信息
    // JOINCart(state, { id, img, name, price,num=1}) {
    // // 把购物车的信息取出来
    //   let cart = state.cartList ;
    //   //把传过来的数据取出来
    //   let goods = {
    //     id, img, name, price,num
    //   }
    //   let falg = true;
    //   // 判断用户是否第一次加入购物车 foreach遍历一下
    //   if (cart.length) {
    //     // 有数据了 遍历一下cart
    //     cart.forEach(item => {
    //       if (item.id === id) {
    //         if (item.num >= 0) {
    //           falg = false;
    //           item.num += num
    //         }
    //       }
    //     })
    //   }
    //   // 如果没有点击过的话就直接push到数组
    //   if (!cart.length || falg) {
    //     cart.push(goods);
    //   }
    //   // 把全部数据push上去
    //   state.cartList=cart
    // },

    JOINCart (state, { id, img, name, price, num = 1 }) {
      const cart = state.cartList
      const goods = {
        id,
        img,
        name,
        price

      }
      // 如果是第一次加入购物车就把他push
      // 循环全部数据 id和点击的id一样就直接数量+1
      let falg = true// 假设是第一次点击
      // 判断有没有数据 先判断没有数据 在到回来判断有数据
      // 如果有数据的时候
      if (cart.length) {
        // 循环数据 看看id是不是和点击id一样 是的话++
        // 然后falg改为false 不是第一次
        cart.forEach(item => {
          if (item.id === id) {
            if (item.num >= 0) {
              falg = false
              item.num += num
            }
          }
        })
      }
      // 如果没有数据
      if (!cart.length || falg) {
        goods.num = num
        cart.push(goods)
      }

      // 最后把数据push到list
      state.cartList = cart
    },
    // 删除购物车
    delCart (state, id) {
      const cart = state.cartList
      if (cart) {
        cart.forEach((item, index) => {
          if (item.id === id) {
            cart.splice(index, 1)
          }
        })
      }
    },
    // 退出登录
    remove (state) {
      state.userInfo = null
      state.login = false
    // state.cartList=[];
    }
  },

  actions: {
  },
  modules: {
  }
})
