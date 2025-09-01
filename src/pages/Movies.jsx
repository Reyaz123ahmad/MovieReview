


// import React, { useState, useEffect } from 'react';
// import { moviesAPI } from '../services/movies';
// import MovieCard from '../components/MovieCard';
// import SearchFilter from '../components/SearchFilter';
// import LoadingSpinner from '../components/LoadingSpinner';
// //import './Movies.css'; // External CSS file

// const Movies = () => {
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     title: '',
//     genre: '',
//     releaseYear: '',
//     director: ''
//   });
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 12,
//     total: 0,
//     totalPages: 0
//   });

//   useEffect(() => {
//     fetchMovies();
//   }, [pagination.page]);

//   const fetchMovies = async () => {
//     try {
//       setLoading(true);
//       const params = {
//         page: pagination.page,
//         limit: pagination.limit,
//         ...filters
//       };
//       const response = await moviesAPI.getAll(params);
//       if (response.data.success) {
//         setMovies(response.data.data);
//         setPagination(prev => ({
//           ...prev,
//           total: response.data.total,
//           totalPages: Math.ceil(response.data.total / pagination.limit)
//         }));
//       }
//     } catch (error) {
//       console.error('Error fetching movies:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (name, value) => {
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSearch = () => {
//     setPagination(prev => ({ ...prev, page: 1 }));
//     fetchMovies();
//   };

//   const handlePageChange = (newPage) => {
//     setPagination(prev => ({ ...prev, page: newPage }));
//     window.scrollTo(0, 0);
//   };

//   return (
//     <div className="movies-container">
//       <h1 className="movies-title">Browse Movies</h1>

//       <SearchFilter 
//         filters={filters} 
//         onFilterChange={handleFilterChange} 
//         onSearch={handleSearch}
//       />

//       {loading ? (
//         <LoadingSpinner />
//       ) : (
//         <>
//           <div className="movies-grid">
//             {movies.map(movie => (
//               <MovieCard key={movie._id} movie={movie} />
//             ))}
//           </div>

//           {pagination.totalPages > 1 && (
//             <div className="pagination-controls">
//               <button
//                 onClick={() => handlePageChange(pagination.page - 1)}
//                 disabled={pagination.page === 1}
//                 className="pagination-button"
//               >
//                 Previous
//               </button>
//               <span className="pagination-info">
//                 Page {pagination.page} of {pagination.totalPages}
//               </span>
//               <button
//                 onClick={() => handlePageChange(pagination.page + 1)}
//                 disabled={pagination.page === pagination.totalPages}
//                 className="pagination-button"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Movies;



import React, { useState, useEffect } from 'react';
import { moviesAPI } from '../services/movies';
import MovieCard from '../components/MovieCard';
import SearchFilter from '../components/SearchFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import './Movies.css'; // External CSS file

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    title: '',
    genre: '',
    releaseYear: '',
    director: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0
  });

  useEffect(() => {
    fetchMovies();
  }, [pagination.page]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      };
      const response = await moviesAPI.getAll(params);
      if (response.data.success) {
        setMovies(response.data.data);
        setPagination(prev => ({
          ...prev,
          total: response.data.total,
          totalPages: Math.ceil(response.data.total / pagination.limit)
        }));
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchMovies();
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo(0, 0);
  };

  return (
    <div className="movies-container">
      <h1 className="movies-title">Browse Movies</h1>

      <SearchFilter 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        onSearch={handleSearch}
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="movies-grid">
            {movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="pagination-controls">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="pagination-button"
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Movies;

