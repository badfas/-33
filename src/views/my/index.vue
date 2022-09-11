<template>
  <div class="profile">
    <header>
      <!-- 登录状态结构 -->
      <div class="login banner" v-if="isLogin">
        <van-row></van-row>
        <van-row>
          <van-col span="12">
            <van-row
              type="flex"
              justify="space-around"
              align="center"
              style="height: 100%"
              ><van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="userInfo.photo"
              ></van-image>
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row>
          </van-col>
          <van-col span="7"></van-col>
          <van-col span="5">
            <van-row
              type="flex"
              justify="spance-around"
              align="center"
              style="height: 100%"
            >
              <van-button round size="mini" class="btn"> 编辑资料</van-button>
            </van-row>
          </van-col>
        </van-row>
        <van-row>
          <van-grid class="gird" :border="false">
            <van-grid-item icon="photo-o" text="头条">
              <template #icon>{{ userInfo.art_count }}</template>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="粉丝">
              <template #icon>{{ userInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="关注">
              <template #icon>{{ userInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="获赞">
              <template #icon>{{ userInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录状态 -->
      <div class="logout banner" v-else @click="$router.push('/login')">
        <van-image
          width="1.76rem"
          height="1.76rem"
          :src="mobileSrc"
        ></van-image>
        <span class="text">登录 / 注册</span>
      </div>
    </header>
    <!-- 主体 -->
    <main>
      <van-grid :column-num="2" clickable>
        <van-grid-item text="收藏">
          <template #icon>
            <span class="toutiao toutiao-shoucang"></span>
          </template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon>
            <span class="toutiao toutiao-lishi"></span>
          </template>
        </van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <!-- 底部 -->
    <footer>
      <van-button block v-if="isLogin" @click="logout" style="color: red">
        退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mobileSrc from '../../assets/images/mobile.png'
import { getUerInfoAPI } from '@/api'
export default {
  name: 'my',
  data() {
    return {
      mobileSrc,
      userInfo: {}
    }
  },
  created() {
    this.getUerInfo()
  },
  methods: {
    async logout() {
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '是否退出该账号'
      })
      this.$store.commit('SET_TOKEN', {})
    },
    async getUerInfo() {
      try {
        // 用户的登录的时候在发请求
        if (!this.isLogin) return
        const { data } = await getUerInfoAPI()
        console.log(data)
        this.userInfo = data.data
      } catch (error) {
        // 1.jsi导致的 2.axios导致的
        // js和400给程序员提示，401来说给用户提示，重新登录
        if (error.response && error.response.state === 401) {
          this.$toast.fail('用户认证失败，请重新登录')
        } else {
          throw error
        }
      }
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  }
}
</script>

<style scoped lang="less">
.banner {
  width: 100%;
  height: 5.33333rem;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
  // background-size: cover;
  .text {
    font-size: 30px;
    margin-top: 10px;
  }
}
.logout {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.login {
  display: flex;
  flex-direction: column;
  > .van-row {
    flex: 1;
  }
  .mobile {
    font-size: 30px;
    color: #fff;
  }
  .van-col {
    height: 100%;
  }
  .btn {
    width: 1.6rem;
    height: 0.42667rem;
    color: #666;
  }
  /deep/.gird {
    color: #fff;
    .van-grid-item__content {
      font-size: 30px;
      background-color: inherit;
    }
  }
  /deep/.van-grid-item__text {
    color: #fff;
  }
}
.profile {
  height: 100vh;
  background-color: #f5f7f9;
  .link {
    margin: 10px 0;
  }
  .toutiao-shoucang {
    color: red;
  }
  .toutiao-lishi {
    color: yellow;
  }
  .toutiao {
    font-size: 40px;
  }
}
</style>
