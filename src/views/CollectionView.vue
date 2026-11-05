<template>
  <NavbarView />
  <div class="container-fluid bg-neutral">
    <div class="container bg-neutral">
      <h2 class="text-white pt-40 mb-24 font-noto-serif-tc fs-48">我的電影收藏 </h2>
      <p class="text-white mb-24">整理、標記與回味你的私人觀影宇宙，每部膠卷都烙印著屬於你的感官記憶與光影。</p>

      <!-- 典藏庫 -->
      <div class="container">
        <ul class="d-flex text-white list-unstyled gap-16">
          <li class="border border-1 rounded rounded-1 p-8">全部典藏</li>
          <li class="border border-1 rounded rounded-1 p-8">我的最愛</li>
          <li class="border border-1 rounded rounded-1 p-8">想看片單</li>
          <li class="border border-1 rounded rounded-1 p-8">看過片單</li>
        </ul>
      </div>

      <!-- 全部典藏 -->
      <div class="container">
        <ul class="list-unstyled row row-cols-2 row-cols-md-4 g-4 ">
          <li v-for="movie in favoriteList" class="col mb-16" :key="movie.id">
            <div class="card  border-0 "><img :src='`https://image.tmdb.org/t/p/w500${movie.poster_path}`' alt="電影庫"
                class="object-fit-cover" style="height: 460px">
              <div class="ps-8 pt-8">
                <p>{{ movie.title }}</p>
                <p>{{ movie.genre_ids }}</p>
                <button class="btn btn-white me-16" @click="toggleFavorite">加入收藏</button>
                <button class="btn btn-white">加入想看清單</button>
              </div>
            </div>
          </li>
        </ul>

      </div>

    </div>
  </div>
</template>

<script>
import NavbarView from '@/components/NavbarView.vue';
import { favoriteStore } from '@/stores/favoriteMovie.js';
import { mapActions } from 'pinia';
import { mapState } from 'pinia';

export default {
  components: { NavbarView },
  data() {
    return {};
  },

  methods: {
    ...mapActions(favoriteStore, [ 'toggleFavorite' ]),

  },

  mounted() {

  },

  computed: {
    ...mapState(favoriteStore, [ 'favoriteList', 'isFavorite' ]),
  }
};
</script>

<style></style>