import { BaseFormItem } from '@/models';

export const formItemMixin = {
  props: {
    value: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    formItem: {
      type: BaseFormItem,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    dirty: {
      type: Boolean,
      default: false,
    },
    touched: {
      type: Boolean,
      default: false,
    },
    touchedAfterDirty: {
      type: Boolean,
      default: false,
    },
    initialValidation: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    if (this.initialValidation) {
      this.validate();
    }
  },

  data() {
    return {
      messages: [],
      state: {
        dirty: false,
        touched: false,
        touchedAfterDirty: false,
      },
    };
  },

  computed: {
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
      return this.state.dirty;
    },

    isTouched() {
      return this.state.touched;
    },

    isTouchedAfterDirty() {
      return this.state.touchedAfterDirty;
    },

    attrShowErrorConditions() {
      if (this.dirty) {
        if (this.isDirty === false) {
          return false;
        }
      }
      if (this.touched) {
        if (this.isTouched === false) {
          return false;
        }
      }
      if (this.touchedAfterDirty) {
        if (this.isTouchedAfterDirty === false) {
          return false;
        }
      }
      return true;
    },

    showError() {
      return this.hasError && this.attrShowErrorConditions;
    },
  },

  watch: {
    value() {
      this.validate();
    },
  },

  methods: {
    handleInput(evt) {
      this.$emit('input', evt.target.value);
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
      this.messages = this.validator();
      this.notify();
    },

    notify() {
      this.$emit('notify', { name: this.nameAttr, result: !this.hasError });
    },
  },
};
