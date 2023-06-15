import axios from 'axios';

export const Url = 'http://localhost:3000'
export const UrlFoto = 'https://api-parcela-de-comprar.onrender.com/foto/'

const Api = axios.create({
  baseURL: 'https://api-parcela-de-comprar.onrender.com'
});

Api.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: 'Doctorwho10!10'
  };
  return config;
});

export default Api;
