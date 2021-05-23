<template>
  <div>
    <!-- 直接回顶部 -->

    <el-backtop :bottom="60" :visibility-height="880">
      <div
        style="
          height: 100%;
          width: 100%;
          background-color: #f2f5f6;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
          text-align: center;
          line-height: 40px;
          color: #1989fa;
        "
      >
        顶
      </div>
    </el-backtop>

    <div class="box">
      <header v-show="$route.meta.istrue">
        <div class="header w">
          <headers></headers>
        </div>
      </header>
      <nav v-show="navShow && $route.meta.istrue">
        <div class="nav w">
          <navs></navs>
        </div>
      </nav>
      <div class="main" v-if="$route.meta.istrue">
        <router-view></router-view>
      </div>
      <div v-else>
        <router-view></router-view>
      </div>
      <div class="buttom" v-show="$route.meta.istrue">
        <div class="w">
          <buttom></buttom>
        </div>
      </div>
    </div>

    <div>
      <!-- <el-backtop
        target=".page-component__scroll .el-scrollbar__wrap"
        :bottom="100"
      >
        <div
          style="
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
          "
        >
          UP
        </div>
      </el-backtop> -->
    </div>
  </div>
</template>
<script>
import { backtop } from "element-ui";
import Vue from "vue";
Vue.use(backtop);
import navs from "./components/nav";
import buttom from "./components/buttom";
import headers from "./components/header";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["navShow"]),
  },
  components: {
    navs,
    buttom,
    headers,
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  height: 100%;
  background: #ededed;
}
header {
  height: 100px;
  // background: pink;
  background: #000;
  // line-height: 100px;
  position: relative;
}
nav {
  height: 90px;
  background-color: #fff;
  line-height: 90px;
}
.main {
  height: auto;
  // .banner {
  //   height: 510px;
  //   background-color: #000;
  // }
}
// 底部内容
.buttom {
  width: 100%;
  height: 361px;
  background-color: #fff;
  margin-top: 50px;
  overflow: hidden;
}
</style>