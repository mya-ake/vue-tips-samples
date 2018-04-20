<template>
  <div class="overlay" v-bind:aria-hidden="!show">
    <div class="modal">
      <header class="header">
        <em class="header__text">ヘッダー</em>
      </header>
      <div class="body">
        <p class="body__text">Modal text</p>
      </div>
      <footer class="footer">
        <base-button v-on:click="handleClickClose">閉じる</base-button>
      </footer>
    </div>
  </div>
</template>

<script>
import { BaseButton } from "@/components";

export default {
  data() {
    return {
      show: true
    };
  },

  methods: {
    handleClickClose() {
      this.close();
    },

    close() {
      this.show = false;
    }
  },

  components: {
    BaseButton
  }
};
</script>

<style lang="scss" scoped>
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100vw;
  height: 100vh;
  padding: 24px;
  background-color: rgba(0, 0, 0, 0.7);
  visibility: visible;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  z-index: 100;
  &[aria-hidden="true"] {
    visibility: hidden;
  }
}

.modal {
  margin: auto;
  width: 100%;
  max-width: 432px;
  border: 0;
  border-radius: 3px;
  background-color: #fff;
}

.header {
  padding: 24px 16px 16px;
  border-bottom: solid 1px #bbb;
}

.header__text {
  font-weight: bold;
  font-style: normal;
  font-size: 18px;
}

.body {
  padding: 16px;
}

.body__text {
  margin: 0;
  line-height: 1.6;
  font-size: 16px;
}

.footer {
  border-top: solid 1px #bbb;
  padding: 16px;
  text-align: center;
}
</style>
