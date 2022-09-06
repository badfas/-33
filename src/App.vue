<template>
  <div>
    黑马
    <!-- yarn add vant@latest-v2 -S -->
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <div class="box">nihao</div>
  </div>
</template>

<script>
// rem适配

// 1.让rem动起来
//  - yarn add amfe-flexible
//  2.盒子的使用
//  - 自动的识别css中px，并将其转成rem
export default {}
</script>

<style scoped>
.box {
  width: 689px;
  height: 88px;
  font-size: 25px;
  background-color: red;
}
</style>
