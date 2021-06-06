<template>
  <div id="app" class="w-full">
    <search-bar />
    <main>
      <weather-info />
      <bar-chart />
      <pie-chart />
    </main>
  </div>
</template>

<script>
import 'nprogress/nprogress.css';
import SearchBar from '@/components/SearchBar.vue';
import WeatherInfo from '@/components/WeatherInfo.vue';
import BarChart from '@/components/charts/BarChart.vue';
import PieChart from '@/components/charts/PieChart.vue';

export default {
  name: 'App',
  components: {
    SearchBar,
    WeatherInfo,
    BarChart,
    PieChart,
  },

};
</script>

<style lang="scss">
#app {
  width: 100%;
  padding: 5%;
  font-size: 16px;
  main {
    width: 100%;
    max-width: 1024px;
  }
}

</style>
