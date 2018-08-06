<template>
  <div>
    <em>3桁区切り</em>
    <p>{{ number | separateDigit3 }}</p>
    <em>ゼロ埋め</em>
    <p>{{ number | padZero(12) }}</p>
  </div>
</template>

<script>
export default {
  filters: {
    separateDigit3(value) {
      return Number(value).toLocaleString('ja-JP', { style: 'decimal' });
    },

    padZero(value, digit = 10) {
      return String(value).padStart(digit, '0');
    },
  },
  data() {
    return {
      number: 12345678,
    };
  },
};
</script>
