<template>
  <NavbarView />
  <div class="container-fluid bg-neutral">
    <!-- banner -->
    <div class="d-flex justify-content-center"></div>
    <div class="spinner-border text-dark" v-if="isLoading"></div>
    <div class="container-fluid mb-96" v-else>
      <section class="banner" :style="bannerStyle">
        <!--todo: pt-auto -->
        <div class="container pt-96 px-0 ">
          <h1 class="text-white fs-64 font-noto-serif-tc">本週推薦：
            <p>{{ homepageBanner.title }}</p>
          </h1>

          <!-- imdb -->
          <!-- todo:要改置中方式，mb-108 太爛了 -->
          <div class="mb-60">
            <div class="border border-dark rounded rounded-4 d-flex fs-24 align-items-center text-white ps-16"
              style="width: 15%; background-color: #292A2E;">
              <img src="/star.png" class="text-white me-8" alt="星星">
              <p class="me-8 mb-0 fs-24">{{ Math.floor(homepageBanner.vote_average * 10) / 10 }} / 10</p>
            </div>
          </div>

          <!-- 電影介紹 -->
          <div class="mb-32" style="width: 40%;">
            <p class="fs-24 text-white line-clamp-10" :class="{ 'line-clamp-10': !isExpand }">{{
              homepageBanner.overview }}</p>

            <button class="btn btn-link  p-0 text-white" @click="toggleExpand">
              {{ isExpand ? '收合' : '更多' }}
            </button>
          </div>

          <!-- 加入收藏 -->
          <div>
            <button class="btn btn-white  btn-play me-16" @click="toggleFavorite(homepageBanner)">加入收藏</button>
            <button class="btn btn-white btn-play" @click="toggleWatchList(homepageBanner)">加入想看清單</button>
          </div>

        </div>
      </section>

    </div>
    <!-- 熱門電影卡片推薦 -->
    <div class="container w-100">
      <h3 class="fs-48 text-white mb-24 font-noto-serif-tc">
        探索電影庫
      </h3>
      <ul class="list-unstyled row row-cols-2 row-cols-md-4 g-4 ">
        <li v-for="movie in movies" class="col mb-16" :key="movie.id">
          <div class="card  border-0 "><img :src='`https://image.tmdb.org/t/p/w500${movie.poster_path}`' alt="電影庫"
              class="object-fit-cover" style="height: 460px">
            <div class="ps-8 pt-8">
              <p class="px-10 fs-20 font-noto-serif-tc fw-bold">{{ movie.title }}</p>
              <ul class="d-flex list-unstyled px-12">
                <li v-for="(genre, index) in movie.twGenre" :key="index + 1"> {{ genre }}<span
                    v-if="index < movie.twGenre.length - 1">、</span></li>
              </ul>
              <!-- Todo： 還沒優化 ui -->
              <button class="btn btn-white me-16" @click="toggleFavorite">加入收藏</button>
              <button class="btn btn-white" @click="toggleWatchList">加入想看清單</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import OpenCC from 'opencc-js';
import { errorMessages } from 'vue/compiler-sfc';
import NavbarView from '../components/NavbarView.vue';
import { mapActions } from 'pinia';
import { mapState } from 'pinia';
import { favoriteStore } from '@/stores/favoriteMovie.js';
import { wantToWatchStore } from '@/stores/wantToWatchMovie.js';

const converter = OpenCC.Converter({ from: 'cn', to: 'tw' });

const GENRE_ZH_TW_MAP = {
  28: '動作',
  12: '冒險',
  16: '動畫',
  35: '喜劇',
  80: '犯罪',
  99: '紀錄片',
  18: '劇情',
  10751: '家庭',
  14: '奇幻',
  36: '歷史',
  27: '恐怖',
  10402: '音樂',
  9648: '懸疑',
  10749: '愛情',
  878: '科幻',
  10770: '電視電影',
  53: '驚悚',
  10752: '戰爭',
  37: '西部',
};

export default {
  components: { NavbarView, favoriteStore },

  data() {
    return {
      token: import.meta.env.VITE_TOKEN,
      api: import.meta.env.VITE_API,
      posterPath: [],
      backdropPath: [],
      movies: [],
      homepageBanner: null,
      errorMessage: '',
      favoriteMovies: [],
      moviesGenres: [],
      moviesChineseGenres: [],
      isExpand: false,
      isLoading: true,
      zhMovies: null,
    };
  },

  methods: {
    ...mapActions(favoriteStore, [ 'toggleFavorite' ]),
    ...mapActions(wantToWatchStore, [ 'toggleWatchList' ]),


    async fetchMovies() {
      const url = `https://api.themoviedb.org/3/movie/popular`;
      try {
        await Promise.all([ this.axios.get(url, { headers: this.headers, params: { language: 'zh-TW' } }), this.axios.get("https://api.themoviedb.org/3/genre/movie/list", { headers: this.headers, params: { language: 'zh-TW' } }) ])
          .then((res) => {
            this.movies = res[ 0 ].data.results;
            const cnGenre = res[ 1 ].data.genres;
            console.log('cnGenre:', cnGenre);
            const entries = Object.entries(GENRE_ZH_TW_MAP);
            this.movies = this.movies.map((movie) => {
              const twGenre = [];
              entries.find((entry) => {
                movie.genre_ids.forEach((id) => {
                  if (id == entry[ 0 ]) {
                    twGenre.push(entry[ 1 ]);
                  }
                });
              });
              return {
                ...movie,
                'twGenre': twGenre
              };
            });

            console.log('movies:', this.movies);
            this.fetchHomepageBanner();
          });
      }
      catch (err) {
        if (err.response !== undefined) {
          console.log(err.response.data.status_message);
        }
        else if (err.request !== undefined) {
          alert("先連網路");
        }

        else {
          console.log(err.message);
        }
      } finally {
        this.isLoading = false;
      }
    },

    fetchHomepageBanner() {
      if (this.movies.length > 0) {
        let randomIndex = Math.floor(Math.random() * this.movies.length);
        this.homepageBanner = this.movies[ randomIndex ];
      }
    },

    getGenreNames() {
      // this.moviesChineseGenres = this.moviesGenreList.map(());
      console.log();
    },

    toggleExpand() {
      if (this.isExpand === false) {
        this.isExpand = !this.isExpand;
      }
    }
  },

  computed: {
    ...mapState(favoriteStore, [ 'favoriteList', 'isFavorite' ]),
    headers() {
      return {
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
      };
    },

    bannerStyle() {
      if (this.homepageBanner === null) {
        return {};
      }

      return {
        backgroundImage: `linear-gradient(to right, #0f1014 0%, transparent 80%),
        linear-gradient(to top, #0f1014 0%, transparent 70%),url('https://image.tmdb.org/t/p/w1280/${this.homepageBanner.backdrop_path}')`
      };
    },
  },

  mounted() {
    this.fetchMovies();
  }
};
</script>

<style>
.banner {
  width: 100%;
  height: 800px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.line-clamp-10 {
  display: -webkit-box;
  -webkit-box-line-clamp: 10;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.btn-play {
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 255, 255, 0.25);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
}
</style>
