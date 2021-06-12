<template>
  <div>
    <ul>
      <!-- <li>首页</li> -->
      <router-link to="/Home" tag="li" active-class="active">首页</router-link>
      <router-link to="/goods" tag="li" active-class="active">全部</router-link>
      <!-- <li>全部</li> -->
    </ul>
  </div>
</template>
<style lang="scss" scoped>
ul {
  display: flex;
  li {
    margin-right: 25px;
  }
}
.active {
  color: red;
}
</style>
