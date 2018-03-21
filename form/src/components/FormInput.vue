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
import { FormObserver } from "@/lib";
import { BaseFormItem } from "@/models";

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
    formItem: {
      validator(value) {
        return value instanceof BaseFormItem;
      }
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
        dirtyCount: 0,
        touched: false
      }
    };
  },

  computed: {
    value() {
      return this.formItem.value;
    },

    validator() {
      return this.formItem.validator;
    },

    nameAttr() {
      return this.name || this.id;
    },

    hasError() {
      return this.messages.length > 0;
    },

    isDirty() {
      return this.state.dirtyCount > 1;
    },

    isTouched() {
      return this.state.touched;
    },

    attrValidationConditions() {
      if (this.hasAttr.dirty) {
        if (this.isDirty === false) {
          return false;
        }
      }
      if (this.hasAttr.touched) {
        if (this.isTouched === false) {
          return false;
        }
      }
      return true;
    },

    showError() {
      return this.hasError && this.attrValidationConditions;
    }
  },

  watch: {
    value() {
      this.validate();
    }
  },

  methods: {
    handleInput(evt) {
      const value = evt.currentTarget.value;
      this.$emit("input", value);
      this.state.dirtyCount++;
    },

    handleBlur() {
      this.state.touched = true;
      this.validate();
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
