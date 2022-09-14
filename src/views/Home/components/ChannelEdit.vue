<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button
        @click="isEdit = !isEdit"
        class="btn"
        round
        size="mini"
        style="color: red; border-color: red"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
      <!-- 标题  -->
    </van-cell>
    <div class="my-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          :class="{ active: item.name === '推荐' }"
          v-for="(item, index) in myChannels"
          :key="item.id"
          :icon="isEdit && item.name !== '推荐' ? 'cross' : ''"
          :text="item.name"
          @click="handleMyChannel(item, index)"
        />
        <!-- <template #icon>
            <van-icon name="cross" />
          </template>
        </van-grid-item> -->
      </van-grid>
    </div>
    <!-- 频道 -->
    <!-- 推荐频道 -->
    <van-cell title="推荐频道"></van-cell>
    <div class="recommend-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="item in recommendchannels"
          :key="item.id"
          icon="plus"
          :text="item.name"
          @click="$emit('add-channel', item)"
        />
        <!-- <template #icon>
            <van-icon name="cross" />
          </template>
        </van-grid-item> -->
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelAPI } from '@/api/'
export default {
  props: {
    myChannels: Array
  },
  data() {
    return {
      isEdit: false,
      allchannels: []
    }
  },
  created() {
    this.getAllChannel()
  },
  computed: {
    recommendchannels() {
      return this.allchannels.filter((allchannelsitem) => {
        return !this.myChannels.find(
          (myChannelsitem) => myChannelsitem.id === allchannelsitem.id
        )
      })
    }
  },
  methods: {
    async getAllChannel() {
      const { data } = await getAllChannelAPI()
      this.allchannels = data.data.channels
    },
    handleMyChannel({ name, id }, index) {
      if (this.isEdit && name !== '推荐') {
        this.$emit('del-channel', id)
      } else {
        this.$emit('change-active', index)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  margin-top: 92px;
}
.btn {
  width: 100px;
  font-size: 25px;
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;
  transform: translate(20%, -35%);
  border: 0.02667rem solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}
</style>
