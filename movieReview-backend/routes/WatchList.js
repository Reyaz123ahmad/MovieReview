const express = require('express');
const router = express.Router();

//Import controller functions
const {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist
} = require('../controller/Watchlist');

//Import auth middleware
const { auth } = require('../middlewares/auth'); 

//GET: Retrieve user's watchlist
router.get('/:id', auth, getWatchlist);

//POST: Add movie to user's watchlist
router.post('/:id', auth, addToWatchlist);

//DELETE: Remove movie from user's watchlist
router.delete('/:id/:movieId', auth, removeFromWatchlist);

module.exports = router;
