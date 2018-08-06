<template>
  <div>
    <h1>{{ $t('home.title') }}</h1>

    <div>
      <dl>
        <dt>$t</dt>
        <dd>{{ $t('home.text') }}</dd>
        <dt>v-t</dt>
        <dd v-t="'home.text'"/>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  beforeRouteUpdate(to, from, next) {
    this.$forceUpdate();
    next();
  },
};
</script>
