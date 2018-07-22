<template>
  <div>
    <h1>バリデーションのタイミングを決める属性の動作サンプル</h1>

    <form v-on:submit.prevent="handleSubmit">
      <form-input
        id="email"
        v-model.trim="form.email.value"
        v-bind:formItem="form.email"
        v-bind:maxlength="form.email.maxlength"
        label="メールアドレス（属性なし）"
        type="email"
        v-on:notify="handleNotify"
      />
      <form-input
        id="emailDirty"
        v-model.trim="form.emailDirty.value"
        v-bind:formItem="form.emailDirty"
        v-bind:maxlength="form.emailDirty.maxlength"
        label="メールアドレス（dirty）"
        type="email"
        dirty
        v-on:notify="handleNotify"
      />
      <form-input
        id="emailTouched"
        v-model.trim="form.emailTouched.value"
        v-bind:formItem="form.emailTouched"
        v-bind:maxlength="form.emailTouched.maxlength"
        label="メールアドレス（touched）"
        type="email"
        touched
        v-on:notify="handleNotify"
      />
      <form-input
        id="emailTouechAndDirty"
        v-model.trim="form.emailTouechAndDirty.value"
        v-bind:formItem="form.emailTouechAndDirty"
        v-bind:maxlength="form.emailTouechAndDirty.maxlength"
        label="メールアドレス（touched and dirty）"
        type="email"
        dirty
        touched
        v-on:notify="handleNotify"
      />
      <form-input
        id="emailTouchedAfterDirty"
        v-model.trim="form.emailTouchedAfterDirty.value"
        v-bind:formItem="form.emailTouchedAfterDirty"
        v-bind:maxlength="form.emailTouchedAfterDirty.maxlength"
        label="メールアドレス（touched-after-dirty）"
        type="email"
        touchedAfterDirty
        v-on:notify="handleNotify"
      />
      <button
        v-bind:disabled="formObserver.hasError"
        type="submit"
      >送信ボタン（ログ出力）</button>
    </form>
  </div>
</template>

<script>
import { FormInput } from '@/components';
import { FormObserver } from '@/lib';
import { SampleForm } from '@/forms';

export default {
  components: {
    FormInput,
  },
  data() {
    const form = new SampleForm();
    return {
      form,
      formObserver: new FormObserver(form.propertyNames()),
    };
  },

  methods: {
    handleSubmit() {
      // eslint-disable-next-line
      console.log(this.form.properties());
    },

    handleNotify({ name, result }) {
      this.formObserver.setResult(name, result);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
