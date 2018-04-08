import { BaseFormItem } from "@/models";

export const formItemMixin = {
  props: {
    id: {
      type: String,
      required: true
    },
    formItem: {
      validator(value) {
        return value instanceof BaseFormItem;
      },
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
    maxlength: {
      type: [String, Number],
      validator(value) {
        return isNaN(Number(value)) === false;
      }
    },
    dirty: {
      type: String
    },
    touched: {
      type: String
    },
    initialValidation: {
      type: [String, Boolean]
    }
  },

  mounted() {
    if (this.hasAttr.initialValidation) {
      this.validate();
    }
  },

  data() {
    return {
      messages: [],
      hasAttr: {
        dirty: typeof this.dirty === "string",
        touched: typeof this.touched === "string",
        initialValidation:
          typeof this.initialValidation === "boolean"
            ? this.initialValidation
            : typeof this.initialValidation === "string"
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

    attrShowErrorConditions() {
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
      return this.hasError && this.attrShowErrorConditions;
    }
  },

  watch: {
    value() {
      this.validate();
    }
  },

  methods: {
    handleInput(evt) {
      const value = evt.target.value;
      this.$emit("input", value);
      this.state.dirtyCount++;
    },

    handleBlur() {
      this.state.touched = true;
      this.validate();
    },

    validate() {
      this.messages = this.validator();
      this.notify();
    },

    notify() {
      this.$emit("notify", { name: this.nameAttr, result: !this.hasError });
    }
  }
};
