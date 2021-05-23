<template>
  <div id="big-box">
    <div class="box">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- 账号 -->
        <el-form-item label="账号" prop="user">
          <el-input
            type="text"
            v-model="ruleForm.user"
            autocomplete="off"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <!--密码 -->
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { form, formItem, button, input } from "element-ui";
import Vue from "vue";
Vue.use(form);
Vue.use(formItem);
Vue.use(button);
Vue.use(input);
import { mapMutations } from "vuex";

import axios from "axios";

export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    let validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        pass: "",
        user: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        user: [{ validator: validateUser, trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations(["isuser"]),
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          // console.log(valid);
          let content = JSON.stringify(this.ruleForm);
          localStorage.setItem("name", content);

          // alert("传");
          // let user = localStorage.getItem("name").user;
          let user = JSON.parse(localStorage.getItem("name")).user;
          console.log(user);
          this.isuser(user);
          this.$router.push({ path: "/" });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
#big-box {
  width: 100%;
  height: 800px;
  background: #ccc;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  // height: 329px;
  display: flex;
  background: url("https://c.wallhere.com/photos/6a/95/1800x1255_px_galaxy_hd_stars-1733561.jpg!d")
    repeat-x 0 center/auto 100%;
}

.box {
  width: 500px;
  height: 300px;
  background: rgba(255, 255, 255, 0.6);
  // margin: 0 auto;

  // padding: 30px;

  .el-form-item {
    width: 450px;
    margin: 10px auto;
    padding: 20px 0;
  }
}
</style>