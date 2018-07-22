<template>
  <div>
    <label v-bind:for="id">{{ label }}</label>
    <select
      v-model="model"
      v-bind:id="id"
      v-bind:name="nameAttr"
      v-bind="$attrs"
      v-bind:class="{
        'has-error': showError
      }"
      v-on:input="handleInput"
      v-on:blur="handleBlur"
    >
      <option value="">選択してください</option>
      <option 
        v-for="(option, index) in options"
        v-bind:key="`option-${index}`"
        v-bind:value="option.value"
      >{{ option.text }}</option>
    </select>
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
import { BaseSelectFormItem } from '@/forms/items';

export default {
  mixins: [formItemMixin],
  inheritAttrs: false,

  props: {
    formItem: {
      type: BaseSelectFormItem,
      required: true,
    },
  },

  data() {
    return {
      model: this.formItem.value,
    };
  },

  computed: {
    options() {
      return this.formItem.options;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
