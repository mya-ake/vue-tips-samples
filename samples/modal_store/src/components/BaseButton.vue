<template>
  <button
    v-bind:class="`base-button--${kind}`"
    class="base-button"
    v-on:click="handleClick"
  >
    <slot/>
  </button>
</template>

<script>
export default {
  props: {
    kind: {
      type: String,
      default: 'default',
      validator(value) {
        return ['primary', 'default'].includes(value);
      },
    },
  },

  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    },
  },
};
</script>

<style lang="scss" scoped>
$c-primary: #4fc08d;

.base-button {
  border: solid 1px $c-primary;
  border-radius: 3px;
  padding: 8px 16px;
  cursor: pointer;
}

.base-button--default {
  color: $c-primary;
  background-color: transparent;
}

.base-button--primary {
  color: #fff;
  background-color: $c-primary;
}
</style>
