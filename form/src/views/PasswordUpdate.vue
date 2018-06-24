<template>
  <div>
    <h1>パスワード再設定</h1>

    <form v-on:submit.prevent="handleSubmit">
      <form-input
        id="password"
        v-model.trim="form.password.value"
        v-bind:formItem="form.password"
        v-bind:maxlength="form.password.maxlength"
        label="新しいパスワード"
        touchedAfterDirty
        v-on:notify="handleNotify"
      />
      <form-input
        id="password-confirm"
        v-model.trim="form.passwordConfirm.value"
        v-bind:formItem="form.passwordConfirm"
        v-bind:maxlength="form.passwordConfirm.maxlength"
        label="新しいパスワード（確認）"
        touchedAfterDirty
        v-on:notify="handleNotify"
      />

      <button
        v-bind:disabled="formObserver.hasError"
        type="submit"
      >パスワードを変更する</button>
    </form>
  </div>
</template>

<script>
import { FormInput } from '@/components';
import { FormObserver } from '@/lib';
import { PasswordUpdateForm } from '@/models';

export default {
  components: {
    FormInput,
  },

  data() {
    const form = new PasswordUpdateForm();
    return {
      form,
      formObserver: new FormObserver(form.propertyNames()),
    };
  },

  methods: {
    handleSubmit() {
      console.log('submit', this.form.buildRequestBody());
    },

    handleNotify({ name, result }) {
      this.formObserver.setResult(name, result);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
