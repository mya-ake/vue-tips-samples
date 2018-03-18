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
      v-on:blur="handleBlur"
    >
    <ul v-show="hasError">
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
      required: true
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
    },
    dirty: {
      type: String
    },
    touched: {
      type: String
    },
    initialValidate: {
      type: String
    }
  },

  mounted() {
    if (this.hasAttr.initialValidate) {
      this.validate();
    }
  },

  data() {
    return {
      messages: [],
      hasAttr: {
        dirty: typeof this.dirty === "string",
        touched: typeof this.touched === "string",
        initialValidate: typeof this.initialValidate === "string"
      },
      state: {
        dirty: false,
        touched: false
      }
    };
  },

  computed: {
    nameAttr() {
      return this.name || this.id;
    },

    hasError() {
      return this.messages.length > 0;
    },

    validatable() {
      if (this.hasAttr.dirty) {
        if (this.state.dirty === false) {
          return false;
        }
      }
      if (this.hasAttr.touched) {
        if (this.state.touched === false) {
          return false;
        }
      }
      return true;
    }
  },

  watch: {
    value() {
      if (this.validatable) {
        this.validate();
      }
      this.state.dirty = true;
    }
  },

  methods: {
    handleInput(evt) {
      const value = evt.currentTarget.value;
      this.$emit("input", value);
    },

    handleBlur() {
      this.state.touched = true;
      if (this.validatable) {
        this.validate();
      }
    },

    validate() {
      this.messages = this.validator(this.value);
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
