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
      class="input"
      v-bind:class="{ 'has-error': showError }"
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
import { BaseFormItem } from "@/models";

export default {
  props: {
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
    cols: {
      type: Number
    },
    rows: {
      type: Number
    },
    placeholder: {
      type: String
    },
    required: {
      type: String
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
      model: this.formItem.value,
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
      this.$emit("notify", { name: this.nameAttr, result: !this.hasError });
    }
  }
};
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  border: solid 1px $cb-input;
  border-radius: 3px;
  padding: 16px 14px;
  font-size: 1.4rem;
  &::placeholder {
    color: $ct-secondary;
  }
  @include media-min(small) {
    padding: 16px;
    font-size: 1.6rem;
  }
}

.has-error {
  color: $c-error;
  border-color: $c-error;
  &::placeholder {
    color: $c-error;
  }
}

.error-message-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  color: $c-error;
}

.error-message-list__item {
  padding: {
    top: 10px;
    bottom: 8px;
  }
}
</style>
