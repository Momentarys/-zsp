<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <!-- 标题 -->
    <van-cell title="我的频道">
      <van-button
        class="btn"
        size="mini"
        round
        style="color: red; border-color: red"
        @click="isEdit = !isEdit"
      >
        <!-- 点击事件 不是false就是true -->
        <!-- 三元  false就是完成 -->
        {{ isEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>
    <!-- 频道 -->
    <div class="my-pannel">
      <van-grid gutter="10" :border="false">
        <!--isEdit是false 就显示图标  否则就是空-->
        <van-grid-item
          v-for="(item, index) in myChannels"
          :class="{ active: item.name === '推荐' }"
          :key="item.id"
          :text="item.name"
          :icon="isEdit && item.name !== '推荐' ? 'cross' : ''"
          @click="handleMyChannel(item, index)"
        />
      </van-grid>
    </div>
    <!-- 推荐频道 -->
    <!-- 标题 -->
    <van-cell title="推荐频道"> </van-cell>
    <!-- 频道 -->
    <div class="recommend-pannel">
      <van-grid gutter="10" :border="false">
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          :text="item.name"
          icon="plus"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/api'
export default {
  props: {
    myChannels: Array
  },
  data() {
    return {
      // 定义变量
      isEdit: false,
      // 存储所有频道
      allChannels: []
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    // 创建函数接收数据接口
    async getAllChannels() {
      const { data } = await getAllChannelsAPI()
      console.log(data)
      this.allChannels = data.data.channels
    },
    // 上面添加index 传入父级
    handleMyChannel({ name }, index) {
      if (this.isEdit && name !== '推荐') {
        console.log('删除频道', name)
      } else {
        // 1.关闭弹窗
        // 2.切换频道
        this.$emit('change-active', index)
      }
    }
  },
  computed: {
    // 函数里面的filter返回值是数组 可遍历
    recommendChannels() {
      // 推荐顿道：所有领道我的领道
      // filter.返回值：数组
      return this.allChannels.filter((allChannelsItem) => {
        // 所有频道-我的频道
        // 我的频道数组里而，看一下，有没有aLLChanneLItem,有return false
        return !this.myChannels.find(
          (myChannelsItem) => myChannelsItem.id === allChannelsItem.id
        )
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 全局
.channel-edit {
  padding-top: 92px;
}
// 编辑按钮
:deep(.btn) {
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
