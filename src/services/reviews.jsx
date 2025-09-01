import api from './api';

export const reviewsAPI = {
  create: (reviewData) => api.post('/review/addReview', reviewData),
  getByMovieId: (movieId) => api.get(`/review/getReviews/${movieId}`),
  
  
};