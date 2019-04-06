<template>
  <section class="index-page">
    <h1>nest-nuxt-boilerplate</h1>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
};
</script>
