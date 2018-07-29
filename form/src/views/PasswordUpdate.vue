<template>
  <div>
    <h1>パスワード再設定</h1>

    <form v-on:submit.prevent="handleSubmit">
      <form-input
        id="password"
        v-model.trim="form.items.password.value"
        v-bind:formItem="form.items.password"
        v-bind:maxlength="form.items.password.maxlength"
        label="新しいパスワード"
        touchedAfterDirty
      />
      <form-input
        id="password-confirm"
        v-model.trim="form.items.passwordConfirm.value"
        v-bind:formItem="form.items.passwordConfirm"
        label="新しいパスワード（確認）"
        touchedAfterDirty
      />

      <button
        v-bind:disabled="form.invalid"
        type="submit"
      >パスワードを変更する</button>
    </form>
  </div>
</template>

<script>
import { FormInput } from '@/components';
import { PasswordUpdateForm } from '@/forms';

export default {
  components: {
    FormInput,
  },

  data() {
    const form = new PasswordUpdateForm();
    return {
      form,
    };
  },

  methods: {
    handleSubmit() {
      console.log('submit', this.form.buildRequestBody());
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
