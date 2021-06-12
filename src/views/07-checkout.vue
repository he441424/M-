<template>
  <div>结算</div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {}
  },
  mounted () {
    this.showNav(false)
  },
  methods: {
    ...mapMutations(['showNav', 'delCart'])
  },
  computed: {},

  beforeDestroy () {
    this.showNav(true)
  }
}
</script>
