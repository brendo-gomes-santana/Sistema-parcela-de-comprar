import axios from 'axios';

export const Url = 'https://controle-de-parcelas.netlify.app'
export const UrlFoto = 'https://api-parcela-de-comprar-pqvs.onrender.com/foto/'

const Api = axios.create({
  baseURL: 'https://api-parcela-de-comprar-pqvs.onrender.com'
});

Api.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: 'Doctorwho10!10'
  };
  return config;
});

export default Api;
