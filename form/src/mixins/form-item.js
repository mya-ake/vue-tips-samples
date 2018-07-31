import { BaseFormItem } from '@/lib';

const createInitialStates = () => {
  return {
    touched: false,
    touchedAfterDirty: false,
  };
};

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
  },

  data() {
    return {
      states: createInitialStates(),
    };
  },

  computed: {
    nameAttr() {
      return this.name || this.id;
    },

    isDirty() {
      return this.formItem.states.dirty;
    },

    isTouched() {
      return this.states.touched;
    },

    isTouchedAfterDirty() {
      return this.states.touchedAfterDirty;
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

    messages() {
      return this.formItem.messages;
    },

    invalid() {
      return this.formItem.invalid;
    },

    showError() {
      return this.invalid && this.attrShowErrorConditions;
    },
  },

  methods: {
    handleInput(evt) {
      const value = evt.target.value;
      this.$emit('input', value);
    },

    handleBlur() {
      this.states.touched = true;
      if (this.isDirty) {
        this.states.touchedAfterDirty = true;
      }
      this.validate();
    },

    validate() {
      this.formItem.validate();
    },

    resetStates() {
      this.states = createInitialStates();
      this.formItem.resetStates();
    },
  },
};
