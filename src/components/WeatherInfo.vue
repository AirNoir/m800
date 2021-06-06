<template>
   <div v-if="weatherData">
        <ul>
          <li class="p-2">Country: {{ weatherData.parent.title }}</li>
          <li class="p-2">City: {{ weatherData.title }}</li>
          <li>
            <table v-if="fiveDaysWeather.length > 0"
              class="rounded-t-lg m-5 w-5/6 mx-auto bg-gray-200 text-gray-800"
            >
              <thead>
                <tr class="text-left border-b-2 border-gray-300">
                  <th class="px-4 py-3">date</th>
                  <th class="px-4 py-3" v-for="(item, wIndex) in fiveDaysWeather" :key="wIndex">
                  {{ item.date }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="px-4 py-3">max temp.</td>
                  <td class="px-4 py-3" v-for="(item, wIndex) in fiveDaysWeather" :key="wIndex">
                  {{ item.max.toFixed(1) }}℃
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-3">min temp.</td>
                  <td class="px-4 py-3" v-for="(item, wIndex) in fiveDaysWeather" :key="wIndex">
                  {{ item.min.toFixed(1) }}℃
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-3">humidity</td>
                  <td class="px-4 py-3" v-for="(item, wIndex) in fiveDaysWeather" :key="wIndex">
                  {{ item.humidity }}%
                  </td>
                </tr>
              </tbody>
            </table>
          </li>
        </ul>
      </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'weather-info',
  computed: {
    ...mapState({
      weatherData: (state) => state.weatherData,
    }),
    fiveDaysWeather() {
      if (!this.weatherData) {
        return [];
      }
      return this.weatherData.consolidated_weather.slice(0, 5).map((item) => ({
        date: item.applicable_date,
        max: item.max_temp,
        min: item.min_temp,
        humidity: item.humidity,
        pressure: item.air_pressure,
      }));
    },
  },
};
</script>
