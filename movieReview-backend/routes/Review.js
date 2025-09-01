const express = require('express');
const router = express.Router();
const { createReview, getMovieReviews, updateReview, deleteReview } = require('../controller/Review');
const { auth } = require('../middlewares/auth');

router.post('/addReview', auth, createReview);

router.get('/getReviews/:id', getMovieReviews);
router.put('/updateReview/:movieId/:reviewId', auth, updateReview);
router.delete('/deleteReview/:movieId/:reviewId', auth, deleteReview);


module.exports = router;
