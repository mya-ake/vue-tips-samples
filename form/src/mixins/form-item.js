import { BaseFormItem } from '@/lib';

const createInitialState = () => {
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
      state: createInitialState(),
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

    messages() {
      return this.formItem.messages;
    },

    hasError() {
      return this.formItem.hasError;
    },

    showError() {
      return this.hasError && this.attrShowErrorConditions;
    },
  },

  methods: {
    handleInput(evt) {
      const value = evt.target.value;
      this.$emit('input', value);
    },

    handleBlur() {
      this.state.touched = true;
      if (this.isDirty) {
        this.state.touchedAfterDirty = true;
      }
      this.validate();
    },

    validate() {
      this.formItem.validate();
    },

    resetState() {
      this.state = createInitialState();
    },
  },
};
