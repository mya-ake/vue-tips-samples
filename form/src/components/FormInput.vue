<template>
  <div>
    <label v-bind:for="id">{{ label }}</label>
    <input
      v-bind:type="type"
      v-bind:id="id"
      v-bind:value="value"
      v-bind:name="nameAttr"
      v-bind:placeholder="placeholder"
      v-bind:required="required"
      v-bind:class="{
        'has-error': hasError
      }"
      v-on:input="handleInput"
    >
    <ul>
      <li
        v-for="(message, index) in messages"
        v-bind:key="`message-${index}`"
      >{{ message }}</li>
    </ul>
  </div>
</template>

<script>
import { FormObserver } from "@/lib";

export default {
  props: {
    type: {
      type: String,
      default: "text"
    },
    id: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    placeholder: {
      type: String,
      default: ""
    },
    required: {
      type: String
    },
    validator: {
      type: Function,
      default() {
        return [];
      }
    },
    formObserver: {
      validator(value) {
        return value instanceof FormObserver;
      },
      required: true
    }
  },

  data() {
    return {
      messages: []
    };
  },

  computed: {
    nameAttr() {
      return this.name || this.id;
    },

    hasError() {
      return this.messages.length > 0;
    }
  },

  methods: {
    handleInput(evt) {
      const value = evt.target.value;
      this.$emit("input", value);
      this.validate(value);
    },

    validate(value) {
      this.messages = this.validator(value);
      this.notify();
    },

    notify() {
      this.formObserver.setResult(this.nameAttr, !this.hasError);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
