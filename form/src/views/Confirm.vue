<template>
  <div>
    <h1>Confirm</h1>
    <div>
      <p>お名前</p>
      <p>{{ values.name }}</p>
      <p>メールアドレス</p>
      <p>{{ values.email }}</p>
      <p>カテゴリ</p>
      <p>{{ values.category }}</p>
      <p>タイトル</p>
      <p>{{ values.title }}</p>
      <p>お問い合わせ内容</p>
      <p>{{ values.body }}</p>
    </div>
    <div>
      <button v-on:click="handleClickSubmit">送信する</button>
      <router-link to="/form">戻る</router-link>
    </div>
  </div>
</template>

<script>
import { ContactForm } from "@/models";
import { FORM_GETTER_TYPES } from "@/store/form";

export default {
  data() {
    return {
      values: this.$store.getters[FORM_GETTER_TYPES.VALUES]
    };
  },

  methods: {
    handleClickSubmit() {
      const requestBody = new ContactForm(this.values).buildRequestBody();
      console.log(requestBody);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
