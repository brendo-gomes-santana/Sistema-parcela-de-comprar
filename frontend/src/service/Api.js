import axios from 'axios';

//https://api-parcela-de-comprar.onrender.com

export const Url = 'https://controle-de-parcelas.netlify.app'
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
