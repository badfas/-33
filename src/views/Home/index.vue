<template>
  <div>
    <!-- 搜索导航 -->
    <van-nav-bar class="navbar">
      <template #title
        ><van-button icon="search" size="small" round block
          >搜索</van-button
        ></template
      >
    </van-nav-bar>
    <!-- 频道及文章展示 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
        <!-- 文章详情 -->
        <article-list :id="item.id"></article-list>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      closeable
      close-icon-position="top-left"
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ChannelEdit
        v-if="isShow"
        :myChannels="channels"
        @change-active=";[(isShow = false), (active = $event)]"
        @del-channel="del"
        @add-channel="addChannel"
      ></ChannelEdit>
      <!-- <channel-edit :myChannels="channels"></channel-edit> -->
    </van-popup>
  </div>
</template>

<script>
import { cheChannelAPI, delChannelAPI, addChannelAPI } from '@/api'
import ArticleList from './components/Articlelist.vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { mapGetters, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isLogin'])
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  data() {
    return {
      active: 0,
      channels: [],
      isShow: false
    }
  },
  created() {
    this.initChannel()
  },
  // 1.??==>相当于||，常用于语句中
  //  2.?. ==>可选连操作符，？前面是undefined，name不会往后取值
  methods: {
    ...mapMutations(['SET_MY_CHANNELS']),
    initChannel() {
      // 1.如果你登录了
      //  -channels应该发请求获取用户自己的频道
      if (this.isLogin) {
        this.cheChannel()
      } else {
        //  2.未登录
        //  -1.本地存储里有数据，channels用本地存储
        //  -2.本地存储没有数据，发请求，获取默认的频道数据
        const myChannels = this.$store.state.myChannels
        if (myChannels.length === 0) {
          this.cheChannel()
        } else {
          this.channels = myChannels
        }
      }
    },
    async cheChannel() {
      try {
        const { data } = await cheChannelAPI()
        this.channels = data.data.channels
      } catch (error) {
        //  js的错误，给程序员，axios状态码507，提示用户刷新
        if (!error.response) {
          throw error
        } else {
          const status = error.response.status
          // status === 507 ?? this.$toast.fail('请刷新')
          status === 507 && this.$toast.fail('请刷新')
        }
      }
    },
    async del(id) {
      try {
        const newChannels = this.channels.filter((item) => item.id !== id)
        // 1.发请求删除频道
        if (this.isLogin) {
          await delChannelAPI(id)
        } else {
          // 把我的频道存在本地存储
          this.SET_MY_CHANNELS(newChannels)
        }
        // 视图删除频道
        this.channels = newChannels
        this.$toast.success('删除成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录再删除')
        } else {
          throw error
        }
      }
    },
    async addChannel(channel) {
      try {
        // 发送请求添加频道
        if (this.isLogin) {
          await addChannelAPI(channel.id, this.channels.length)
        } else {
          this.SET_MY_CHANNELS([...this.channels, channel])
          // 把我的频道存在本地存储
        }
        // 视图添加频道
        this.channels.push(channel)
        this.$toast.success('添加频道成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('请登录再添加')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
