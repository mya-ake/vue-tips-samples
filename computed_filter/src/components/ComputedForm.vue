<template>
  <div>
    <form v-on:submit.prevent="handleSubmit">
      <div>
        <label for="name">Name</label>
        <input v-model.trim="name" id="name" type="text">
        <p v-if="invalidName">{{ messageName }}</p>
      </div>
      <div>
        <label for="email">Email</label>
        <input v-model.trim="email" id="email" type="email">
        <p v-if="invalidEmail">{{ messageEmail }}</p>
      </div>
      <button type="submit" v-bind:disabled="hasError">送信</button>
    </form>
    <div v-text="sendData"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      sendData: null
    };
  },

  computed: {
    messageName() {
      return this.name.length === 0 ? "入力してください" : "";
    },

    messageEmail() {
      if (this.email.length === 0) {
        return "入力してください";
      }
      // バリデーションが雑なので流用しないでください
      if (/\w+@\w+/.test(this.email) === false) {
        return "メールアドレスを入力してください";
      }
      return "";
    },

    invalidName() {
      return this.messageName.length > 0;
    },

    invalidEmail() {
      return this.messageEmail.length > 0;
    },

    hasError() {
      return this.invalidName || this.invalidEmail;
    }
  },

  methods: {
    handleSubmit() {
      this.sendData = JSON.stringify({
        name: this.name,
        email: this.email
      });
    }
  }
};
</script>
