


// import React from 'react';
// //import './ReviewCard.css'; 

// const ReviewCard = ({ review, onEdit, onDelete, showActions = false }) => {
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };
//   console.log(review)
//   console.log('Review:', review.userId);


//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <span
//         key={i}
//         className={i < rating ? 'star-filled' : 'star-empty'}
//       >
//         ★
//       </span>
//     ));
//   };

//   return (
//     <div className="review-card">
//       <div className="review-header">
//         <div className="review-user">
//           <div className="user-avatar">
//             {/* {review.userId?.username?.charAt(0).toUpperCase() || 'U'} */}
//             <div className="user-avatar">
//                 {review.userId?.profilePicture ? (
//                   <img
//                     src={review.userId.profilePicture}
//                     alt="avatar"
//                     className="user-avatar-img"
//                   />
//                 ) : (
//                   <span className="avatar-initial">
//                     {review.userId?.username?.charAt(0).toUpperCase() || 'U'}
//                   </span>
//                 )}
//             </div>

            

//           </div>
//           <div className="user-info">
//             <h4 className="user-name">{review.userId?.username || review.userId?.email || 'Unknown User'}</h4>

//             <p className="review-date">{formatDate(review.timestamp)}</p>
//           </div>
//         </div>
        
//       </div>
//       <div className="review-rating">
//         <div className="stars">{renderStars(review.rating)}</div>
//         <span className="rating-value">{review.rating}.0</span>
//       </div>
//       <p className="review-text">{review.reviewText}</p>
//     </div>
//   );
// };

// export default ReviewCard;


import React from 'react';
import './ReviewCard.css'; // Import external CSS

const ReviewCard = ({ review, onEdit, onDelete, showActions = false }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? 'star-filled' : 'star-empty'}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-user">
          <div className="user-avatar">
            {review.userId?.profilePicture ? (
              <img
                src={review.userId.profilePicture}
                alt="avatar"
                className="user-avatar-img"
              />
            ) : (
              <span className="avatar-initial">
                {review.userId?.username?.charAt(0).toUpperCase() || 'U'}
              </span>
            )}
          </div>
          <div className="user-info">
            <h4 className="user-name">{review.userId?.username || review.userId?.email || 'Unknown User'}</h4>
            <p className="review-date">{formatDate(review.timestamp)}</p>
          </div>
        </div>
      </div>
      <div className="review-rating">
        <div className="stars">{renderStars(review.rating)}</div>
        <span className="rating-value">{review.rating}.0</span>
      </div>
      <p className="review-text">{review.reviewText}</p>
      {showActions && (
        <div className="review-actions">
          <button className="edit-btn" onClick={() => onEdit(review)}>
            Edit
          </button>
          <button className="delete-btn" onClick={() => onDelete(review._id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
