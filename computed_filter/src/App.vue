<template>
  <section>
    <header>
      <h1>computed と filter</h1>
    </header>

    <section>
      <h2>computed</h2>
      <computed-example/>
    </section>

    <section>
      <h2>filter</h2>
      <filter-example/>
    </section>

  </section>
</template>

<script>
import ComputedExample from "./components/ComputedExample";
import FilterExample from "./components/FilterExample";

export default {
  components: {
    ComputedExample,
    FilterExample
  }
};
</script>
