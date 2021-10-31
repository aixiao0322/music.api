<template>
  <div>
    <!-- <p>我是Layout</p> -->
    <!-- 二级路由 -->
    <van-nav-bar :title="activeTitle" />
    <router-view></router-view>
    <!--  -->
    <van-tabbar route>
      <van-tabbar-item replace to="/layout/home" icon="home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/layout/search" icon="search"
        >搜索</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 默认显示的标题
      activeTitle: this.$route.meta.title,
    };
  },
  watch: {
    $route() {
      // 切换后页面的title显示
      this.activeTitle = this.$route.meta.title;
    },
  },
};
</script>

<style scoped>
/* 中间内容区域 - 容器样式(留好上下导航所占位置) */
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>
