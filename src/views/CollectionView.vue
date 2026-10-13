<template>
  <NavbarView />
  <div class="container-fluid bg-dark">
    <div class="container movie-collection-bg">
      <h2 class="text-white">我的電影收藏 </h2>
    </div>
  </div>
</template>

<script>
import NavbarView from '@/components/NavbarView.vue';
export default {
  components: { NavbarView }
};
</script>

<style>
.movie-collection-bg {
  background-color: #0e0e10;
  background-image:
    radial-gradient(ellipse at top left,
      rgba(151, 108, 55, 0.22),
      transparent 42%),
    radial-gradient(ellipse at bottom right,
      rgba(128, 77, 30, 0.18),
      transparent 38%);
}
</style>