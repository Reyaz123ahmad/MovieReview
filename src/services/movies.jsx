import api from './api';

export const moviesAPI = {
  getAll: (params = {}) => api.get('/movie/getAllMovies', { params }),
  getById: (id) => api.get(`/movie/getMovie/${id}`),
  create: (movieData) => api.post('/movie/createMovie', movieData)
  
};