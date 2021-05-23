<template>
  <div class="w">
    <!-- 轮播图 -->
    <div class="banner">
      <el-carousel :interval="5000" arrow="always" height="480px">
        <el-carousel-item v-for="item in banner" :key="item.id">
          <img v-if="item.picUrl" :src="item.picUrl2" alt="" class="img1" />
          <img v-if="item.picUrl2" :src="item.picUrl" alt="" class="img2 b" />
          <img v-if="item.picUrl3" :src="item.picUrl3" alt="" class="img3 c" />
          <img v-else :src="item.picUrl" alt="" class="img3 c" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 内容 -->
    <div class="main">
      <!-- 轮播图下面的内容 -->
      <div v-for="home in homeList" :key="home.id">
        <div class="pans" v-if="home.type === 1">
          <ul>
            <li v-for="item in home.panelContents" :key="item.id">
              <img v-lazy="item.picUrl" alt="" />
            </li>
          </ul>
        </div>

        <!-- 热门商品 -->
        <div class="hot" v-if="home.type === 2">
          <!-- <div v-for="item in home.panelContents" :key="item.id"> -->
          <div class="top">
            <h3>{{ home.name }}</h3>
          </div>
          <div style="display: flex">
            <div
              style="width: 50%; height: 384px"
              class="hot-buttom ces"
              v-for="item in home.panelContents"
              :key="item.id"
            >
              <img
                style="margin: 50px auto 10px; display: block; height: 206px"
                v-lazy="item.picUrl"
                alt=""
              />
              <div style="text-align: center">
                <h3 style="color: #424242; font-weight: 400; font-size: 16px">
                  {{ item.productName }}
                </h3>
                <p style="font-size: 13px; color: #d0d0d0">
                  {{ item.subTitle }}
                </p>

                <div>
                  <!-- 鼠标经过显示 -->
                  <div class="good-price">
                    <a
                      style="text-align: center"
                      @click="skipDetail(item.productId)"
                      >查看详情</a
                    >

                    <a
                      @click="
                        joinCart(
                          item.productId,
                          item.picUrl,
                          item.productName,
                          item.salePrice
                        )
                      "
                      style="background-color: #4769c2"
                      >加入购物车</a
                    >
                  </div>
                  <!-- 默认 -->
                  <p class="prc">￥{{ item.salePrice }}</p>
                </div>
              </div>
            </div>
            <!-- <div style="width: 50%" class="hot-buttom">
              <img
                style="margin: 50px auto 10px; display: block"
                src="https://ooo.0o0.ooo/2020/07/24/6BV9uTwaqModbYL.png"
                alt=""
              />
              <div style="text-align: center">
                <h3>捐赠商品</h3>
                <p>拍下不会发货</p>
                <span>￥1.00</span>
                <div class="good-price">
                  <a style="text-align: center">查看详情</a>

                  <a>加入购物车</a>
                </div>
              </div>
            </div> -->
          </div>
          <!-- </div> -->
        </div>
        <!-- section -->
        <!-- 内容section部分 -->
        <section v-if="home.type === 3">
          <div class="top">
            <h3>{{ home.name }}</h3>
          </div>
          <div class="buttom">
            <div
              v-for="item in home.panelContents"
              :key="item.id"
              :class="
                item.type === 2 || item.type === 3 ? 'imgbanner' : 'goods'
              "
            >
              <img v-lazy="item.picUrl" alt="" />
              <h4>{{ item.productName }}</h4>
              <p>{{ item.subTitle }}</p>
              <!-- 鼠标经过显示 -->
              <div class="good-price">
                <a
                  style="text-align: center"
                  @click="skipDetail(item.productId)"
                  >查看详情</a
                >

                <a
                  @click="
                    joinCart(
                      item.productId,
                      item.picUrl,
                      item.productName,
                      item.salePrice
                    )
                  "
                  style="background-color: #4769c2"
                  >加入购物车</a
                >
              </div>
              <span class="prc">￥{{ item.salePrice }}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

import Vue from "vue";
import { carousel, carouselItem } from "element-ui";
Vue.use(carousel);
Vue.use(carouselItem);
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      //轮播图
      banner: [],
      // 内容
      homeList: [],
      // 显示隐藏
      // isShow: false,
    };
  },
  mounted() {
    axios({
      url: "./js/home.json",
    }).then((res) => {
      // console.log(res);
      console.log(res.data.result);
      this.homeList = res.data.result;
      this.banner = res.data.result[0].panelContents;
      console.log(res.data.result[0].panelContents);
    });
  },
  methods: {
    ...mapMutations(["JOINCart"]),
    // 跳转详情页面
    skipDetail(id) {
      console.log(id);
      this.$router.push(`/goodsDetails/${id}`);
      // this.$router.push(`/data/${id}`);
    },
    // 加入购物车
    joinCart(id, img, name, price) {
      // alert("加入购物车成功");

      this.JOINCart({
        id,
        img,
        name,
        price,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
// 轮播图
.banner {
  height: 510px;
  border-radius: 15px;
  position: relative;
  margin-top: 20px;
}
.img1 {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 10px;
  z-index: 99;
}

.img2 {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 5px;
  left: 0;
  background-size: 95% 100%;
  border-radius: 10px;
  z-index: 88;
}

.img3 {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 10px;
  z-index: 77;
}
.a {
  z-index: 20;
  transform: translateZ(40px);
}

.b {
  z-index: 20;
  transform: translateZ(30px);
}

.c {
  transform: translateZ(0px);
}
// 内容
.main {
  height: auto;
  //   pans图
  .pans {
    height: 200px;
    width: 100%;
    overflow: hidden;
    // border: 1px solid rgb(211, 0, 0);
    border-radius: 10px;
    margin: 15px 0;
    ul {
      display: flex;
      height: 100%;
      li {
        height: 100%;
        width: 25%;
        border-left: 1px solid #efefef;
        img {
          height: 200px;
        }
      }
    }
  }
  //   热门推荐
  .hot {
    height: 490px;
    // display: flex;
    width: 100%;
  }
}
.hot-buttom {
  background-color: #fff;
  transition: all 0.5s;
}
.hot-buttom:hover {
  transform: translateY(-3px);
  box-shadow: 1px 1px 20px #999;
}

.ces:hover .good-price {
  display: block;
}
.ces:hover .prc {
  display: none;
}
.goods:hover .good-price {
  display: block;
}
.goods:hover .prc {
  display: none;
}
// 每个模块顶部的内容
.top {
  overflow: hidden;
  height: 60px;
  width: 100%;
  background: linear-gradient(#fbfbfb, #ececec);
  line-height: 60px;

  h3 {
    margin-left: 20px;
  }
}
section {
  height: 922px;
  margin: 10px 0;
}
.buttom {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  h4 {
    color: #424242;
    font-weight: 400;
    font-size: 16px;
    margin: 5px 0;
  }
  p {
    font-size: 13px;
    color: #d0d0d0;
  }
  span {
    color: #d44d44;
    font-weight: 8000;
  }
}
.imgbanner {
  width: 50%;
  height: 430px;
  img {
    width: 100%;
  }
}
.goods {
  height: 430px;
  width: 24.9%;
  text-align: center;
  background-color: #fff;
  transition: all 0.5s;
  border-right: 1px solid #efefef;

  img {
    height: 206px;
    width: 206px;
    margin: 50px auto 10px;
    display: inline-block;
  }
}
.goods:hover {
  transform: translateY(-3px);
  box-shadow: 1px 1px 20px #999;
}
</style>