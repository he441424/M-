<template>
  <div class="w">
    <div class="nav">
      <ul>
        <li :class="tag == '0' ? 'active' : ''" @click="tag = '0'">综合排序</li>
        <li :class="tag == '-1' ? 'active' : ''" @click="tag = '-1'">
          价格从高到低
        </li>
        <li :class="tag == '1' ? 'active' : ''" @click="tag = '1'">
          价格从低到高
        </li>

        <li style="width: 400px">
          <input type="text" placeholder="请输入价格" v-model="min" />
          -
          <input type="text" placeholder="请输入价格" v-model="max" />
          <button
            style="
              background: blue;
              width: 50px;
              height: 32px;
              outline: none;
              margin-left: 5px;
              border: 0;
            "
            @click="handClick"
          >
            确定
          </button>
        </li>
      </ul>
    </div>
    <!--  -->
    <div class="main">
      <div class="goods">
        <div class="goods-box" v-for="item in list" :key="item.productId" @>
          <img v-lazy="item.productImageBig" alt="" />
          <h4>{{ item.productName }}</h4>
          <p>{{ item.subTitle }}</p>
          <span class="prc">￥{{ item.salePrice }}</span>
          <div class="good-price">
            <a style="text-align: center" @click="skip(item.productId)"
              >查看详情</a
            >
            <a
              @click="
                joinCart(
                  item.productId,
                  item.productImageBig,
                  item.productName,
                  item.salePrice
                )
              "
              style="background-color: #4769c2"
              >加入购物车</a
            >
          </div>
        </div>
      </div>
    </div>

    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        style="text-align: center; margin-top: 25px"
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="total"
        :page-size="16"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      list: [],
      // 1低到高 -1高到低 0为综合
      tag: '0',
      // max 最大价格 min 最小
      max: [],
      min: [],
      // 分页
      page: 1,
      // 总数
      total: 0,
      // 每次展示的页数
      pageSize: 16
    }
  },
  watch: {
    // 如果排序发生改变的时候就重新调用axios
    tag () {
      this.getAxios()
    },
    page () {
      this.getAxios()
    }
  },
  mounted () {
    // 页面的dom加载完成的时候取出数据
    this.getAxios()
  },
  methods: {
    ...mapMutations(['JOINCart']),
    getAxios () {
      // axios(
      //   `/goods/allGoods?page=${this.page}&size=16&sort=${this.tag}&priceGt=${this.min}&priceLte=${this.max} `
      // ).then((res) => {
      //   console.log(res.data.result.data);
      //   this.list = res.data.result.data;
      //   this.total = res.data.result.total;
      // });
      axios.get('./js/goods.json').then((res) => {
        // console.log(res)
        this.total = res.data.result.length
        if (this.tag === '0') {
          /* 思路 如果为默认排序的时候就判断是第几页数据 如果是第一页数据就从0 截取到一页显示第几条数据
          如果最后一页页 就是截取第几条到total
          如果是低到高就使用sort进行排序 然后在进行第几页操作
           */
          //  0为综合
          // console.log('综合')
          // this.list = res.data.result;
          if (this.page === 1) {
            // console.log(1)
            this.list = res.data.result.splice(0, this.pageSize)
          } else {
            // console.log(2);
            this.list = res.data.result.splice(this.pageSize, this.total)
          }
        }
        if (this.tag === '1') {
          // 1低到高

          // console.log('低到高')
          const newList = res.data.result
          newList.sort((a, b) => a.salePrice - b.salePrice)
          if (this.page === 1) {
            // console.log(1)
            // this.list = res.data.result.splice(0, 20);
            this.list = newList.splice(0, 16)
          } else {
            // console.log(2);
            // this.list = res.data.result.splice(20, 40);
            this.list = newList.splice(16, 40)
          }
        }
        if (this.tag === '-1') {
          // -1高到低
          // console.log('高到低')
          const newList = res.data.result
          newList.sort((a, b) => b.salePrice - a.salePrice)
          this.list = newList
        }
      })
    },
    // 点击之后筛选价格
    handClick () {
      // 点击的时候调用一下axios 请求一下新的数据
      this.getAxios()
      // 然后把输入框的东西清空
      this.max = ''
      this.min = ''
    },
    // 分页器
    handleCurrentChange (value) {
      // console.log(value);
      this.page = value
    },
    // 路由带id跳转
    skip (id) {
      this.$router.push(`goodsDetails/${id}`)
    },
    // 添加到购物车
    joinCart (id, img, name, price) {
      this.JOINCart({ id, img, name, price })
      this.$message.success('加入购物车成功')
    }
  }
}
</script>
<style lang="scss" scoped>
.goods {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
// 导航
.nav {
  height: 60px;
  line-height: 60px;
}
.active {
  color: blue;
}
ul {
  height: 60px;
  line-height: 60px;
  display: flex;
  li {
    // flex: 3;
    width: 180px;
  }
}
input {
  outline: none;
  width: 80px;
  height: 30px;
  line-height: 80px;
}
// 内容
.main {
  width: 100%;
  height: 100%;
}

.goods-box {
  width: 303px;
  height: 430px;
  background-color: #fff;
  float: left;
  border: 1px solid #efefef;
  text-align: center;
  //   动画持续5秒
  transition: all 0.5s;
  img {
    width: 206px;
    height: 206px;
    margin-top: 50px;
  }
  h4 {
    font-size: 14px;
    font-weight: 400;
  }
  p {
    color: #ccc;
    font-size: 12px;
    margin: 10px 0;
  }
  span {
    color: #d44d44;
    font-size: 16px;
    font-weight: 800;
  }
}
// 显示隐藏价格
.goods-box:hover .good-price {
  display: block;
}
.goods-box:hover .prc {
  display: none;
}
.goods-box:hover {
  // 向上3px 加阴影
  transform: translateY(-3px);
  box-shadow: 1px 1px 20px #999;
}
</style>
