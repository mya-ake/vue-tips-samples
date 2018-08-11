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
        v-for="(option, index) in formItem.options"
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
import { BaseSelectFormItem } from '@/lib';

export default {
  mixins: [formItemMixin],
  inheritAttrs: false,

  props: {
    formItem: {
      type: BaseSelectFormItem,
      required: true,
    },
  },

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
