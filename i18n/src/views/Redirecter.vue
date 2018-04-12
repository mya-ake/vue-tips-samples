<template>
  <div></div>
</template>

<script>
import { i18n } from "@/i18n";

export default {
  beforeRouteEnter(to, from, next) {
    next(`/${i18n.locale}${to.fullPath}`);
  }
};
</script>
