import axios from 'axios';

const ApiService = {
  async getUserLocation(token) {
    return axios.get('/api/location', {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  async createPaymentIntent(data, token) {
    return axios.post('/api/payment', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default ApiService;
