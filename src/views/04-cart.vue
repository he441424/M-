<template>
  <div class="w">
    <table>
      <caption>
        您的购物清单
      </caption>
    </table>

    <!-- 从不显示 -->

    <div v-if="cartList.length">
      <el-table :data="catList" style="width: 100%" border>
        <el-table-column prop="date" label="图片" width="180" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="480" align="center">
        </el-table-column>
        <el-table-column prop="price" label="单价" width="100" align="center">
        </el-table-column>
        <el-table-column prop="num" label="数量" width="250" align="center">
          <template slot-scope="scope">
            <el-input-number
              :min="1"
              :max="10"
              v-model="scope.row.num"
              :step="1"
              step-strictly
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="总计"
          max-width="200"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.price * scope.row.num }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="50">
          <template slot-scope="scope">
            <!-- {{ scope.row.id }} -->
            <div @click="del(scope.row.id)">
              <i class="el-icon-error" style="font-size: 25px"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div
        style="width: 100%; height: 60px; line-height: 60px; background: #fff"
      >
        <div style="float: right">
          <span
            >一共 &nbsp;<b style="color: red">{{ num }}</b
            >&nbsp;件商品</span
          >
          &nbsp; &nbsp; &nbsp;
          <span
            >一共 &nbsp;<b style="color: red">{{ price }}</b
            >&nbsp;元</span
          >
          <el-button
            style="margin: 5px"
            type="primary"
            @click="submit(catList, price)"
          >
            <a href="#/checkout">提交订单</a></el-button
          >
          <!-- <a href="#/checkout">提交订单</a> -->
        </div>
      </div>
    </div>
    <el-alert
      v-else
      title="你还没有选择喜欢的商品"
      type="success"
      center
      show-icon
      :closable="false"
    >
    </el-alert>

    <!-- <el-alert v-else title="成功提示的文案" type="success" show-icon :closable="false"> -->
    <!-- </el-alert> -->
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      catList: []
    }
  },
  mounted () {
    this.showNav(false)
    this.catList = this.cartList
    console.log(this.catList)
  },
  computed: {
    ...mapState(['cartList']),
    price () {
      return this.cartList.reduce((price, item) => {
        price += item.price * item.num
        return price
      }, 0)
    },
    num () {
      return this.cartList.reduce((num, item) => {
        num += item.num
        return num
      }, 0)
    }
  },
  beforeDestroy () {
    this.showNav(true)
  },
  methods: {
    ...mapMutations(['showNav', 'delCart', 'submits', 'delsublist']),
    // 删除商品
    del (id) {
      // alert(id);
      this.delCart(id)
      this.$message.success('删除成功')
    },
    // 提交订单的数据
    submit (data, price) {
      this.delsublist()
      // console.log(data[0].id);
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].id)
        this.submits({
          id: data[i].id,
          img: data[i].img,
          name: data[i].name,
          num: data[i].num,
          price: data[i].price,
          prices: price
        })
      }
      // this.submit({
      //   id: data.id,
      //   img: data.img,
      //   name: data.name,
      //   num: data.num,
      //   price: data.price,
      // });
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
  margin: auto;
  /* border: 1px solid #000000; */
  border-collapse: collapse;
  background: #f5f5f5;
}
table caption {
  padding: 10px;
  font: bold 1.2em/1.5 arial microsoft yahei;
}

img {
  width: 100px;
  height: 100px;
  margin: auto;
  padding: 10px;
}

.height {
  height: 60px;
}
</style>
