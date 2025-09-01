



// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { moviesAPI } from '../services/movies';
// import { reviewsAPI } from '../services/reviews';
// import { watchlistAPI } from '../services/watchlist';
// import { useAuth } from '../context/AuthContext';
// import ReviewCard from '../components/ReviewCard';
// import WatchlistButton from '../components/WatchlistButton';
// import LoadingSpinner from '../components/LoadingSpinner';
// //import './MovieDetail.css';

// const MovieDetail = () => {
//   const { id } = useParams();
//   const { currentUser } = useAuth();
//   const [movie, setMovie] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [reviewForm, setReviewForm] = useState({ 
//     rating: 5, 
//     reviewText: '' 
//   });
  
//   const [isInWatchlist, setIsInWatchlist] = useState(false);

//   useEffect(() => {
//     const fetchMovieData = async () => {
//       try {
//         setLoading(true);
//         const movieResponse = await moviesAPI.getById(id);
//         if (movieResponse.data.success) {
//           setMovie(movieResponse.data.data);
//           setReviews(movieResponse.data.data.reviews || []);
          
//           // Check if movie is in user's watchlist
//           if (currentUser) {
//             checkWatchlistStatus();
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching movie:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovieData();
//   }, [id, currentUser]);

//   const checkWatchlistStatus = async () => {
//     try {
//       const response = await watchlistAPI.check(currentUser.id, id);
//       setIsInWatchlist(response.data.isInWatchlist);
//     } catch (error) {
//       console.error('Error checking watchlist status:', error);
//     }
//   };

//   const handleWatchlistToggle = async () => {
//     if (!currentUser) {
//       alert('Please login to manage your watchlist');
//       return;
//     }

//     try {
//       if (isInWatchlist) {
//         await watchlistAPI.remove(currentUser.id, id);
//         setIsInWatchlist(false);
//         alert('Removed from watchlist');
//       } else {
//         await watchlistAPI.add(currentUser.id, id);
//         setIsInWatchlist(true);
//         alert('Added to watchlist');
//       }
//     } catch (error) {
//       console.error('Error updating watchlist:', error);
//       alert('Failed to update watchlist');
//     }
//   };

//   const handleSubmitReview = async (e) => {
//     e.preventDefault();
//     if (!currentUser) {
//       alert('Please login to submit a review');
//       return;
//     }

//     try {
//       const response = await reviewsAPI.create({
//         movieId: id,
//         rating: reviewForm.rating,
//         reviewText: reviewForm.reviewText
//       });

//       if (response.data.success) {
//         setReviews([...reviews, response.data.data]);
//         setReviewForm({ rating: 5, reviewText: '' });
//         alert('Review submitted successfully!');
//       }
//     } catch (error) {
//       console.error('Error submitting review:', error);
//       alert('Failed to submit review');
//     }
//   };

//   if (loading) return <LoadingSpinner />;
//   if (!movie) return <div className="movie-container">Movie not found</div>;

//   return (
//     <div className="movie-container">
//       <div className="movie-details">
//         <div className="poster-section">
//           <img src={movie.posterUrl} alt={movie.title} className="poster-image" />
//           {currentUser && (
//             <button
//               onClick={handleWatchlistToggle}
//               className={`watchlist-btn ${isInWatchlist ? 'in-watchlist' : ''}`}
//             >
//               {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
//             </button>
//           )}
//         </div>
//         <div className="info-section">
//           <h1 className="movie-title">{movie.title}</h1>
//           <div className="movie-meta">
//             <div className="rating-badge">
//               <span className="star-icon">★</span>
//               <span>{movie.averageRating?.toFixed(1) || 'N/A'}</span>
//             </div>
//             <span className="movie-subtext">{movie.releaseYear} • {movie.genre.join(', ')}</span>
//           </div>

//           <div className="synopsis-section">
//             <h2 className="section-heading">Synopsis</h2>
//             <p className="synopsis-text">{movie.synopsis}</p>
//           </div>

//           <div className="extra-info">
//             <div>
//               <h3 className="info-heading">Director</h3>
//               <p>{movie.director}</p>
//             </div>
//             <div>
//               <h3 className="info-heading">Cast</h3>
//               <p>{movie.cast.join(', ')}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="review-section">
//         <h2 className="section-heading">Reviews ({reviews.length})</h2>
        
//         {currentUser && (
//           <div className="review-form-box">
//             <h3 className="form-title">Write a Review</h3>
//             <form onSubmit={handleSubmitReview}>
//               <div className="form-group">
//                 <label className="form-label">Rating</label>
//                 <select
//                   value={reviewForm.rating}
//                   onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
//                   className="form-input"
//                   required
//                 >
//                   <option value={5}>5 ★</option>
//                   <option value={4}>4 ★</option>
//                   <option value={3}>3 ★</option>
//                   <option value={2}>2 ★</option>
//                   <option value={1}>1 ★</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Your Review</label>
//                 <textarea
//                   value={reviewForm.reviewText}
//                   onChange={(e) => setReviewForm({ ...reviewForm, reviewText: e.target.value })}
//                   className="form-input"
//                   rows="4"
//                   required
//                 />
//               </div>
//               <button type="submit" className="submit-button">
//                 Submit Review
//               </button>
//             </form>
//           </div>
//         )}

//         {reviews.length > 0 ? (
//           <div className="review-list">
//             {reviews.map(review => (
//               <ReviewCard 
//                 key={review._id} 
//                 review={review} 
//                 showActions={currentUser && (
//                   currentUser._id === (typeof review.userId === 'object' ? review.userId._id : review.userId) || 
//                   currentUser.accountType === "Admin"
//                 )} 
//               />
//             ))}
//           </div>
//         ) : (
//           <p className="no-reviews">No reviews yet. Be the first to review!</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MovieDetail;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { moviesAPI } from '../services/movies';
import { reviewsAPI } from '../services/reviews';
import { watchlistAPI } from '../services/watchlist';
import { useAuth } from '../context/AuthContext';
import ReviewCard from '../components/ReviewCard';
import WatchlistButton from '../components/WatchlistButton';
import LoadingSpinner from '../components/LoadingSpinner';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ 
    rating: 5, 
    reviewText: '' 
  });
  
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const movieResponse = await moviesAPI.getById(id);
        if (movieResponse.data.success) {
          setMovie(movieResponse.data.data);
          setReviews(movieResponse.data.data.reviews || []);
          
          // Check if movie is in user's watchlist
          if (currentUser) {
            checkWatchlistStatus();
          }
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id, currentUser]);

  const checkWatchlistStatus = async () => {
    try {
      const response = await watchlistAPI.check(currentUser.id, id);
      setIsInWatchlist(response.data.isInWatchlist);
    } catch (error) {
      console.error('Error checking watchlist status:', error);
    }
  };

  const handleWatchlistToggle = async () => {
    if (!currentUser) {
      alert('Please login to manage your watchlist');
      return;
    }

    try {
      if (isInWatchlist) {
        await watchlistAPI.remove(currentUser.id, id);
        setIsInWatchlist(false);
        alert('Removed from watchlist');
      } else {
        await watchlistAPI.add(currentUser.id, id);
        setIsInWatchlist(true);
        alert('Added to watchlist');
      }
    } catch (error) {
      console.error('Error updating watchlist:', error);
      alert('Failed to update watchlist');
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Please login to submit a review');
      return;
    }

    try {
      const response = await reviewsAPI.create({
        movieId: id,
        rating: reviewForm.rating,
        reviewText: reviewForm.reviewText
      });

      if (response.data.success) {
        setReviews([...reviews, response.data.data]);
        setReviewForm({ rating: 5, reviewText: '' });
        alert('Review submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!movie) return <div className="movie-container">Movie not found</div>;

  return (
    <div className="movie-container">
      <div className="movie-details">
        <div className="poster-section">
          <img src={movie.posterUrl} alt={movie.title} className="poster-image" />
          {currentUser && (
            <button
              onClick={handleWatchlistToggle}
              className={`watchlist-btn ${isInWatchlist ? 'in-watchlist' : ''}`}
            >
              {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
          )}
        </div>
        <div className="info-section">
          <h1 className="movie-title">{movie.title}</h1>
          <div className="movie-meta">
            <div className="rating-badge">
              <span className="star-icon">★</span>
              <span>{movie.averageRating?.toFixed(1) || 'N/A'}</span>
            </div>
            <span className="movie-subtext">{movie.releaseYear} • {movie.genre.join(', ')}</span>
          </div>

          <div className="synopsis-section">
            <h2 className="section-heading">Synopsis</h2>
            <p className="synopsis-text">{movie.synopsis}</p>
          </div>

          <div className="extra-info">
            <div>
              <h3 className="info-heading">Director</h3>
              <p>{movie.director}</p>
            </div>
            <div>
              <h3 className="info-heading">Cast</h3>
              <p>{movie.cast.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="review-section">
        <h2 className="section-heading">Reviews ({reviews.length})</h2>
        
        {currentUser && (
          <div className="review-form-box">
            <h3 className="form-title">Write a Review</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label className="form-label">Rating</label>
                <select
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                  className="form-input"
                  required
                >
                  <option value={5}>5 ★</option>
                  <option value={4}>4 ★</option>
                  <option value={3}>3 ★</option>
                  <option value={2}>2 ★</option>
                  <option value={1}>1 ★</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Your Review</label>
                <textarea
                  value={reviewForm.reviewText}
                  onChange={(e) => setReviewForm({ ...reviewForm, reviewText: e.target.value })}
                  className="form-input"
                  rows="4"
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Submit Review
              </button>
            </form>
          </div>
        )}

        {reviews.length > 0 ? (
          <div className="review-list">
            {reviews.map(review => (
              <ReviewCard 
                key={review._id} 
                review={review} 
                showActions={currentUser && (
                  currentUser._id === (typeof review.userId === 'object' ? review.userId._id : review.userId) || 
                  currentUser.accountType === "Admin"
                )} 
              />
            ))}
          </div>
        ) : (
          <p className="no-reviews">No reviews yet. Be the first to review!</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
