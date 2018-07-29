<template>
  <div>
    <h1>バリデーションのタイミングを決める属性の動作サンプル</h1>

    <form v-on:submit.prevent="handleSubmit">
      <form-input
        id="email"
        v-model.trim="form.items.email.value"
        v-bind:formItem="form.items.email"
        v-bind:maxlength="form.items.email.maxlength"
        label="メールアドレス（属性なし）"
        type="email"
        autocomplete="email"
      />
      <form-input
        id="emailDirty"
        v-model.trim="form.items.emailDirty.value"
        v-bind:formItem="form.items.emailDirty"
        v-bind:maxlength="form.items.emailDirty.maxlength"
        label="メールアドレス（dirty）"
        type="email"
        autocomplete="email"
        dirty
      />
      <form-input
        id="emailTouched"
        v-model.trim="form.items.emailTouched.value"
        v-bind:formItem="form.items.emailTouched"
        v-bind:maxlength="form.items.emailTouched.maxlength"
        label="メールアドレス（touched）"
        type="email"
        autocomplete="email"
        touched
      />
      <form-input
        id="emailTouechAndDirty"
        v-model.trim="form.items.emailTouechAndDirty.value"
        v-bind:formItem="form.items.emailTouechAndDirty"
        v-bind:maxlength="form.items.emailTouechAndDirty.maxlength"
        label="メールアドレス（touched and dirty）"
        type="email"
        autocomplete="email"
        dirty
        touched
      />
      <form-input
        id="emailTouchedAfterDirty"
        v-model.trim="form.items.emailTouchedAfterDirty.value"
        v-bind:formItem="form.items.emailTouchedAfterDirty"
        v-bind:maxlength="form.items.emailTouchedAfterDirty.maxlength"
        label="メールアドレス（touched-after-dirty）"
        type="email"
        autocomplete="email"
        touchedAfterDirty
      />
      <button
        v-bind:disabled="form.invalid"
        type="submit"
      >送信ボタン（ログ出力）</button>
    </form>
  </div>
</template>

<script>
import { FormInput } from '@/components';
import { SampleForm } from '@/forms';

export default {
  components: {
    FormInput,
  },

  data() {
    const form = new SampleForm();
    return {
      form,
    };
  },

  methods: {
    handleSubmit() {
      // eslint-disable-next-line
      console.log(this.form.values());
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
