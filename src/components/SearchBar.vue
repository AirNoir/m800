<template>
  <div class="search-wrapper">
    <input
      v-model="location"
      @keyup="handleLocationChanged"
      class="px-3 py-2 border border-gray-400 rounded-md"
      type="text"
      placeholder="Please enter a location"
    />
    <button
      @click="handleLocationChanged"
      class="
        px-3
        py-2
        ml-6
        text-gray-400
        border
        border-gray-400
        rounded-md
        hover:bg-blue-500
      "
    >
      Search
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { getLocation, getWeatherByLocationId } from '@/api';
import debounce from 'lodash/debounce';

export default {
  data: () => ({
    location: '',
  }),
  methods: {
    ...mapActions({
      setWeather: 'setWeather',
    }),
    handleLocationChanged: debounce(async function search() {
      try {
        this.setWeather(null);
        const { status, data } = await getLocation(this.location);
        if (status === 200 && data.length > 0) {
          const location = data[0];
          const resp = await getWeatherByLocationId(location.woeid);
          this.setWeather(resp.data);
        }
      } catch (error) {
        window.console.log(error);
      }
    }, 800),
  },
};
</script>

<style lang="scss">
.search-wrapper {
  width: 100%;
}
</style>
