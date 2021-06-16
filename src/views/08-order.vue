<template>
  <div class="w">
    <div class="top">
      <h3>订单信息</h3>
    </div>
    <el-card>
      <h1 align="center">提交订单成功</h1>
      <div class="info">
        收货信息：
        <br />
        <br />

        <p>姓名：{{ infoList[0].name }}</p>
        <br />
        <br />
        <p>手机号：{{ infoList[0].phone }}</p>
        <br />
        <br />
        <p>详细地址：{{ infoList[0].address }}</p>
      </div>
      <el-table style="width: 100%" :data="infoList[1]">
        <!-- <el-table-column prop="date" label="图片" width="180" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt="" />
          </template>
        </el-table-column> -->
        <el-table-column
          prop="name"
          label="商品信息"
          width="480"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="price" label="单价" width="100" align="center">
        </el-table-column>
        <el-table-column prop="num" label="数量" width="250" align="center">
        </el-table-column>
        <el-table-column prop="" label="小计" max-width="200" align="center">
          <template slot-scope="scope">
            {{ scope.row.price * scope.row.num }}
          </template>
        </el-table-column>
      </el-table>
      <!-- 按钮 -->
      <div
        style="width: 100%; height: 60px; line-height: 60px; background: #fff"
      >
        <div style="float: right">
          &nbsp; &nbsp; &nbsp;
          <p><span>运费：0.00</span> 总价：{{ price }}</p>
          <!-- <p></p> -->
          <el-button style="margin: 5px" type="primary"
            ><a href="#">支付</a></el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      infoList: [],
      price: 0
    }
  },
  mounted () {
    this.infoList = this.commitList
    this.price = this.commitList[1][0].prices
    console.log(this.infoList)
  },
  computed: {
    ...mapState(['commitList'])
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.info {
  width: 100%;
  height: 150px;
  border: 1px solid #ccc;
  border-left: none;
  border-right: none;
  padding: 50px;
  p {
    text-indent: 2em;
  }
}
img {
  width: 100px;
  height: 100px;
}
</style>
