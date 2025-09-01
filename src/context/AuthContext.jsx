// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { authAPI } from '../services/auth';

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState(localStorage.getItem('token'));

//   useEffect(() => {
//     if (token) {
//       // Verify token and get user info
//       const verifyToken = async () => {
//         try {
//           // You might need to implement a /me endpoint in your backend
//           // For now, we'll just decode the token to get user info
//           const userData = JSON.parse(atob(token.split('.')[1]));
//           setCurrentUser(userData);
//         } catch (error) {
//           console.error('Token verification failed:', error);
//           logout();
//         } finally {
//           setLoading(false);
//         }
//       };
//       verifyToken();
//     } else {
//       setLoading(false);
//     }
//   }, [token]);

//   const login = async (email, password) => {
//     try {
//       const response = await authAPI.login(email, password);
//       if (response.success) {
//         setToken(response.token);
//         localStorage.setItem('token', response.token);
//         setCurrentUser(response.user);
//         return { success: true };
//       }
//     } catch (error) {
//       return { 
//         success: false, 
//         message: error.response?.data?.message || 'Login failed' 
//       };
//     }
//   };

//   const signup = async (userData) => {
//     try {
//       const response = await authAPI.signup(userData);
//       if (response.success) {
//         setToken(response.token);
//         localStorage.setItem('token', response.token);
//         setCurrentUser(response.user);
//         return { success: true };
//       }
//     } catch (error) {
//       return { 
//         success: false, 
//         message: error.response?.data?.message || 'Signup failed' 
//       };
//     }
//   };

//   const logout = () => {
//     setToken(null);
//     setCurrentUser(null);
//     localStorage.removeItem('token');
//   };

//   const value = {
//     currentUser,
//     login,
//     signup,
//     logout,
//     token
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };




// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/auth'; // Your API service

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      try {
        const userData = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        setCurrentUser(userData);
      } catch (error) {
        console.error('Token decoding failed:', error);
        logout();
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      if (response.success) {
        setToken(response.token);
        localStorage.setItem('token', response.token);
        setCurrentUser(response.user);
        return { success: true };
      } else {
        return { success: false, message: response.message || 'Login failed' };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await authAPI.signup(userData);
      if (response.success) {
        setToken(response.token);
        localStorage.setItem('token', response.token);
        setCurrentUser(response.user);
        return { success: true };
      } else {
        return { success: false, message: response.message || 'Signup failed' };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Signup failed'
      };
    }
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
