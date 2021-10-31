<template>
  <van-cell center :title="name" :label="author + ' - ' + name">
    <template #right-icon>
      <!-- <van-icon name="play-circle-o" size="0.6rem" /> -->
    </template>
    <van-icon @click="playFn" name="play-circle-o" size="0.6rem" />
  </van-cell>
</template>

<script>
export default {
  props: {
    name: String, // 歌名
    author: String, // 歌手
    id: Number, // 歌曲id
  },
  methods: {
    playFn() {
      this.$router.push({
        path: "/play",
        query: {
          // 歌曲的id
          id: this.id,
        },
      });
    },
  },
};
</script>

<style scoped>
.van-cell {
  border-bottom: 1px solid lightgray;
}
</style>