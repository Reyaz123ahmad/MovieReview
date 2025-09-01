import React, { createContext, useContext, useReducer } from 'react';

const MovieContext = createContext();

const movieReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return { ...state, movies: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'SET_PAGINATION':
      return { ...state, pagination: action.payload };
    case 'SET_SELECTED_MOVIE':
      return { ...state, selectedMovie: action.payload };
    default:
      return state;
  }
};

const initialState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  filters: {
    title: '',
    genre: '',
    releaseYear: '',
    director: ''
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  }
};

export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovie must be used within a MovieProvider');
  }
  return context;
};
