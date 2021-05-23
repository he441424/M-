<template>
  <div>
    数量
    <el-input-number
      v-model="num"
      @change="handleChange"
      :min="1"
      :max="10"
      label="描述文字"
    ></el-input-number>
  </div>
</template>
<script>
import Vue from "vue";
import { inputNumber } from "element-ui";
Vue.use(inputNumber);
export default {
  data() {
    return {
      num: 1,
    };
  },
  methods: {
    handleChange(value) {
      // console.log(value);
      this.$emit("num", value);
    },
  },
};
</script>