import axios from 'axios';

export const Url = 'http://localhost:3000'

const Api = axios.create({
  baseURL: 'http://localhost:3333'
});

Api.interceptors.request.use((config) => {

  config.params = {
    ...config.params,
    api_key: 'Doctorwho10!10'
  };

  return config;
});

export default Api;
