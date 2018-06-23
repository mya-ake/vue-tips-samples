<template>
  <div>
    <label v-bind:for="id">{{ label }}</label>
    <input
      v-bind:type="type"
      v-bind:id="id"
      v-bind:value="value"
      v-bind:name="nameAttr"
      v-bind="$attrs"
      v-bind:class="{
        'has-error': showError
      }"
      v-on:input="handleInput"
      v-on:blur="handleBlur"
    >
    <ul v-show="showError">
      <li
        v-for="(message, index) in messages"
        v-bind:key="`message-${index}`"
      >{{ message }}</li>
    </ul>
  </div>
</template>

<script>
import { formItemMixin } from '@/mixins';

export default {
  mixins: [formItemMixin],
  inheritAttrs: false,

  props: {
    type: {
      type: String,
      default: 'text',
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
