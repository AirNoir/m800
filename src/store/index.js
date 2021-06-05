import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    weatherData: null,
  },
  mutations: {
    SET_WEATHER(state, payload) {
      state.weatherData = payload;
    },
  },
  actions: {
    setWeather({ commit }, weatherData) {
      commit('SET_WEATHER', weatherData);
    },
  },
  modules: {
  },
});
