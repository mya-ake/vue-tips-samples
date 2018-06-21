<template>
  <div>
    <h1>お問い合わせ</h1>

    <form v-on:submit.prevent="handleSubmit">
      <form-input
        id="name"
        v-model.trim="form.name.value"
        v-bind:formItem="form.name"
        v-bind:maxlength="form.name.maxlength"
        label="お名前/所属（必須）"
        dirty
        touched
        initialValidation
        v-on:notify="handleNotify"
      />
      <form-input
        id="email"
        v-model.trim="form.email.value"
        v-bind:formItem="form.email"
        v-bind:maxlength="form.email.maxlength"
        label="メールアドレス（必須）"
        type="email"
        dirty
        touched
        initialValidation
        v-on:notify="handleNotify"
      />
      <form-select
        id="category"
        v-model="form.category.value"
        v-bind:formItem="form.category"
        label="カテゴリ（必須）"
        dirty
        touched
        initialValidation
        v-on:notify="handleNotify"
      />
      <form-input
        id="title"
        v-model.trim="form.title.value"
        v-bind:formItem="form.title"
        v-bind:maxlength="form.title.maxlength"
        label="タイトル"
        dirty
        touched
        initialValidation
        v-on:notify="handleNotify"
      />
      <form-textarea
        id="body"
        v-model.trim="form.body.value"
        v-bind:formItem="form.body"
        v-bind:maxlength="form.body.maxlength"
        label="お問い合わせ内容（必須）"
        dirty
        touched
        initialValidation
        v-on:notify="handleNotify"
      />
      <button
        v-bind:disabled="formObserver.hasError"
        type="submit"
      >確認画面へ</button>
    </form>
  </div>
</template>

<script>
import { FormInput, FormSelect, FormTextarea } from '@/components';
import { FormObserver } from '@/lib';
import { ContactForm } from '@/models';
import { FORM_GETTER_TYPES, FORM_MUTATION_TYPES } from '@/store/form';

export default {
  components: {
    FormInput,
    FormSelect,
    FormTextarea,
  },
  data() {
    const storeValues = this.$store.getters[FORM_GETTER_TYPES.VALUES];
    const form = new ContactForm(storeValues);
    return {
      form,
      formObserver: new FormObserver(form.propertyNames()),
    };
  },

  methods: {
    handleSubmit() {
      this.$store.commit(
        FORM_MUTATION_TYPES.SET_VALUES,
        this.form.properties(),
      );
      this.$router.push('/confirm');
    },

    handleNotify({ name, result }) {
      this.formObserver.setResult(name, result);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
