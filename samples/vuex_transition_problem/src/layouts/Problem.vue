<template>
  <div>
    <h1>問題になる方：遷移前に変化する</h1>
    <p>フェードアウトする前に遷移先の状態に並び替わってしまう</p>
    <p>※わかりやすさのためにフェードを遅くしている。</p>
    <div>
      <router-link to="/problem/asc">昇順</router-link> |
      <router-link to="/problem/desc">降順</router-link>
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
