<template>
  <div id="app">
    <SearchBar />
    <main>

    </main>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';

export default {
  name: 'App',
  components: {
    SearchBar,
  },
  created() {
    this.init();
  },
  methods: {
    init() {

    },
  },
};
</script>

<style lang="scss">
#app {
  widows: 100%;
  padding: 24px;
  font-size: 16px;
  main {
    width: 100%;
    max-width: 1024px;
  }
}

</style>
