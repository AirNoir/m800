import axios from 'axios';

const apiBase = axios.create({
  baseURL: process.env.VUE_APP_WEATHTER_API_HOST,
});

export const getLocation = (location) => apiBase.get(`/api/location/search/?query=${location}`);
export const getWeatherByLocationId = (id) => apiBase.get(`/api/location/${id}`);

export default (
  getLocation,
  getWeatherByLocationId
);
