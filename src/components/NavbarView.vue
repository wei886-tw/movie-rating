<template>
  <div class="container-fluid bg-neutral px-0">
    <div class="container-fluid px-0 border-bottom border-1">
      <div class="container py-24 px-0">
        <ul class="d-flex list-unstyled text-white w-100 mb-0  px-8 gap-24 py-24">
          <li class=" ">
            <RouterLink to="/" class="text-reset text-decoration-none fs-24 ">首頁</RouterLink>
          </li>

          <li class=" ">
            <RouterLink to="/collectionView" class="text-reset text-decoration-none fs-24 ">我的電影收藏</RouterLink>
          </li>

          <li class=" ">
            <!-- 還沒做好，假資料 -->
            <RouterLink to="/collectionView" class="text-reset text-decoration-none fs-24 ">想看清單</RouterLink>
          </li>

        </ul>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  methods: {

  }
};
</script>