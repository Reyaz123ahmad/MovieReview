 const mongoose = require('mongoose');
 const User = require('../models/UserSchema');
const Movie = require('../models/MovieSchema');
Watchlist= require('../models/WatchListSchema')

// // Helper: Validate ownership
 const isOwner = (req) => {
   return mongoose.Types.ObjectId.isValid(req.params.id) &&
          req.user._id === req.params.id;
 };

// // Helper: Validate role
 const isUserRole = (req) => req.user.accountType?.toLowerCase() === 'user';

// 📥 GET Watchlist
exports.getWatchlist = async (req, res) => {
    
  try {
    if (!isUserRole(req)) {
      return res.status(403).json({ message: "Only users can view watchlist" });
    }

    // if (!isOwner(req)) {
    //   return res.status(403).json({ message: "Access denied" });
    // }
    // NEW — allow logged-in users to view any profile
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }


    const user = await User.findById(req.params.id).populate('watchlist');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.addToWatchlist = async (req, res) => {
  try {
    if (!isUserRole(req)) {
      return res.status(403).json({ message: "Only users can add to watchlist" });
    }

    if (!isOwner(req)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { movieId } = req.body;
    const userId = req.params.id;

    // Check if entry already exists in Watchlist collection
    const existing = await Watchlist.findOne({ userId, movieId });
    if (existing) {
      return res.status(400).json({ message: 'Movie already in watchlist' });
    }

    // Create new Watchlist entry
    const entry = new Watchlist({ userId, movieId });
    await entry.save();

    // Update User document's watchlist array
    const user = await User.findById(userId);
    if (!user) {
      // Rollback Watchlist entry if user not found
      await Watchlist.findByIdAndDelete(entry._id);
      return res.status(404).json({ message: 'User not found' });
    }

    // Avoid duplicate in user.watchlist
    if (!user.watchlist.includes(movieId)) {
      user.watchlist.push(movieId);
      await user.save();
    }

    res.status(200).json({ message: 'Movie added to watchlist successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.removeFromWatchlist = async (req, res) => {
  try {
    if (!isUserRole(req)) {
      return res.status(403).json({ message: "Only users can remove from watchlist" });
    }

    if (!isOwner(req)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { movieId } = req.params;
    const userId = req.params.id;

    // Remove from User.watchlist array
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const beforeLength = user.watchlist.length;
    user.watchlist = user.watchlist.filter(id => id.toString() !== movieId);
    const afterLength = user.watchlist.length;

    if (beforeLength === afterLength) {
      return res.status(400).json({ message: 'Movie not found in user watchlist' });
    }

    await user.save();

    // Remove from Watchlist collection
    const deleted = await Watchlist.findOneAndDelete({ userId, movieId });
    if (!deleted) {
      // Optional: log inconsistency
      console.warn(`Movie removed from User.watchlist but not found in Watchlist collection`);
    }

    res.json({ message: 'Movie removed from watchlist successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
