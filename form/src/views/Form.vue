<template>
  <div>
    <h1>お問い合わせ</h1>

    <form v-on:submit.prevent="handleSubmit">
      <form-input
        id="name"
        v-model.trim="form.items.name.value"
        v-bind:formItem="form.items.name"
        v-bind:maxlength="form.items.name.maxlength"
        label="お名前/所属（必須）"
        autocomplete="name"
        dirty
        touched
      />
      <form-input
        id="email"
        v-model.trim="form.items.email.value"
        v-bind:formItem="form.items.email"
        v-bind:maxlength="form.items.email.maxlength"
        label="メールアドレス（必須）"
        type="email"
        autocomplete="email"
        dirty
        touched
      />
      <form-select
        id="category"
        v-model="form.items.category.value"
        v-bind:formItem="form.items.category"
        label="カテゴリ（必須）"
        dirty
        touched
      />
      <form-input
        id="title"
        v-model.trim="form.items.title.value"
        v-bind:formItem="form.items.title"
        v-bind:maxlength="form.items.title.maxlength"
        label="タイトル"
        dirty
        touched
      />
      <form-textarea
        id="body"
        v-model.trim="form.items.body.value"
        v-bind:formItem="form.items.body"
        v-bind:maxlength="form.items.body.maxlength"
        label="お問い合わせ内容（必須）"
        dirty
        touched
      />
      <button
        v-bind:disabled="form.invalid"
        type="submit"
      >確認画面へ</button>
    </form>
  </div>
</template>

<script>
import { FormInput, FormSelect, FormTextarea } from '@/components';
import { ContactForm } from '@/forms';
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
    };
  },

  methods: {
    handleSubmit() {
      this.$store.commit(FORM_MUTATION_TYPES.SET_VALUES, this.form.values());
      this.$router.push('/confirm');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
