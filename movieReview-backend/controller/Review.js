const Review = require('../models/ReviewSchema');
const Movie = require('../models/MovieSchema');
const User = require("../models/UserSchema");

// exports.createReview = async (req, res) => {
//   try {
//     if (req.user.accountType !== "User") {
//         return res.status(403).json({
//           success: false,
//           message: "Only Users can create Reviews"
//         });
//     }
//     const userId= req.user._id;
//     const { movieId, rating, reviewText } = req.body;
//     if (rating < 1 || rating > 5) {
//       return res.status(400).json({
//         success: false,
//         message: "Rating must be between 1 and 5"
//       });
//     }

    
//     const existingReview = await Review.findOne({ userId, movieId });

//     if (existingReview) {
//       return res.status(400).json({
//         success: false,
//         message: "Review already exists for this movie by this user"
//       });
//     }

//     // 1. Create the review
//     const review = await Review.create({
//       userId,
//       movieId,
//       rating,
//       reviewText
//     });
//     // 2. Push review ID into the movie's reviews array
//     await Movie.findByIdAndUpdate(movieId, {
//       $push: { reviews: review._id }
//     });
//     // 3. Recalculate average rating
//       const movie = await Movie.findById(movieId).populate("reviews", "rating");

//       const totalRatings = movie.reviews.reduce((sum, r) => sum + r.rating, 0);
//       const averageRating = totalRatings / movie.reviews.length;

//       movie.averageRating = averageRating;
//       await movie.save();
//       // 4 populate review for response
//       const populatedReview = await Review.findById(review._id).populate("userId", "name email");


    

//     res.status(201).json({
//       success: true,
//       message: "Review added successfully",
//       data: populatedReview
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to add review",
//       error: error.message
//     });
//   }
// };

const mongoose = require('mongoose');

exports.createReview = async (req, res) => {
  try {
    if (req.user.accountType !== "User") {
      return res.status(403).json({
        success: false,
        message: "Only Users can create Reviews"
      });
    }

    const userId = req.user._id;
    const { movieId, rating, reviewText } = req.body;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5"
      });
    }

    // Validate movieId
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid movie ID"
      });
    }

    const validMovieId = new mongoose.Types.ObjectId(movieId);

    // Check for existing review
    const existingReview = await Review.findOne({ userId, movieId: validMovieId });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "Review already exists for this movie by this user"
      });
    }

    // Create review
    const review = await Review.create({
      userId,
      movieId: validMovieId,
      rating,
      reviewText
    });

    // Add review to movie
    await Movie.findByIdAndUpdate(validMovieId, {
      $push: { reviews: review._id }
    });

    // Recalculate average rating
    const movie = await Movie.findById(validMovieId).populate("reviews", "rating");
    const totalRatings = movie.reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRatings / movie.reviews.length;

    movie.averageRating = averageRating;
    await movie.save();

    // Populate review for response
    const populatedReview = await Review.findById(review._id).populate("userId", "username email");

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: populatedReview
    });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add review",
      error: error.message
    });
  }
};




// exports.getMovieReviews = async(req, res)=>{
  
//   try {
//     const movieId = req.params.id;

//     const reviews = await Review.find({ movieId })
//       .populate('userId', 'username profilePic') // optional: show reviewer info
//       .sort({ timestamp: -1 }); // latest first

//     res.status(200).json(reviews);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching reviews', error });
//   }
// };





// exports.updateReview = async (req, res) => {
//   try {
//     const { movieId, reviewId } = req.params;
//     const { rating, comment } = req.body;

//     const review = await Review.findById(reviewId);

//     if (!review || review.movie.toString() !== movieId) {
//       return res.status(404).json({ message: 'Review not found for this movie' });
//     }

//     // Only review owner or admin can update
//     if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
//       return res.status(403).json({ message: 'Unauthorized to update this review' });
//     }

//     if (rating) review.rating = rating;
//     if (comment) review.comment = comment;

//     await review.save();

//     res.status(200).json({ message: 'Review updated', review });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

exports.getMovieReviews = async (req, res) => {
  try {
    const { id: movieId } = req.params;

    // Validate movieId
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({ message: "Invalid movie ID" });
    }

    const validMovieId = new mongoose.Types.ObjectId(movieId);

    const reviews = await Review.find({ movieId: validMovieId })
      .populate('userId', 'username profilePicture email')
      .sort({ timestamp: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, reviewText } = req.body;

    const existingReview = await Review.findById(reviewId);
    if (!existingReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (
      existingReview.userId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (rating) existingReview.rating = rating;
    if (reviewText) existingReview.reviewText = reviewText;

    await existingReview.save();

    return res.status(200).json({ message: "Review updated", data: existingReview });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { movieId, reviewId } = req.params;

    // 1. Find the review
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    // 2. Validate movie match
    if (review.movieId.toString() !== movieId) {
      return res.status(400).json({
        success: false,
        message: "Review does not belong to the specified movie"
      });
    }

    // 3. Authorization check
    if (
      review.userId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this review"
      });
    }

    // 4. Delete the review
    await Review.findByIdAndDelete(reviewId);

    // 5. Remove review reference from movie
    await Movie.findByIdAndUpdate(movieId, {
      $pull: { reviews: review._id }
    });

    // 6. Recalculate average rating
    const movie = await Movie.findById(movieId).populate("reviews", "rating");
    const totalRatings = movie.reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = movie.reviews.length
      ? totalRatings / movie.reviews.length
      : 0;

    movie.averageRating = averageRating;
    await movie.save();

    res.status(200).json({
      success: true,
      message: "Review deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete review",
      error: error.message
    });
  }
};


