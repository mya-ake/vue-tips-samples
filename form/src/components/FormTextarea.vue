<template>
  <div>
    <label v-bind:for="id">{{ label }}</label>
    <textarea
      v-model="model"
      v-bind:id="id"
      v-bind:name="nameAttr"
      v-bind="$attrs"
      v-bind:class="{
        'has-error': showError
      }"
      v-on:input="handleInput"
      v-on:blur="handleBlur"
    />
    <ul
      v-show="showError"
    >
      <li
        v-for="(message, index) in messages"
        v-bind:key="`${id}-${index}`"
      >{{ message }}</li>
    </ul>
  </div>
</template>

<script>
import { formItemMixin } from '@/mixins';

export default {
  mixins: [formItemMixin],
  inheritAttrs: false,

  computed: {
    model: {
      get() {
        return this.value;
      },
      set() {},
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
