<template>
  <div>
    <!-- //shape: 搜索框形状，可选值为 round (shape:形状) -->
    <van-search
      shape="round"
      v-model="value"
      placeholder="请输入搜索关键词"
      @input="inputFn"
    ></van-search>
    <div class="search_wrap">
      <p class="hot_title">热门搜索</p>
      <!-- 热搜关键词容器 -->
      <div class="hot_name_wrap">
        <!-- 每个搜索关键词 -->
        <span
          class="hot_item"
          v-for="(obj, index) in hotArr"
          :key="index"
          @click="fn(obj.first)"
          >{{ obj.first }}</span
        >
      </div>
    </div>
    <div class="search_wrap">
      <p class="hot_title">最佳匹配</p>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        <!-- <SongItem
          v-for="obj in resultList"
          :key="obj.id"
          :name="obj.name"
          :author="obj.ar[0].name"
          :id="obj.id"
        >
          <template #right-icon>
            <van-icon name="play-circle-o" size="0.6rem" />
          </template>
        </SongItem> -->
        <SongItem
          v-for="obj in resultList"
          :key="obj.id"
          :name="obj.name"
          :author="obj.ar[0].name"
          :id="obj.id"
        ></SongItem>
      </van-list>
    </div>
  </div>
</template>

<script>
import { hotSearchAPI, searchResultListAPI } from "@/api";
import SongItem from "@/components/SongItem";

export default {
  data() {
    return {
      value: "",
      hotArr: [],
      resultList: [],
      // 触底后自动触发onload方法
      loading: true,
      // 为true不会执行onload  表示记载完毕
      finished: false,
      // 搜索结果的页码
      page: 1,
    };
  },
  methods: {
    async getListfn() {
      return await searchResultListAPI({
        keywords: this.value,
        limit: 20,
        // 公式
        offset: (this.page - 1) * 20,
      });
    },
    async fn(val) {
      this.page = 1;
      this.finished = false;
      this.value = val;
      const res = await this.getListfn();
      console.log(res);
      this.resultList = res.data.result.songs;
      this.loading = false;
    },
    // 搜索事件
    async inputFn() {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        this.page = 1;
        this.finished = false;
        // 如果输入框内容为空 直接返回
        if (this.value.trim().length === 0) {
          this.resultList = [];
          return;
        }
        // 输入框 搜索内容
        const res = await this.getListfn();
        console.log(res);
        if (res.data.result.songs === undefined) {
          this.resultList = [];
          return;
        }
        this.resultList = res.data.result.songs;
        this.loading = false;
      }, 900);
    },
    // 触底事件
    async onLoad() {
      this.page++;
      const res = await this.getListfn();
      if (res.data.result.songs === undefined) {
        this.finished = true;
        this.loading = false;
        return;
      }
      this.resultList = [...this.resultList, ...res.data.result.songs];
      this.loading = false;
    },
  },
  async created() {
    const res = await hotSearchAPI();
    console.log(res);
    this.hotArr = res.data.result.hots;
  },
  components: {
    SongItem,
  },
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>