<template>
  <div>
    <h1>お問い合わせ</h1>

    <form v-on:submit.prevent="handleSubmit">
      <form-input
        id="name"
        label="お名前/所属（必須）"
        v-model.trim="form.name.value"
        v-bind:formItem="form.name"
        v-bind:maxlength="form.name.maxlength"
        v-on:notify="handleNotify"
        dirty
        touched
        InitialVerification
      />
      <form-input
        id="email"
        label="メールアドレス（必須）"
        type="email"
        v-model.trim="form.email.value"
        v-bind:formItem="form.email"
        v-bind:maxlength="form.email.maxlength"
        v-on:notify="handleNotify"
        dirty
        touched
        InitialVerification
      />
      <form-select
        id="category"
        label="カテゴリ（必須）"
        v-model="form.category.value"
        v-bind:formItem="form.category"
        v-on:notify="handleNotify"
        dirty
        touched
        InitialVerification
      />
      <form-input
        id="title"
        label="タイトル"
        v-model.trim="form.title.value"
        v-bind:formItem="form.title"
        v-bind:maxlength="form.title.maxlength"
        v-on:notify="handleNotify"
        dirty
        touched
        InitialVerification
      />
      <form-textarea
        id="body"
        label="お問い合わせ内容（必須）"
        v-model.trim="form.body.value"
        v-bind:formItem="form.body"
        v-bind:maxlength="form.body.maxlength"
        v-on:notify="handleNotify"
        dirty
        touched
        InitialVerification
      />
      <button
        type="submit"
        v-bind:disabled="formObserver.hasError"
      >確認画面へ</button>
    </form>
  </div>
</template>

<script>
import { FormInput, FormSelect, FormTextarea } from "@/components";
import { FormObserver } from "@/lib";
import { ContactForm } from "@/models";
import { FORM_GETTER_TYPES, FORM_MUTATION_TYPES } from "@/store/form";

export default {
  data() {
    const storeValues = this.$store.getters[FORM_GETTER_TYPES.VALUES];
    const form = new ContactForm(storeValues);
    return {
      form,
      formObserver: new FormObserver(form.propertyNames())
    };
  },

  methods: {
    handleSubmit() {
      this.$store.commit(
        FORM_MUTATION_TYPES.SET_VALUES,
        this.form.properties()
      );
      this.$router.push("/confirm");
    },

    handleNotify({ name, result }) {
      this.formObserver.setResult(name, result);
    }
  },

  components: {
    FormInput,
    FormSelect,
    FormTextarea
  }
};
</script>

<style lang="scss" scoped>
</style>
