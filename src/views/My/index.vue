<template>
  <div class="profile">
    <!-- 头部 -->
    <header>
      <!-- 登录状态的结构 -->
      <div class="login banner" v-if="isLogin">
        <!-- flex 布局分为3 第一个占位 -->
        <van-row></van-row>
        <!-- 第二个布局盒子 -->
        <van-row>
          <!-- vant库 布局24   12  7   5  -->
          <van-col span="12">
            <van-row
              style="height: 100%"
              type="flex"
              justify="space-around"
              align="center"
            >
              <van-image
                round
                width="1.5rem"
                height="1.5rem"
                :src="userInfo.photo"
              />
              <span class="mobile">{{userInfo.name}}</span>
            </van-row>
          </van-col>
          <!-- 占位 -->
          <van-col span="7"></van-col>
          <!-- 编辑按扭 -->
          <van-col span="5">
            <van-row
              type="flex"
              justify="center"
              align="center"
              style="height: 100%"
            >
              <van-button size="mini" round class="edit-btn"
                >编辑按钮</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <!-- 第三个布局盒子 -->
        <van-row>
          <!-- 取消边框 :border="false" -->
          <!-- 插值 图标 -->
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon>{{ userInfo.art_count }}</template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon>{{userInfo.fans_count }}</template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{userInfo.follow_count }}</template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{userInfo.like_count }}</template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <!-- 未登录状态的结构 -->
      <div class="logout banner" v-else @click="$router.push('/login')">
        <!-- vant库方法获取图片 引入路径定义变量 调用 -->
        <van-image width="1.76rem" height="1.76rem" :src="mobileSrc" />
        <span class="text">登录 / 注册</span>
      </div>
    </header>

    <!-- 主体 -->
    <main>
      <!-- 单元格 -->
      <van-grid column-num="2" clickable>
        <van-grid-item text="收藏">
          <template #icon
            ><span class="toutiao toutiao-shoucang"></span
          ></template>
        </van-grid-item>
        <van-grid-item text="历史">
          <template #icon><span class="toutiao toutiao-lishi"></span></template>
        </van-grid-item>
      </van-grid>

      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>

    <!-- 底部 -->
    <footer>
      <van-button block v-if="isLogin" @click="logout">退出</van-button>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserInfoAPI } from '@/api'
import mobileSrc from '@/assets/images/mobile.png'
export default {
  data() {
    return {
      mobileSrc,
      userInfo: {}
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    // 组件 属性  点击退出提示
    async logout() {
      await this.$dialog.confirm({
        title: '黑马头条',
        message: '是都确认退出该账号'
      })
      this.$store.commit('SET_TOKEN', {})
    },
    // 获取用户的信息
    async getUserInfo() {
      try {
        // 用户登录了继续
        if (!this.isLogin) return
        const { data } = await getUserInfoAPI()
        console.log(data)
        this.userInfo = data.data
      } catch (error) {
        // error
        // 1.js导致的2.axios导致的
        // js和400,507给程序员提示，401来说用户提示，重新登录
        if (error.response && error.response.status === 401) {
          this.$toast.fail('用户认证失败，请重新登录')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
// 页面背景颜色
.profile {
  height: 100vh;
  background-color: #f5f7f9;
  //   主体内容
  .link {
    margin: 10px 0;
  }
  .toutiao {
    font-size: 40px;
  }
  .toutiao-shoucang {
    color: #eb5779;
  }
  .toutiao-lishi {
    color: #ff9d1d;
  }
}

// 公共背景图片
.banner {
  width: 100%;
  height: 5.33333rem;
  background: url('../../assets/images/banner.png') no-repeat 0 0 / cover;
}
// 未登录状态的结构
.logout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .text {
    font-size: 30px;
    color: #fff;
    margin-top: 10px;
  }
}
// 登录状态的结构
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
  .edit-btn {
    width: 1.6rem;
    height: 0.42667rem;
    color: #666;
  }
  :deep(.grid) {
    color: #fff;
    .van-grid-item__content {
      font-size: 30px;
      background-color: inherit;
    }
    .van-grid-item__text {
      color: #fff;
    }
  }
}
</style>
