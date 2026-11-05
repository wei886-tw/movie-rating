import { defineStore } from 'pinia';

export const wantToWatchStore = defineStore('wantToWatchList', {
  state: () => ({
    wantToWatchList: JSON.parse(localStorage.getItem('wantToWatchList')) || [],
  }),

  getters: {
    isInWantToWatchList: (state) => (id) => state.wantToWatchList.some((item) => item.id === id),
  },

  actions: {
    toggleWatchList(movie) {
      const index = this.wantToWatchList.findIndex((wantToWatchMovie) => wantToWatchMovie.id === movie.id);
      if (index === -1) {
        this.wantToWatchList.push({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          genre_ids: movie.genre_ids,
        });
        console.log(this.wantToWatchList);
        alert("已加入想看清單！");
      }

      else {
        this.wantToWatchList.splice(index, 1);
        alert("已從想看清單移除");
      }

      localStorage.setItem("wantToWatchList", JSON.stringify(this.wantToWatchList));
    }

  }
});