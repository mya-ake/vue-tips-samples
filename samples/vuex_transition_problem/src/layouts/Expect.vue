<template>
  <div>
    <h1>期待する方：遷移後に変化する</h1>
    <p>フェードアウト後に並び替わるので期待している動きとなる。</p>
    <p>※わかりやすさのためにフェードを遅くしている。</p>
    <div>
      <router-link to="/expect/asc">昇順</router-link> |
      <router-link to="/expect/desc">降順</router-link>
    </div>
    
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
