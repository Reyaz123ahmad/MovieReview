const mongoose = require('mongoose');
const { type } = require('os');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: [String],
        required: true
    },
    releaseYear: {
        type: Number,
        required: true,
    },
    director: {
        type: String,
        required: true
    },
    cast: {
        type: [String],
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }],
    averageRating: {
        type: Number,
        default: 0
    }


},{ timestamps: true });
module.exports = mongoose.model('Movie', movieSchema);