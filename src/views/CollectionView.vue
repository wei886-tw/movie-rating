<template>
  <NavbarView />
  <div class="container-fluid bg-neutral">
    <div class="container bg-neutral">
      <h2 class="text-white pt-40 mb-24 font-noto-serif-tc fs-48">我的電影收藏 </h2>
      <p class="text-white mb-24">整理、標記與回味你的私人觀影宇宙，每部膠卷都烙印著屬於你的感官記憶與光影。</p>

      <!-- 典藏庫 -->
      <div>
        <ul class="d-flex text-white list-unstyled gap-16">
          <li class="border border-1 rounded rounded-1 p-8">全部典藏</li>
          <li class="border border-1 rounded rounded-1 p-8">我的最愛</li>
          <li class="border border-1 rounded rounded-1 p-8">想看片單</li>
          <li class="border border-1 rounded rounded-1 p-8">看過片單</li>
          <li class="border border-1 rounded rounded-1 p-8">自訂片單</li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import NavbarView from '@/components/NavbarView.vue';
import { favoriteStore } from '@/stores/favorite.js';
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
    // console.log('favoriteList:',this.favoriteList);
  },

  computed: {
    ...mapState(favoriteStore, [ 'favoriteList', 'isFavorite' ]),
  }
};
</script>

<style></style>