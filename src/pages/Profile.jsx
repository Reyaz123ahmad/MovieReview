// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { usersAPI } from '../services/users';
// import { watchlistAPI } from '../services/watchlist';
// import MovieCard from '../components/MovieCard';
// import LoadingSpinner from '../components/LoadingSpinner';
// import { useAuth } from '../context/AuthContext';
// import { toast } from 'react-toastify';

// //import './Profile.css';

// const Profile = () => {
//   const { id } = useParams();
//   const { currentUser } = useAuth();
//   const [user, setUser] = useState(null);
//   const [watchlist, setWatchlist] = useState([]);
//   const [activeTab, setActiveTab] = useState('reviews');
//   const [loading, setLoading] = useState(true);
//   const [isOwnProfile, setIsOwnProfile] = useState(false);
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     if (currentUser && currentUser.id === id) {
//       setIsOwnProfile(true);
//     }
//     fetchUserData();
//     fetchWatchlist();
//   }, [id, currentUser]);

//   const fetchUserData = async () => {
//     try {
//       const response = await usersAPI.getById(id);
//       if (response.data.success) {
//         console.log("Fetched user:", response.data.user);
//         setUser(response.data.user);
//         setReviews(response.data.reviews);
        
//       }
//     } catch (error) {
//       console.error('Error fetching user:', error);
//     }
//   };
  

//   const fetchWatchlist = async () => {
//     try {
//       const response = await watchlistAPI.getByUserId(id);
//       if (response.data.success) {
//         setWatchlist(response.data.watchlist);
//       }
//     } catch (error) {
//       console.error('Error fetching watchlist:', error);
//     } finally {
//       setLoading(false);
//     }
    
//   };
  

//   const removeFromWatchlist = async (movieId) => {
//     try {
//       await watchlistAPI.remove(id, movieId);
//       setUser(prev => ({
//         ...prev,
//         watchlist: prev.watchlist.filter(movie => movie._id !== movieId)
//       }));
//       toast.success("Movie removed from watchlist");
//     } catch (error) {
//       console.error('Error removing from watchlist:', error);
//       toast.error("Failed to remove movie");
//     }
//   };

//   if (loading) return <LoadingSpinner />;
//   if (!user) return <div className="profile-container">User not found</div>;

//   const isAdmin = currentUser?.accountType?.toLowerCase() === 'admin';
//   const isUser = currentUser?.accountType?.toLowerCase() === 'user';
//   console.log("user._id:", user?.id);

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         <div className="profile-header">
//           <div className="profile-avatar">
//             {user.username?.charAt(0).toUpperCase()}
//             <img src={user.profilePicture} alt="" />
//           </div>
//           <div className="profile-info">
//             <h1 className="profile-name">{user.username}</h1>
//             <p className="profile-email">{user.email}</p>
            
//             <p className="profile-joined">Joined {new Date(user.joinDate).toLocaleDateString()}</p>
//           </div>
//         </div>
//         {user?.id && (
//             <Link to={`/update-userProfile/${user.id}`}>Edit</Link>
//         )}

//       </div>

//       {isUser && (
//         <>
//           <div className="profile-tabs">
//             <nav className="tab-nav">
//               <button
//                 onClick={() => setActiveTab('reviews')}
//                 className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
//               >
//                 Reviews
//               </button>
//               <button
//                 onClick={() => setActiveTab('watchlist')}
//                 className={`tab-button ${activeTab === 'watchlist' ? 'active' : ''}`}
//               >
//                 Watchlist
//               </button>
//             </nav>
//           </div>

//           {activeTab === 'reviews' && (
//             <div>
//               <h2 className="section-title">User Reviews</h2>
//               {reviews.length > 0 ? (
//                 <ul>
//                   {reviews.map((review) => (
//                     <li key={review._id}>
//                       <strong>Title: {review.movieId.title}</strong>
//                       <p>Review Text: {review.reviewText}</p>
//                       <p>Rating: {review.rating}</p>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p>No reviews yet.</p>
//               )}
//             </div>
//           )}

//           {activeTab === 'watchlist' && (
//             <div>
//               <h2 className="section-title">Watchlist</h2>
//               {user.watchlist.length > 0 ? (
//                 <div className="watchlist-grid">
//                   {user.watchlist.map(movie => (
//                     <div key={movie._id} className="watchlist-item">
//                       <MovieCard movie={movie} />
//                       {isOwnProfile && (
//                         <button
//                           onClick={() => removeFromWatchlist(movie._id)}
//                           className="remove-button"
//                           title="Remove from watchlist"
//                         >
//                           <svg xmlns="http://www.w3.org/2000/svg" className="remove-icon" viewBox="0 0 20 20" fill="currentColor">
//                             <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                           </svg>
//                         </button>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="section-note">No movies in watchlist yet.</p>
//               )}
//             </div>
//           )}
//         </>
//       )}

//       {isAdmin && (
//         <div className="admin-actions">
//           <Link to="/create-movie" className="create-movie-button">
//             Create Movie
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;



import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usersAPI } from '../services/users';
import { watchlistAPI } from '../services/watchlist';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './Profile.css';

const Profile = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [activeTab, setActiveTab] = useState('reviews');
  const [loading, setLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (currentUser && currentUser.id === id) {
      setIsOwnProfile(true);
    }
    fetchUserData();
    fetchWatchlist();
  }, [id, currentUser]);

  const fetchUserData = async () => {
    try {
      const response = await usersAPI.getById(id);
      if (response.data.success) {
        console.log("Fetched user:", response.data.user);
        setUser(response.data.user);
        setReviews(response.data.reviews);
        
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  

  const fetchWatchlist = async () => {
    try {
      const response = await watchlistAPI.getByUserId(id);
      if (response.data.success) {
        setWatchlist(response.data.watchlist);
      }
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    } finally {
      setLoading(false);
    }
    
  };
  

  const removeFromWatchlist = async (movieId) => {
    try {
      await watchlistAPI.remove(id, movieId);
      setUser(prev => ({
        ...prev,
        watchlist: prev.watchlist.filter(movie => movie._id !== movieId)
      }));
      toast.success("Movie removed from watchlist");
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      toast.error("Failed to remove movie");
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!user) return <div className="profile-container">User not found</div>;

  const isAdmin = currentUser?.accountType?.toLowerCase() === 'admin';
  const isUser = currentUser?.accountType?.toLowerCase() === 'user';
  console.log("user._id:", user?.id);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.username?.charAt(0).toUpperCase()}
            <img src={user.profilePicture} alt="" />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{user.username}</h1>
            <p className="profile-email">{user.email}</p>
            
            <p className="profile-joined">Joined {new Date(user.joinDate).toLocaleDateString()}</p>
          </div>
        </div>
        {user?.id && (
            <Link to={`/update-userProfile/${user.id}`}>Edit</Link>
        )}

      </div>

      {isUser && (
        <>
          <div className="profile-tabs">
            <nav className="tab-nav">
              <button
                onClick={() => setActiveTab('reviews')}
                className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
              >
                Reviews
              </button>
              <button
                onClick={() => setActiveTab('watchlist')}
                className={`tab-button ${activeTab === 'watchlist' ? 'active' : ''}`}
              >
                Watchlist
              </button>
            </nav>
          </div>

          {activeTab === 'reviews' && (
            <div>
              <h2 className="section-title">User Reviews</h2>
              {reviews.length > 0 ? (
                <ul>
                  {reviews.map((review) => (
                    <li key={review._id}>
                      <strong>Title: {review.movieId.title}</strong>
                      <p>Review Text: {review.reviewText}</p>
                      <p>Rating: {review.rating}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          )}

          {activeTab === 'watchlist' && (
            <div>
              <h2 className="section-title">Watchlist</h2>
              {user.watchlist.length > 0 ? (
                <div className="watchlist-grid">
                  {user.watchlist.map(movie => (
                    <div key={movie._id} className="watchlist-item">
                      <MovieCard movie={movie} />
                      {isOwnProfile && (
                        <button
                          onClick={() => removeFromWatchlist(movie._id)}
                          className="remove-button"
                          title="Remove from watchlist"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="remove-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="section-note">No movies in watchlist yet.</p>
              )}
            </div>
          )}
        </>
      )}

      {isAdmin && (
        <div className="admin-actions">
          <Link to="/create-movie" className="create-movie-button">
            Create Movie
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
