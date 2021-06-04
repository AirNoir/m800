<template>
  <div id="app">
    <search-bar />
    <main>
      <bar-chart />
    </main>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
import BarChart from '@/components/charts/BarChart.vue';

export default {
  name: 'App',
  components: {
    SearchBar,
    BarChart,
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
