<template>
  <div>
    <router-view></router-view>
    <h1>{{ count }}</h1>
    <h1>count的十倍:{{ bigNum }}</h1>
    <button @click="SET_COUNT1(10)">点击count+1</button>
  </div>
</template>

<script>
// rem适配

// 1.让rem动起来
//  - yarn add amfe-flexible
//  2.盒子的使用
//  - 自动的识别css中px，并将其转成rem
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    // inrement() {
    //   this.$store.commit('SET_COUNT1', 10)
    // }
    ...mapMutations(['SET_COUNT1'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['bigNum'])
  }
}
</script>

<style scoped></style>
