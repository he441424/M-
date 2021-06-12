<template>
  <div class="w">
    <table>
      <caption>
        您的购物清单
      </caption>
      <!-- <tr class="height">
        <th class="l-align">图形</th>
        <th>名称</th>
        <th>单价</th>
        <th>数量</th>
        <th>总计</th>
      </tr>

      <tr v-for="(item, i) in cartList" :key="i">
        <td class="l-align">
          <img :src="item.img" alt="" />
        </td>
        <td>{{ item.name }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.num }}</td>
        <td>{{ item.price * item.num }}</td>
      </tr>
      <tr>
        <td colspan="5" class="align">
          总价：<span>{{ price }}</span
          ><button>去结算</button>
        </td>
      </tr> -->
    </table>

    <!-- 从不显示 -->

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
      <el-table-column prop="name" label="总计" max-width="200" align="center">
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
    <div style="width: 100%; height: 60px; line-height: 60px; background: #fff">
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
        <el-button style="margin: 5px" type="primary"
          ><a href="#/checkout">提交订单</a></el-button
        >
      </div>
    </div>
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
    ...mapMutations(['showNav', 'delCart']),
    // 删除商品
    del (id) {
      // alert(id);
      this.delCart(id)
      this.$message.success('删除成功')
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
