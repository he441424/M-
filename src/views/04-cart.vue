<template>
  <div class="w">
    <table>
      <caption>
        您的购物清单
      </caption>
      <tr class="height">
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
      </tr>
    </table>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  setup() {},
  mounted() {
    this.showNav(false);
  },
  computed: {
    ...mapState(["cartList"]),
    price() {
      return this.cartList.reduce((price, item) => {
        price += item.price * item.num;
        return price;
      }, 0);
    },
  },
  beforeDestroy() {
    this.showNav(true);
  },
  methods: {
    ...mapMutations(["showNav"]),
  },
};
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
table tr {
  padding: 15px;
  /* border: 1px solid #999999; */

  text-align: center;
  height: 100px;
}
img {
  width: 100px;
  height: 100px;
  margin: auto;
  padding: 10px;
}
span {
  color: #ff0099;
  font: bold 2em arial microsoft yahei sans-serif;
}
button {
  background-color: #ff0099;
  color: #ffffff;
  width: 100px;
  height: 40px;
  border-style: none;
  font: bold 1.2em microsoft yahei;
}
.align {
  text-align: right;
}
.l-align {
  text-align: center;
}
.height {
  height: 60px;
}
</style>
