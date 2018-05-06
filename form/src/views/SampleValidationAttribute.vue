<template>
  <div>
    <h1>バリデーションのタイミングを決める属性の動作サンプル</h1>

    <form v-on:submit.prevent="handleSubmit">
      <form-input
        id="email"
        label="メールアドレス（属性なし）"
        type="email"
        v-model.trim="form.email.value"
        v-bind:formItem="form.email"
        v-bind:maxlength="form.email.maxlength"
        v-on:notify="handleNotify"
      />
      <form-input
        id="emailDirty"
        label="メールアドレス（dirty）"
        type="email"
        v-model.trim="form.emailDirty.value"
        v-bind:formItem="form.emailDirty"
        v-bind:maxlength="form.emailDirty.maxlength"
        v-on:notify="handleNotify"
        dirty
      />
      <form-input
        id="emailTouched"
        label="メールアドレス（touched）"
        type="email"
        v-model.trim="form.emailTouched.value"
        v-bind:formItem="form.emailTouched"
        v-bind:maxlength="form.emailTouched.maxlength"
        v-on:notify="handleNotify"
        touched
      />
      <form-input
        id="emailTouechAndDirty"
        label="メールアドレス（touched and dirty）"
        type="email"
        v-model.trim="form.emailTouechAndDirty.value"
        v-bind:formItem="form.emailTouechAndDirty"
        v-bind:maxlength="form.emailTouechAndDirty.maxlength"
        v-on:notify="handleNotify"
        dirty
        touched
      />
      <form-input
        id="emailTouchedAfterDirty"
        label="メールアドレス（touched-after-dirty）"
        type="email"
        v-model.trim="form.emailTouchedAfterDirty.value"
        v-bind:formItem="form.emailTouchedAfterDirty"
        v-bind:maxlength="form.emailTouchedAfterDirty.maxlength"
        v-on:notify="handleNotify"
        touched-after-dirty
      />
      <button
        type="submit"
        v-bind:disabled="formObserver.hasError"
      >送信ボタン（ログ出力）</button>
    </form>
  </div>
</template>

<script>
import { FormInput } from "@/components";
import { FormObserver } from "@/lib";
import { SampleForm } from "@/models";

export default {
  data() {
    const form = new SampleForm();
    return {
      form,
      formObserver: new FormObserver(form.propertyNames())
    };
  },

  methods: {
    handleSubmit() {
      // eslint-disable-next-line
      console.log(this.form.properties());
    },

    handleNotify({ name, result }) {
      this.formObserver.setResult(name, result);
    }
  },

  components: {
    FormInput
  }
};
</script>

<style lang="scss" scoped>
</style>
