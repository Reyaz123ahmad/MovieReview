
const User = require('../models/UserSchema');
const Review = require('../models/ReviewSchema');

const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('-password').populate('watchlist');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const reviews = await Review.find({ userId }).populate('movieId', 'title');

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        joinDate: user.createdAt,
        watchlist: user.watchlist,
        profilePicture: user.profilePicture,
      },
      reviews,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// exports.getUserProfile = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     const user = await User.findById(userId).select('-password');
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const reviews = await Review.find({ userId }).populate('movieId', 'title');

//     res.status(200).json({ user, reviews });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

// exports.updateUserProfile = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     // Only allow user to update their own profile
//     if (req.user._id.toString() !== userId && req.user.role !== 'admin') {
//       return res.status(403).json({ message: 'Unauthorized' });
//     }

//     const updates = req.body;
//     const updatedUser = await User.findByIdAndUpdate(userId, updates, {
//       new: true,
//       runValidators: true,
//     }).select('-password');

//     res.status(200).json({ message: 'Profile updated', user: updatedUser });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };











// exports.updateUserProfile = async (req, res) => {
//   try {
//     const userId = req.params.id;

//     // ✅ Auth check
//     if (req.user._id.toString() !== userId && req.user.accountType !== 'Admin') {
//       return res.status(403).json({ success: false, message: 'Unauthorized' });
//     }

//     const updates = {};
//     const { username } = req.body;
//     if (username) updates.username = username.trim();

//     // ✅ Image upload
//     const profileFile = req.files?.profilePicture;
//     if (profileFile) {
//       const uploadDetails = await uploadImageToCloudinary(profileFile, 'user-profiles');
//       updates.profilePicture = uploadDetails.secure_url;
//     }

//     // ✅ Update user
//     const updatedUser = await User.findByIdAndUpdate(userId, updates, {
//       new: true,
//       runValidators: true,
//     }).select('-password');

//     res.status(200).json({
//       success: true,
//       message: 'Profile updated successfully',
//       user: updatedUser,
//     });
//   } catch (error) {
//     console.error('Profile Update Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to update profile',
//       error: error.message,
//     });
//   }
// };






exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    // ✅ Auth check
    if (req.user._id.toString() !== userId && req.user.accountType !== 'Admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    // ✅ Prepare updates
    const updates = {};
    const { username } = req.body;
    if (username) updates.username = username.trim();

    // ✅ Handle image upload
    const profileFile = req.files?.profilePicture;
    if (profileFile) {
      const uploadDetails = await uploadImageToCloudinary(profileFile, 'user-profiles');
      updates.profilePicture = uploadDetails.secure_url;
    }

    // ✅ Update user in DB
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    // ✅ Format response manually to ensure _id is present
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        joinDate: updatedUser.joinDate,
        profilePicture: updatedUser.profilePicture,
        watchlist: updatedUser.watchlist,
        accountType: updatedUser.accountType,
      },
    });
  } catch (error) {
    console.error('Profile Update Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: error.message,
    });
  }
};
