<template>
  <div class="form-textarea">
    <label v-bind:for="id">{{ label }}</label>
    <textarea
      v-model="model"
      v-bind:id="id"
      v-bind:name="nameAttr"
      v-bind:cols="cols"
      v-bind:rows="rows"
      v-bind:placeholder="placeholder"
      v-bind:required="required"
      v-bind:maxlength="maxlength"
      v-bind:class="{
        'has-error': showError
      }"
      v-on:input="handleInput"
      v-on:blur="handleBlur"
    ></textarea>
    <ul
      v-show="showError"
      class="error-message-list"
    >
      <li
        v-for="(message, index) in messages"
        v-bind:key="`${id}-${index}`"
        class="error-message-list__item"
      >{{ message }}</li>
    </ul>
  </div>
</template>

<script>
import { formItemMixin } from "@/mixins";

export default {
  mixins: [formItemMixin],

  props: {
    cols: {
      type: Number
    },
    rows: {
      type: Number
    }
  },

  data() {
    return {
      model: this.formItem.value
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
