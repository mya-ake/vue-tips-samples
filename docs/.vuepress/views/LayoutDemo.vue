<template>
  <div class="theme-container no-sidebar">
    <header class="navbar">
      <a href="/" class="home-link router-link-active">
        <span class="site-name">現場で使えるVue.js tips集のサポートページ</span>
      </a>
      <div class="links">
        <nav class="nav-links can-hide">
          <div class="nav-item">
            <a href="/" class="nav-link">Home</a>
          </div>
          <div class="nav-item">
            <a href="/guide/" class="nav-link">Guide</a>
          </div>
          <div class="nav-item">
            <a href="/demo/" class="nav-link router-link-active">Demo</a>
          </div>
        </nav>
      </div>
    </header>
    <div class="page">
      <div class="content">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.navbar {
  padding-left: 1.5rem;
}
</style>
