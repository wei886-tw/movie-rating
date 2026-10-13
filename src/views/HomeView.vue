<template>
  <NavbarView />
  <div class="container-fluid bg-neutral">
    <div class="container-fluid">
      <section v-if="homepageBanner" class="banner " :style="{
        backgroundImage: `linear-gradient(to right, #0f1014 0%, transparent 80%),
      linear-gradient(to top, #0f1014 0%, transparent 70%),url(https://image.tmdb.org/t/p/w1280/${homepageBanner.backdrop_path})`
      }">
        <!--todo: pt-auto -->
        <div class="container pt-108 px-0">
          <h1 class="text-white fs-64 mb-24">本週推薦：{{ homepageBanner.title }}</h1>
          <!-- <p class="text-white fs-20">{{
          homepageBanner.release_date }}
        </p> -->

          <!-- imdb -->
          <!-- todo:要改置中方式，mb-108 太爛了 -->
          <div class="mb-60">
            <div class="border border-dark rounded rounded-4 d-flex fs-24 align-items-center text-white"
              style="width: 15%; background-color: #292A2E;">
              <img src="../../public/star.png" class="text-white me-8" alt="星星">
              <p class="me-8 mb-0 fs-24">{{ Math.floor(homepageBanner.vote_average * 100) / 100 }}</p><span
                class="me-8 "><span></span>/10</span><span class="">(IMDB)</span>
            </div>
          </div>

          <!-- 電影介紹 -->
          <div class="w-50">
            <p class="fs-24 text-white">{{ homepageBanner.overview }}</p>
          </div>


        </div>
      </section>

    </div>
  </div>

</template>

<script>
import { errorMessages } from 'vue/compiler-sfc';
import NavbarView from '../components/NavbarView.vue';

export default {
  components: { NavbarView },
  
  data() {
    return {
      token: import.meta.env.VITE_TOKEN,
      api: import.meta.env.VITE_API,
      posterPath: [],
      backdropPath: [],
      movies: [],
      homepageBanner: null,
      isLoading: '',
      errorMessage: '',
    };
  },

  methods: {
    getMovies() {
      const url = `https://api.themoviedb.org/3/movie/popular`;
      const headers = {
        Authorization: `Bearer ${this.token}`,
      };

      Promise.all([ this.axios.get(url, { headers, params: { language: 'zh-TW' } }), this.axios.get(url, { headers, params: { language: 'en-US' } }) ])
        .then(([ zhRes, enRes ]) => {
          this.movies = zhRes.data.results.map((zhMovie) => {
            const enMovie = enRes.data.results.find((enMovie) => enMovie.id === zhMovie.id);
            return {
              ...zhMovie,
              titleZh: zhMovie.title,
              titleEn: enMovie ? enMovie.title : zhMovie.original_title
            };
          });
          console.log(this.movies);
          this.getHomepageBanner();
        }).catch((err) => {
          if (err.response !== undefined) {
            console.log(err.response.data.status_message);
          }
          else if (err.request !== undefined) {
            alert("先連網路");
          }

          else {
            console.log(err.message, 123);
          }
        });
    },

    getHomepageBanner() {
      if (this.movies.length > 0) {
        let randomIndex = Math.floor(Math.random() * this.movies.length);
        this.homepageBanner = this.movies[ randomIndex ];
      }
    }
  },

  mounted() {
    this.getMovies();
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
</style>
