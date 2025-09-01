import api from './api';

// export const usersAPI = {
//   getById: (userId) => api.get(`/auth/getUserProfile/${userId}`),
//   update: (userId, userData) => api.put(`/auth/updateUserProfile/${userId}`, userData),
// };
// import api from './api';

export const usersAPI = {
  getById: (userId) => api.get(`/auth/getUserProfile/${userId}`),
  update: (userId, userData) => api.put(`/auth/updateUserProfile/${userId}`, userData),
  updateWithImage: (userId, formData) =>
    api.put(`/auth/updateUserProfile/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};
