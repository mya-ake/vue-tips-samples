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
      <button
        v-bind:disabled="!submittable"
        v-on:click="handleClickSubmit"
      >送信する</button>
      <router-link to="/form">戻る</router-link>
    </div>
  </div>
</template>

<script>
import { ContactForm } from '@/forms';
import { FORM_GETTER_TYPES, FORM_MUTATION_TYPES } from '@/store/form';
import store from '@/store';

export default {
  beforeRouteEnter(to, from, next) {
    if (store.getters[FORM_GETTER_TYPES.IS_EMPTY]) {
      next('/form');
    }
    next();
  },

  data() {
    return {
      status: {
        submitting: false,
      },
    };
  },

  computed: {
    values() {
      return this.$store.getters[FORM_GETTER_TYPES.VALUES];
    },

    submittable() {
      return this.status.submitting === false;
    },
  },

  methods: {
    async handleClickSubmit() {
      const requestBody = new ContactForm(this.values).buildRequestBody();
      const result = await this.submit(requestBody);
      // eslint-disable-next-line
      console.log("result", result);
      this.$store.commit(FORM_MUTATION_TYPES.CLEAR_VALUES);
      this.$router.push('/complete');
    },

    submit(requestBody) {
      this.status.submitting = true;
      return new Promise(resolve => {
        setTimeout(() => {
          // eslint-disable-next-line
          console.log('request body', requestBody);
          this.status.submitting = false;
          resolve({
            message: 'success',
          });
        }, 1000);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
