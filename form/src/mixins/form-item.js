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
    touchedAfterDirty: {
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
        touchedAfterDirty: typeof this.touchedAfterDirty === "string",
        initialValidation:
          typeof this.initialValidation === "boolean"
            ? this.initialValidation
            : typeof this.initialValidation === "string"
      },
      state: {
        dirty: false,
        touched: false,
        touchedAfterDirty: false
      }
    };
  },

  computed: {
    value() {
      return this.formItem.value;
    },

    nameAttr() {
      return this.name || this.id;
    },

    hasError() {
      return this.messages.length > 0;
    },

    isDirty() {
      return this.state.dirty;
    },

    isTouched() {
      return this.state.touched;
    },

    isTouchedAfterDirty() {
      return this.state.touchedAfterDirty;
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
      if (this.hasAttr.touchedAfterDirty) {
        if (this.isTouchedAfterDirty === false) {
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
      this.$emit("input", evt.target.value);
      this.state.dirty = true;
    },

    handleBlur() {
      this.state.touched = true;
      if (this.isDirty) {
        this.state.touchedAfterDirty = true;
      }
      this.validate();
    },

    validate() {
      this.messages = this.formItem.validator();
      this.notify();
    },

    notify() {
      this.$emit("notify", { name: this.nameAttr, result: !this.hasError });
    }
  }
};
