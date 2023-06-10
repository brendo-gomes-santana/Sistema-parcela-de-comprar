import axios from 'axios';

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
