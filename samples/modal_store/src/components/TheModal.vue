<template>
  <div
    v-bind:aria-hidden="!show"
    class="overlay"
    v-on:click.self="handleClickOverlay"
  >
    <div class="modal">
      <header class="header">
        <em class="header__text">{{ title }}</em>
      </header>
      <div class="body">
        <p class="body__text">{{ message }}</p>
      </div>
      <footer class="footer">
        <base-button v-on:click="handleClickCloseButton">閉じる</base-button>
      </footer>
    </div>
  </div>
</template>

<script>
import { BaseButton } from '@/components';
import { MODAL_ACTION_TYPES } from '@/store/modal';

const stopScroll = () => {
  document.body.style.overflow = 'hidden';
};

const releaseScroll = () => {
  document.body.style.overflow = '';
};

export default {
  components: {
    BaseButton,
  },

  computed: {
    show() {
      return this.$store.state.modal.show;
    },

    title() {
      return this.$store.state.modal.title;
    },

    message() {
      return this.$store.state.modal.message;
    },
  },

  watch: {
    show(value) {
      if (value === true) {
        stopScroll();
      } else {
        releaseScroll();
      }
    },
  },
  mounted() {
    window.addEventListener('popstate', this.handlePopstate);
  },

  beforeDestroy() {
    this.close();
    window.removeEventListener('popstate', this.handlePopstate);
  },

  methods: {
    handleClickCloseButton() {
      this.close();
    },

    handleClickOverlay() {
      this.close();
    },

    handlePopstate() {
      this.close();
    },

    close() {
      this.$store.dispatch(MODAL_ACTION_TYPES.CLOSE);
    },
  },
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
  &[aria-hidden='true'] {
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
