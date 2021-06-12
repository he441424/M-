<template>
  <div>
    <div class="logo">
      <!-- <img src="" alt="" /> -->
      <img
        src="https://th.bing.com/th/id/R91d105114478316d8c30fa2c5cef93a3?rik=ON4ohch1VOI6gQ&riu=http%3a%2f%2fimg1.juimg.com%2f150727%2f330669-150HF0295879.jpg&ehk=UeFKl3doTumGvxtuG6WdVNkAAicLVb5AO6AIC9PhAKI%3d&risl=&pid=ImgRaw"
        alt=""
      />
    </div>
    <div class="search">
      <div style="float: left; margin: 0 50px">
        <el-input placeholder="请输入内容" v-model="input" clearable>
        </el-input>
      </div>
      <div style="float: left; margin: 0 30px">
        <a href="/#/goods">全部商品</a>
      </div>

      <div style="float: left; position: reavtive">
        <!-- 用户的信息 -->
        <div style="float: left; text-align: center">
          <div id="user" @mouseover="isShow = true">
            <a href="#/user" class="el-icon-user-solid"></a>
          </div>
          <div
            class="nav-user-wrapper"
            v-show="isShow"
            @mouseleave="isShow = false"
            v-if="login"
          >
            <i class="el-icon-caret-top"></i>
            <div class="nav-user-list">
              <ul>
                <!-- 头像 -->
                <li class="nav-user-avatar">
                  <div>
                    <el-avatar
                      :size="60"
                      src="https://empty"
                      @error="errorHandler"
                    >
                      <img
                        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                      />
                    </el-avatar>
                  </div>
                </li>
                <li>
                  <p class="name">{{ userInfo }}</p>
                </li>
                <li>
                  <router-link to="/user/orderList">我的订单</router-link>
                </li>
                <li>
                  <router-link to="/user/information">账号资料</router-link>
                </li>
                <li>
                  <router-link to="/user/addressList">收货地址</router-link>
                </li>
                <li>
                  <router-link to="/user/support">售后服务</router-link>
                </li>
                <li>
                  <router-link to="/user/coupon">我的优惠</router-link>
                </li>
                <li style="border: none">
                  <!-- @click="logout" -->
                  <a href="javascript:;" @click="remover()">退出</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 购物车信息 -->

        <div
          class="cart"
          @mouseleave="SHOWCart(false)"
          @mouseenter="SHOWCart(true)"
        >
          <el-badge :value="total" class="item"> </el-badge>
          <a href="#/cart" class="el-icon-shopping-cart-2"> </a>
          <div class="user-cart" v-show="showCart">
            <!-- 购物车数量 -->

            <i class="el-icon-caret-top"></i>
            <div v-if="cartList.length !== 0">
              <ul>
                <li v-for="(item, i) in cartList" :key="i">
                  <div style="padding: 20px; display: flex">
                    <div class="img" style="float: left">
                      <img :src="item.img" alt="" width="80px" height="80px" />
                    </div>
                    <div class="item-desc">
                      <div>
                        <p class="name" :title="item.name">{{ item.name }}</p>
                        <span class="price"> {{ item.price }} </span>
                        <span class="num"> x{{ item.num }} </span>
                      </div>
                    </div>
                    <div class="del el-icon-error" @click="del(item.id)"></div>
                  </div>
                </li>
              </ul>
              <div class="total">
                <div class="total-price" style="float: left; padding: 0 30px">
                  <p>共{{ total }}件商品</p>
                  <h5>
                    合计 <span>￥{{ price }}</span>
                  </h5>
                </div>
                <div class="button">
                  <a href="#/cart"
                    ><el-button type="primary" round>去购物车</el-button></a
                  >
                </div>
              </div>
            </div>
            <!-- 购物车没有信息的时候显示 -->
            <div v-else style="text-align: center">你还没有要购买的商品</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入vuex
import { mapMutations, mapState } from 'vuex'

export default {
  mounted () {
    // console.log(this.cartList)
  },
  data () {
    return {
      input: '',
      // 购物车显示隐藏
      isShow: false
    }
  },
  computed: {
    // 解构state
    ...mapState(['login', 'userInfo', 'cartList', 'showCart']),
    // 计算总数
    total () {
      return this.cartList.reduce((total, item) => {
        total += item.num
        return total
      }, 0)
    },
    price () {
      return this.cartList.reduce((price, item) => {
        price += item.num * item.price
        return price
      }, 0)
    }
  },
  methods: {
    // 解构
    ...mapMutations(['SHOWCART', 'delCart', 'remove']),
    SHOWCart (state) {
      this.SHOWCART(state)
    },
    // 头像
    errorHandler () {
      return true
    },
    // 删除
    del (id) {
      // alert(id);
      // console.log(id);
      this.delCart(id)
      this.$message.success('删除成功')
    },
    // 退出用户
    remover () {
      localStorage.removeItem('name')
      this.remove('')
    }
  }
}
</script>
<style lang="scss" scoped>
// logo
.logo {
  float: left;
  width: 100px;
  height: 100px;
  text-align: center;
  border-radius: 50px;
  background-color: #fff;
  position: relative;
  img {
    width: 100px;
    height: 100px;
    position: absolute;
    // top: -22px;
    left: -3px;
    border-radius: 50%;
  }
}
// 搜索框
.search {
  float: right;
  line-height: 100px;
  margin: 0 50px;
}
// 用户和购物车
.el-icon-user-solid,
.el-icon-shopping-cart-2 {
  color: #fff;
  margin: 0 20px;
  font-size: 20px;
  opacity: 0.5;
}

.el-icon-shopping-cart-2:hover {
  opacity: 1;
}
.el-icon-user-solid:hover {
  opacity: 1;
}
// 用户
.nav-user-wrapper {
  // opacity: 0;
  // display: none;
  // visibility: hidden;
  width: 168px;
  background: #fff;
  text-align: center;
  position: absolute;
  top: 75px;
  right: 200px;
  border-radius: 15px;
  z-index: 99;
  // position: relative;
  .el-icon-caret-top {
    color: #fff;
    position: absolute;
    top: -19px;
    left: 63px;
    font-size: 28px;
  }
  ul {
    li {
      width: 100%;
      height: 44px;
      line-height: 44px;
      border-bottom: 1px solid #f5f5f5;
      cursor: pointer;
      a {
        color: #616161;
        font-size: 12px;
      }
    }
    .nav-user-avatar {
      height: 74px;
    }
    li:hover {
      background: #fafafa;
    }
  }
}

// 购物车
.el-badge {
  position: absolute;
  top: -10px;
  right: 0px;
  // left: 0;
}
.cart {
  float: left;
  border-radius: 15px;
  position: relative;
  .user-cart {
    position: absolute;
    top: 75px;
    right: 3px;
    width: 360px;
    border-radius: 15px;
    background: #fff;
    z-index: 99;
    // height: 500px;
    .el-icon-caret-top {
      position: absolute;
      top: -25px;
      right: 9px;
      font-size: 39px;
      color: #fff;
    }
    li {
      height: 120px;
      width: 100%;
      background-color: #fff;
      border-bottom: 1px solid #ccc;
      line-height: 40px;

      .item-desc {
        overflow: hidden;
        width: 200px;
        height: 80px;
        display: table;
        margin-left: 20px;
      }
    }
    li:hover {
      background-color: #ebebeb;
    }
    .name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 180px;
    }
    .del {
      cursor: pointer;
      font-size: 25px;
      color: #ccc;
      line-height: 50px;
    }

    // 总数
    .total {
      width: 100%;
      height: 81px;
      line-height: 40px;
      background-color: #f5f5f5;
      .button {
        float: right;
        line-height: 80px;
        margin-right: 25px;

        // display: inline-block;
      }
    }
  }
}
</style>
