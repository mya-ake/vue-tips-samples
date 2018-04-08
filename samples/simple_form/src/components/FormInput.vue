<template>
  <div>
    <label v-bind:for="id">{{ label }}</label>
    <input
      v-bind:type="type"
      v-bind:id="id"
      v-bind:name="nameAttr"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"   
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
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    value: {
      required: true
    },
    validator: {
      type: Function,
      required: true
    },
    type: {
      type: String,
      default: "text"
    },
    name: {
      type: String
    }
  },
  data() {
    return {
      messages: []
    };
  },
  watch: {
    value(value) {
      this.messages = this.validator(value);
      this.notify();
    }
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
    notify() {
      this.$emit("notify", {
        name: this.nameAttr,
        result: !this.hasError
      });
    }
  }
};
</script>
