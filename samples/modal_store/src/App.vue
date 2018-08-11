<template>
  <div>
    <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <the-modal/>
  </div>
</template>

<script>
import { TheModal } from '@/components';

export default {
  components: {
    TheModal,
  },
};
</script>


<style lang="scss">
</style>
