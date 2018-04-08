<template>
  <div>
    <h1>お問い合わせ</h1>

    <form v-on:submit.prevent="handleSubmit">
      <form-input
        id="email"
        label="メールアドレス"
        type="email"
        v-model="email"
        v-bind:validator="validator"
        v-on:notify="handleNotify"
      />
      <button
        type="submit"
        v-bind:disabled="formObserver.hasError"
      >内容を確認する</button>
    </form>
  </div>
</template>

<script>
import FormInput from "@/components/FormInput";
import { FormObserver } from "@/lib";

export default {
  data() {
    const storeValues = this.$store.getters.values;
    return {
      email: storeValues.email,
      validator(value) {
        const messages = [];
        if (value.length === 0) {
          messages.push("入力が必須の項目です");
        }
        return messages;
      },
      formObserver: new FormObserver(["email"])
    };
  },
  methods: {
    handleNotify({ name, result }) {
      this.formObserver.setResult(name, result);
    },
    handleSubmit() {
      const values = {
        email: this.email
      };
      this.$store.commit("setValues", values);
      this.$router.push("/confirm");
    }
  },
  components: {
    FormInput
  }
};
</script>

<style lang="scss" scoped>
</style>
