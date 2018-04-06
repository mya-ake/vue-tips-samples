<template>
  <div>
    <h1>お問い合わせ</h1>

    <form v-on:submit.prevent="handleSubmit">
      <form-input
        id="email"
        label="メールアドレス"
        type="email"
        v-model="models.email.value"
        v-bind:formItem="models.email"
        v-on:notify="handleNotify"
        dirty
        touched
      />
      <button
        type="submit"
        v-bind:disabled="formObserver.hasError"
      >確認画面へ</button>
    </form>
  </div>
</template>

<script>
import { FormInput } from "@/components";
import { FormObserver } from "@/lib";
import { EmailFormItem } from "@/models";

export default {
  data() {
    const storeValues = this.$store.state.form.formValues;
    const models = {};
    if (storeValues !== null) {
      models.email = new EmailFormItem(storeValues.email);
    } else {
      models.email = new EmailFormItem("");
    }

    return {
      models,
      formObserver: new FormObserver(["email"])
    };
  },

  methods: {
    handleSubmit() {
      const formValues = Object.entries(this.models).reduce(
        (obj, [key, formItem]) => {
          obj[key] = formItem.value;
          return obj;
        },
        {}
      );
      this.$store.commit("form/setFormValues", formValues);
      this.$router.push("/confirm");
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
