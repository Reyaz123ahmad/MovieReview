


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { moviesAPI } from '../services/movies';
// import MovieCard from '../components/MovieCard';
// import LoadingSpinner from '../components/LoadingSpinner';
// import './Home.css'; // External CSS

// const Home = () => {
//   const [featuredMovies, setFeaturedMovies] = useState([]);
//   const [trendingMovies, setTrendingMovies] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         setLoading(true);
//         const response = await moviesAPI.getAll({ limit: 8 });
//         if (response.data.success) {
//           const movies = response.data.data;
//           setFeaturedMovies(movies.slice(0, 4));
//           setTrendingMovies(movies.slice(4, 8));
//         }
//       } catch (error) {
//         console.error('Error fetching movies:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovies();
//   }, []);

//   if (loading) return <LoadingSpinner />;

//   return (
//     <div className="home-container">
//       {/* Hero Section */}
//       <section className="hero-section">
//         <div className="hero-banner">
//           <h1 className="hero-title">Discover Your Next Favorite Movie</h1>
//           <p className="hero-subtitle">Read and write reviews for thousands of films</p>
//           <Link to="/movies" className="hero-button">
//             Explore Movies
//           </Link>
//         </div>
//       </section>

//       {/* Featured Movies */}
//       <section className="movie-section">
//         <h2 className="section-title">Featured Movies</h2>
//         <div className="movie-grid">
//           {featuredMovies.map(movie => (
//             <MovieCard key={movie._id} movie={movie} />
//           ))}
//         </div>
//       </section>

//       {/* Trending Movies */}
//       <section className="movie-section">
//         <h2 className="section-title">Trending Now</h2>
//         <div className="movie-grid">
//           {trendingMovies.map(movie => (
//             <MovieCard key={movie._id} movie={movie} />
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;










import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { moviesAPI } from '../services/movies';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import './Home.css'; // External CSS

const Home = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await moviesAPI.getAll({ limit: 8 });
        if (response.data.success) {
          const movies = response.data.data;
          setFeaturedMovies(movies.slice(0, 4));
          setTrendingMovies(movies.slice(4, 8));
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-banner">
          <h1 className="hero-title">Discover Your Next Favorite Movie</h1>
          <p className="hero-subtitle">Read and write reviews for thousands of films</p>
          <Link to="/movies" className="hero-button">
            Explore Movies
          </Link>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="movie-section">
        <h2 className="section-title">Featured Movies</h2>
        <div className="movie-grid">
          {featuredMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Trending Movies */}
      <section className="movie-section">
        <h2 className="section-title">Trending Now</h2>
        <div className="movie-grid">
          {trendingMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
