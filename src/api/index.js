import axios from 'axios';
import NProgress from 'nprogress';

NProgress.configure({ showSpinner: false });
const apiBase = axios.create({
  baseURL: process.env.VUE_APP_WEATHTER_API_HOST,
});

apiBase.interceptors.request.use((config) => {
  NProgress.start();
  return config;
}, (error) => {
  NProgress.done();
  return Promise.reject(error);
});

apiBase.interceptors.response.use((config) => {
  NProgress.done();
  return config;
}, (error) => {
  NProgress.done();
  return Promise.reject(error);
});

export const getLocation = (location) => apiBase.get(`/api/location/search/?query=${location}`);
export const getWeatherByLocationId = (id) => apiBase.get(`/api/location/${id}`);

export default (
  getLocation,
  getWeatherByLocationId
);
