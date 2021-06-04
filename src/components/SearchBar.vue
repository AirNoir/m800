<template>
  <div class="search-wrapper">
    <input
      v-model="location"
      @keyup="handleLocationChanged"
      class="rounded-md"
      type="text"
      placeholder="Please enter the location">
  </div>
</template>

<script>
import { getLocation, getWeatherByLocationId } from '@/api';
import debounce from 'lodash/debounce';

export default {
  data: () => ({
    location: '',
  }),
  methods: {
    handleLocationChanged: debounce(async function search() {
      try {
        const { status, data } = await getLocation(this.location);
        if (status === 200 && data.length > 0) {
          const location = data[0];
          const resp = await getWeatherByLocationId(location.woeid);
          console.log(resp);
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
  input {
    width: 250px;
    height: 30px;
    // border-radius: 5px;
    border: 1px solid #bbb;
    padding-left: 8px;
  }

}
</style>
