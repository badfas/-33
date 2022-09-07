<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" class="nav-bar" />
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="form" class="from">
      <!--van-field:输入框，text,password,文本域..-->
      <!--v-model:用户输入的值-->
      <!--name:表示表单项-->
      <!--ru1es是一个数组-->
      <!--rule:{required:是否必选，message:错误的提示信息，pattern:正则，trigger:规则的触发时机onChange、onBlur}-->

      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span> </template
      ></van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            class="btn"
            block
            type="default"
            size="small"
            round
            v-if="isShowBtn"
            native-type="button"
            @click="sendCode"
            >发送验证码</van-button
          >
          <van-count-down
            v-else
            :time="3 * 1000"
            format="ss秒"
            @finish="isShowBtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rule'
import { login, sendCodeAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duraton: 0
      })
    },
    async onSubmit() {
      this.loading()
      try {
        // 登录
        const { data } = await login(this.mobile, this.code)
        // console.log(data)
        this.SET_TOKEN(data.data)
        // 成功的提示
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        // 细分一下失败：提示用户手机号和验证码
        // 如果是手机号或者验证码错了，用户能知道
        // error:1.js抛的错2.axios封装的error对象
        // axios封装的error对象
        // error.response.data
        // 后端返回的数据
        // error.response.status后端返回的状态码
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    },
    async sendCode() {
      // 0. 验证用户是否输入了有效的手机号
      // - 1. form绑定ref
      // - 2. $refs.form.validate(name)

      await this.$refs.form.validate('mobile')

      this.loading()

      // 发送请求
      try {
        await sendCodeAPI(this.mobile)
        // 开启倒计时
        this.isShowBtn = false
        this.$toast.success('验证码发送成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 404)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
// scoped 样式作用于当前文件
// vue-cli提供了语法 :deep()深度选择器
.nav-bar {
  background-color: #5ca1e6;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
/deep/.from {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
.btn {
  background-color: #eee;
  color: #a58491;
  height: 0.64rem;
}
</style>
