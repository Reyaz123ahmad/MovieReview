


import api from './api';

export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data; 
  },

  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data; 
  },
};
