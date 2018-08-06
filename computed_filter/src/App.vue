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

    <section>
      <h2>Computed Form</h2>
      <computed-form/>
    </section>

  </section>
</template>

<script>
import ComputedExample from './components/ComputedExample';
import FilterExample from './components/FilterExample';
import ComputedForm from './components/ComputedForm';

export default {
  components: {
    ComputedExample,
    FilterExample,
    ComputedForm,
  },
};
</script>
