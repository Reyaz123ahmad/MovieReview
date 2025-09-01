import api from './api';

export const watchlistAPI = {
  // Get user's watchlist
  getByUserId: (userId) => api.get(`/users/watchlist/${userId}`),
  
  // Add movie to watchlist
  add: (userId, movieId) => api.post(`/users/watchlist/${userId}`, { movieId }),
  
  // Remove movie from watchlist
  remove: (userId, movieId) => api.delete(`/users/watchlist/${userId}/${movieId}`),
  
  // Check if movie is in user's watchlist
  check: (userId, movieId) => api.get(`/users/watchlist/${userId}/check/${movieId}`)
};