// import React from 'react';
// import { Link } from 'react-router-dom';
// import './MovieCard.css'; 

// const MovieCard = ({ movie }) => {
//   return (
//     <div className="movie-card">
//       <Link to={`/movie/${movie._id}`}>
//         <img 
//           src={movie.posterUrl} 
//           alt={movie.title}
//           className="movie-poster"
//         />
//       </Link>
//       <div className="movie-content">
//         <Link to={`/movie/${movie._id}`}>
//           <h3 className="movie-title">{movie.title}</h3>
//         </Link>
//         <p className="movie-meta">
//           {movie.releaseYear} • {movie.genre.join(', ')}
//         </p>
//         <div className="movie-footer">
//           {/* <div className="movie-rating">
//             <span className="star">★★★★★</span>
//             <span>{movie.averageRating?.toFixed(1) || 'N/A'}</span>
//           </div> */}
//           <div className="movie-rating">
//           {[...Array(5)].map((_, i) => (
//             <span
//               key={i}
//               className={`star ${i < Math.floor(movie.averageRating || 0) ? 'filled' : ''}`}
//             >
//               ★
//             </span>
//           ))}
//           <span className="rating-number">{movie.averageRating?.toFixed(1) || 'N/A'}</span>
//         </div>

//           <span className="review-count">
//             {movie.reviews?.length || 0} reviews
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieCard;


import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css'; // Import external CSS

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie._id}`}>
        <img 
          src={movie.posterUrl} 
          alt={movie.title}
          className="movie-poster"
        />
      </Link>
      <div className="movie-content">
        <Link to={`/movie/${movie._id}`}>
          <h3 className="movie-title">{movie.title}</h3>
        </Link>
        <p className="movie-meta">
          {movie.releaseYear} • {movie.genre.join(', ')}
        </p>
        <div className="movie-footer">
          <div className="movie-rating">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`star ${i < Math.floor(movie.averageRating || 0) ? 'filled' : ''}`}
              >
                ★
              </span>
            ))}
            <span className="rating-number">{movie.averageRating?.toFixed(1) || 'N/A'}</span>
          </div>
          <span className="review-count">
            {movie.reviews?.length || 0} reviews
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
