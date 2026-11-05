import { defineStore } from 'pinia';

export const favoriteStore = defineStore('favorite', {
  state: () => ({
    favoriteList: JSON.parse(localStorage.getItem('favorite')) || [],
  }),

  getters: {
    isFavorite: (state) => (id) => state.favoriteList.some((m) => m.id === id),
  },

  actions: {
    toggleFavorite(movie) {
      const index = this.favoriteList.findIndex((favoriteMovie) => favoriteMovie.id === movie.id);
      if (index === -1) {
        this.favoriteList.push({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          genre_ids: movie.genre_ids,

        });
        console.log('favoriteList:', this.favoriteList);
        alert("已加入收藏清單");
      }
      else {
        this.favoriteList.splice(index, 1);
        alert("已從收藏清單刪除");

      }
      localStorage.setItem('favorite', JSON.stringify(this.favoriteList));
    },

    toggleWatchList(movie){
      const index = this.watchList
    }
  }
});