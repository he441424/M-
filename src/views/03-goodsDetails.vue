<template>
  <div class="w">
    <div class="top">
      <div class="banner">
        <!-- <img :src="list.productImageBig" alt="" /> -->
        <div class="big"><img :src="bigImg" alt="" /></div>
        <div class="small">
          <ul>
            <li
              :class="{ on: item == bigImg }"
              v-for="(item, i) in smallImg"
              :key="i"
              @click="smallClick(item)"
            >
              <img :src="item" alt="" />
            </li>
          </ul>
        </div>
      </div>
      <div class="content">
        <h3>{{ list.productName }}</h3>
        <p>
          {{ list.subTitle }}
          <span>¥{{ list.salePrice }}</span>
        </p>
        <div class="number"><num-ber @num="num"></num-ber></div>
        <div class="shoppin-cart">
          <a
            style="text-align: center"
            @click="
              addCart(
                list.productId,
                bigImg,
                list.productName,
                list.salePrice,
                cartNum
              )
            "
            >加入购物车</a
          >

          <a style="background: #e1e1e1; color: #646464" href="#/cart"
            >立即购买</a
          >
        </div>
      </div>
    </div>
    <!-- 底部详情 -->
    <div class="buttom">
      <div class="top">
        <h3>官方精选</h3>
      </div>
      <div v-if="list.detail" v-html="list.detail"></div>
      <!-- <div v-else>没有内容</div> -->
    </div>
  </div>
</template>
<script>
// 引入请求函数
import axios from "axios";
//引入number组件
import numBer from "../components/num";
import { mapMutations } from "vuex";
export default {
  components: {
    numBer,
  },
  data() {
    return {
      // 数据
      list: [],
      // 小图
      smallImg: [],
      // 大图
      bigImg: [],
      //加入购物车的数量
      cartNum: 1,
    };
  },
  mounted() {
    axios(
      // `/goods/productDet?productId=${this.$route.params.id}`
      "./js/goodsDetails.json"
      // "/goods/productDet?productId=150642571432837"
    ).then((res) => {
      // console.log(res.data.result);
      let newList = res.data.result;
      let lists = newList.find(
        (item) => item.productId == this.$route.params.id
      );
      console.log(lists);

      // console.log(res.data.result);
      this.list = lists;
      this.smallImg = lists.productImageSmall;
      this.bigImg = this.smallImg[0];
      console.log(lists.productImageSmall[0]);
    });
  },
  methods: {
    ...mapMutations(["JOINCart"]),
    // 点击的时候切换图片
    smallClick(src) {
      this.bigImg = src;
    },
    // 数量
    num(val) {
      // console.log(val);
      this.cartNum = val;
    },
    // 添加购物车
    addCart(id, img, name, price, num) {
      this.JOINCart({
        id,
        img,
        name,
        price,
        num,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  border-radius: 10px;
  height: 402px;
  display: flex;
  margin-top: 15px;
  background-color: #fff;
  padding: 60px;
  position: relative;

  .banner {
    text-align: center;
    width: 50%;
    // background-color: rgb(48, 37, 37);
    .big {
      img {
        width: 440px;
        height: 440px;
      }
    }
    .small {
      position: absolute;
      top: 45px;
      left: 20px;
      li {
        margin-top: 8px;
        border: 1px solid #ccc;
        border-radius: 15px;
        height: 84px;
        width: 84px;
      }
      img {
        width: 84px;
        height: 84px;
        border-radius: 15px;
      }
      .on {
        border: 3px solid #ccc;
        border-radius: 14px;
        width: 84px;
        height: 84px;
      }
    }
  }
  //   右边内容
  .content {
    margin-left: 15px;
    h3 {
      font-size: 22px;
      font-weight: 400;
    }
    p {
      color: #ccc;
      font-size: 14px;
      margin: 10px 0;

      span {
        color: #d44d44;
        margin-left: 130px;
        font-size: 18px;
        font-weight: 800;
      }
    }
  }
}
.number {
  height: 78px;
  line-height: 78px;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
}
.shoppin-cart {
  margin-top: 15px;

  a {
    display: inline-block;
    width: 145px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: blue;
    border-radius: 10px;
    margin-right: 5px;
    cursor: pointer;
  }
}
.buttom {
  .top {
    background: linear-gradient(#fbfbfb, #ececec);
    height: 60px;
    // width: 100%;
    // background-color: rgb(253, 71, 71);
    line-height: 60px;
    margin-top: 20px;
    border-radius: 10px;
    padding: 0;
    h3 {
      padding: 0 15px;
    }
  }
  img {
    height: 14998px;
  }
}
</style>