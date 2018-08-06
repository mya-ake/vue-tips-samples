<template>
  <layout-demo>
    <div>
      <router-link to="/">Home</router-link> | 
      <router-link to="/demo/">Demo</router-link> | 
      <router-link v-t="'nav.home'" to="/"/> |
      <router-link v-t="'nav.about'" to="/about"/> | 
      <router-link v-t="'nav.change-language'" v-bind:to="changeLanguageTo"/>
    </div>
    <router-view/>
  </layout-demo>
</template>

<script>
export default {
  computed: {
    changeLanguageTo() {
      switch (this.$i18n.locale) {
        case 'en':
          return '/ja';
        default:
          return '/en';
      }
    },
  },
}
</script>
