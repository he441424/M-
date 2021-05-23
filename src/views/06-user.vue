<template>
  <div>user</div>
</template>
<script>
import { mapMutations } from "vuex";
import axios from "axios";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["showNav"]),
  },
  mounted() {
    this.showNav(false);
    axios({
      url: "login.php",
      method: "post",
      data: {
        usere: "123",
        pass: "122",
      },
    }).then((res) => {
      console.log(res);
    });
  },
  beforeDestroy() {
    this.showNav(true);
  },
};
</script>